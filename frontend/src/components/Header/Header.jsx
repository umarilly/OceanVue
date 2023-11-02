import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth , db } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import '../../styles/Header.css';
import mainHeaderImg from '../../images/main-header-img.png';

const Header = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(''); // State to store the username

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
        <header className="main-header">
            <div className="main-header-box1">
                <div className="main-header-box1-div1">
                    <h1> Ocean Vue </h1>
                </div>
                <div className="main-header-box1-div2">
                    <p>
                        OceanVue is a web based acoustic signature classifcation platform. This platform is build using a dataset of four different classes and trained using Resnet 50. User will upload any audio file of the ship shound, and the algorithm will classify the ship type
                    </p>
                </div>

                <div className="main-header-box1-div4">
                    {user ? (
                        <>
                            <RouterLink to="/Dashboard">
                                <button className="main-header-box1-div4-btn2">
                                    Welcome to Ocean Vue, <b>{username}</b>
                                </button>
                            </RouterLink>
                        </>
                    ) : (
                        <>
                            <RouterLink to="/signup">
                                <button className="main-header-box1-div4-btn1">Get Started</button>
                            </RouterLink>

                            <RouterLink to="/login">
                                <button className="main-header-box1-div4-btn2">Log In</button>
                            </RouterLink>
                        </>
                    )}
                </div>
            </div>

            <div className="main-header-box2">
                <img src={mainHeaderImg} alt="Ocean Vue" />
            </div>
        </header>
    );
};

export default Header;
