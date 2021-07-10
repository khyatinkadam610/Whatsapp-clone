import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import "./SidebarChat.css"

function SidebarChat({id,name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.random() * 5000);
    }, [])

    const createChat = () =>{
        const roomName = prompt("Please enter name for chat room");
        if(roomName)
        {
            // adding roomname in firestore for creating new chat
            db.collection("rooms").add({
                name:roomName,
            });
        }
    }
    return !addNewChat ? (
        // this id was fetched before is now being used to travel from chat to chat that is to change url
             <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        
    ) : (
        <div className="sidebarChat">
           <div onClick={createChat} className="sidebarChat__info">
            <h2>Add a new chat</h2>

           </div>
        </div>
    );

}
export default SidebarChat;
