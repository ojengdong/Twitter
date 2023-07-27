import React from "react";
import { HashRouter as Router , Routes , Route } from 'react-router-dom';
import { useState } from "react";
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import Navigation from '../components/Navigation'

const AppRouter = ({isLoggedIn}) => {
    // 내가 로그인이 된다면 Home화면이 보이게
    // 로그인이 되어있지 않다면 Auth화면이 보이게 
    return (
        <Router>
            {/* 사용자가 로그인이 된 경우에만 */}
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/"  element={<Home/>}/> 
                        <Route exact path="/profile"  element={<Profile/>}/>  
                    </>
                ) : (
                    <Route exact path="/auth"  element={<Auth/>}/>
                )
            }
            </Routes>
        </Router>
    );
};

export  default AppRouter;