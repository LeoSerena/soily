import { createContext, useState } from 'react'
import { serverSideReq } from '../lib/request-auth'

export const UserContext = createContext()

export function UserContextProvider( {children} ){
    
    const [user, setUser] = useState('none')
    return(<UserContext.Provider value={{user, setUser}}> {children} </UserContext.Provider>)
}

export async function serverSideDiscussion(context, name, userId){
    const [error, discussion] = await serverSideReq(
        context.req, context.res,
        `${process.env.NEXT_PUBLIC_SERVER_URL}/discussion`,
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
    if(context.req.headers.cookie){
        const [error, user] = await serverSideReq(
            context.req,
            context.res,
            `${process.env.NEXT_PUBLIC_SERVER_URL}/getUser`,
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
    if(context.req.headers.cookie){
        const [error, userPage] = await serverSideReq(
            context.req,
            context.res,
            `${process.env.NEXT_PUBLIC_SERVER_URL}/userPage`,
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