import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";
import {AuthForm} from "../components/AuthForm";
import Styled from 'styled-components';

const Div = Styled.div`
            width:100%;
            height:100vh;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            
    `;
const CustomBtn = Styled.button`
        width:20%;
        height:40px;
        border-radius:5px;
        margin-top:10px;
    `;

const ButtonContainer = Styled.div`
        width:100%;
        display:flex;
        margin-top:10px;
        flex-direction:column;
        align-items:center;
`;
export const Auth = () => {

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
            <ButtonContainer>
                <CustomBtn onClick={onSocialClick} name="google">Continue with Google</CustomBtn>
                <CustomBtn onClick={onSocialClick} name="github">Continue with Github</CustomBtn>
            </ButtonContainer>
        </Div>
    )
};