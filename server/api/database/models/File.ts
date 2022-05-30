import { Schema, model, models } from "mongoose";

const fileSchema = new Schema({
    owner : {type : Schema.Types.ObjectId, ref : 'User'},
    type : { type : String, required : true},
    filename : { type : String, required : true },
    path : { type : String, required : true },
    size : {type : Number, required : true}
}, {timestamps : true} )

const File =  models.Chat || model('File', fileSchema)

export default File