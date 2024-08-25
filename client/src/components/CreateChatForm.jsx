import React, { useContext, useState } from 'react'
import '../css/CreateChatForm.css'
import { ChatContext } from '../context/ChatContext'


const CreateChatForm = () => {

  const [formVisible, setFormVisible] = useState(false)
  const [chatForm, setChatForm] = useState({
    firstName: '',
    lastName: ''
  })
  const {chats, setChats, setSearchedChats} = useContext(ChatContext)

  const handleCreateChat = async (e) => {
    e.preventDefault()
    const firstName = chatForm.firstName.trim()
    const lastName = chatForm.lastName.trim()
    if(!firstName || !lastName){
      alert('The fields cannot be blank')
      return
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName})
    })
    const chat = await response.json()
    setChats([...chats, chat])
    setSearchedChats([...chats, chat])
    setChatForm({firstName: '', lastName: ''})
    setFormVisible(false)
  }

  return (
    <>
      {formVisible? (
        <form onSubmit={handleCreateChat} className='chat-creation-form'>
          <div className='details-container'>
            <label htmlFor='first-name'>First name</label>
            <input id='first-name' value={chatForm.firstName} onChange={(e) => setChatForm({...chatForm, firstName: e.currentTarget.value})}/>
          </div>
          <div className='details-container'>
            <label htmlFor='last-name'>Last name</label>
            <input id='last-name' value={chatForm.lastName} onChange={(e) => setChatForm({...chatForm, lastName: e.currentTarget.value})}/>
          </div>
          <div className='buttons-container'>
            <button type='button' onClick={() => setFormVisible(false)}>Cancel</button>
            <button>Ok</button>
          </div>
        </form>) : <button onClick={() => setFormVisible(true)} className='create-chat-button'>+ Add chat</button>}
    </>

  )
}

export default CreateChatForm
