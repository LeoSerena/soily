import express from 'express'

import { authMiddleware } from '../middlewares/auth';

const discussions_route = express.Router()

import { getRecentDiscussions, getDiscussionNames, getDiscussion } from "../queries/discussions";

discussions_route.get('/recentDiscussions', async (req, res) => {
    const discussions = await getRecentDiscussions()
    res.send(discussions)
})

discussions_route.get('/discussions', authMiddleware, async (req, res) => {

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

discussions_route.post('/discussion', authMiddleware, async (req, res) => {
    const {title, userId} = req.body
    try{
        const discussion = await getDiscussion(title)
        if(discussion.private){
            if(discussion.owner != userId ){ res.status(401).send('Unauthorized') }
        }
        res.status(200).send(discussion)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

export default discussions_route