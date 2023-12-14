import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './audio.css';
import html2canvas from 'html2canvas';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';

// Firebase Imports
import { auth, db, storage } from '../../../Firebase';

import {
    collection,
    addDoc,
    doc, setDoc, getDoc
} from 'firebase/firestore';
import {
    ref,
    uploadString as uploadStringStorage, uploadBytes ,
    getDownloadURL as getDownloadURLStorage,
} from 'firebase/storage';
import { jsPDF } from 'jspdf';

const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('Choose Audio File (.wav)');
    const [loading, setLoading] = useState(false);
    const captureRef = React.createRef();

    // const storePdfUrlInFirestore = async (pdfUrl) => {
    //     try {
    //         const user = auth.currentUser;
    //         const usersCollection = collection(db, 'Users');
    //         const userDoc = doc(usersCollection, user.uid);

    //         // Update the user document with the PDF URL
    //         await setDoc(userDoc, { pdfURL: pdfUrl }, { merge: true });
    //         console.log('PDF URL stored in Firestore for user:', user.uid);
    //     } catch (error) {
    //         console.error('Error storing PDF URL in Firestore:', error);
    //     }
    // };


    const storePdfUrlInFirestore = async (pdfUrl) => {
        try {
            const user = auth.currentUser;
            const usersCollection = collection(db, 'Users');
            const userDoc = doc(usersCollection, user.uid);
    
            // Check if the user document exists
            const userDocSnapshot = await getDoc(userDoc);
    
            if (userDocSnapshot.exists()) {
                // If the user document exists, update the "PDFs" sub-collection
                const pdfsCollection = collection(userDoc, 'PDFs');
                await addDoc(pdfsCollection, { pdfURL: pdfUrl });
                console.log('PDF URL stored in Firestore for user:', user.uid);
            } else {
                // If the user document doesn't exist, create it and the "PDFs" sub-collection
                const newUserDoc = doc(usersCollection, user.uid);
                await setDoc(newUserDoc, {});
                const pdfsCollection = collection(newUserDoc, 'PDFs');
                await addDoc(pdfsCollection, { pdfURL: pdfUrl });
                console.log('PDF URL stored in Firestore for user:', user.uid);
            }
        } catch (error) {
            console.error('Error storing PDF URL in Firestore:', error);
        }
    };

    // const captureAndSavePDF = async () => {
    //     const content = document.querySelector('.AudioClassificationResult');

    //     if (!content) {
    //         console.error('Cannot find the capture element');
    //         return;
    //     }

    //     try {
    //         const pdf = new jsPDF('p', 'mm', 'a4');

    //         // Capture and add the first part of the content
    //         const canvas1 = await html2canvas(content.querySelector('.audioClassificationResultHeadFirst'));
    //         const imgData1 = canvas1.toDataURL('image/png');
    //         pdf.addImage(imgData1, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the second part of the content
    //         const canvas2 = await html2canvas(content.querySelector('.audioClassificationMainPythonCharts-div1'));
    //         const imgData2 = canvas2.toDataURL('image/png');
    //         pdf.addImage(imgData2, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the second part of the content
    //         const canvas3 = await html2canvas(content.querySelector('.audioClassificationMainPythonCharts-div2'));
    //         const imgData3 = canvas3.toDataURL('image/png');
    //         pdf.addImage(imgData3, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the second part of the content
    //         const canvas4 = await html2canvas(content.querySelector('.audioClassificationMainPythonCharts-div3'));
    //         const imgData4 = canvas4.toDataURL('image/png');
    //         pdf.addImage(imgData4, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the third part of the content
    //         const canvas5 = await html2canvas(content.querySelector('.audioClassificationChartsSection:nth-child(1)'));
    //         const imgData5 = canvas5.toDataURL('image/png');
    //         pdf.addImage(imgData5, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the fourth part of the content
    //         const canvas6 = await html2canvas(content.querySelector('.audioClassificationChartsSection:nth-child(2)'));
    //         const imgData6 = canvas6.toDataURL('image/png');
    //         pdf.addImage(imgData6, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the fifth part of the content
    //         const canvas7 = await html2canvas(content.querySelector('.audioClassificationChartsSection:nth-child(3)'));
    //         const imgData7 = canvas7.toDataURL('image/png');
    //         pdf.addImage(imgData7, 'JPEG', 10, 10, 190, 0);
    //         pdf.addPage();

    //         // Capture and add the fifth part of the content
    //         const canvas8 = await html2canvas(content.querySelector('.audioClassificationChartsSection:nth-child(4)'));
    //         const imgData8 = canvas8.toDataURL('image/png');
    //         pdf.addImage(imgData8, 'JPEG', 10, 10, 190, 0);

    //         // Save PDF
    //         pdf.save('classification_result.pdf');

    //         // Convert Uint8Array to base64
    //         const pdfDataString = pdf.output('datauristring');

    //         const storageRef = ref(storage, 'pdfs/' + Date.now() + '.pdf');

    //         uploadStringStorage(storageRef, pdfDataString)
    //             .then((snapshot) => {
    //                 console.log('PDF uploaded to Firebase Storage:', snapshot.ref.fullPath);
    //                 getDownloadURLStorage(snapshot.ref).then((downloadURL) => {
    //                     console.log('PDF Download URL:', downloadURL);
    //                     storePdfUrlInFirestore(downloadURL)
    //                 });

    //             })
    //             .catch((error) => {
    //                 console.error('Error uploading PDF to Firebase Storage:', error);
    //             });

    //     } catch (error) {
    //         console.error('Error capturing or saving PDF:', error);
    //     }
    // };


    const captureAndSavePDF = async () => {
    const content = document.querySelector('.AudioClassificationResult');

    if (!content) {
        console.error('Cannot find the capture element');
        return;
    }

    try {
        // Create a canvas for the entire content
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');

        // Create a PDF document
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Assuming A4 size

        // Save PDF locally
        pdf.save('classification_result.pdf');

        // Convert Uint8Array to base64
        const pdfDataString = pdf.output('datauristring');

        // Convert base64 to Blob
        const byteCharacters = atob(pdfDataString.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

        // Upload PDF Blob to Firebase Storage
        const storageRef = ref(storage, 'pdfs/' + Date.now() + '.pdf');
        await uploadBytes(storageRef, pdfBlob);

        // Get the download URL
        const downloadURL = await getDownloadURLStorage(storageRef);

        // Store PDF URL in Firestore
        storePdfUrlInFirestore(downloadURL);

        console.log('PDF uploaded to Firebase Storage:', storageRef.fullPath);
        console.log('PDF Download URL:', downloadURL);
    } catch (error) {
        console.error('Error capturing or saving PDF:', error);
    }
};


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        setLoading(true);

        const addresses = ['http://localhost:8088/'];
        addresses.forEach(async (address) => {
            try {
                const response = await fetch(address, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setClassificationData(data);
                    setResultVisible(true);

                    // saveToDatabase({
                    //     timestamp: new Date(),
                    //     result: data,
                    // });

                    const sortedKeys = Object.keys(data.predictions).sort(
                        (a, b) => data.predictions[b] - data.predictions[a]
                    );

                    // const mostSimilarCategory = sortedKeys[0];
                    // const otherCategories = sortedKeys.slice(1);

                    // generateAndSavePDF(mostSimilarCategory, otherCategories);
                } else {
                    setClassificationData({ error: 'Classification failed.' });
                    setResultVisible(true);
                }
            } catch (error) {
                console.error(error);
                setClassificationData({ error: 'An error occurred.' });
                setResultVisible(true);
            } finally {
                setLoading(false);
            }
        });
    };

    const handleFileInputChange = (event) => {
        const fileInput = event.target;

        if (fileInput.files.length > 0) {
            setSelectedFileName(fileInput.files[0].name);
        } else {
            setSelectedFileName('Choose Audio File (.wav)');
        }
    };

    const displayClassificationResult = () => {
        if (classificationData.error) {
            return (
                <div className="mt-4">
                    <h6>Classification Result:</h6>
                    <div className="alert alert-danger">
                        {classificationData.error}
                    </div>
                </div>
            );
        }

        if (!classificationData.predictions) {
            return null;
        }

        const sortedKeys = Object.keys(classificationData.predictions).sort(
            (a, b) => classificationData.predictions[b] - classificationData.predictions[a]
        );

        const mostSimilarCategory = sortedKeys[0];
        const otherCategories = sortedKeys.slice(1);

        const barChartData = [
            {
                type: 'bar',
                x: sortedKeys,
                y: sortedKeys.map(key => (classificationData.predictions[key] * 100).toFixed(2)),
            },
        ];

        const pieChartData = [
            {
                type: 'pie',
                labels: sortedKeys,
                values: sortedKeys.map(key => (classificationData.predictions[key] * 100).toFixed(2)),
            },
        ];

        const lineChartData = [
            {
                type: 'scatter',
                x: sortedKeys,
                y: sortedKeys.map(key => (classificationData.predictions[key] * 100).toFixed(2)),
                mode: 'lines+markers',
            },
        ];

        const scatterPlotData = [
            {
                x: sortedKeys.map(key => key.length),
                y: sortedKeys.map(key => classificationData.predictions[key]),
                mode: 'markers',
                type: 'scatter',
            },
        ];

        const layout = { yaxis: { title: 'Percentage' }, xaxis: { title: 'Ships' } };

        return (
            <div>
                <div className="button-wrapper">
                    <button onClick={captureAndSavePDF} className="button-chooseen" style={{ backgroundColor: '#538aab', margin: '15px 0px 10px 0px' }}>
                        Capture and Save as PDF
                        < DownloadIcon style={{ marginLeft: '15px' }} />
                    </button>
                </div>
                <div ref={captureRef} className='AudioClassificationResult'>
                    <div className='audioClassificationResultHead'>
                        <div className='audioClassificationResultHeadFirst' >
                            <h1 className='classificationResultHeading' > Classification Results </h1>

                            <div className='classificationResultResult' >
                                <div className='classificationResultText' >
                                    <div>
                                        <div >
                                            <h3>{mostSimilarCategory}</h3>
                                            <div className="py-1 flex items-center">
                                                <progress className="progress w-32 mr-3" value={(classificationData.predictions[mostSimilarCategory] * 100).toFixed(2)} max="100"></progress>
                                                {(classificationData.predictions[mostSimilarCategory] * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                        {otherCategories.map((key) => (
                                            <div key={key}>
                                                <h3>{key}</h3>
                                                <div className="py-1 flex items-center">
                                                    <progress className="progress w-32 mr-3" value={(classificationData.predictions[key] * 100).toFixed(2)} max="100"></progress>
                                                    {(classificationData.predictions[key] * 100).toFixed(2)}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='classificationResultText'>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%' }}>
                                        <h1 style={{ fontSize: '20px', marginTop: '10px', marginBottom: '5px' }} > The sound is classified as the following ship  </h1>
                                        <h1 style={{ fontSize: '25px', fontWeight: '900', margin: '10px' }} > {mostSimilarCategory}</h1>
                                        <DirectionsBoatFilledOutlinedIcon sx={{ fontSize: 80, marginBottom: '5px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='audioClassificationMainPythonCharts' >

                            <div className='audioClassificationMainPythonCharts-div1' >

                                <div>
                                    <h2 className='classificationResultHeadingPythonCharts' >Mel Spectogram </h2>
                                </div>

                                <div className='audioClassificationMainPythonChartsMelspec' >

                                    <div className='audioClassificationMainPythonChartsMelspec1' >
                                        <img src={`data:image/png;base64, ${classificationData.base64_image}`} alt="Classification" />
                                    </div>

                                    <div className='audioClassificationMainPythonChartsMelspec2' >
                                        In the following picture, the mel spectrogram is displaying, which is used for visualizing the frequency components of a signal, emphasizing the perceptually relevant information by scaling the frequency axis according to the human auditory system's response.
                                    </div>
                                </div>

                            </div>

                            <div className='audioClassificationMainPythonCharts-div2' >

                                <div>
                                    <h2 className='classificationResultHeadingPythonCharts' > Spectogram </h2>
                                </div>

                                <div className='audioClassificationMainPythonChartsMelspec' >
                                    <div className='audioClassificationMainPythonChartsMelspec2' >
                                        In the following picture, the spectrogram is displaying, which is used for representing the spectrum of frequencies of a signal as it varies with time, providing a visual representation of the changing spectral content over time.
                                    </div>
                                    <div className='audioClassificationMainPythonChartsMelspec1' >
                                        <img src={`data:image/png;base64, ${classificationData.base64_spectogram}`} alt="Classification" />
                                    </div>

                                </div>

                            </div>

                            <div className='audioClassificationMainPythonCharts-div3' >
                                <div>
                                    <h2 className='classificationResultHeadingPythonCharts' > Waveform </h2>
                                </div>

                                <div className='audioClassificationMainPythonChartsMelspec' >

                                    <div className='audioClassificationMainPythonChartsMelspec1' >
                                        <img src={`data:image/png;base64, ${classificationData.base64_waveform}`} alt="Classification" />
                                    </div>

                                    <div className='audioClassificationMainPythonChartsMelspec2' >
                                        In the following picture, the waveform is displaying, which is used for illustrating the amplitude of a sound wave as it varies with time, offering a detailed depiction of the signal's amplitude and temporal characteristics.
                                    </div>
                                </div>
                            </div>

                            <div className='audioClassificationCharts' >
                                <div className='audioClassificationChartsSection'>
                                    <h3 className='classificationResultHeadingCharts' > Bar Chart</h3>
                                    <Plot data={barChartData} layout={layout} />
                                </div>
                                <div className='audioClassificationChartsSection' >
                                    <h3 className='classificationResultHeadingCharts' > Pie Chart</h3>
                                    <Plot data={pieChartData} layout={layout} />
                                </div>
                                <div className='audioClassificationChartsSection' >
                                    <h3 className='classificationResultHeadingCharts' > Line Chart </h3>
                                    <Plot data={lineChartData} layout={layout} />
                                </div>
                                <div className='audioClassificationChartsSection' >
                                    <h3 className='classificationResultHeadingCharts' > Scatter Plot </h3>
                                    <Plot data={scatterPlotData} layout={layout} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='AudioClassificationCompMain'>
                <div className='container-main'>
                    <div className="grid-container">
                        <div className="audio-upload-container">
                            <h4> Choose Your Desired Audio For Classification </h4>

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="custom-file">
                                    <label className="custom-file-label" htmlFor="audioFile" data-file-name={selectedFileName}>
                                        {selectedFileName} < AudioFileOutlinedIcon style={{ marginLeft: '15px' }} />
                                    </label>
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="audioFile"
                                        name="file"
                                        accept=".wav"
                                        required
                                        onChange={handleFileInputChange}
                                    />
                                </div>

                                <div className="button-wrapper">
                                    <button type="submit" className="button-chooseen" style={{ backgroundColor: '#538aab' }}>
                                        Classify < DoneAllOutlinedIcon style={{ marginLeft: '15px' }} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {loading ? (
                <div className="loading-indicator">
                    <div>
                        <div className='loadingScreen'  > <progress className="progress"> </progress> </div>
                    </div>
                    <div style={{ textAlign: 'center' }} > <p> Classifying </p> </div>
                </div>
            ) : null}

            {resultVisible && displayClassificationResult()}
        </>
    );
};

export default AudioClassification;
