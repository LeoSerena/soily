import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
    senderId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    senderName : {type : String},
    text : {type : String}
}, { timestamps : true})

const Message =  models.Message || model('Message', messageSchema)

export default Message