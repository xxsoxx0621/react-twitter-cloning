import React, {useEffect, useState} from "react";
import {dbService} from "../fbase";

export const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    // db에서 가져오기 위해서 state
    const [nweets, setNweets] = useState([]);

    // old getNweets => re-render 발생
    // const getNweets = async () => {
    //     const dbnweets = await dbService.collection("nweets").get();
    //     dbnweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets((prev) =>  [nweetObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        // getNweets();
        // realtime db
        dbService.collection("nweets").onSnapshot(snapshot => {
            //new getNweets  => re-render 발생하지 않음
            const nweetArray = snapshot.docs.map(doc => (
                {
                    id: doc.id, ...doc.data(),
                }));
            setNweets(nweetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,

        });
        // input 하고 난 후 init
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?"
                       maxLength="120"/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}