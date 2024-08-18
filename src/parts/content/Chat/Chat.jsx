import './Chat.css'
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {NavLink, Route, Routes} from "react-router-dom";
import ChatContent from "./ChatContent/ChatContent";




firebase.initializeApp({
    apiKey: "AIzaSyA6a2KrgINXs48kh46ujobBHHi2G4DOBSc",
    authDomain: "crm-app-290ad.firebaseapp.com",
    databaseURL: "https://crm-app-290ad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crm-app-290ad",
    storageBucket: "crm-app-290ad.appspot.com",
    messagingSenderId: "417688543189",
    appId: "1:417688543189:web:a39ee3eb737363807c675c",
    measurementId: "G-5LNV6GKBVK"
})

const firestore = firebase.firestore()

function ChatRoom(props){
    const chatsRef = firestore.collection('chat');

    const query = chatsRef.orderBy('createAt').limit(25);

    const [chats] = useCollectionData(chatsRef);

    return(
        <div class="chat-container">
            <div class="chat-list">
                {chats && chats.map(chat =>
                    <NavLink to={`./${chat.id}`} className='custom-navlink'>
                        <div className="chat-item">
                            <div className="avatar">
                                <img src="avatar1.jpg" alt="User Avatar" />
                            </div>
                            <div className="user-info">
                                <h3>{chat.name}</h3>
                                <p>{chat && chat.messages.length ? chat.messages[chat.messages.length-1].text : ''}</p>
                            </div>
                            <div className="message-time">12:30 PM</div>
                        </div>
                    </NavLink>
                )}
            </div>
            <Routes>
                {chats && chats.map(chat => <Route path={`/${chat.id}`} element={<ChatContent user={props.user} chat={chat} chatsRef={chatsRef}/>}/>)}
            </Routes>
        </div>
    )
}

const Chat = (props) => {
    return (
        <div class='chat'>
            <ChatRoom user={props.user} />
        </div>
    );
}

export default Chat