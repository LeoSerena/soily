import { useState } from "react"

import { fetcher } from "../../lib/request"
import NewDiscussionForm from '../discussion/NewDiscussionForm'
import DiscussionLink from "../utils/DiscussionLink"

export default function DiscussionCenter({ discussion, userId }){

    return <div className="discussion_div">
        <h2>{discussion.title}</h2>
        <section>{discussion.description}</section>
        <PostsComponent discussionId={discussion._id} posts={discussion.posts} userId={userId} />
    </div>
}

export function PostsComponent({ posts, userId, discussionId, left }){

    const [currentPost, setCurrentPost] = useState('')
    const [currentPosts, setCurrentPosts] = useState(posts)

    function handleChange(e){setCurrentPost(e.target.value)}
    async function handleSend(e){
        e.preventDefault()
        var [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/post`,
            'post',
            { 
                discussionId : discussionId,
                userId : userId,
                post : {
                    owner : userId,
                    text : currentPost
                }
            }
        )
        if(error){console.log(error)}
        else{
            setCurrentPosts([...currentPosts, response])
            setCurrentPost('')
        }
    }

    return <div>
        {currentPosts.map(post =><Post left={left} userId={userId} key={post._id} post={post}/>)}
        {userId && <form>
            <textarea onChange={handleChange} value={currentPost} placeholder='new message...'/>
            <button onClick={handleSend} type='submit'>Post</button>
        </form>}
    </div>
}


function Post({ post, userId, left }){

    const [toggleForm, setToggleForm] = useState(false)
    const [toggleLinks, setToggleLinks] = useState(false)

    const num_links = post.links.length

    function showLinks(e){
        e.preventDefault()
        setToggleLinks(!toggleLinks)
    }
    
    return <div className="post" key={post._id}>
        <div className="post_content">
            <p>{post.owner.username}</p>
            {post.text}
        </div>
        {!left && <section className="post_links">
            {userId && toggleForm && <NewDiscussionForm postId={post._id} userId={userId}/>}
            {userId && <button onClick={() => setToggleForm(!toggleForm)}>new branch</button>}
            {userId && num_links > 0 && <button onClick={showLinks} className='showLinksButton'>Links ({num_links})</button>}
            {toggleLinks &&   <DiscussionLinks links={post.links}/>}
        </section>}
        </div>

}

function DiscussionLinks({ links }){
    return links.map(link => <DiscussionLink key={link._id} _id={link._id} title={link.title} description={link.description}/>)
}