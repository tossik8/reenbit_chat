import './css/App.css'
import ChatWindow from './components/ChatWindow'
import Chats from './components/Chats'
import Header from './components/Header'
import CreateChatForm from './components/CreateChatForm'

function App() {

  return (
    <main>
      <section id='left-sidebar'>
        <Header/>
        <CreateChatForm/>
        <Chats/>
      </section>
      <ChatWindow/>
    </main>
  )
}

export default App
