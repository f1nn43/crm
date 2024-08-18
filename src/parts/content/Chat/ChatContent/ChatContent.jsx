import React, {useState} from "react";
import ChatMessage from "./ChatMessage/ChatMessage";
import firebase from 'firebase/compat/app';
import {useCollectionData} from "react-firebase-hooks/firestore";

const ChatContent = (props) => {
    localStorage.setItem('chat', props.chat.id)
    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    const [formValue, setFormValue] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        const newChat = props.chat
        newChat.messages.push({
            text: formValue,
            createAt: getCurrentTime() + ' ' + getCurrentDate(),
            uid: props.user.uid, // Assigning the user from props
            photoURL: props.user.avatar // Assigning the user's photo from props
        })
        await props.chatsRef.doc(props.chat.id).update(newChat)

        setFormValue('')
    }

    return(
        <div className='chat-content'>
            <div className="chat-header">
                <h1>{props.chat.name}</h1>
                <p>User 1 was online 12:27</p>
            </div>
            <div className="chat-messages">
                {props.chat.messages && props.chat.messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <form onSubmit={sendMessage} className="chat-input">
                <input type="text" placeholder="Type your message..." value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ChatContent