import React, { useContext, useEffect, useState } from 'react'
import '../css/ChatWindow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'

const ChatWindow = () => {

  const [message, setMessage] = useState('')
  const {chats, setChats, selectedChat, setSelectedChat} = useContext(ChatContext)

  function getQuote(){
    setTimeout(async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quotes?chatId=${selectedChat._id}`)
      const quote = await response.json()
      updateMessages(selectedChat._id, quote)
    }, 2000)
  }

  function updateMessages(chatId, message){
    const messages = [...selectedChat.messages, message]
    setSelectedChat({...selectedChat, messages: messages})
    const chat = chats.find(chat => chat._id === chatId)
    const updatedChats = chats.map(chat =>
      chat._id === chatId
        ? { ...chat, messages: messages }
        : chat)
    setChats(updatedChats)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const chatId = selectedChat._id
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message, chatId})
    })
    const newMessage = await response.json()
    updateMessages(chatId, newMessage)
    setMessage('')
  }

  useEffect(() => {
    if(!selectedChat){
      return
    }
    const lastMessage = selectedChat.messages[selectedChat.messages.length - 1]
    if(!lastMessage){
      return
    }
    if(lastMessage.senderId === 1){
      getQuote()
    }
  }, [selectedChat])

  return (
    <section id='chat-window'>
      {selectedChat? (
        <>
          <header className='chat-header'>
            <img src='/user.png' alt='Profile icon.' className='profile-icon'/>
            <p>{selectedChat.name}</p>
          </header>
          <Messages messages={selectedChat.messages}/>
          <form onSubmit={handleSendMessage} className='message-input-container'>
            <input type='text' value={message} onChange={e => setMessage(e.currentTarget.value)} placeholder='Type your message' className='message-input'/>
            <button className='send-message-button'><FontAwesomeIcon icon={faPaperPlane}/></button>
          </form>
        </>) :
        <p className='select-chat-indicator'>Select a chat</p>}
    </section>
  )
}

export default ChatWindow
