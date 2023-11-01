import React from 'react';
import './Widgets.scss';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Widgets2 = () => {
    return (
        <>

            <div className='widget' >

                <div className="left2"> 
                    <div className="title"> VISUALIZATION </div>
                    <div className="counter">
                        OceanVue offers comprehensive data visualization and analysis for an insightful understanding of results.
                    </div>

                </div>

                <div className="right">
                    <div className="percentange">
                        < AnalyticsIcon className='icon' />
                    </div>
                </div>
                
            </div>

        </>
    )
}

export default Widgets2;
