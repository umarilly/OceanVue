
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';

import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <>
        <Provider store={store} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={< Home />} />
                    <Route path="/login" element={< Login />} />
                    <Route path="/signup" element={< Signup />} />
                </Routes>
            </BrowserRouter>
        </Provider>
        </>
    );
};

export default App;
