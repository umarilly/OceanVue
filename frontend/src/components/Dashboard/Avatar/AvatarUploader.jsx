import React, { useState } from 'react';
import './AvatarUploader.scss';
import Avatar from '@mui/material/Avatar';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function AvatarUploader() {
    const [avatarImage, setAvatarImage] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarImage(event.target.result);
                setShowOptions(false);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleAvatarClick = () => {
        if (avatarImage) {
            setShowOptions(!showOptions);
        } else {
            document.getElementById('avatar-input').click();
        }
    };

    return (
        <div className="avatar-uploader">
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
        </div>
    );
}

export default AvatarUploader;
