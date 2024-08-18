import React from "react";

const ChatMessage = (props) => {
    const {text, photoURL, uid} = props.message

    const messageClass = uid === localStorage.getItem('uid') ? 'mine' : 'other';
    return (
        <div className={`message ${messageClass}`}>
            <div class="avatar">
                <img src={photoURL} alt="User Avatar" />
            </div>
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage