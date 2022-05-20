import HeaderComponent from "../components/header/headerComponent"
import DiscussionsComponent from "../components/DiscussionsComponent"
import { serverSideUser } from "../contexts/userContext"

export default function DiscsussionPage({ user }){
    return(<>
        <HeaderComponent/>
        <DiscussionsComponent/>
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