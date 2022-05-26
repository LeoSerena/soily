import { useEffect, useState } from "react"

import DiscussionLink from '../utils/DiscussionLink'

export default function MyHistory(){

    const [hist, setHist] = useState([])

    useEffect(
        () => {
            const localHist = JSON.parse(localStorage.getItem('history'))
            if(localHist){
                setHist(localHist)
            }
        }, []
    )

    return <div>
        <h2>History</h2>
            {hist.map(h => <DiscussionLink title={h.title} _id={h._id}/>)}
        </div>
}