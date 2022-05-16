import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    image : {
        data: Buffer,
        contentType: String
    },
    text : {
        type : String
    },
    pointer : {
        discussion_pointer : {
            discussion_id : Schema.Types.ObjectId,
            ref : 'Discussion'
        },
        message_pointer : {
            message_id : Schema.Types.ObjectId,
            ref : 'Message'
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : 'User'
        },
        timestamp : {
            type : Date,
            default : Date.now
        }
    }
}, {timestamps : true})

const Post = models.Post || model('Post', postSchema)

export default Post