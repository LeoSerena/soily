import { useContext, useEffect } from "react"

import HeaderComponent from "../../components/header/headerComponent"
import { UserContext, serverSideUser, serverSideDiscussion } from '../../contexts/userContext'

export default function Discussion({ user, discussion }){
    const {_, setUser} = useContext(UserContext)
    useEffect(() => {setUser(user)},[UserContext])
    return <>
        <HeaderComponent/>
        <h2>{discussion.title}</h2>
    </>
}

export async function getServerSideProps(context){
    const { name } = context.query
    const user = await serverSideUser(context)
    const discussion = await serverSideDiscussion(context, name, user._id)
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