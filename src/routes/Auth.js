import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";
import {AuthForm} from "../components/AuthForm";
import Styled from 'styled-components';

export const Auth = () => {
    const Div = Styled.div`
            width:100%;
            height:100vh;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            
    `;
    const customBtn = Styled.button`
        border:1px solid black;
        background-color
    `;

    const onSocialClick = async (event) => {
        const
            {target: {name}} = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);

    }
    return (
        <Div>
           <AuthForm/>
            <div style={{width:"30%",height:"150px",display:"flex"}}>
                <button style={{width:"50%",height:"40px",margin:"2%",borderRadius:"10px"}} onClick={onSocialClick} name="google">Continue with Google</button>
                <button style={{width:"50%",height:"40px",margin:"2%",borderRadius:"10px"}} onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </Div>
    )
};