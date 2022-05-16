import { Schema, model, models } from "mongoose";

const elementSchema = new Schema({
    element1 : {
        type : String,
        required : true,
    },
    element2 : {
        type : String,
        required : true,
    }
})

const listSchema = new Schema({
    original_creator : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    name : {
        type : String,
        required : true,
    },
    themes : [{type : String}],
    read_rights : {
        type : String,
        default : 'owner'
    },
    write_rights : [{type : Schema.Types.ObjectId, ref : 'User'}],
    list : [{type : elementSchema, default : []}]
}, {timestamps : true})

const List = models.List || model('List', listSchema)

export default List