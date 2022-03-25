import React, {useState} from "react";
import {HashRouter as Router, Route, Routes, Redirect} from "react-router-dom";
import  {Home} from '../routes/Home'
import  {Auth} from  '../routes/Auth'
import {Navigation} from "./Navigation";
import {Profile} from "../routes/Profile";

export const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ?(
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}/>
                        <Route path="/profile" element={<Profile/>}/>
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