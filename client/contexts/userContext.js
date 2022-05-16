import { createContext, useState } from 'react'
import { serverSideReq } from '../lib/request-auth'

export const UserContext = createContext()

export function UserContextProvider( {children} ){
    
    const [user, setUser] = useState('none')


    return(<UserContext.Provider value={{user, setUser}}> {children} </UserContext.Provider>)
}

export async function serverSideUser(context){
    const [error, user] = await serverSideReq(
        context.req,
        context.res,
        `${process.env.NEXT_PUBLIC_SERVER_URL}/getUser`,
        'get',
        null
      )
      if(error){
          console.log(error)
          return { props : { user : 'none' }}
      }else{
          return { props : { user } }
      }
}

export async function serverSideUserPage(context, userId){
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
}