
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../../styles/ForgotPassword.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Password reset email sent. Check your inbox!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error sending reset email. Please check your email address.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <RouterLink to="/login">Back to Login</RouterLink>
            </div>
        </div>
    );
};

export default ForgotPassword;
