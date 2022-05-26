import { useContext, useEffect } from "react"

import HeaderComponent from "../../components/header/headerComponent"
import LeftPanel from "../../components/discussion/LeftPanel"
import DiscussionCenter from "../../components/discussion/DiscussionCenter"
import RightPanel from "../../components/discussion/RightPanel"
import { UserContext, serverSideUser, serverSideDiscussion } from '../../contexts/userContext'


export default function Discussion({ user, discussion, recommandations }){
    const {setUser} = useContext(UserContext)
    useEffect(() => {setUser(user)},[UserContext])
    return <>
        <HeaderComponent/>
        <div className="main_container">
            <LeftPanel userId={user._id} discussion={discussion}/>
            <DiscussionCenter userId={user._id} discussion={discussion}/>
            <RightPanel recommandations={recommandations}/>
        </div>
    </>
}

export async function getServerSideProps(context){
    const { name } = context.query
    const user = await serverSideUser(context)
    let userId = (user !== 'none') ? user._id : 'none'
    const discussion = await serverSideDiscussion(context, name, userId)
    // recommandations are the personalized recoomandations proper to a user
    //const recommandations = await serverSideRecommandations(context, user._id)
    return {
        props : {
            user : user,
            discussion : discussion
        }
    }
}