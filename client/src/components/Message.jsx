import React from 'react'
import '../css/Message.css'

const Message = ({message}) => {
  const sentMessage = message.senderId == 1 ? 'sent' : 'received'

  return (
    <div className={`message-container ${sentMessage}`}>
      <img src='/user.png' alt='Profile icon.' className={`profile-icon ${sentMessage}`}/>
      <div className={`message-details ${sentMessage}`}>
        <p className={`message ${sentMessage}`} >{message.message}</p>
        <p className='date'>{new Date(message.date).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default Message
