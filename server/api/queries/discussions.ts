import Post from '../database/models/Post'
import Discussion from '../database/models/Discussion'
import User from '../database/models/User'
import Link from '../database/models/Link'
import { discussionPayload, postPayload } from '../documents'


export async function getRecentDiscussions(){
    let discussions = await Discussion.find({
        private : false 
    }, 
    'title tags description',
    {
        sort : {date_added: -1}
    }).limit(30)
    return discussions
}


export async function addDiscussion(data : discussionPayload, userId : string){
    if(data.reference){
        // create the discussion
        const res = await Discussion.create(data)
        // update the user with the discussion
        await User.updateOne( { _id : userId }, {$push : { discussions_owned : res._id }} )
        // add a link
        await Link.create({ from : data.reference, to : res._id, owner : userId })
        // add the reference to the post
        await Post.updateOne( { _id : data.reference },  { $push : { links : res._id }})
        return res
    }else{
        data.reference = process.env.SOIL_REF
        const res = await Discussion.create(data)
        await User.updateOne( { _id : userId }, {$push : { discussions_owned : res._id }} )
        await Link.create({ from : data.reference, to : res._id, owner : userId })
        return res
    }
}
    

export async function deleteDiscussion(userId : string, discussionId : string){
    const discussion_ = await Discussion.findById(discussionId, 'owner')
    if(discussion_.owner !== userId){throw new Error('ressource not accessible')}
    const res = await Discussion.remove({ _id : discussionId })
    return res
}

export async function getDiscussionNames(){
    const discussionNames = await Discussion.find({}, 'title')
    return discussionNames
}

export async function getDiscussion(name : string){
    const discussion = await Discussion.findOne({ title : name }
        ).populate( { 
            path : 'posts' ,
            populate : [
                { path : 'owner', select : 'username'},
                { path : 'links', select : 'title'}
            ]
        })
    if(discussion){return discussion}
    else{throw new Error(`Discussion with name ${name} was not found`)}
}

export async function postPost(discussionId : string, post : postPayload){
    let newPost = await Post.create(post)
    newPost = await newPost.populate({ path : 'owner', select : 'username'})
    await Discussion.updateOne(
        {_id : discussionId}, 
        { $push : { posts : newPost._id } }
    )
    return newPost
}