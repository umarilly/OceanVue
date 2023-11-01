import React from 'react';
import './Widgets.scss';
import ClassIcon from '@mui/icons-material/Class';

const Widgets = () => {
    return (
        <>

            <div className='widget' >

                <div className="left2">
                    <div className="title"> CLASSIFICATION </div>
                    <div className="counter">
                        User can classify between four types of ships which are passenger, tug, cargo and tanker ship
                    </div>


                </div>

                <div className="right">
                    <div className="percentange">
                        < ClassIcon className='icon' />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Widgets
