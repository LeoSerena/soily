import { useState, useEffect } from 'react'

import { fetcher } from '../../lib/request'

import Friend from './friend.js'
import AddFriendForm from './addFriendForm'

export default function FriendsComponent({ user, friends }){
    const [chatIds, setChatIds] = useState([])
    useEffect( () => {
        async function getChats(userId){
            const [error, chats] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/user_chats`,
                'post',
                {userId : userId}
            )
            if(error){ console.log(error) }
            setChatIds(chats.chatIds)
        }
        getChats(user._id)
    }, [user._id])


    const [toggleChat, setToggleChat] = useState(false)
    async function toggleChatBox(e){
        e.preventDefault()
        if(!chat){
            const [error, newChat] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/new_chat`,
                'post',
                {senderId : user._id, receiverId : friend_id}
            )
            if(error){console.log(error)}
        }

        setToggleChat(!toggleChat)
    }

    return <div className='friendsComponent'>
            <h3>Friends</h3>
            <AddFriendForm/>
            
            {friends.friend_list.length > 0 && <div className='friendList'>
                {friends.friend_list.map(element => 
                    <Friend 
                        user={user} friend_username={element.username} friend_id={element._id} type='friend' key={element._id} 
                        chat={chatIds.find(c => c.users.includes(element._id))}
                        toggleChatBox={toggleChatBox}/>)}
            </div>}
            
            {friends.friend_request_pending.length > 0 && <div className='pendingList'>
                <h5>Pending</h5>
                {friends.friend_request_pending.map(element => 
                    <Friend user={user} friend_username={element.username} friend_id={element._id} type='pending' key={element._id}/>)}
            </div>}
            
            {friends.friend_request_sent.length > 0 && <div className='sentList'>
                <h5>Sent</h5>
                {friends.friend_request_sent.map(element => 
                    <Friend user={user} friend_username={element.username} friend_id={element._id} type='request' key={element._id}/>)}
            </div>}
        </div>
}

function ChatsComponent({ toggleChat, user, chatId, friend_id}){



    return <div>
        {toggleChat && <ChatBox user={user} chatId={chat} friendId={friend_id}/>}
    </div>
}