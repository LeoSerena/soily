import { addList, deleteList } from '../queries/Lists'
import express from 'express'
const list_route = express.Router()

import { authMiddleware } from '../middlewares/auth'

list_route.post('addList', authMiddleware, async (req, res) => {
    try{
        const res_ = await addList(req.body)
        res.status(200).send(res_)
    }catch(err){ res.status(500).send(err) }
})

list_route.post('delList', authMiddleware, async (req,res) => {
    try{
        const res_ = await deleteList(req.body.listId)
        res.send(res_)
    }catch(err){ res.status(500).send(err) }
})

export default list_route