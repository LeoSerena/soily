import { useState, useEffect } from 'react'

import Router from 'next/router'
import { fetcher } from '../../lib/request'

import Friend from './friend.js'
import Input from './input'

export default function FriendsComponent({ user, friends }){

    const [friendValue, setFriendValue] = useState('')
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

    function handleChange(event){setFriendValue(event.target.value)}

    function verifyFriendRequest(){
        // sanitize the friend request
        if(friends.friend_request_sent.map(f=>f.username).includes(friendValue)){
            alert('friend request already sent')
            return false
        }else if(friends.friend_list.map(f=>f.username).includes(friendValue)) {
            alert('this user is already your friend')
            return false
        }else if(friendValue===user.username){
            alert('you are already friend with yourself')
            return false
        }// }else if(friends.friend_request_pending.map(f=>f.username).includes(friend_username)){
        //     // handle friend acceptance
        // }
        return true
    }

    async function handleFriendRequestSubmit(e){
        e.preventDefault()
        const result = verifyFriendRequest()
        if(result){
            const [error, response] = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/friendRequest`,
            'post', { userId : user._id, friend_username : friendValue })
            if(error){console.log(error)}
            if(response === 'success'){
                alert(`friend request sent to ${friendValue}`)
                Router.reload()
            }
        }
    }

    return (
        <div className='friendsComponent'>
            <form onSubmit={handleFriendRequestSubmit}>
                <Input withLabel={true} name='friend' inputNameDisplay='add friend' value={friendValue} handleChange={handleChange}/>
                <input type="submit" value="add" />
            </form>
            {friends.friend_list.length > 0 && <div className='friendListWrapper'>
                <h3>Friends</h3>

                <div className='friendList'>
                    {friends.friend_list.map(element => 
                    <Friend 
                        user={user} friend_username={element.username} friend_id={element._id} type='friend' key={element._id} 
                        chat={chatIds.find(c => c.users.includes(element._id))}
                    />)}
                </div>
            </div>}
            {(friends.friend_request_pending.length > 0 || friends.friend_request_sent.length > 0) && <div>
                <h4>Requests</h4>
                    {friends.friend_request_pending.length > 0 && <div className='pendingList'>
                        <h5>Pending</h5>
                        {friends.friend_request_pending.map(element => 
                        <Friend user={user} friend_username={element.username} friend_id={element._id} type='pending' key={element._id}/>)}
                    </div>
                }
                {friends.friend_request_sent.length > 0 && <div className='sentList'>
                    <h5>Sent</h5>
                    {friends.friend_request_sent.map(element => 
                    <Friend user={user} friend_username={element.username} friend_id={element._id} type='request' key={element._id}/>)}
                </div>}
            </div>}
        </div>)
}