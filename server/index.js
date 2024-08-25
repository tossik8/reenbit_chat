import express from 'express'
import { getChats, insertChat, insertMessage } from './db.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/chats', async (req, res) => {
  const chats = await getChats()
  res.json(chats)
})

app.post('/chats', async (req, res) => {
  const {firstName, lastName} = req.body
  const chat = await insertChat(firstName, lastName)
  res.send(chat)
})

app.get('/quotes', async (req, res) => {
  const response = await fetch('https://dummyjson.com/quotes/random')
  const {quote} = await response.json()
  const {chatId} = req.query
  const newQuote = await insertMessage(quote, chatId, 2)
  res.json(newQuote)
})

app.post('/messages', async (req, res) => {
  const {message, chatId} = req.body
  const newMessage = await insertMessage(message, chatId, 1)
  res.json(newMessage)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
