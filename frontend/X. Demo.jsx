import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './audio.css';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';



const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('Choose Audio File (.wav)');
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Form Data:', formData);

        setLoading(true); // Set loading to true when starting the classification process

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
            } finally {
                setLoading(false); // Set loading to false after the classification process completes
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
                                    <h1 style={{ fontSize: '20px', marginTop: '10px', marginBottom: '5px' }} > The sound is classify as following ship  </h1>
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

                        <div className='audioClassificationMainPythonCharts-div1' >

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

                        <div className='audioClassificationMainPythonCharts-div1' >
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
                    <div >
                        <div className='loadingScreen'  > <progress className="progress"> </progress> </div>  
                    </div>
                    <div style={{ textAlign : 'center' }} > <p> Classifying </p> </div> 
                </div>
            ) : null}

            {resultVisible && displayClassificationResult()}
        </>
    );
};

export default AudioClassification;
