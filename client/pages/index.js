import { useContext, useEffect } from 'react'

import HeaderComponent from '../components/header/headerComponent'
import RecentDiscussions from '../components/homepage/RecentDiscussions'
import { UserContext, serverSideUser } from '../contexts/userContext'

export default function Homepage({ user }) {

    const {_, setUser} = useContext(UserContext)
    useEffect(() => {setUser(user)},[UserContext])
    
    return (<>
        <HeaderComponent/>
        <RecentDiscussions/>
    </>)
}

export async function getServerSideProps(context){return serverSideUser(context)}
