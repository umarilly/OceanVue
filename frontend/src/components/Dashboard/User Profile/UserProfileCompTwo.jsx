
import React, { useState, useEffect } from 'react';
import './UserProfileComp.css';

import { TextField } from '@mui/material';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';

const UserProfileComp = () => {
    const [userFormData, setUserFormData] = useState({
        age: '',
        gender: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
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
            const userId = auth.currentUser.uid;

            const userDocRef = doc(db, 'Users', userId);

            setIsUpdating(true);

            await updateDoc(userDocRef, {
                age: userFormData.age,
                gender: userFormData.gender,
                dateOfBirth: userFormData.dateOfBirth,
                phoneNumber: userFormData.phoneNumber,
                address: userFormData.address,
            });

            setTimeout(() => {
                setIsUpdating(false);
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Age'
                        name='age'
                        value={userFormData.age}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Gender'
                        name='gender'
                        value={userFormData.gender}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Date of Birth'
                        name='dateOfBirth'
                        value={userFormData.dateOfBirth}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Phone Number'
                        name='phoneNumber'
                        value={userFormData.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Address'
                        name='address'
                        value={userFormData.address}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
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
