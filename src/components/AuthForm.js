import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";
import Styled from 'styled-components';

export const AuthForm = () => {


    const Form = Styled.form`
        width:30%;
        height:auto;
        display:flex;
        flex-direction:column;
    `;

    const Input = Styled.input`
        border-radius:18px;
        width:100%;
        height:40px;
        display:flex;
        justify-content:center;
        margin-bottom:10px;
    `
    const CustomBtn = Styled.button`
      border:none;
      border-radius:18px;
       width:100%;
        height:40px;
        background-color:#00acee;
        color:white;
        
    `;
    const SignInBtn = Styled.button`
       border:none;
       width:100%;
       height:40px;
       background-color:transparent;
       color:#00acee;
        
    `;

    const containerDiv = Styled.div`
           width:100%;
            height:200px;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:center;
            border-color:#FFF;
    `;

    // const customBtn = Styled.button`
    //         background-color:#FFF;
    //         width:100px;
    //
    // `;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        // 비구조화 할당 문법
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침되는 것을 컨트롤 하기 위해서
        try {
            let data
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            // console.log(data);
        } catch (error) {
            setError(error.message);
        }

    };

    const toggleAccount = () => {
        setNewAccount(prev => !prev)
    }



    return (
        <>
                <img src="img/logo.png" alt="logo" width="50px" height="50px" style={{paddingBottom: "10px"}}/>
                {error}
                <Form onSubmit={onSubmit}>
                    <Input onChange={onChange} name="email" type="email" placeholder="Email" required/>
                    <Input onChange={onChange} name="password" type="password" placeholder="Password" required/>
                    <CustomBtn type="submit">{newAccount ? "Create Account" : "Log In"}</CustomBtn>
                    <SignInBtn onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</SignInBtn>
                </Form>
        </>

    )
}