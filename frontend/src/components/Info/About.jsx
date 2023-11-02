import React from 'react';
import './About.css';
import ImgOne from '../../images/aboutBox1.png';
import ImgTwo from '../../images/aboutBox2.png';
import ImgThree from '../../images/aboutBox3.png';

const About = () => {

    return (
        <>
            <div id="about" >
                <div className='mainAbout' >

                    <div className='mainAbout1' >
                        <div className='mainAbout1Box1' >
                            <h1 className='mainAbout1Box1Heading' > Acoustic Analysis </h1>
                            <div className='mainAbout1Box1Content'>
                                <div>
                                    Acoustic analysis employs advanced signal processing to extract valuable insights from sound waves, enabling accurate classification and identification of sound sources in diverse applications.
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Through the integration of cutting-edge algorithms, acoustic analysis facilitates precise pattern recognition, contributing to improved diagnostics in fields such as speech recognition, music analysis, and environmental monitoring.
                                </div>
                            </div>
                        </div>
                        <div className='mainAbout1Box2' >
                            <img src={ImgOne} alt="Ocean Vue" />
                        </div>
                    </div>

                    <div className='mainAbout2' >
                        <div className='mainAbout2Box2' >
                            <img src={ImgTwo} alt="Ocean Vue" />
                        </div>
                        <div className='mainAbout2Box1' >
                            <h1 className='mainAbout2Box1Heading' > Working Mechanism </h1>
                            <div className='mainAbout2Box1Content'>
                                <div>
                                    Ocean Vue employs advanced signal processing and machine learning techniques for precise ship acoustic analysis. By integrating noise reduction and feature extraction, it accurately classifies ship types and provides detailed frequency analysis and classification data.
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Featuring a user-friendly interface, 'Ocean Vue' facilitates seamless processing of ship acoustic files. Its streamlined queue management optimizes processing based on infrastructure capabilities, while comprehensive in-app documentation guides users through the upload process and aids in result interpretation, ensuring efficient and accurate ship identification.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mainAbout3' >
                        <div className='mainAbout3Box1' >
                            <h1 className='mainAbout3Box1Heading' > Application Workflow </h1>
                            <div className='mainAbout3Box1Content'>
                                <div>
                                    OceanVue, developed using React.js, Python, Flask, and Firebase, enables users to upload ship acoustic recordings for classification. The application utilizes a ResNet 50 Deep Learning model for precise ship classification.
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Upon accessing the home page, users can sign up or log in, with options for email or Google authentication. The dashboard presents various features, including ship classification, profile updates, logout, and a history section for reviewing past classification reports.
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    In the ship classification section, users can upload ship acoustic signature files, initiate the classification process, and view generated visual and analytical reports on the webpage. The reports are also stored in the database as PDFs for future reference.
                                </div>
                            </div>
                        </div>
                        <div className='mainAbout3Box2' >
                            <img src={ImgThree} alt="Ocean Vue" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
