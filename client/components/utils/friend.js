import Router from 'next/router'

import { fetcher } from '../../lib/request'


export default function Friend({ user, friend_username, friend_id, type, toggleChatBox}){

    async function handleAnswer(value){
        const [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/answerFriendRequest`,
            'post',
            {userId : user._id, friendId : friend_id, answer : value}
        )
        if(error){console.log(error)}
        if(response === 'success'){
            // need to change behaviour
            Router.reload()
        }
    }

    async function handleDelete(e){
        e.preventDefault()
        const [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/deleteFriend`,
            'post',
            {userId : user._id, friendId : friend_id}
        )
        if(error){console.log(error)}
        if(response === 'success'){
            // need to change behaviour
            Router.reload()
        }
    }

    return (
        <div className={type}>
            <p>{friend_username}</p>
            {type=='pending' && <div>
                <button onClick={() => handleAnswer(true)}>accept</button>
                <button onClick={() => handleAnswer(false)}>decline</button></div>}
            {type=='friend' && (<div>
                <button onClick={toggleChatBox}>CHAT</button>
                <button onClick={handleDelete}>DEL</button>
                </div>)}
        </div>
    )

}