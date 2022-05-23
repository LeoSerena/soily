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
            <LeftPanel/>
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

// export async function getStaticPaths(){
//     // returns an array of possible values for [name]
//     const [error, discussionNames] = await fetcher(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/discussionNames`,
//         'get',
//         null
//     )
//     if(error){
//         console.log(error)
//         return error
//     }else{
//         const paths = discussionNames.map((n) => ({ params : {name : n.title} }))

//         return { paths, fallback : 'blocking'}
//     }

// }

// export async function getStaticProps(context){
//     console.log(context)
//     const { params } = context
//     const [error, data] = await fetcher(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/discussion`,
//         'post',
//         {title : params.name})
//     if(error){
//         console.log(error)
//         return error
//     }else{
//         return { 
//             props : { discussion : data },
//             //revalidate : 60 
//             // this will update the page *at most* every 60 seconds
//             // and when a request comes in
//         }
//     }
// }