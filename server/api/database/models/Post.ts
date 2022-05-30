import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    hasFile : {type : Boolean, default : false},
    file : { type: Schema.Types.ObjectId, ref : 'File'},
    text : { type : String, default : ''},
    links : [{
        type : Schema.Types.ObjectId,
        ref : 'Discussion',
        default : []
    }]
}, {timestamps : true})

const Post = models.Post || model('Post', postSchema)

export default Post