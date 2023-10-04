import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import AvatarUploader from '../Avatar/AvatarUploader';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../Firebase';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                // Assuming you have the user's UID stored in your authentication state
                const userId = user.uid;

                // Reference to the user document in Firestore
                const userDocRef = doc(db, 'Users', userId);

                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Update the state with the username
                        setUsername(userData.username);
                    } else {
                        // Handle the case where the user document doesn't exist
                        console.error('No User Data Exists');
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <div className="NavbarContainer">
                <div className="NavbarAvatar">
                    <AvatarUploader />
                    <div className="AvatarName">
                        {user ? (
                            <div className="AvatarName">Welcome, {username}</div>
                        ) : (
                            <div className="AvatarName">Please Login</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
