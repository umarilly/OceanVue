
import React, { useState, useEffect } from 'react'
import "./ClassifyShip.scss"
import Sidebar from "../../../Dashboard/Sidebar/Sidebar"
import Navbar from "../../../Dashboard/Navbar/Navbar"
import AudioClassification from "../../../Dashboard/Classification/AudioClassification"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Firebase';



const ClassifyShip = () => {

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

                        < AudioClassification />

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

export default ClassifyShip;

