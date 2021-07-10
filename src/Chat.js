import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react'
import {useStateValue} from "./StateProvider";
import './Chat.css'
import { useParams } from 'react-router-dom';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import db from './firebase';
import firebase from 'firebase';
import moment from 'moment';
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        setSeed(Math.random() * 5000);
    }, [])
    useEffect(() => {

        if (roomId) {
            // console.log(roomId)
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name);
            });
 
            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
              
            });
            console.log(messages)
        }
        // else{
        //     console.log("no rrom")
        //     // db.collection("rooms").doc("abc").onSnapshot((snapshot) => {
        //     //     setRoomName(snapshot.data().name);
        //     // });

        // }
    }, [roomId]);
  
        const sendMessage = (e) => {
            e.preventDefault();
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar scr={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {moment(messages[messages.length - 1]?.
                            timestamp?.toDate()).calendar()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {/* {console.log(messages)} */}
                {messages.map(message => (
                     <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{moment(message.timestamp?.toDate()).format('LT')}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
