import './App.css';
import Chat from './component/chat';
import ChatWidget from './component/ChatWidget';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return ( 
    <ChakraProvider theme={{}}>
        <ChatWidget user={"name"} ChatApi={"http://localhost:3001"}  />
        </ChakraProvider>
  );
}

export default App;
