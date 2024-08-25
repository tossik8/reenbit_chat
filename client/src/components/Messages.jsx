import React, { useEffect, useRef } from 'react'
import '../css/Messages.css'
import Message from './Message'

const Messages = ({messages}) => {

  const messagesRef = useRef()
  useEffect(() => {
    if(messagesRef.current){
      messagesRef.current.scrollTo({top: messagesRef.current.scrollHeight, behavior: 'smooth'})
    }
  }, [messages])

  return (
    <div ref={messagesRef} className='messages'>
      {messages.map(message => <Message key={message._id} message={message}/>)}
    </div>
  )
}

export default Messages
