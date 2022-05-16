
import {ConnectOptions, connect} from "mongoose"

const DB_CLUSTER = process.env.DB_CLUSTER
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

if (!DB_CLUSTER || !DB_USER || !DB_PASSWORD){
    throw new Error(' The environment is missing information regarding the mongoDB connectivity ')
}
const connect_url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-1mcyu.mongodb.net/${DB_CLUSTER}?retryWrites=true&w=majority`

const options : ConnectOptions = {
    // useNewUrlParser : true,
    // useUnifiedTopology: true,
    // useFindAndModify : false,
    autoIndex : !(process.env.NODE_ENV==='development') // when in production
}

var DBconnect = async function(){
    await connect(connect_url, options).then(
        () => console.log('connected to mongoDB'),
        err => console.log(err)
    )
}

export default DBconnect;