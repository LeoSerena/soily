import { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Image from 'next/image'

import optionImg from '../../../public/options.jpg'
import FriendsComponent from '../../utils/friendsComponent'
import { fetcher } from '../../../lib/request'
import { socketContext } from '../../../contexts/socketContext.js'


export default function UserComponent({ user, setUser }){
    const url = process.env.NODE_ENV == 'development'
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : process.env.NEXT_PUBLIC_SERVER_URL_LOCAL
    const socket = useContext(socketContext)
    const [toggleOptions, setToggleOptions] = useState(false)
    const [toggleFriends, setToggleFriends] = useState(false)
    const [friends, setFriends] = useState('')

    async function handleLogout(event){
        event.preventDefault()
        setUser('none')
        const [error, logout] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/logout`,
            'post',
            undefined
        )
        socket.disconnect()
        if(error){console.log(error)}
        Router.replace('/')
    }

    async function handleToggleFriends(){
        if(toggleFriends){
            setToggleFriends(false)
        }else{
            const [error, friends] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/getFriends`,
                'post',
                {userId : user._id}
            )
            if(error){
                console.log(error)
            }else{
                setFriends(friends)
                setToggleFriends(true)
            }
        }
    }


    return (
        <div className='userComponent'>
            <div className = 'userOptions' >
                <Image 
                    className='optionImage' 
                    src={optionImg} height='35%' width='35%' 
                    onClick={() => setToggleOptions(!toggleOptions)}
                />
                {toggleOptions && <div className='options' >
                    <button>Manage</button>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={handleToggleFriends}>Friends</button>
                </div>}
            </div>
            <div className='userInfo'>
                <p className='username' onClick={() => Router.replace('/myPage')}>{user.username}</p>
                <Image 
                    className='profilePicture' 
                    src={`${url}/${user.image}`} 
                    height={40} width={40} onClick={() => setToggleOptions(!toggleOptions)}/>
            </div>
            {toggleFriends && <FriendsComponent user={user} friends={friends}/>}
        </div>
    )
}