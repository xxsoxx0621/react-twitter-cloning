import React, {useState} from "react";
import {dbService, storageService,} from "../fbase";
import {deleteObject, ref} from "firebase/storage";
import Styled from "styled-components";

const Container = Styled.div`
    display:flex;
    justify-content:center;
`;
const NweetContainer = Styled.div`
    width:75%;
    border:1px solid black;
    margin-top:10px;
    margin-bottom:10px;
    border-radius:5px;
    padding:2%;
`;

const ButtonContainer = Styled.div`
    display:flex;
    justify-content:flex-end;
`;

const Button = Styled.button`
    border-radius:5px;
    height:30px;
    margin-right:5px;
`;

const UpdateContainer = Styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:10px;
`;

const EditForm = Styled.form`
    width:80%;
    height:auto;
`;

const EditInput = Styled.input`
    width:65%;
    height:30px;
    border-radius:5px;
`;

const SubmitButton = Styled.input`
    width:16%;
    height:35px;
    margin-left:5px;
    border-radius:5px;
    background:#4CA3E7;
    border:none;
`;

const CancleButton = Styled.button`
    width:15%;
    height:35px;
    border:1px solid #4CA3E7;
    border-radius:5px;
    color:#4CA3E7;
    margin-left:5px;
`;
export const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if (ok) {
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //delete photo
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    return (
        <div>
            {editing ? (
                    <UpdateContainer>
                        <EditForm onSubmit={onSubmit}>
                            <EditInput type="text" placeholder="Edit your nweet" value={newNweet} required/>
                            <SubmitButton type="submit" value="update"/>
                            <CancleButton onClick={onChange}>Cancle</CancleButton>
                        </EditForm>
                    </UpdateContainer>
                )
                :
                (
                    <Container>
                        <NweetContainer>
                            <h4>{nweetObj.text}</h4>
                            {nweetObj.attachmentUrl && (
                                <div>
                                    <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                                </div>
                            )}
                            {isOwner && (
                                <ButtonContainer>
                                    <Button onClick={onDeleteClick}>Delete Nweet</Button>
                                    <Button onClick={toggleEditing}>Update Nweet</Button>
                                </ButtonContainer>
                            )}
                        </NweetContainer>
                    </Container>
                )
            }
        </div>
    );
}