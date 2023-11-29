import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';

import { io } from "socket.io-client";
import { baseURL } from '../util';

const OpenChat = ({ openChat, user }) => {

    const [messages, setMessages] = useState([]);

    const socket = useRef();

    useEffect(() => {
        socket.current = io(`${baseURL}/`);

        socket.current.on("getNewMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
    }, [user]);

    useEffect(() => {
        setMessages([]);
        const getMessages = async () => {
            await axios
                .get(`${baseURL}/users/messages/${openChat.chatId}`)
                .then((res) => {
                    // console.log(res.data.messages);
                    if(res.data.messages.length) setMessages(res.data.messages);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getMessages();
    }, [openChat]);

    return(
        <div id="openChat">
            <div className="chat-header">
                {openChat.title}
            </div>
            <ChatBody openChat={openChat} user={user} socket={socket} messages={messages} />
            <ChatFooter openChat={openChat} user={user} socket={socket} setMessages={setMessages} />
        </div>
    );
}

export default OpenChat;