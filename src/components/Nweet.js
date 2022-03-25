import React, {useState} from "react";
import {dbService} from "../fbase";

export const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if (ok) {
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
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
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Update Nweet</button>
                            </>
                        )}
                    </>
                )}
            }
        </div>
    );
}