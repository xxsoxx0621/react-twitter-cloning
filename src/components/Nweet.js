import React, {useState} from "react";
import {dbService, storageService,} from "../fbase";
import { deleteObject, ref} from "firebase/storage";

export const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if (ok) {
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //delete photo
            await deleteObject(ref(storageService,nweetObj.attachmentUrl));
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
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
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your nweet" value={newNweet} required/>
                        </form>
                        <input type="submit" value="update Nweet"/>
                        <button onClick={onChange}>Cancle</button>
                    </>
                )
                :
                (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && (
                            <div>
                            <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                            </div>
                        )}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Update Nweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
}