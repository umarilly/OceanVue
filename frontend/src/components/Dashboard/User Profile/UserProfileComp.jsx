import React, { useState, useEffect } from 'react';
import './UserProfileComp.css';

import { TextField } from '@mui/material';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';

const UserProfileComp = () => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
    });

    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch user data from Firebase Firestore when the component loads
    useEffect(() => {
        const fetchData = async () => {
            // Assuming you have the user's UID stored in your authentication state
            const userId = auth.currentUser.uid;

            // Reference to the user document in Firestore
            const userDocRef = doc(db, 'Users', userId);

            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Update the state with user data
                    setUserFormData(userData);
                } else {
                    // Handle the case where the user document doesn't exist
                    console.error('No User Data Exists');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Assuming you have the user's UID stored in your authentication state
            const userId = auth.currentUser.uid;

            // Reference to the user document in Firestore
            const userDocRef = doc(db, 'Users', userId);

            setIsUpdating(true); // Set isUpdating to true while updating

            // Update the user's data in Firestore
            await updateDoc(userDocRef, {
                username: userFormData.username,
            });

            // Wait for 1 second (1000 milliseconds) before reloading the page
            setTimeout(() => {
                setIsUpdating(false); // Set isUpdating back to false
                window.location.reload(); // Reload the page
            }, 1000);

        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };

    return (
        <>
            <div className='userProfileCompMain'>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Name'
                        name='username'
                        value={userFormData.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Email'
                        name='email'
                        type='email'
                        value={userFormData.email}
                        fullWidth
                        margin='normal'
                        disabled
                    />

                    <div className="updateButton">
                        <span className="setUpdateButton">
                            <button type='submit' disabled={isUpdating} >
                                <div className='buttonSize' > {isUpdating ? 'Updating ...' : 'Update'} </div>
                            </button>
                        </span>
                    </div>

                </form>

            </div>
        </>
    );
};

export default UserProfileComp;
