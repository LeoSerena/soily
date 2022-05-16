import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({
    users : [{type : Schema.Types.ObjectId, ref : 'User'}],
    messages : [{type : Schema.Types.ObjectId, ref : 'Message', default : []}]
}, {timestamps : true} )

const Chat =  models.Chat || model('Chat', chatSchema)

export default Chat