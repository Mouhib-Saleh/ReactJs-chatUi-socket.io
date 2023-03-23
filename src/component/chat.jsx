import React, { useRef, useState, useEffect, useCallback } from "react";
import "./chat.css";
import io from "socket.io-client";

const userPrompt = prompt("Please enter your name:");
const socket = io("http://localhost:3001")
const Chat = (props) => {
 // const [socket, setSocket] = useState(null); 
  const { isVisible } = props;
  const [userName] = useState(userPrompt);
  const messagesEndRef = useRef(null);
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [image] = useState(`https://picsum.photos/200/300?${randomNumber}`);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [date, setDate] = useState();
  
 /*  useEffect(() => {
    const newSocket = io(props.ChatApi);
    setSocket(newSocket);
  
    return () => {
      newSocket.disconnect();
    };
  }, [props.ChatApi]); */

  
  const handleMessage = useCallback(
    (data) => {
      if (data.username === userName) {
        return false;
      }
      setMessages((prevMessages) => [...prevMessages, data]);
    },
    [setMessages, userName]
  );
 
  useEffect(() => {
    socket.on("new-message", handleMessage);
    return () => {
      socket.off("new-message", handleMessage);
    };
  }, [handleMessage,socket]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      insertMessage();
      setInputValue("");
    }
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function insertMessage() {
    if (inputValue.trim() === "") {
      return false;
    }

    const newMessage = {
      username: userName,
      message: inputValue,
      image: image,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    socket.emit("new-message", newMessage);
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    setDate(hours + ":" + minutes);
  }
  function handleClick() {
    insertMessage();
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);
  return (
    <div  className={isVisible ? '' : 'invisible'}>
      <div className="chat">
      <div className="chat-title">
          <h1 id="user">{userName}</h1>
          <h2>user</h2>
          <figure className="avatar">
            <img
              alt="texting "
              src="https://st2.depositphotos.com/3867453/6986/v/600/depositphotos_69864645-stock-illustration-letter-m-logo-icon-design.jpg"
            />
          </figure>
        </div>

        <div className="messages"><div className="messages"><div className="messages"><div className="messages"><div className="messages">
          <div
            className="messages-content"
            style={{ overflowY: "scroll", marginLeft: -3 }}
          >
            {messages.map((msg, index) =>
              msg.username === userName ? (
                <div key={index} className="message message-personal new">
                  <div className="message-text">{msg.message}</div>
                  <div className="timestamp">{date}</div>
                </div>
              ) : (
                <div key={index} className="message message new">
                  <img className="avatar" alt="img" src={`${msg.image}`} />
                  <div className="user">{msg.username}</div>
                  <div className="message-text">{msg.message}</div>
                  <div className="timestamp2">{date}</div>
                </div>
              )
            )}

            <div
              ref={messagesEndRef}
              style={{ float: "left", clear: "both" }}
            ></div>
          </div>
        </div>
        <div className="message-box">
          <input
            type="text"
            className="message-input"
            placeholder="Type message..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="message-submit"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
      </div>
   
  );
};

export default Chat;
