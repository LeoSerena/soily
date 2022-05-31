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

const allowed_urls = ['http://localhost:3000', 'http://localhost', '127.18.0.2', '127.18.0.2:3000']
const corsOptions = {
    origin : (origin : any, callback: any) => {
        if(allowed_urls.includes(origin) || !origin){callback(null, true)}
        else{callback(new Error(`origin <${origin}> is not allowed`))}
    },
    credentials : true
}
app.use(cors(corsOptions))

// const io_url = process.env.IO_URL
// const client_url = process.env.NODE_ENV=='production' ? '172.18.0.2' : process.env.CLIENT_URL
// app.use(cors({ origin: client_url, credentials : true }));
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

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