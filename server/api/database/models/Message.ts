import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
    senderId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    senderName : {type : String},
    text : {type : String, default : ''},
    image : {type : Buffer, default : null},
    likes : {type : Number, default : 0},
    diskiles : {type : Number, default : 0}
}, { timestamps : true})

const Message =  models.Message || model('Message', messageSchema)

export default Message