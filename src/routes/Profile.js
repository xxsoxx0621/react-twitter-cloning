import React, {useEffect, useState} from "react";
import {authService, dbService} from "../fbase";
import {useNavigate} from "react-router-dom";

export const Profile = ({userObj, refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    //DB filltering
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .get();

    }
    useEffect(() => {
        getMyNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            const response = await userObj.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser();
        }
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}