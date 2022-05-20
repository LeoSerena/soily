import { useId, useState } from "react"
import Router from "next/router"

import { fetcher } from "../../lib/request"

export default function NewDiscussionForm({ postId, userId }){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState()
    const [private_, setPrivate] = useState(false)
    const [language, setLanguage] = useState('english')

    function handleChange(e){
        const value = e.target.value
        switch(e.target.name){
            case 'title':
                setTitle(value)
                break;
            case 'description':
                setDescription(value)
                break;
            case 'tags':
                setTags(value)
                break;
            case 'private':
                setPrivate(!private_)
                break;
            case 'language':
                setLanguage(value)
                break;
            default:
                console.log(`${e.target.name} not recognized`)
                break;
        }
    }

    async function handleNewDiscussion(e){
        e.preventDefault()
        const [error, response] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/newDiscussion`,
            'post',
            {
                userId : userId,
                data : {
                    title : title,
                    owner : userId,
                    description : description,
                    reference : postId? postId : null,
                    tags : tags,
                    language : language,
                    private : private_
                }
            }
        )
        if(error){console.log(error)}
        else{
            Router.replace(`/discussions/${title}`)
        }
    }

    return <form>
            <label>title</label>
            <input onChange={handleChange} name='title' placeholder="title" value={title}></input>
            <label>tags</label>
            <input onChange={handleChange} name='tags' placeholder="tags" value={tags}></input>
            <label>language</label>
            <select onChange={handleChange} name='language'>
                <option value='english'>english</option>
                <option value='français'>français</option>
                <option value='italien'>italien</option>
            </select>
            <label>private</label>
            <input onChange={handleChange} type='checkbox' name='private' value={private_}></input>
            <label>description</label>
            <textarea onChange={handleChange} name='description' placeholder="description" checked={description}></textarea>
            <button onClick={handleNewDiscussion}>create</button>
        </form>
}