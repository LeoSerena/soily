import Discussion from '../database/models/Discussion'
import Discsussion from '../database/models/Discussion'

import { discussionPayload } from '../documents'

export async function getRecentDiscussions(){
    let discussions = await Discsussion.find({
        private : false 
    }, 
    'title tags',
    {
        sort : {date_added: -1}
    })
    return discussions
}


export async function addDiscussion(data : discussionPayload){
    const res = await Discsussion.create(data)
    return res
}

export async function deleteDiscussion(userId : string, discussionId : string){
    const discussion_ = await Discsussion.findById(discussionId, 'owner')
    if(discussion_.owner !== userId){throw new Error('ressource not accessible')}
    const res = await Discsussion.remove({ _id : discussionId })
    return res
}

export async function getDiscussionNames(){
    const discussionNames = await Discsussion.find({}, 'title')
    return discussionNames
}

export async function getDiscussion(name : string){
    const discussion = await Discussion.findOne({ title : name })
    if(discussion){return discussion}
    else{throw new Error(`Discussion with name ${name} was not found`)}
}