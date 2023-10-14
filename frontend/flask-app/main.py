# app.py
import os
from pathlib import Path
import main
import torch
import tempfile
from flask import Flask, request, jsonify, render_template
from fastai.vision.all import *
from flask_cors import CORS
import torchaudio
import pathlib
import matplotlib
import numpy as np
from PIL import Image
import base64
matplotlib.use('Agg')
import base64

# Weights, edit this.
weights_path = Path('./model/')
weights = 'model_final'

sr = 32000
imgsize = 460
Fmax = sr / 2 # Nyquist. 

# STFT LF
Nfft_lf = 32768 # 32768 is the cloeset power of 2 above the sample rate.  
Fbin_lf = Fmax / Nfft_lf
Nskip_lf = Nfft_lf //5  # 80% overlap  
rng_lf = Nskip_lf * (imgsize-1)
stft_lf = torchaudio.transforms.Spectrogram(Nfft_lf,hop_length=Nskip_lf, power=2,return_complex=False )

# STFT HF
Nfft_hf = 1024
Fbin_hf = Fmax / Nfft_hf
Nskip_hf =(1024 * 3)//4 # 25% overlap
rng_hf = Nskip_hf * imgsize + Nfft_hf
stft_hf = torchaudio.transforms.Spectrogram(Nfft_hf,hop_length=Nskip_hf, power=2,return_complex=False )

# Patch learner for batch predictions
def predict_batch(self, item, rm_type_tfms=None, with_input=False):
    dl = self.dls.test_dl(item, rm_type_tfms=rm_type_tfms, num_workers=0)
    ret, _,mask = self.get_preds(dl=dl, with_decoded=True)
    return ret, mask
Learner.predict_batch = predict_batch


def readWav(p: Path, rand=True):
    frames = torchaudio.info(p).num_frames
    last = frames-rng_lf
    wav = torch.Tensor()  
    # Repeat wav if not long enough
    while last < 0:
        wav = torch.cat((wav,torchaudio.load(p)[0]),1)
        last += frames
    # Random start point
    start = random.randint(0,last) if rand else int(last/2)
    
    # If enough frames
    if frames-rng_lf > 0:
        return torchaudio.load(p, num_frames=rng_lf, frame_offset=start)[0]
    else: 
        wav = torch.cat((wav,torchaudio.load(p)[0]),1)
        return wav[:,start:start+rng_lf]

def normSpec(spec):
    # take the logarithm of the values
    ret = torch.log10(spec+1e-20)
    mean = torch.mean(ret)
    std = torch.std(ret)    
    ret =  (ret - mean) / (std*4) + 0.5
    return torch.clamp(ret, min=0, max=1)  


def wavToSpecs(wavs : torch.Tensor, hf_idx=0):
    lf = stft_lf(wavs)[0]
    lf0 = normSpec(lf[:imgsize,:imgsize])
    lf1 = normSpec(lf[imgsize:imgsize*2,:imgsize])
    hf = stft_hf(wavs[:,hf_idx:hf_idx+rng_hf])[0]
    hf = normSpec(hf[12:imgsize+12,:imgsize])

    spec2 = torch.stack((lf0,lf1,hf),0)
    return torch.stack((lf0,lf1,hf),0)

def tensor_to_base64_image(tensor):
    
    plt.imshow(tensor[0].cpu())

    # Encode the image as base64
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')  # Save the image to the buffer in PNG format
    buffer.seek(0)
    base64_image = base64.b64encode(buffer.read()).decode('utf-8')

    return base64_image

class Spectrogram(TensorImageBase):
    """Type to represent a spectogram which knows show itself"""
    @classmethod
    def create(cls, o: Tensor):
        return cls(o)
    
    def show(self, figsize=None, ctx=None, **kwargs): 
        channels = self.shape[0]
        t = self
        if not isinstance(t, Tensor): return ctx
        if figsize is None: figsize=(10,10)   
        return show_images(t, nrows=1, ncols=channels)

# Make a fastai Transform
class SpectrogramTransform(RandTransform):
    "A transform handler for multiple `spect` transforms"
    split_idx,order=None,0  # 0 = HIGH prio
    #def __init__(self, train_aug, valid_aug): store_attr()
    def __init__(self): 
        store_attr()
    
    def before_call(self, b, split_idx):
        self.idx = split_idx
    
    def encodes(self, p : Path):
        
        if self.idx == 0: #Train transform
            hf_idx = random.randint(0,rng_lf-rng_hf)
            wav = readWav(p, True)
        else: #Valid transform
            hf_idx = (rng_lf-rng_hf) //2
            wav = readWav(p, False)
        return wavToSpecs(wav, hf_idx)
    
    #def decodes(self, x): return TitledImage(x,'test')
def get_wavs(p : Path) :
    return get_files(p,'.wav')

def label_func(p : Path):
    return [PurePath(p).parent.parent.name]

def predTensor(p, overlap=0.5):
    frames = torchaudio.info(p).num_frames
    wav,sr = torchaudio.load(p)
    
    # Resample audio if different samplerate
    if(sr != 32000): 
        print('resampling to 32000..')
        wav = torchaudio.functional.resample(wav, sr, 32000)
        sr = 32000
        frames = wav.shape[1]
        print('resampling done..')
    # Repeat wav if not long enough
    
    while wav.shape[1]-rng_lf < 0 :
        wav = torch.cat((wav,wav),1)    
    spec = wavToSpecs(wav[:,0:rng_lf])[None,:,:,:]
    # cat rest of the frames
    hf_idx = (rng_lf-rng_hf) //2
    start = int(Nskip_lf *(1-overlap) * (imgsize))
    runs = int((frames-Nfft_lf)/(Nskip_lf*(1-overlap))/imgsize) +1 
    for i in range(1,runs):
        idx = start*i
        if idx+rng_lf > frames: # add last frame 
            spec = torch.cat((spec,wavToSpecs(wav[:,-rng_lf:],hf_idx)[None,:,:,:]),0)
            break
        # Add frame according to index
        spec = torch.cat((spec,wavToSpecs(wav[:,idx:idx+rng_lf],hf_idx)[None,:,:,:]),0)
    return Spectrogram.create(spec)

learn = load_learner(weights_path / weights)

def prettyPred(pbatch):
    p = torch.mean(pbatch[0]*(pbatch[1]+ 0.0* ~pbatch[1]) ,0).tolist()
    return {k: v for k,v in zip(learn.dls.vocab, p)}  