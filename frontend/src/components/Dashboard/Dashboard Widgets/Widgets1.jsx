import React from 'react';
import './Widgets.scss';
import SearchIcon from '@mui/icons-material/Search';

const Widgets1 = () => {
    return (
        <>

            <div className='widget' >

                <div className="left2"> 
                    <div className="title"> REPORTING </div>
                    <div className="counter"> 
                    OceanVue ensures reporting for all the analysis and visuals, delivering clear insights and actionable results.
                    </div>
                </div>

                <div className="right">
                    <div className="percentange">
                        < SearchIcon className='icon' />
                    </div>
                </div>
                
            </div>

        </>
    )
}

export default Widgets1;
