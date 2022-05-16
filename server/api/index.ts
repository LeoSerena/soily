import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()

import DBconnect from './database/connect'


import chat_route from './routes/chat'
import friend_route from './routes/friend'
import user_route from './routes/user'
import discussions_route from './routes/dicsussions'
import list_route from './routes/list'
import book_route from './routes/book'

const app = express()

const client_url = process.env.CLIENT_URL
// const io_url = process.env.IO_URL
app.use(cookieParser())
app.use(cors({ origin: client_url, credentials : true }));
app.use(bodyParser.json())

app.get('/', (req, res) => { res.send('api is healthy') })

app.use('/', friend_route)
app.use('/', user_route)
app.use('/', discussions_route)
app.use('/', list_route)
app.use('/', book_route)
app.use('/chat', chat_route)

const port = process.env.API_PORT

async function main(){
    DBconnect()
    app.listen(port)
    console.log(`app listening at port ${port}`)
}

main()