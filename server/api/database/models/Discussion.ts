import { Schema, model, models } from "mongoose";

const discussionSchema = new Schema({
    title : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        require : true
    },
    reference : { 
        // maybe put more information in there: 
        // a subdocument containing info on the discussion the post comes from (name id desc)
        type : Schema.Types.ObjectId, 
        ref : 'Post',
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
        ref : 'User',
        default : []
    }],
    private : {
        type : Schema.Types.Boolean,
        default : true
    },
    posts : [{type : Schema.Types.ObjectId, ref : 'Post', default : []}],
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