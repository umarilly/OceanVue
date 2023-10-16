// AvatarUploader.jsx
import React, { useState, useEffect } from 'react';
import './AvatarUploader.css';
import Avatar from '@mui/material/Avatar';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, db } from '../../../Firebase';
import { auth } from '../../../Firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

function AvatarUploader() {
    const [avatarImage, setAvatarImage] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [userId, setUserId] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setUserId(user.uid);

                    const userDocRef = doc(db, 'Users', user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        if (userData.avatarURL) {
                            setAvatarImage(userData.avatarURL);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };
        fetchUserData();
    }, []);

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage && userId) {
            const storageRef = ref(storage, `avatars/${userId}/${selectedImage.name}`);
            if (avatarImage) {
                await deleteObject(ref(storage, avatarImage));
            }
            await uploadBytes(storageRef, selectedImage);
            const downloadURL = await getDownloadURL(storageRef);
            setAvatarImage(downloadURL);
            setShowOptions(false);

            const userDocRef = doc(db, 'Users', userId);
            await updateDoc(userDocRef, { avatarURL: downloadURL });
        }
    };

    const handleAvatarClick = () => {
        if (avatarImage) {
            setDisplayModal(true);
        } else {
            document.getElementById('avatar-input').click();
        }
    };

    const handleCloseModal = () => {
        setDisplayModal(false);
    };

    const handleUpdateImage = () => {
        setDisplayModal(false);
        document.getElementById('avatar-input').click();
    };

    return (
        <div className="avatar-uploader">
            {displayModal && <div className="backdrop" />}
            <div className="avatar" onClick={handleAvatarClick}>
                {avatarImage ? (
                    <div className="avatar-image">
                        <img src={avatarImage} alt="Avatar" className="rounded-avatar" />
                        {showOptions && (
                            <div className="options">
                                <button className="view-button" onClick={() => window.open(avatarImage)}>
                                    <VisibilityIcon /> View
                                </button>
                                <button className="change-button" onClick={() => document.getElementById('avatar-input').click()}>
                                    <PhotoCameraIcon /> Change
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Avatar className="avatar-icon">
                        <UploadIcon className="uploadIcon" />
                    </Avatar>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="avatar-input"
            />
            {displayModal && (
                <dialog id="my_modal_2" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg"> Options </h3>
                        <br />
                        <div className="py-4 flex justify-center">
                            <button className="btnClassAvatar" onClick={handleUpdateImage}> Upload Image </button>
                            <button className="btnClassAvatar" onClick={() => window.open(avatarImage)}> View Image </button>
                            <button className="btnClassAvatar" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop" />
                </dialog>
            )}
        </div>
    );
}

export default AvatarUploader;
