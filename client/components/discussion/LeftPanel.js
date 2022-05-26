import { useEffect, useState } from "react"
import { fetcher } from "../../lib/request"

import DiscussionLink from '../utils/DiscussionLink'
import { PostsComponent } from "./DiscussionCenter" 
import { add_to_history } from "../../lib/localSessionStorage"

export default function LeftPanel({ userId, discussion}){

    const [hist, setHist] = useState([])
    const [prev_disc, set_prev_disc] = useState()

    useEffect(() => {
        //const history = JSON.parse(sessionStorage.getItem('history'))
        const h = {'title' : discussion.title, '_id' : discussion._id}
        const history = add_to_history(h)
        setHist(history)
    },[])

    useEffect(() => {
        async function getLastDiscussion(){
            const name = hist.at(-2).title
            const [error, disc] = await fetcher(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/discussion`,
                'post',
                {
                    title : name,
                    userId : userId
                }
            )
            if(error){console.log(error)}
            else{ set_prev_disc(disc) }
            return 0
        }
        if(hist.length > 1){ getLastDiscussion() }

    }, [hist])

    return <div className="leftPanel">
        <h2>History</h2>
        {hist && <div className="sessionHistory">
            {hist.map((h,i) => <DiscussionLink key={i} title={h.title} _id={h._id}/>)}
        </div>}
        {prev_disc && <div className="previousDiscussion">
            <h3>{prev_disc.title}</h3>
            <PostsComponent discussionId={prev_disc._id} posts={prev_disc.posts} userId={userId} left={true}/>
        </div>}
    </div>
}