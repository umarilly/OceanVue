
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import ForgotPassword from './components/Pages/ForgotPassword';

import Dashboard from './components/Pages/Dashboard Pages/1. Dashboard - Home/Dashboard';
import ClassifyShip from './components/Pages/Dashboard Pages/2. Dashboard - Classify Ship/ClassifyShip';
import UserProfile from './components/Pages/Dashboard Pages/3. Dashboard - User Profile/UserProfile';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={< Home />} />
                    <Route path="/login" element={< Login />} />
                    <Route path="/signup" element={< Signup />} />
                    <Route path="/forgotpassword" element={< ForgotPassword />} />
                    <Route path="/dashboard" element={< Dashboard />} />
                    <Route path="/userProfile" element={< UserProfile />} />
                    <Route path="/classifyship" element={< ClassifyShip />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
