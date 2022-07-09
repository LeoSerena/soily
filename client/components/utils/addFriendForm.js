import { useState } from "react"

export default function AddFriendForm(){

    const [friendValue, setFriendValue] = useState('')
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

    return <form className='addFriendForm' onSubmit={handleFriendRequestSubmit}>
        <input id='addFriendInput' name='friend' placeholder='add friend...' value={friendValue} onChange={handleChange}/>
        <input id='addFriendSubmit' type="submit" value="add" />
    </form>
}