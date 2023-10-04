

import React, { useState, useEffect } from 'react';
import "./UserProfile.scss";
import Sidebar from "../../../Dashboard/Sidebar/Sidebar";
import Navbar from "../../../Dashboard/Navbar/Navbar";
import UserProfileComp from "../../../Dashboard/User Profile/UserProfileComp";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Firebase';

const UserProfile = () => {

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
                        <UserProfileComp/>
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

export default UserProfile
