import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'; // 특별한 식별자를 랜덤으로 생성
import {dbService, storageService} from "../fbase";
import {Nweet} from "../components/Nweet";
import {ref, uploadString, getDownloadURL} from "@firebase/storage";


export const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    // db에서 가져오기 위해서 state
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
        // console.log(await getDownloadURL(ref()));
        // await dbService.collection("nweets").add({
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        //
        // });
        // // input 하고 난 후 init
        // setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const TheFile = files[0]; // input에 있는 가장 첫번째 파일을 읽기 위함
        const reader = new FileReader(); // 파일이름을 읽는 API
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(TheFile);
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?"
                       maxLength="120"/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}