import { createContext, useState } from 'react'
import { serverSideReq } from '../lib/request-auth'

export const UserContext = createContext()

export function UserContextProvider( {children} ){
    
    const [user, setUser] = useState('none')
    return(<UserContext.Provider value={{user, setUser}}> {children} </UserContext.Provider>)
}

export async function serverSideDiscussion(context, name, userId){
    const url = process.env.NODE_ENV == 'development'
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_SERVER_URL_LOCAL
    const [error, discussion] = await serverSideReq(
        context.req, context.res,
        `${url}/discussion`,
        'post',
        {
            title : name,
            userId : userId
        }
    )
    if(error){ console.log(error) }
    else{ return discussion }
}

export async function serverSideUser(context){
    const url = process.env.NODE_ENV == 'development'
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : process.env.NEXT_PUBLIC_SERVER_URL_LOCAL
    if(context.req.headers.cookie){
        const [error, user] = await serverSideReq(
            context.req,
            context.res,
            //'172.18.0.3%3A3001/getUser'
            `${url}/getUser`,
            'get',
            null
          )
          if(error){
              console.log(error)
              return 'none'
          }else{
              return user
          }
    }else{
        // if no cookies -> can't connect
        return 'none'
    }
}


export async function serverSideUserPage(context, userId){
    const url = process.env.NODE_ENV == 'development'
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : process.env.NEXT_PUBLIC_SERVER_URL_LOCAL
    if(context.req.headers.cookie){
        const [error, userPage] = await serverSideReq(
            context.req,
            context.res,
            `${url}/userPage`,
            'post',
            {userId : userId}
        )
        if(error){
            console.log(error)
            return null
        }else{
            return userPage
        }
    }else{
        return null
    }
}