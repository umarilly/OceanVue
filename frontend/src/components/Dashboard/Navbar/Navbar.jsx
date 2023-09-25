import React, { useState, useEffect } from 'react'
import "./Navbar.scss"
import AvatarUploader from '../Avatar/AvatarUploader'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Firebase';

const Navbar = () => {

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
            <div className="NavbarContainer" >

                <div className="NavbarAvatar" >
                    <AvatarUploader />
                    <div className='AvatarName' >
                        {user ? (
                            <div className='AvatarName' >
                                Welcome , {user.displayName}
                            </div>
                        ) : (
                            <div className='AvatarName' >
                                Please Login
                            </div>

                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar



