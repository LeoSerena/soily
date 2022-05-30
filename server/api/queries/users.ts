import bcrypt from 'bcrypt'

import User from '../database/models/User'

interface registerBody {
    username: string
    password: string
    email: string
    tokenVersion : number
}

async function hashPassword(password : string){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export async function createUser(userInfo : registerBody){
    try{
        const { password } = userInfo
        const hashedPassword = await hashPassword(password)
        userInfo.password = hashedPassword
        userInfo.tokenVersion = 0
        const user = await User.create(userInfo)
        return user
    }catch (error){
        return error
    }

}

export async function getUserVersionById(userId : string) {
    return User.findOne({ userId })
}

export async function getFriendsFromId(userId :string){
    return User.findById(userId,
        '_id friend_list friend_request_pending friend_request_sent'
    ).populate({
        path : 'friend_list',
        select : 'username'
    }).populate({
        path : 'friend_request_sent',
        select : 'username'
    }).populate({
        path : 'friend_request_pending',
        select : 'username'
    })
}

export async function getUserById(userId : string){
    return User.findById(userId)
}

export async function friendRequest(userId : string, friend_credential : string){
    User.findOne(
        { username : friend_credential},
        '_id username'
    ).exec((err, friend) => {
        if(err||!friend){ return 'The given username or email was not found'}
        else if (friend.username!=friend_credential){return 'The given username or email was not found'}
        // Add friend request pending
        User.updateOne(
            {_id : userId},
            { $push : {friend_request_sent : friend._id}}
        ).exec((err) => {
            if(err){return err}
            else{
                // send friend request
                User.updateOne(
                    {_id : friend._id},
                    {$push : {friend_request_pending : userId}}
                ).exec((err) => {
                    if(err){return err}
                    else{return 'success'}
                })
            }
        })
    })
}

export async function answerFriendRequest(userId : string, friendId : string, answer : boolean){
    if(answer){
        User.updateOne(
            {_id : userId},
            {
                $push : {friend_list : friendId},
                $pull : {friend_request_pending : friendId}
            }
        ).exec((err) => {
            if(err){return err}
            else{
                User.updateOne(
                    {_id : friendId},
                    {
                        $push : {friend_list : userId},
                        $pull : {friend_request_sent : userId}
                    }
                ).exec((err) => {
                    if(err){ return err}
                    else{ return 'success'}
                })
            }
        })
    }else{
        User.updateOne(
            {_id : userId},
            { $pull : {friend_request_pending : friendId} }
        ).exec((err) => {
            if(err){return err}
            else{
                User.updateOne(
                    {_id : friendId},
                    { $pull : {friend_request_sent : userId} }
                ).exec((err) => {
                    if(err){ return err }
                    else{ return'success' }
                })
            }
        })
    }


}

export async function deleteFriend(userId : string, friendId : string){
    User.updateOne(
        {_id : userId},
        { $pull : {friend_list : friendId} }
    ).exec((err) => {
        if(err){return err}
        else{
            User.updateOne(
                {_id : friendId},
                { $pull : {friend_list : userId} }
            ).exec((err) => {
                if(err){return err}
                else{return 'success'}
            })
        }
    })
}

export async function getUserPage(userId : string){
    const data = await User.findById(userId,
        'lists_owned lists_followed books_owned books_followed discussions_owned discussions_followed'
    ).populate({path : 'lists_owned', select : ''}
    ).populate({path : 'lists_followed'}
    ).populate({path : 'books_owned'}
    ).populate({path : 'books_followed'}
    ).populate({path : 'discussions_owned'}
    ).populate({path : 'discussions_followed'})
    return data
}