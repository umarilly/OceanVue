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
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
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
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mainAbout3' >
                        <div className='mainAbout3Box1' >
                            <h1 className='mainAbout3Box1Heading' > Working Mechanism </h1>
                            <div className='mainAbout3Box1Content'>
                            <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus minus, veritatis enim obcaecati facilis reiciendis voluptatum expedita provident sequi, ipsum modi praesentium odio quibusdam non laborum sed. Iure, similique?
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
