import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
    from : {
        type : Schema.Types.ObjectId,
        ref : 'Post'
    },
    to : {
        type : Schema.Types.ObjectId,
        ref : 'Discussion'
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})


const Link = models.Pointer || model('Link', linkSchema)

export default Link