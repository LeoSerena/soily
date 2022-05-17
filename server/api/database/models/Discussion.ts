import { Schema, model, models } from "mongoose";

const discussionSchema = new Schema({
    title : {
        type : String,
        require : true,
        unique : true
    },
    reference : {
        type : Schema.Types.ObjectId, 
        ref : 'Discussion',
        required : true
    },
    tags : [{type : String, default : []}],
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    co_owners : [{
        type : Schema.Types.ObjectId, 
        ref : 'User'
    }],
    private : {
        type : Schema.Types.Boolean,
        default : true
    },
    messages : [{type : Schema.Types.ObjectId, ref : 'Post', default : []}],
    language : {
        type : 'String',
        default : 'english'
    }
}, {timestamps : true} )

// Creates a text type B+tree index on the title and the tags
discussionSchema.index( 
    { title : 'text', tags : 'text' },
    { 
        default_language : 'english',
        language_override : 'language'
    }
)

const Discussion =  models.Discussion || model('Discussion', discussionSchema)

export default Discussion