import HeaderComponent from "../components/header/headerComponent"
import DiscussionComponent from "../components/discussionComponent/DiscussionComponent"
import { serverSideUser } from "../contexts/userContext"

export default function DiscsussionPage({ user }){
    return(<>
        <HeaderComponent/>
        <DiscussionComponent/>
        </>
    )
}


export async function getServerSideProps(context){
    let user = await serverSideUser(context)
    return {
        props : {
            user : user,
        }
    }
}