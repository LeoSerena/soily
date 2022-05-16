import { useContext, useEffect } from "react"

import UserComponent from "./userFunc/userComponent"
import RegisterLogin from './registerLogin'
import { UserContext } from "../../contexts/userContext"
import { socketContext } from "../../contexts/socketContext"

export default function RightHeader(){

    const {user, setUser} = useContext(UserContext)
    const socket = useContext(socketContext)
    useEffect( () => {
        if(user != 'none'){ socket.emit('connectUser', {userId : user._id}) }
    },[user])
    return <div className='right_header_container'>
            {user!='none'
            ? <UserComponent user={user} setUser={setUser}/> 
            : <RegisterLogin setUser={setUser}/>}
            </div>
}
