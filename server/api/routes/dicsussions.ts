import express from 'express'
const discussions_route = express.Router()

import { authMiddleware } from '../middlewares/auth';
import { addDiscussion, getRecentDiscussions, getDiscussionNames, getDiscussion, 
    postPost } from "../queries/discussions";
import { verifyAccess } from '../authentication/verify'

discussions_route.get('/recentDiscussions', async (req, res) => {
    const discussions = await getRecentDiscussions()
    res.send(discussions)
})

discussions_route.post('/newDiscussion', authMiddleware, async (req, res) => {
    const {userId, data} = req.body
    try{
        const discussion = await addDiscussion(data, userId)
        res.status(200).send('success')
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

discussions_route.get('/discussionNames', async (req, res) => {
    try{
        const names = await getDiscussionNames()
        res.status(200).send(names)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

discussions_route.post('/discussion', async (req, res) => {
    const {title, userId} = req.body
    try{
        const discussion = await getDiscussion(title)
        if(discussion.private){ verifyAccess(req, userId, discussion.owner, discussion.co_owners) }
        res.status(200).send(discussion)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

discussions_route.post('/post', authMiddleware, async (req, res) => {
    const {discussionId, post} = req.body
    try{
        const newPost = await postPost(discussionId, post)
        res.status(200).send(newPost)
    }catch(error){
        res.status(500).send(error)
    }
})

export default discussions_route