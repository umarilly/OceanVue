import React, { useState, useEffect } from 'react';
import './UserProfileComp.css';

import { TextField } from '@mui/material';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';

import { EmailAuthProvider } from 'firebase/auth';


const UserProfileComp = () => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

    const handlePasswordReset = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        if (oldPassword === newPassword) {
            setError("New password should be different from the old password");
            return;
        }

        console.log(newPassword);
    
        try {
            const user = auth.currentUser;
            const email = user.email;
            
            // Reauthenticate the user
            const credentials = EmailAuthProvider.credential(email, oldPassword);
            await user.reauthenticateWithCredential(credentials);
    
            // Update the password in the Firebase authentication
            await user.updatePassword(newPassword);

            console.log(newPassword);
    
            // Update the user document in Firestore (assuming 'Users' is your collection name)
            const userId = user.uid;
            const userDocRef = doc(db, 'Users', userId);
            const docSnap = await getDoc(userDocRef);
            const userData = docSnap.data();
            console.log(userData);
    
            // Update only the necessary fields in the Firestore document
            await updateDoc(userDocRef, {
                ...userData,
                // Assuming you have a 'password' field in your Firestore collection
                password: newPassword,
                
            });

            console.log(newPassword);
    
            setError("");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } 
            catch (error) {
            setError("Please try again");
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

            <div className='userProfileCompMain'>
                <form onSubmit={handlePasswordReset}>
                    <TextField
                        label='Old Password'
                        name='oldPassword'
                        type='password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='New Password'
                        name='newPassword'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Confirm New Password'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="updateButton">
                        <span className="setUpdateButton">
                            <button type='submit'>
                                <div className='buttonSize' > Reset Password </div>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserProfileComp;

