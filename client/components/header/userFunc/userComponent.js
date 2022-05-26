import { useState, useContext, useEffect } from 'react'
import Router from 'next/router'

import Friend from './friend.js'
import Input from '../../utils/input'
import { fetcher } from '../../../lib/request'
import { socketContext } from '../../../contexts/socketContext.js'


export default function UserComponent({ user, setUser }){

    const socket = useContext(socketContext)
    const [toggleFriends, setToggleFriends] = useState(false)
    const [friends, setFriends] = useState('')

    async function handleLogout(event){
        event.preventDefault()
        setUser('none')
        const [error, logout] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/logout`,
            'post',
            undefined
        )
        socket.disconnect()
        if(error){console.log(error)}
        Router.replace('/')
    }

    async function handleToggle(){
        if(toggleFriends){
            setToggleFriends(false)
        }else{
            const [error, friends] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/getFriends`,
                'post',
                {userId : user._id}
            )
            if(error){
                console.log(error)
            }else{
                setFriends(friends)
                setToggleFriends(true)
            }
        }
    }


    return (
        <div className='userComponent'>
            <p onClick={handleToggle}>{user.username}</p><button onClick={() => Router.replace('/myPage')}>my Page</button>
            <p>{user.email}</p>
            <button onClick={handleLogout}>log out</button>
            {toggleFriends && <FriendsComponent user={user} friends={friends}/>}
            
        </div>
    )
}


function FriendsComponent({ user, friends}){

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
        <div>
            {friends.friend_list.length > 0 && <div className='friendList'>
                <h3>Friends</h3>
                <form onSubmit={handleFriendRequestSubmit}>
                    <Input withLabel={true} name='friend' inputNameDisplay='add friend' value={friendValue} handleChange={handleChange}/>
                    <input type="submit" value="add" />
                </form>
                {friends.friend_list.map(element => 
                <Friend 
                    user={user} friend_username={element.username} friend_id={element._id} type='friend' key={element._id} 
                    chat={chatIds.find(c => c.users.includes(element._id))}
                />)}
            </div>}
            {(friends.friend_request_pending.length > 0 || friends.friend_request_sent.length > 0) && <div>
                <h4>
                    Requests
                </h4>
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