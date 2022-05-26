import { useState, useEffect } from "react"
import axios from 'axios'
import DiscussionLink from "../utils/DiscussionLink"

export default function RecentDiscussions() {

    const [discussions, setDiscussions] = useState([])

    useEffect(
        () => {
            async function getRecentDisccussions(){
                let discussions = await axios({
                    method : 'get',
                    url :`${process.env.NEXT_PUBLIC_SERVER_URL}/recentDiscussions`,
                    withCredentials : true
                })
                .then(d => setDiscussions(d.data))
                .catch(error => console.log(error))
                return discussions
            }
            getRecentDisccussions()
        },[]
    )

    return (<section className="recentDiscussions">
        <h2>
        Recent Discussions
        </h2>
        <ul>
            {discussions.map(discussion => <DiscussionLink
                key={discussion._id}
                title={discussion.title} 
                _id={discussion._id} 
                description={discussion.description}
            />)}
        </ul>
    </section>)
        
}