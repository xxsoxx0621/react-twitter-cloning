import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";
import Styled from 'styled-components';

const Form = Styled.form`
    display:flex;
    flex-direction:column;
    width: 30%;
    height: 150px;
    align-items: center;
`;

const Input = Styled.input`
    display:flex;
    width:80%;
    height:40px;
    text-align: center;
    margin-top:5px;
    border-radius:5px;
`;

const Div = Styled.div`
    width:100%;
    display:flex;
    margin-top:10px;
    justify-content: center;
`;

const Button = Styled.button`
    width:30%;
    height:40px;
    border-radius:5px;
    background:#4CA3E7;
    border:#fff;
    margin-right:10px;
`;
export const AuthForm = () => {

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
                <Div>
                    <Button type="submit">{newAccount ? "Create Account" : "Log In"}</Button>
                    <Button onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</Button>
                </Div>
            </Form>

        </>

    )
}