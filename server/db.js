import { config } from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'

config()

export async function connectToCluster(uri) {
  let mongoClient;

  try {
      mongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas cluster...');
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');

      return mongoClient;
  } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      process.exit();
  }
}

export async function getChats() {
  const uri = process.env.DB_URI
  let mongoClient
  try{
    mongoClient = await connectToCluster(uri)
    const db = mongoClient.db('chatApplication')
    const collection = db.collection('chats')
    const chats = await collection.find({}).toArray()
    return chats
  }
  finally{
    console.log('Closing...')
    await mongoClient.close()
  }
}

export async function insertMessage(message, chatId, senderId) {
  const uri = process.env.DB_URI
  let mongoClient
  try{
    mongoClient = await connectToCluster(uri)
    const db = mongoClient.db('chatApplication')
    const collection = db.collection('chats')
    const objectId = ObjectId.createFromHexString(chatId)
    const newMessage = {_id: new ObjectId(), message, 'date': Date.now(), senderId}
    await collection.updateOne(
      {_id: objectId},
      {$push: {messages: newMessage}})
    return newMessage
  }
  finally{
    console.log('Closing...')
    await mongoClient.close()
  }
}

export async function insertChat(firstName, lastName) {
  const uri = process.env.DB_URI
  let mongoClient
  try{
    mongoClient = await connectToCluster(uri)
    const db = mongoClient.db('chatApplication')
    const collection = db.collection('chats')
    const chat = {_id: new ObjectId(), name: `${firstName} ${lastName}`, messages: []}
    await collection.insertOne(chat)
    return chat
  }
  finally{
    await mongoClient.close()
  }
}
