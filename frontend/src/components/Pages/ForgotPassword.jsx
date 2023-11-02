import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth, db } from '../../Firebase'; // Make sure to import the 'db' object from Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import '../../styles/ForgotPassword.css';
import mainLogo from '../../images/main-logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State for the new password
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

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
    
        try {
            const usersRef = db.collection('Users');
            const querySnapshot = await usersRef.where('email', '==', email).get();
            console.log(querySnapshot)
    
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    const docId = doc.id;
                    console.log(docId);
                    await usersRef.doc(docId).update({
                        password: newPassword,
                    });
                });
                setSuccessMessage('Password updated successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage('User not found. Please check the email address.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Error updating password. Please try again.');
            setSuccessMessage('');
        }
    };
    
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    return (
        <>
            <div className='forgetpass-container forgetpass-1'>
                <RouterLink to="/"><img src={mainLogo} alt="Ocean Vue" /></RouterLink>
            </div>

            <div className="forgot-password-container">
                <div className="forgot-password-form">
                    <h2>Forgot Password</h2>
                    {successMessage ? (
                        <form onSubmit={handleUpdatePassword}>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    required
                                />
                            </div>
                            <button type="submit">Update Password</button>
                        </form>
                    ) : (
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
                    )}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <RouterLink to="/login">Back to Login</RouterLink>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
