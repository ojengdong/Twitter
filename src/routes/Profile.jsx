import React from 'react'
import { authService } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/auth");
    }
    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Profile
