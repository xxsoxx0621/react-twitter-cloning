import React, {useState} from 'react';
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";

export const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

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
    );
}