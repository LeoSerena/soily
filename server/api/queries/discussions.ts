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
