

import React, { useState, useEffect } from 'react';
import "./History.scss";
import Sidebar from "../../../Dashboard/Sidebar/Sidebar";
import Navbar from "../../../Dashboard/Navbar/Navbar";
import ViewPDF from "../../../Dashboard/Classification/ViewPDF";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Firebase';

const History = () => {

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
                        <ViewPDF />
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

export default History;
