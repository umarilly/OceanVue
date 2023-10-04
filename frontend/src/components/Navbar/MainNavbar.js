import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { auth , db} from '../../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

import '../../styles/MainNavbar.css';

import mainLogo from '../../images/main-logo.png';

const MainNavbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(''); // State to store the username
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                // Fetch and set the username from Firestore when the user is logged in
                fetchUsername(user.uid);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleDashboard = async () => {
        navigate('/dashboard');
    };

    const fetchUsername = async (userId) => {
        // Reference to the user document in Firestore
        const userDocRef = doc(db, 'Users', userId);

        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // Set the username from Firestore
                setUsername(userData.username);
            } else {
                // Handle the case where the user document doesn't exist
                console.error('No User Data Exists');
            }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    return (
        <nav className={`main-nav ${showMobileMenu ? 'show' : 'hide'}`}>
            <div className="main-nav-logo">
                <RouterLink to="/">
                    <img src={mainLogo} alt="Ocean Vue" />
                </RouterLink>
            </div>

            <div className={`main-nav-link ${showMobileMenu ? 'show' : 'hide'}`}>
                <ul>
                    <li>
                        <RouterLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
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

            <div className={`main-nav-log-sign ${showMobileMenu ? 'show' : 'hide'} `}>
                {user ? (
                    <>
                        <button className="main-nav-logout" onClick={handleLogout}>
                            Logout
                        </button>
                        <span className="ret-username-main">
                            <span onClick={handleDashboard} className="main-nav-username">
                                {username}
                            </span>
                        </span>
                    </>
                ) : (
                    <>
                        <RouterLink to="/login">
                            <button className="main-nav-login">Log In</button>
                        </RouterLink>
                        <RouterLink to="/signup">
                            <button className="main-nav-signup">Sign Up</button>
                        </RouterLink>
                    </>
                )}
            </div>

            <div onClick={toggleMobileMenu} className="toggle-btn-main-nav">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
        </nav>
    );
};

export default MainNavbar;
