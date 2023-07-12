import React, { useEffect } from 'react'
import { authService } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser == null) {
            navigate("/auth");
        }
    }, [])
    
    return (
        <span>Home</span>
    )
} 

export default Home;
