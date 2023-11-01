

import React, { useState, useEffect } from 'react';
import './UserProfileComp.css';
import UserProfileCompTwo from "./UserProfileCompTwo";

import { TextField } from '@mui/material';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

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
            const userId = auth.currentUser.uid;

            const userDocRef = doc(db, 'Users', userId);

            setIsUpdating(true);

            await updateDoc(userDocRef, {
                username: userFormData.username,
            });

            setTimeout(() => {
                setIsUpdating(false);
                window.location.reload();
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

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);

            // Update the password in the authentication
            await updatePassword(user, newPassword);

            // Update the password in the Firestore document
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'Users', userId);
            await updateDoc(userDocRef, {
                password: newPassword, // Change 'password' to your password field name in the Firestore document
            });

            // Clear the input fields and error message
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');

            // Display success message or perform any other actions on success
            console.log('Password updated successfully');
        } catch (error) {
            // Handle any errors related to password update
            console.error('Error updating password: ', error.message);
            setError('Error updating password. Please try again.');
        }
    };




    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                <div>
                    <h1 style={{ fontSize: '25px', fontWeight: '900', marginTop: '30px', color: 'black' }} > Personal Information </h1>
                </div>
            </div >

                <div className='userProfileComp' >

                    <div className='userProfileCompMain'>
                        <div className='userProfileCompMainWidthSetting' >
                            <form onSubmit={handleSubmit} >
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
                    </div>

                    <div className='userProfileCompMain2'>
                        <div className='userProfileCompMainWidthSetting2' >
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
                    </div>

                </div>

                <div className='userProfileCompMain3'>

                    <UserProfileCompTwo />
                </div>

            </>
            );
};

            export default UserProfileComp;