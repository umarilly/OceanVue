
import React, { useState, useEffect } from 'react'
import "./Dashboard.scss"
import Sidebar from "../../../Dashboard/Sidebar/Sidebar"
import Navbar from "../../../Dashboard/Navbar/Navbar"
import Widgets from "../../../Dashboard/Dashboard Widgets/Widgets"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Firebase';
import Widgets1 from '../../../Dashboard/Dashboard Widgets/Widgets1'
import Widgets2 from '../../../Dashboard/Dashboard Widgets/Widgets2'
import Widgets3 from '../../../Dashboard/Dashboard Widgets/Widgets3'


function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <>
            {user ? (
                <>
                <div className='dashboardHome' >
                    <Sidebar />
                    <div className="homeContainer">
                        <Navbar />
                        
                        <div className="widgets">
                            <Widgets  />
                            <Widgets2 />
                            <Widgets1 />
                        </div>

                        <Widgets3 />

                    </div>
                </div>
                </>

            ) : (
                <div>
                    <h1> Please Login </h1>
                </div>

            )}
        </>
    )
}

export default Dashboard
