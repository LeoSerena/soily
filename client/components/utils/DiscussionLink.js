import Router from "next/router"
import { useState } from "react"

export default function DiscussionLink( {title, _id, description} ){

    const [toggleDesc, setToggleDesc] = useState(false)

    function handleClick(e){
        e.preventDefault()
        Router.replace(`/discussions/${title}`)
    }

    return <div key={_id}>
        <p 
        className="discussionLink" 
        onClick={(e) => handleClick(e)}
        onMouseEnter={() => setToggleDesc(true)}
        onMouseLeave={() => setToggleDesc(false)}
        >{title}</p>
        {/* {toggleDesc && <p>{description}</p>} */}
        </div>
}