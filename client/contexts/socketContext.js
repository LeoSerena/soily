import { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'


export const socketContext = createContext()

export function SocketContextProvider( {children} ){
    
    const [socket, setSocket] = useState()
    useEffect( () => { setSocket(io.connect(`${process.env.NEXT_PUBLIC_IO_SERVER_URL}`)) }, [])
    
    return(<socketContext.Provider value={socket}> {children} </socketContext.Provider>)
}

export async function serverSideUser(context){
    // may want to fetch notifications here
}
