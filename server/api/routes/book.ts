
import express from 'express'
import { authMiddleware } from '../middlewares/auth'
import { addBook, delBook, modifBook } from '../queries/Books'
const book_route = express.Router()


book_route.post('/addBook', authMiddleware, async (req, res) => {
    try{
        const res_ = await addBook(req.body.userId, req.body.book)
        res.status(200).send(res_)
    }catch(err){ 
        console.log(err)
        res.status(500).send(err) }
})

book_route.post('/deleteBook', authMiddleware, async (req, res) => {
    try{
        const res_ = await delBook(req.body.userId, req.body.bookId)
        res.status(200).send(res_)
    }catch(err){ 
        console.log(err)
        res.status(500).send(err) }
})

book_route.post('/modifiyBook', authMiddleware, async (req, res) => {
    try{
        const res_ = await modifBook(req.body.userId, req.body.book)
        res.status(200).send(res_)
    }catch(err){ 
        console.log(err)
        res.status(500).send(err) }
})

export default book_route