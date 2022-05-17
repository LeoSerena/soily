import { useState, useEffect } from "react"
import Router from "next/router"
import axios from 'axios'

export default function RecentDiscussions() {

    const [discussions, setDiscussions] = useState([])

    useEffect(
        () => {
            async function getRecentDisccussions(){
                let discussions = await axios({
                    method : 'get',
                    url :`${process.env.NEXT_PUBLIC_SERVER_URL}/recentDiscussions`
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
            {discussions.map(discussion => <li onClick={() => Router.replace(`/discussions/${discussion.title}`)} key={discussion._id}>{discussion.title}</li>)}
        </ul>
    </section>)
        
}