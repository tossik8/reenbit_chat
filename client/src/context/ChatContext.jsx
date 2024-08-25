import { createContext, useState } from "react";

export const ChatContext = createContext()

const ChatContextProvider = ({children}) => {
  const [chats, setChats] = useState([])
  const [searchedChats, setSearchedChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)

  return <ChatContext.Provider value={{chats, setChats, searchedChats, setSearchedChats, selectedChat, setSelectedChat}}>
    {children}
  </ChatContext.Provider>

}

export default ChatContextProvider
