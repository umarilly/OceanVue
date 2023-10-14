import React, { useState } from 'react';
import './audio.css';

const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('Choose Audio File (.wav)');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Form Data:', formData);

        const addresses = ['http://10.97.10.34:8088/', 'http://localhost:8088/'];
        addresses.forEach(async (address) => {
            try {
                const response = await fetch(address, {
                    method: 'POST',
                    body: formData,
                });
                console.log('Response status code:', response.status);
                const data = await response.json();
                console.log('Response data:', data);
                if (response.ok) {
                    setClassificationData(data);
                    setResultVisible(true);
                } else {
                    setClassificationData({ error: 'Classification failed.' });
                    setResultVisible(true);
                }
            } catch (error) {
                console.error(error);
                setClassificationData({ error: 'An error occurred.' });
                setResultVisible(true);
            }
        });
    };

    const handleFileInputChange = (event) => {
        const fileInput = event.target;
        const customLabel = fileInput.nextElementSibling; // Get the next sibling, which is the label element

        if (fileInput.files.length > 0) {
            setSelectedFileName(fileInput.files[0].name);
        } else {
            setSelectedFileName('Choose Audio File (.wav)');
        }
    };

    const displayClassificationResult = () => {
        console.log('Received classification data:', classificationData);

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
            return null; // Don't display anything if predictions are not available yet
        }

        const sortedKeys = Object.keys(classificationData.predictions).sort(
            (a, b) => classificationData.predictions[b] - classificationData.predictions[a]
        );

        return (
            <div className="result-container">
                <h3>Classification Result:</h3>
                <div className="card">
                    <div className="card-body">
                        {sortedKeys.map((key) => (
                            <>
                                <div className="mb-2" key={key}>
                                    <p>
                                        {key}: {(classificationData.predictions[key] * 100).toFixed(2)}%
                                    </p>
                                </div>
                            </>
                        ))}
                    </div>
                    <div>
                    <img src={`data:image/png;base64, ${classificationData.base64_image}`} alt="Classification" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='container-main'>
            <div className="grid-container">
                <div className="audio-upload-container">
                    <h4> Choose Your Desired Audio For Classification </h4>
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="audioFile" data-file-name={selectedFileName}>
                                {selectedFileName}
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
                            <button type="submit" className="button-choose">
                                Classify
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {resultVisible && displayClassificationResult()}

            

        </div>
    );
};

export default AudioClassification;
