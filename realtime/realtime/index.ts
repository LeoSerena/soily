import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { Server, Socket} from 'socket.io'

import { MessagePayload } from './documents'

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(
    server,
    {
        cors : {
            origin : 'http://localhost:3000', // the allowed origin of request
            methods : ['GET', 'POST'] // the allowed requests
        }
    }
)
let onlineUsers = new Map()

// set users offline when they inactive for 15minutes
setInterval(() => {
    console.log(`number of users : ${onlineUsers.size}`)
    onlineUsers.forEach((user, userId) => {
        if(Date.now() - user.timestamp > 1000 * 60 * 15){onlineUsers.delete(userId)}
    })
}, 1000 * 5 )
// setInterval(() => onlineUsers.forEach((id,user) => {
//     if(Date.now() - user.timestamp > 1000 * 60 * 2){ 
//         onlineUsers.delete(id) 
//         console.log(`timeout ${id}`)
//     }
// }), 1000 * 60) // every minute we check

// io.use((socket, next) => {
//     next()
// })

function refreshOnline(userId : string, socket : Socket){
    onlineUsers.set(userId, {
        socketId : socket.id,
        timestamp : Date.now()
    })
}

function emitMessage(data : MessagePayload, socket : Socket){
    refreshOnline(data.msg.senderId, socket)
    const { receiverId, chatId, msg } = data
    const receiverSocketId = onlineUsers.get(receiverId)?.socketId
    if(receiverSocketId){socket.to(receiverSocketId).emit(`receive_msg_${chatId}`, msg)}
}

io.on('connection', socket => {
    console.log(`connected ${socket.id}`)
    socket.on('connectUser', data => refreshOnline(data.userId, socket))
    socket.on('send_msg', (data : MessagePayload) => emitMessage(data, socket))
    socket.on('disconnect', () => {
        onlineUsers.forEach((user, userId) => {
            if(user.socketId===socket.id){onlineUsers.delete(userId)}
        })
        console.log(`disconnected ${socket.id}`)
    })
})


const port = process.env.IO_PORT

server.listen(port, () => {
    console.log(`realtime server runnning on port ${port}`)
})