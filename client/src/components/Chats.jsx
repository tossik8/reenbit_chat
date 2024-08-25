import React, { useContext, useEffect } from 'react'
import Chat from './Chat'
import '../css/Chats.css'
import { ChatContext } from '../context/ChatContext'

const Chats = () => {
  const {setChats, searchedChats, setSearchedChats} = useContext(ChatContext)

  useEffect(() => {
    async function fetchChats(){
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chats`)
      const chats = await response.json()
      setChats(chats)
      setSearchedChats(chats)
     }
    fetchChats()
  }, [])

  return (
    <section className='chats'>
      {searchedChats.map(chat => <Chat key={chat._id} chat={chat}/>)}
    </section>
  )
}

export default Chats
