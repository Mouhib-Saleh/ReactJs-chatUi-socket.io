import React, { useRef, useState, useEffect, useCallback } from "react";
import "./chat.css";
import { ChatIcon } from "@chakra-ui/icons";
import Chat from './chat'
const ChatWidget = (props) => {


  const [showDiv, setShowDiv] = useState(false);
  const handleClickShow = () => {
    setShowDiv(!showDiv);
    console.log(showDiv)
  };

  return (  
    <div>
        <Chat isVisible={showDiv} ChatApi={props.ChatApi}/>     
        <div className="button-container">
        <button className="message-button"  onClick={handleClickShow}>
           <ChatIcon/>
        </button>
     </div>
     <Chat isVisible={showDiv} ChatApi={props.ChatApi}/>     
        <div className="button-container">
        <button className="message-button"  onClick={handleClickShow}>
           <ChatIcon/>
        </button>
     </div>
    </div>
  );
};

export default ChatWidget;
