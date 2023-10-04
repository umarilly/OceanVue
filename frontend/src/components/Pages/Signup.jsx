import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';
import { auth, checkIfEmailExists, db } from '../../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import zxcvbn from 'zxcvbn';
import '../../styles/Signup.css';
import mainLogo from '../../images/main-logo.png';
import signupImg from '../../images/signup-img.png';
import Lock from '../../images/lock.png';
import Message from '../../images/message.png';
import Profile from '../../images/profile.png';

const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
        // Sign in with Google provider to get user information
        const result = await signInWithPopup(auth, provider);

        // Check if the user already exists with the same email
        const emailExists = await checkIfEmailExists(result.user.email);

        if (emailExists) {
            // User already exists, show a message or take appropriate action
            console.log('User already exists with this email.');
            // You can also sign in the user here if they already have an account
            await signInWithEmailAndPassword(auth, result.user.email, 'password'); // Use a temporary password or another mechanism
        } else {
            // User doesn't exist, proceed with sign-up logic
            // You can create a new account with the Google user information here if needed
            console.log('User signed up with Google:', result.user);
        }
    } catch (error) {
        // Handle sign-up error
        console.error('Google sign-up error:', error);
    }
};


const Signup = () => {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        Username: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (password) => {
        const result = zxcvbn(password);
        return result.score;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMsg('');

        if (name === 'Password') {
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    const handleSubmission = async (event) => {
        event.preventDefault();
    
        if (!formValues.Username || !formValues.Email || !formValues.Password) {
            setErrorMsg("Please fill in all the required fields.");
        } else if (formValues.Password !== formValues.ConfirmPassword) {
            setErrorMsg("Passwords do not match.");
        } else {
            const strength = checkPasswordStrength(formValues.Password);
            if (strength < 3) {
                setErrorMsg("Password is too weak. Please choose a stronger password.");
            } else {
                try {
                    // Create the user with email and password
                    const userCredential = await createUserWithEmailAndPassword(auth, formValues.Email, formValues.Password);
    
                    // Set the user's display name
                    await updateProfile(userCredential.user, { displayName: formValues.Username });
    
                    // Create a user document in Firestore
                    const userDocRef = doc(db, 'Users', userCredential.user.uid);
                    const userData = {
                        username: formValues.Username,
                        email: formValues.Email,
                        password: formValues.Password,

                    };
                    await setDoc(userDocRef, userData);
    
                    // Clear form values
                    setFormValues({
                        Username: "",
                        Email: "",
                        Password: "",
                        ConfirmPassword: "",
                    });
    
                    navigate('/');
                } catch (error) {
                    setErrorMsg(error.message);
                }
            }
        }
    };
    


    return (
        <div className='signup-container' >
            <div className='signup-container-left'>
                <div className='left-1'>
                    <RouterLink to="/"><img src={mainLogo} alt="Ocean Vue" /></RouterLink>
                </div>
                <div className='left-2'> <img src={signupImg} alt="Ocean Vue" /> </div>
                <div className='left-3'>
                    <RouterLink to="/">
                        <button className="left-3-btn" >
                            Back To Home
                        </button>
                    </RouterLink>
                </div>
            </div>

            <div className='signup-container-right'>
                <div className='signup-container-right-sub'>

                    <div className='signup-heading' >
                        <h1> Create Account </h1>
                    </div>

                    <form className='signup-form' onSubmit={handleSubmission}>

                        <div className='form-group'>
                            <label htmlFor='input1' className='form-label'>Name</label>
                            <div className='outside-form-input'>
                                <div className='img-box' > <img src={Profile} alt="" /> </div>
                                <input
                                    type='text'
                                    className='form-input'
                                    id='input1'
                                    name='Username'
                                    placeholder='Please Enter your name'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='input2' className='form-label'>Email</label>
                            <div className='outside-form-input'>
                                <div className='img-box' > <img src={Message} alt="" /> </div>
                                <input
                                    type='email'
                                    className='form-input'
                                    id='input2'
                                    name='Email'
                                    placeholder='Please write a valid Email'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='input3' className='form-label'>Password</label>
                            <div className='outside-form-input'>
                                <div className='img-box' > <img src={Lock} alt="" /> </div>
                                <input
                                    type='password'
                                    className='form-input'
                                    id='input3'
                                    name='Password'
                                    placeholder='Please write your password'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            {formValues.Password && (
                                <div className='password-strength'>
                                    <div className={`password-strength-meter strength-${passwordStrength}`}></div>
                                </div>
                            )}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='input4' className='form-label'>Re-Write Password</label>
                            <div className='outside-form-input'>
                                <div className='img-box' > <img src={Lock} alt="" /> </div>
                                <input
                                    type='password'
                                    className='form-input'
                                    id='input4'
                                    name='ConfirmPassword'
                                    placeholder='Please re-write your password'
                                    value={formValues.ConfirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>
                        <div>
                            <div>
                                <h4> {errorMsg} </h4>
                            </div>
                        </div>
                        <div className='pre-btn-signup' >
                            <button
                                type='submit'
                                className='form-button'
                            > Sign Up
                            </button>
                        </div>
                    </form>

                    <div className='outer-form' >
                        <h3 style={{ color: 'black', margin: '10px 30px 30px 30px' }}> OR </h3>
                        <div className='div-for-google-btn' >
                            <button className='google-button' onClick={handleGoogleSignUp}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M24.6725 12.7851C24.6736 11.9333 24.6011 11.083 24.4558 10.2435H12.5861V15.0575H19.3845C19.2454 15.8264 18.9509 16.5593 18.5189 17.2121C18.0869 17.8649 17.5262 18.4241 16.8707 18.8559V21.9808H20.9281C23.3038 19.8055 24.6725 16.5887 24.6725 12.7851Z" fill="#4285F4" />
                                    <path d="M12.586 25C15.9826 25 18.8425 23.8924 20.928 21.9828L16.8706 18.858C15.7414 19.6183 14.2869 20.0523 12.586 20.0523C9.30302 20.0523 6.51652 17.8545 5.52009 14.8929H1.34033V18.1132C2.38792 20.1834 3.99429 21.9237 5.98009 23.1398C7.96589 24.3558 10.253 24.9999 12.586 25Z" fill="#34A853" />
                                    <path d="M5.51999 14.8924C4.99322 13.3405 4.99322 11.6599 5.51999 10.108V6.88763H1.34024C0.458965 8.62913 0 10.5512 0 12.5002C0 14.4492 0.458965 16.3713 1.34024 18.1128L5.51999 14.8924Z" fill="#FBBC04" />
                                    <path d="M12.586 4.94849C14.3809 4.91936 16.1153 5.59286 17.4143 6.82339L21.0067 3.25586C18.7287 1.1311 15.711 -0.0354265 12.586 0.000820075C10.253 0.000925669 7.96589 0.64498 5.98009 1.86108C3.99429 3.07718 2.38792 4.81745 1.34033 6.88762L5.52009 10.1079C6.51652 7.14629 9.30302 4.94849 12.586 4.94849Z" fill="#EA4335" />
                                </svg>
                                Sign Up with Google
                            </button>
                        </div>

                        <div className='Extra-out-google-btn' >
                            <p className='text-for-already-account'> `Already have an account ? `</p>
                            <div className="already-account" >
                                <RouterLink to="/login">
                                    <button>
                                        Log In
                                    </button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup



