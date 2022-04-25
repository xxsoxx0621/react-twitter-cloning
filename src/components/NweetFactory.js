import React, {useState} from 'react';
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";
import Styled from "styled-components";

const Form = Styled.form`
    display:flex;
    width:100%;
    flex-direction:column;
    background:#fff;
    align-items: center;
    margin-top:20px;
`;
const InputContainer = Styled.div`
    width:80%;
    display:flex;
    justify-content:center;
`;
const Input = Styled.input`
    width:80%;
    height:30px;
    border-radius:5px;
`;

const SubmitButton = Styled.input`
    width:20%;
    margin-left:5px;
    border-radius:5px;
    background:#4CA3E7;
    border:none;
`;
const FileBox = Styled.div`
    width:20%;
    height:100%;
    display:flex;
    height: 100%;    
`;
const Label = Styled.label`
    cursor:pointer;
    background:#FFF;
    border: 1px solid #4CA3E7;
    border-radius: 5px;
    width:100%;
    align-items: center;
    justify-content: center;
    display:flex;
    margin-left:3px;
`;

const ImageContainer = Styled.div`
    width:80%;
    height:auto;
    display:flex;
    justify-content: space-between;
    border:1px solid black;
    border-radius:5px;
    margin-top:10px;
`;

const CancleButton = Styled.button`
    width:15%;
    border:none;
    color:#4CA3E7;
`;
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
        <Form onSubmit={onSubmit}>
            <InputContainer>
                <Input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?"
                       maxLength="120"/>
                <SubmitButton type="submit" value="Nweet"/>
                <FileBox>
                    <Label className="input-file-button" for="input-file">
                        업로드
                    </Label>
                    <input type="file" id="input-file" accept="image/*" onChange={onFileChange}
                           style={{display: "none"}}/>
                </FileBox>
            </InputContainer>
            {attachment &&
                <ImageContainer>
                    <img src={attachment} width="50px" height="50px"/>
                    <CancleButton onClick={onClearAttachment}>X</CancleButton>
                </ImageContainer>
            }
        </Form>
    );
}