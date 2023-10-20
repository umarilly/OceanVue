import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './audio.css';

const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('Choose Audio File (.wav)');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Form Data:', formData);

        const addresses = ['http://localhost:8088/'];
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

        const layout = { title: 'Classification Results', yaxis: { title: 'Percentage' } };

        return (

            <div className='AudioClassificationResult'>

                <div className='audioClassificationResultHead'>

                    <div className='audioClassificationResultHeadFirst' >
                        <h1 className='classificationResultHeading-1' > Classification Results </h1>
                        <div className='classificationResultText' >
                            <div>
                                <div >
                                    <h3>{mostSimilarCategory}</h3>
                                    <p>{(classificationData.predictions[mostSimilarCategory] * 100).toFixed(2)}%</p>
                                </div>

                                {otherCategories.map((key) => (
                                    <div key={key}>
                                        <h3>{key}</h3>
                                        <p>{(classificationData.predictions[key] * 100).toFixed(2)}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='classificationResultHeading' >Mel Spectogram </h2>
                        <img src={`data:image/png;base64, ${classificationData.base64_image}`} alt="Classification" />
                        <h2 className='classificationResultHeading' >Spectogram</h2>
                        <img src={`data:image/png;base64, ${classificationData.base64_spectogram}`} alt="Classification" />
                        <h2 className='classificationResultHeading' >Waveform</h2>
                        <img src={`data:image/png;base64, ${classificationData.base64_waveform}`} alt="Classification" />
                    </div>

                    <div>
                        <h3 className='classificationResultHeading-1' >Classification Bar Chart</h3>
                        <Plot data={barChartData} layout={layout} />
                    </div>
                    <div>
                        <h3>Classification Pie Chart</h3>
                        <Plot data={pieChartData} layout={layout} />
                    </div>
                    <div>
                        <h3>Classification Line Chart</h3>
                        <Plot data={lineChartData} layout={layout} />
                    </div>
                    <div>
                        <h3>Classification Scatter Plot</h3>
                        <Plot data={scatterPlotData} layout={layout} />
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
                </div>
            </div>
            {resultVisible && displayClassificationResult()}
        </>

    );
};

export default AudioClassification;
