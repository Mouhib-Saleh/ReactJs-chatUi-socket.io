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
      
    </div>
  );
};

export default ChatWidget;
