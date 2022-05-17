import { useContext, useEffect } from 'react'
import { UserContext, serverSideUser, serverSideUserPage } from '../contexts/userContext'

import MyPageComponents from '../components/myPage/MyPageComponents'
import HeaderComponent from '../components/header/headerComponent'


export default function userPage({ user, pageContent }) {
    const {_, setUser} = useContext(UserContext)
    useEffect(() => {setUser(user)},[UserContext])
    return (<>
        <HeaderComponent/>
        <MyPageComponents pageContent={pageContent} userId={user._id}/>
    </>)
}

export async function getServerSideProps(context){
    const user = await serverSideUser(context)
    const pageContent = await serverSideUserPage(context, user._id)
    return {
        props : {
            user : user,
            pageContent : pageContent
        }
    }
}