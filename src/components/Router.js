import React from "react";
import { HashRouter as Router , Routes , Route } from 'react-router-dom';
import { useState } from "react";
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = ({isLoggedIn}) => {
    // 내가 로그인이 된다면 Home화면이 보이게
    // 로그인이 되어있지 않다면 Auth화면이 보이게 
    const [isLoggdIn, setIsLoggedIn] = useState(false)
    return (
        <Router>
            <Routes>
                {isLoggdIn ? (
                <>
                <Route path="/"  element={<Home/>}/> 
                </>
                ) : (
                <Route path="/"  element={<Auth/>}/>
                )}
            </Routes>
        </Router>
    );
};

export  default AppRouter;