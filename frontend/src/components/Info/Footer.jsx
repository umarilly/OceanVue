
import React from 'react';
import './Footer.css';
import mainLogo from '../../images/main-logo.png';

const Footer = () => {

    return (
        <>
            <div className='mainFooter'>

                <footer className="footer p-10">

                    <aside className='fotterAside' >
                        <img src = {mainLogo} alt="Ocean Vue" />
                        <p> Acostic Signature Ships Classification </p>
                    </aside>

                    <nav>
                        <header className="footer-title"> Services </header>
                        <h1> Branding </h1>
                        <h1> Design</h1>
                        <h1> Marketing</h1>
                        <h1> Advertisement</h1>
                    </nav>

                    <nav>
                        <header className="footer-title"> Company </header>
                        <h1> Branding </h1>
                        <h1> Design</h1>
                        <h1> Marketing</h1>
                        <h1> Advertisement</h1>
                    </nav>

                    <nav>
                        <header className="footer-title"> Legal </header>
                        <h1> Branding </h1>
                        <h1> Design</h1>
                        <h1> Marketing</h1>
                        <h1> Advertisement</h1>
                    </nav>
                </footer>

            </div>
        </>
    )
}

export default Footer;
