import React, {useState} from "react";
import {HashRouter as Router, Route, Routes, Redirect} from "react-router-dom";
import  {Home} from '../routes/Home'
import  {Auth} from  '../routes/Auth'
import {Navigation} from "./Navigation";
import {Profile} from "../routes/Profile";

export const AppRouter = ({refreshUser,isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ?(
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}/>
                        <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
                    </>
                    ) :(
                        <>
                            <Route path="/" element={<Auth/>}/>
                        </>
                )
                }
            </Routes>
        </Router>
    )
}