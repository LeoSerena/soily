import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    username : {
        type: String,
        require: true,
        unique : true,
        validate : (u: string | string[]) => (u.length < 32 && !u.includes('@'))
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    chatIds : [{type : Schema.Types.ObjectId, ref : 'Chat', default : []}],
    tokenVersion: {
        type : Number,
        required : true
    },
    image : {
        data : Buffer,
        contentType : String
    },
    friend_list : [{type : Schema.Types.ObjectId, ref : 'User'}],
    friend_request_pending : [{type : Schema.Types.ObjectId, ref : 'User'}],
    friend_request_sent : [{type : Schema.Types.ObjectId, ref : 'User'}],
    lists_owned : [{type : Schema.Types.ObjectId, ref : 'List'}],
    lists_followed : [{type : Schema.Types.ObjectId, ref : 'List'}],
    books_owned : [{type : Schema.Types.ObjectId, ref : 'Book'}],
    books_followed : [{type : Schema.Types.ObjectId, ref : 'Book'}],
    discussions_owned : [{type : Schema.Types.ObjectId, ref : 'Discussion'}],
    discussions_followed : [{type : Schema.Types.ObjectId, ref : 'Discussion'}],
}, {
    timestamps : true
})

const User = models.User || model('User', userSchema)

export default User