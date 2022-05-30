import { useContext, useEffect } from 'react'

import HeaderComponent from '../components/header/headerComponent'
import LeftPanel from '../components/discussion/LeftPanel'
import RecentDiscussions from '../components/homepage/RecentDiscussions'
import { UserContext, serverSideUser } from '../contexts/userContext'

export default function Homepage({ user }) {

    const {setUser} = useContext(UserContext)
    useEffect(() => {setUser(user)},[UserContext])
    
    return (<div className='main'>
        <HeaderComponent/>
        <RecentDiscussions/>
    </div>)
}

export async function getServerSideProps(context){
    const user = await serverSideUser(context, context.query.name)
    return { props : 
        { user : user } 
    }
}
