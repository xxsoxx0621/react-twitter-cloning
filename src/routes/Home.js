import React, {useEffect, useState} from "react";
import {dbService, storageService} from "../fbase";
import {Nweet} from "../components/Nweet";
import {ref, uploadString, getDownloadURL} from "@firebase/storage";
import {NweetFactory} from "../components/NweetFactory";


export const Home = ({userObj}) => {
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

    return (
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}