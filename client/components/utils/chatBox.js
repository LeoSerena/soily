import { useState, useEffect, useContext } from 'react'
import Moment from 'react-moment'
import { socketContext } from '../../contexts/socketContext'
import { fetcher } from '../../lib/request'

export default function ChatBox( {user, friendId, chatId} ){

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useContext(socketContext)

    useEffect(() => {
        socket.on(`receive_msg_${chatId?._id}`, (msg) => {setMessages([...messages, msg])})
    }, [socket, chatId, messages])

    useEffect(() => {
        async function getChat(id){
            const [error, chat] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/chat`,'post',{ chatId : id })
            if(error){console.log(error)}
            else{setMessages(chat.messages)}
        }
        if(chatId){getChat(chatId._id)}
    },[chatId])

    function handleChange(event){setMessage(event.target.value)}
    async function handleSend(e){
        e.preventDefault()
        if(message !== ''){
            const msg = {
                senderId : user._id,
                senderName : user.username,
                text : message
            }
            const [error, _] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/send_message`,
                'post',
                {
                    message : msg,
                    chatId : chatId._id
                }
            )
            if(error){console.log(error)}
            else{
                const date = new Date(Date.now()).toISOString()
                msg.createdAt = date.toString()
                setMessages([...messages, msg])
                socket.emit('send_msg', {
                    msg : msg,
                    chatId : chatId._id,
                    receiverId : friendId
                })
                setMessage('')
            }
        }
    }

    function formatDate(str){
        return <Moment fromNow>{str}</Moment>
    }
    

    return <div className='chatbox'>
                {messages.map(m => <p
                key={m.createdAt}><small>
                    {m.senderName}({formatDate(m.createdAt)}):
                    </small>{m.text}</p>)}
            <div>
                <input value={message} onChange={handleChange}></input>
                <button onClick={handleSend}>send</button>
            </div>
        </div>
}