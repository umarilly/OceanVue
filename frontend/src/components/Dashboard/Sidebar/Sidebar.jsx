
import React from 'react'
import "./Sidebar.scss"

import DashboardIcon from '@mui/icons-material/Dashboard';
import SailingIcon from '@mui/icons-material/Sailing';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import mainLogo from '../../../images/main-logo.png';
import mainLogoMbl from '../../../images/main-logo-mbl.png';

import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Firebase';
import { signOut } from 'firebase/auth';

function Dashboard() {

    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    const stayAtDashboard = () => {
        navigate('/dashboard');
    }

    const classifyShipPage = () => {
        navigate('/classifyship');
    }

    const userProfile = () => {
        navigate('/UserProfile');
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    return (
        <>
            <div className="sidebar">

                <div className="top">
                    <span className="logo">
                        <img src={mainLogo} alt="Ocean Vue" />
                    </span>
                </div>

                <hr></hr>

                <div className="center">
                    <ul>
                        <p className="title"> Main </p>
                        <li onClick={stayAtDashboard} >
                            <DashboardIcon className='icon' />
                            <span>
                                Dashboard
                            </span>
                        </li>
                        <p className="title"> Classify </p>
                        <li onClick={classifyShipPage} >
                            <SailingIcon className='icon' />
                            <span>
                                Classify Ship
                            </span>
                        </li>

                        <p className="title"> User </p>
                        <li onClick={userProfile} >
                            <PersonIcon className='icon' />
                            <span>
                                Profile
                            </span>
                        </li>

                        <li onClick={handleLogout} >
                            <LogoutIcon className='icon' />
                            <span>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="bottom">
                    <span className="bottomBackToHome-inner">
                        <button onClick={backToHome}>
                            <div className='iconStyle' ><HomeIcon />  </div>
                            <div className='btnStyle' >Back to Home  </div>
                        </button>
                    </span>
                </div>

            </div>


            <div className="sidebarMobile">

                <div className="topMbl">
                    <span className="logoMbl">
                        <img src={mainLogoMbl} alt="Ocean Vue" />
                    </span>
                </div>

                <hr></hr>

                <div className="centerMbl">
                    <ul>

                        <p className="titleMbl"> Dashboard </p>
                        <li onClick={stayAtDashboard} >
                            <DashboardIcon className='iconMbl' />
                        </li>

                        <p className="titleMbl"> Classify Ship </p>
                        <li onClick={classifyShipPage} >
                            <SailingIcon className='iconMbl' />
                        </li>

                        <p className="titleMbl"> Profile </p>
                        <li>
                            <PersonIcon className='iconMbl' />
                        </li>

                        <p className="titleMbl"> Logout </p>
                        <li onClick={handleLogout} >
                            <LogoutIcon className='iconMbl' />
                        </li>

                        <p className="titleMbl"> Home </p>
                        <li onClick={backToHome} >
                            <HomeIcon className='iconMbl' />
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Dashboard
