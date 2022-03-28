import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";

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
            {error}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="email" placeholder="Email" required/>
                <input onChange={onChange} name="password" type="password" placeholder="Password" required/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            </form>
            <button onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</button>
        </>
    )
}