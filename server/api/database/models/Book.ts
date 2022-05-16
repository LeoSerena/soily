import { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : 'User'
    },
    title : {
        type: String,
        require: true
    },
    author: {
        type: String
    },
    release_year: {
        type: Number,
        default: 0
    },
    notes : {
        type : String,
        default : ''
    }
}, {timestamps:true})

const Book = models.Book || model('Book', bookSchema)

export default Book