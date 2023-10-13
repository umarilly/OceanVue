import React, { useState } from 'react';
import './audio.css'

const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://localhost:8088/', {
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
            <div className="mt-4">
                <h6>Classification Result:</h6>
                <div className="card">
                    <div className="card-body">
                        {sortedKeys.map((key) => (
                            <div className="mb-2" key={key}>
                                <p>
                                    {key}: {(classificationData.predictions[key] * 100).toFixed(2)}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                
            </div>
        );
    };

    // Add this code within your component function
    const handleFileInputChange = (event) => {
        const fileInput = event.target;
        const customLabel = fileInput.nextElementSibling; // Get the next sibling, which is the label element
    
        if (fileInput.files.length > 0) {
        customLabel.setAttribute('data-file-name', fileInput.files[0].name);
        } else {
        customLabel.setAttribute('data-file-name', 'No file chosen');
        }
    };
    
    // Add this as the onChange handler for the file input element
    
  

    return (
        <>
        <div className='grid-container'>
            <div className="audio-upload-container">
                <h4 className="text-center">Audio Classification</h4>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="">
                <div className="mb-3">
                    <p>Select an audio file (.wav)</p>
                    <div className="custom-file">
                    <input type="file" className="custom-file-input" id="audioFile" name="file" accept=".wav" required />
                    <label className="" htmlFor="audioFile" data-file-name="No file chosen">
                        
                    </label>
                    </div>
                </div>
                <button type="submit" className="">
                    Classify
                </button>
                </form>
            </div>
            <div className="result-display-container">
                {resultVisible && displayClassificationResult()}
            </div>
            </div>
            <div>
                {/* Display the image */}
                <img src={`data:image/png;base64, ${classificationData.base64_image}`} alt="Classification" />
            </div>
        </>

    );
};

export default AudioClassification;