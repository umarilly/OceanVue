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

        const layout = { yaxis: { title: 'Percentage' }, xaxis: { title: 'Ships' } };

        return (

            <div className='AudioClassificationResult'>

                <div className='audioClassificationResultHead'>

                    <div className='audioClassificationResultHeadFirst' >
                        <h1 className='classificationResultHeading' > Classification Results </h1>

                        <div className='classificationResultResult' >

                            <div className='classificationResultText' >
                                <div>
                                    <div >
                                        <h3>{mostSimilarCategory}</h3>
                                        <div className="py-1 flex items-center">
                                            <progress className="progress w-56 mr-3" value={(classificationData.predictions[mostSimilarCategory] * 100).toFixed(2)} max="100"></progress>
                                            {(classificationData.predictions[mostSimilarCategory] * 100).toFixed(2)}%
                                        </div>
                                    </div>

                                    {otherCategories.map((key) => (
                                        <div key={key}>
                                            <h3>{key}</h3>
                                            <div className="py-1 flex items-center">
                                                <progress className="progress w-56 mr-3" value={(classificationData.predictions[key] * 100).toFixed(2)} max="100"></progress>
                                                {(classificationData.predictions[key] * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='classificationResultText' >
                                <h1> The sound is of ship {mostSimilarCategory}  </h1>
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
                                    jfwejkbfjkewbfje
                                </div>
                            </div>

                        </div>

                        <div className='audioClassificationMainPythonCharts-div1' >

                            <div>
                                <h2 className='classificationResultHeadingPythonCharts' > Spectogram </h2>
                            </div>

                            <div className='audioClassificationMainPythonChartsMelspec' >
                                <div className='audioClassificationMainPythonChartsMelspec2' >
                                    jfwejkbfjkewbfje
                                </div>
                                <div className='audioClassificationMainPythonChartsMelspec1' >
                                    <img src={`data:image/png;base64, ${classificationData.base64_spectogram}`} alt="Classification" />
                                </div>

                            </div>

                        </div>

                        <div className='audioClassificationMainPythonCharts-div1' >
                            <div>
                                <h2 className='classificationResultHeadingPythonCharts' > Waveform </h2>
                            </div>

                            <div className='audioClassificationMainPythonChartsMelspec' >

                                <div className='audioClassificationMainPythonChartsMelspec1' >
                                    <img src={`data:image/png;base64, ${classificationData.base64_waveform}`} alt="Classification" />
                                </div>

                                <div className='audioClassificationMainPythonChartsMelspec2' >
                                    jfwejkbfjkewbfje
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