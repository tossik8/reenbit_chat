import React, { useContext, useState } from 'react'
import '../css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ChatContext } from '../context/ChatContext'
import stringComparison from 'string-comparison'

const Header = () => {

  const {chats, setSearchedChats} = useContext(ChatContext)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if(!searchValue.trim()){
      setSearchedChats(chats)
      return
    }
    const cosine = stringComparison.cosine
    const foundChats = chats.filter(chat => cosine.similarity(chat.name, searchValue) >= 0.4)
    const sortedNames = cosine.sortMatch(searchValue, foundChats.map(chat => chat.name))
    const sortedChats = sortedNames.reverse().map(name => foundChats[name.index])
    setSearchedChats(sortedChats)
  }

  return (
    <header className='profile-header'>
      <div className='user-profile'>
        <img src='/user.png' alt='Profile icon.' className='profile-icon'/>
        <button>Log in</button>
      </div>
      <form onSubmit={handleSearch} className='chat-search-container'>
        <button type='submit' className='chat-search-button'><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
        <input type='text' value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} placeholder='Search for a chat' className='chat-search'/>
      </form>
    </header>
  )
}

export default Header
