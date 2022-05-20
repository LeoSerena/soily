import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    image : {
        type: Buffer
    },
    text : {
        type : String
    },
    links : [{
        type : Schema.Types.ObjectId,
        ref : 'Discussion',
        default : []
    }]
}, {timestamps : true})

const Post = models.Post || model('Post', postSchema)

export default Post