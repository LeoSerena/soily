import { useState } from "react"

import { fetcher } from "../../lib/request"
import NewDiscussionForm from '../discussion/NewDiscussionForm'

export default function DiscussionCenter({ discussion, userId }){

    return <div className="discussion_div">
        <h2>{discussion.title}</h2>
        <section>{discussion.description}</section>
        <PostsComponent discussionId={discussion._id} posts={discussion.posts} userId={userId} />
    </div>
}

function PostsComponent({ posts, userId, discussionId }){

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
        {currentPosts.map(post =><Post userId={userId} key={post._id} post={post}/>)}
        {userId && <form>
            <textarea onChange={handleChange} value={currentPost} placeholder='new message...'/>
            <button onClick={handleSend} type='submit'>send</button>
        </form>}
    </div>
}


function Post({ post, userId }){

    const [toggle, setToggle] = useState(false)

    function addLink(e){
        e.preventDefault()
        // need to find a nice way to create links
    }
    
    return <div>
        <p>{post.owner.username}</p>
        {/* {userId && <button onClick={addLink}>add link</button>} */}
        {userId && toggle && <NewDiscussionForm postId={post._id} userId={userId}/>}
        {userId && <button onClick={() => setToggle(!toggle)}>create new</button>}        
        <section>{post.text}</section>
        {post.links.map(link => <p key={link._id}>{link.title}</p>)}
        </div>

}

