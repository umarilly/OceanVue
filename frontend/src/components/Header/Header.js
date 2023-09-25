
import React, { useState, useEffect } from 'react';
import { Link as RouterLink,  useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../../styles/Header.css';
import mainHeaderImg from '../../images/main-header-img.png';

const Header = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <header className="main-header" >

            <div className="main-header-box1" >
                <div className="main-header-box1-div1" > <h1> Ocean Vue </h1> </div>
                <div className="main-header-box1-div2" >
                    <p>
                        Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability. Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability.
                    </p>
                </div>
                <div className="main-header-box1-div3" >
                    <p>
                        Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability. Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability.
                    </p>
                </div>

                <div className="main-header-box1-div4">
                    { user ? (
                        <>
                            <RouterLink to="/Dashboard">
                                <button className="main-header-box1-div4-btn2"> Welcome to Ocean Vue , <b>  {user.displayName} </b> </button>
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

            <div className="main-header-box2" >
                <img
                    src={mainHeaderImg}
                    alt="Ocean Vue"
                />
            </div>

        </header>
    );

}

export default Header;