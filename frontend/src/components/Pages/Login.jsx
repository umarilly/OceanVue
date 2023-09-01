
import React from 'react';
import { useState } from 'react';
import { Link as RouterLink , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

// CSS Files
import '../../styles/Login.css';
// Images
import mainLogo from '../../images/main-logo.png';
import Lock from '../../images/lock.png';
import Message from '../../images/message.png';

const Login = ( { login } ) => {

    const [formData , setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email , password } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault();
        
        login(email,password)
    }

    // Is the user authenticated
    // Redirect to Home

    return (
        <>
            <div className='login-container' >

                <div className='login-container-box1' >
                    <div className='login-container-box1-img'>
                        <RouterLink to="/"><img src={mainLogo} alt="Ocean Vue" /></RouterLink>
                    </div>
                </div>

                <div className='login-container-box2' >
                    <div className='login-container-box2-sub' >

                        <div className='login-container-box2-heading' >
                            <h2> Welcome Back </h2>
                        </div>

                        <div className='login-container-box2-form' >
                            <form onSubmit={e => onSubmit(e)} >
                                <div className='form-group-login'>
                                    <label htmlFor='input1' className='form-label-login'>Email</label>
                                    <div className='outer-input-class'>
                                        <div className='img-box-login' > <img src={Message} alt="" /> </div>
                                        <input 
                                            type='email' 
                                            value = {email} 
                                            className='form-input-login' 
                                            id='input1' 
                                            name='input1' 
                                            placeholder='Please write a valid Email' 
                                            onChange={e => onChange(e)} 
                                            required
                                            />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='input2' className='form-label'>Password</label>
                                    <div className='outer-input-class'>
                                        <div className='img-box' > <img src={Lock} alt="" /> </div>
                                        <input 
                                            type='password' 
                                            className='form-input-login' 
                                            value = {password} 
                                            id='input2' 
                                            name='input2' 
                                            placeholder='Please write your password' 
                                            onChange={e => onChange(e)} 
                                            required
                                            />
                                    </div>
                                </div>
                                <div className='pre-btn-login' >
                                    <button type='submit' className='form-button-login'> Log In </button>
                                </div>
                            </form>
                        </div>

                        <div className='login-container-box2-or' >
                            <h3> OR </h3>
                        </div>

                        <div className='login-container-box2-google' >
                                <button className='google-button-login'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M24.6725 12.7851C24.6736 11.9333 24.6011 11.083 24.4558 10.2435H12.5861V15.0575H19.3845C19.2454 15.8264 18.9509 16.5593 18.5189 17.2121C18.0869 17.8649 17.5262 18.4241 16.8707 18.8559V21.9808H20.9281C23.3038 19.8055 24.6725 16.5887 24.6725 12.7851Z" fill="#4285F4" />
                                        <path d="M12.586 25C15.9826 25 18.8425 23.8924 20.928 21.9828L16.8706 18.858C15.7414 19.6183 14.2869 20.0523 12.586 20.0523C9.30302 20.0523 6.51652 17.8545 5.52009 14.8929H1.34033V18.1132C2.38792 20.1834 3.99429 21.9237 5.98009 23.1398C7.96589 24.3558 10.253 24.9999 12.586 25Z" fill="#34A853" />
                                        <path d="M5.51999 14.8924C4.99322 13.3405 4.99322 11.6599 5.51999 10.108V6.88763H1.34024C0.458965 8.62913 0 10.5512 0 12.5002C0 14.4492 0.458965 16.3713 1.34024 18.1128L5.51999 14.8924Z" fill="#FBBC04" />
                                        <path d="M12.586 4.94849C14.3809 4.91936 16.1153 5.59286 17.4143 6.82339L21.0067 3.25586C18.7287 1.1311 15.711 -0.0354265 12.586 0.000820075C10.253 0.000925669 7.96589 0.64498 5.98009 1.86108C3.99429 3.07718 2.38792 4.81745 1.34033 6.88762L5.52009 10.1079C6.51652 7.14629 9.30302 4.94849 12.586 4.94849Z" fill="#EA4335" />
                                    </svg>
                                    <span> Sign Up with Google </span> 
                                </button>
                        </div>

                        <div className='login-container-box2-borderbottom' >
                        </div>

                        <div className='login-container-box2-already' >
                            <div className='Extra-out-google-btn-login' >
                                <div className='text-for-already-account-login'> <p> `Don't have an account ? `</p> </div>
                                <div className="already-account-login" >
                                    <RouterLink to="/signup">
                                        <button>
                                            Sign Up
                                        </button>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

// const mapStateToProps = state => ({
//     Is authenticated
// });

// export default Login;
export default connect(null , {login})(Login);
