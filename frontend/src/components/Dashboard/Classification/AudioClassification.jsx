

import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';

const AudioClassification = () => {
    const [resultVisible, setResultVisible] = useState(false);
    const [classificationData, setClassificationData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://10.97.8.112:8088/', {
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

        const sortedKeys = Object.keys(classificationData).sort(
            (a, b) => classificationData[b] - classificationData[a]
        );

        return (
            <Box mt={4}>
                <Typography variant="h6">Classification Result:</Typography>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Grid container spacing={2}>
                        {sortedKeys.map((key) => (
                            <Grid item xs={6} key={key}>
                                <Paper elevation={0} variant="outlined" style={{ padding: '8px' }}>
                                    {key}: {(classificationData[key] * 100).toFixed(2)}%
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        );
    };

    return (
        <Container maxWidth="md" mt={5}>
            <Typography variant="h4" align="center" gutterBottom>
                Audio Classification
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-center">
                <Box mb={3}>
                    <Typography variant="subtitle1">Select an audio file (.wav)</Typography>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="audioFile" name="file" accept=".wav" required />
                        <label className="custom-file-label" htmlFor="audioFile">
                            Choose file
                        </label>
                    </div>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Classify
                </Button>
            </form>
            {resultVisible && displayClassificationResult()}
        </Container>
    );
};

export default AudioClassification;
