import express from 'express'
const friend_route = express.Router()

import { authMiddleware } from '../middlewares/auth'
import { friendRequest, answerFriendRequest, deleteFriend } from '../queries/users'

friend_route.post('/friendRequest', authMiddleware, async (req, res) => {
    const {userId, friend_username} = req.body
    try{
        const result = await friendRequest(userId, friend_username)
        res.send('success')
    }catch(error){
        console.log(error)
    }
})


friend_route.post('/answerFriendRequest', authMiddleware, async(req, res) => {
    const {userId, friendId, answer} = req.body
    try{
        const result = await answerFriendRequest(userId, friendId, answer)
        res.send('success')
    }catch(error){
        console.log(error)
    }
})

friend_route.post('/deleteFriend', authMiddleware, async(req, res) => {
    const {userId, friendId} = req.body
    try{
        const result = await deleteFriend(userId, friendId)
        res.send('success')
    }catch(error){
        console.log(error)
    }
})

export default friend_route