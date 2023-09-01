
// Importing React
import React from 'react';
// Importing the CSS files - Style Files
import '../../styles/Header.css';
// Importing the Images files - Images Files
import mainHeaderImg from '../../images/main-header-img.png';

const Header = () => {

    return (
        <header className = "main-header" > 

            <div className = "main-header-box1" >
                <div className = "main-header-box1-div1" > <h1> Ocean Vue </h1> </div>
                <div className = "main-header-box1-div2" > 
                    <p> 
                    Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability. Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability.
                    </p> 
                </div>
                <div className = "main-header-box1-div3" > 
                    <p> 
                    Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability. Remember to test your changes across different devices and browsers to ensure that the "Raleway" font is displaying as expected and maintaining readability.
                    </p> 
                </div>
                <div className = "main-header-box1-div4" > 
                    <button className = "main-header-box1-div4-btn1"> Get Started </button>
                    <button className = "main-header-box1-div4-btn2"> Log In </button>
                </div>
            </div>

            <div className = "main-header-box2" >
                <img 
                    src={mainHeaderImg} 
                    alt="Ocean Vue" 
                />
            </div>

        </header>
    );

}

export default Header;