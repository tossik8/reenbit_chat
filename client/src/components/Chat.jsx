import React, { useContext } from 'react'
import '../css/Chat.css'
import { ChatContext } from '../context/ChatContext'

const Chat = ({chat}) => {

  const {setSelectedChat} = useContext(ChatContext)

  const lastMessage = chat.messages[chat.messages.length - 1]

  return (
    <div className='chat-list-item' onClick={() => setSelectedChat(chat)}>
      <div className='chat-item'>
        <img src='/user.png' className='profile-icon' alt='Profile icon.'/>
        <div className='chat-details'>
          <p className='chat-name'>{`${chat.name}`}</p>
          <p className='chat-last-message'>{lastMessage? lastMessage.message : null}</p>
        </div>
      </div>
      <p className='chat-date'>{lastMessage? new Date(lastMessage.date).toLocaleDateString() : null}</p>
    </div>
  )
}

export default Chat
