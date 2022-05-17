import express from 'express'
const chat_route = express.Router()

import userModel from '../database/models/User'
import Chat from '../database/models/Chat'
import Message from '../database/models/Message'
import { authMiddleware } from '../middlewares/auth'

chat_route.post('/new_chat', async (req, res) => {
    const {senderId, receiverId} = req.body
    const newChat = new Chat({ users : [senderId, receiverId] })
    try{
        // create a new chat instance
        const saved = await newChat.save()
        // add the chat id to both users
        await userModel.updateOne({ _id : senderId },{ $push : { chatIds : saved._id }})
        await userModel.updateOne({ _id : receiverId },{ $push : { chatIds : saved._id }})
        res.status(200).send(saved)
    }
    catch(err){res.status(500).send(err)}
})

chat_route.post('/send_message', authMiddleware, async (req, res) => {
    try{
        const message = new Message(req.body.message)
        const newMessage = await message.save()
        await Chat.updateOne(
            {_id : req.body.chatId},
            { $push : { messages : newMessage._id }}
        )
        res.status(200).send('ok')
    }catch(err){
        console.log(err)
        res.status(500).send('error')
    }
})

chat_route.post('/chat', authMiddleware, async (req, res) => {
    try{
        const query = await Chat.findById(req.body.chatId).populate({path : 'messages'})
        res.status(200).send(query)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

chat_route.post('/user_chats', async (req, res) => {
    try{
        const query = await userModel.findById(req.body.userId, 
            'chatIds'
        ).populate({
             path : 'chatIds',
             select : 'users'
        })
        res.status(200).send(query)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

export default chat_route