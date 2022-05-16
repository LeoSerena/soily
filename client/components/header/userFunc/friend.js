import Router from 'next/router'
import { useState } from 'react'

import ChatBox from '../../utils/chatBox'
import { fetcher } from '../../../lib/request'


export default function Friend({ user, friend_username, friend_id, type, chatId}){

    const [toggleChat, setToggleChat] = useState(false)

    async function handleAnswer(value){
        const [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/answerFriendRequest`,
            'post',
            {userId : user._id, friendId : friend_id, answer : value}
        )
        if(error){console.log(error)}
        if(response === 'success'){Router.reload()}
    }

    async function handleDelete(e){
        e.preventDefault()
        const [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/deleteFriend`,
            'post',
            {userId : user._id, friendId : friend_id}
        )
        if(error){console.log(error)}
        if(response === 'success'){Router.reload()}
    }

    function toggleChatBox(e){
        e.preventDefault()
        setToggleChat(!toggleChat)
    }

    return (
        <div className={type}>
            <p onClick={toggleChatBox}>{friend_username}</p>
            {type=='pending' && <div>
                <button onClick={() => handleAnswer(true)}>accept</button>
                <button onClick={() => handleAnswer(false)}>decline</button></div>}
            {type=='friend' && (<div>
                <button onClick={handleDelete}>DEL</button>
                </div>)}
            {type=='friend' && toggleChat && <ChatBox user={user} chatId={chatId} friendId={friend_id}/>}
        </div>
    )

}