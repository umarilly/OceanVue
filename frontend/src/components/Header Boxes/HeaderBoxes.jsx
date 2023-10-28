
// Importing React
import React from 'react';
// Importing the CSS files - Style Files
import '../../styles/HeaderBoxes.css';
// Importing the Images files - Images Files
import box1pic from '../../images/box-pic-1.png';
import box2pic from '../../images/box-pic-2.png';
import box3pic from '../../images/box-pic-3.png';

const HeaderBoxes = () => {

    return (
        <>
            <div className = "header-boxes">

                <div className = "header-boxes-box1" >
                    <div className = "header-boxes-box1-subbox1" > 
                        <div className = "header-boxes-box1-subbox1-div1" >
                            <img src = {box1pic} alt = "Analytics" />
                        </div>
                        <div className = "header-boxes-box1-subbox1-div2" >
                            <h3> Analytics </h3>
                        </div>
                        <div className = "header-boxes-box1-subbox1-div3" > </div>
                        <div className = "header-boxes-box1-subbox1-div4" >
                        The gradual accumulation of information about atomic and small-scale behaviour...
                        </div>
                    </div>
                </div>

                <div className = "header-boxes-box2" >
                    <div className = "header-boxes-box2-subbox2" > 
                        <div className = "header-boxes-box2-subbox2-div1" >
                            <img src = {box2pic} alt = "Analytics" />
                        </div>
                        <div className = "header-boxes-box2-subbox2-div2" >
                            <h3> Batch Processing </h3>
                        </div>
                        <div className = "header-boxes-box2-subbox2-div3" > </div>
                        <div className = "header-boxes-box2-subbox2-div4" >
                        The gradual accumulation of information about atomic and small-scale behaviour...
                        </div>
                    </div>
                </div>

                <div className = "header-boxes-box3" >
                    <div className = "header-boxes-box3-subbox3" > 
                        <div className = "header-boxes-box3-subbox3-div1" >
                            <img src = {box3pic} alt = "Analytics" />
                        </div>
                        <div className = "header-boxes-box3-subbox3-div2" >
                            <h3> Reports Generation </h3>
                        </div>
                        <div className = "header-boxes-box3-subbox3-div3" > </div>
                        <div className = "header-boxes-box3-subbox3-div4" >
                        The gradual accumulation of information about atomic and small-scale behaviour...
                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}

export default HeaderBoxes;