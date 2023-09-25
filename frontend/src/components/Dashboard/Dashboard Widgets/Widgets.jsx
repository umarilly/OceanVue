import React from 'react';
import './Widgets.scss';

const Widgets = () => {
    return (
        <>
            <div className='widget' >

                <div className="left"> 
                    <div className="title"> DATASET </div>
                    <div className="counter"> 2312 </div>
                    <div className="link"> 
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt quos voluptatem quam
                    </div>
                </div>

                <div className="right"> 
                    <div className="percentange">
                        20%
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Widgets
