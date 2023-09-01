
// Importing React
import React from 'react';
// Importing States
import { useState } from 'react';
// Importing the CSS files - Style Files
import '../../styles/MainNavbar.css';
// Importing the Images files - Images Files
import mainLogo from '../../images/main-logo.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';


const MainNavbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <>
            <nav className={`main-nav ${showMobileMenu ? 'show' : 'hide'}`}>

                {/* Logo in the Main Navigation bar */}
                <div className="main-nav-logo">
                    <RouterLink to="/">
                        <img src={mainLogo} alt="Ocean Vue" />
                    </RouterLink>
                </div>

                {/* Nav Links in the Main Navigation bar */}
                <div className={`main-nav-link ${showMobileMenu ? 'show' : 'hide'}`}>
                    <ul>
                        <li>                        
                            <RouterLink to="/" style={{ textDecoration : 'none' , color : 'white' }}>
                                Home
                            </RouterLink> 
                        </li>
                        <li>                        
                            <ScrollLink to="about" smooth={true} duration={500}>
                                About Us
                            </ScrollLink> 
                        </li>                        
                        <li>                        
                            <ScrollLink to="contact" smooth={true} duration={500}>
                                Contact Us
                            </ScrollLink> 
                        </li>

                    </ul>
                </div>

                {/* Login & Signup Buttons in the Main Navigation bar */}
                <div className={`main-nav-log-sign ${showMobileMenu ? 'show' : 'hide'} `}>

                    <RouterLink to="/login"> 
                        <button className="main-nav-login" >
                            Log In 
                        </button>
                    </RouterLink>

                    <RouterLink to="/signup"> 
                        <button className="main-nav-signup" >
                            Sign Up 
                        </button>
                    </RouterLink>
                    
                </div>

                {/* Toggle Buttons in the Main Navigation bar */}
                <div onClick={toggleMobileMenu} className='toggle-btn-main-nav'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </div>

            </nav>
        </>
    );
};

export default MainNavbar;
