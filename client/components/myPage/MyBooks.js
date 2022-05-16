import { useState } from "react"

import { fetcher } from "../../lib/request"

export default function MyBooks({ owned_books, userId }){

    const [owned, setOwned] = useState(owned_books)
    const [toggleForm, setToggleForm] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [release, setRelease] = useState('')

    async function handleDelete(e, bookId){
        e.preventDefault()
        const [error, res] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/deleteBook`,
            'post',
            {
                userId : userId,
                bookId : bookId
            }
        )
        if(error){console.log(error)}
        else{
            alert('book deleted successfully')
            setOwned(owned.filter(b => b._id !== bookId))
        }
    }

    async function handleSubmit(e){
        e.preventDefault()
        const [error, res] = await fetcher(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/addBook`,
            'post',
            {
                userId : userId,
                book : {
                    userId : userId,
                    title : title,
                    author : author,
                    release_year : release
                }
            }
        )
        if(error){console.log(error)}
        else{
            alert('book added successfully')
            setOwned([...owned, res])
            setAuthor('')
            setTitle('')
            setRelease('')
            setToggleForm(false)
        }

    }

    function handleSortClick(e, byValue){
        e.preventDefault()
        let tmp = [...owned]
        setOwned(tmp.sort((a,b) => b[byValue] < a[byValue]?  1 : -1)) 
    }

    return <div className='myBooks'>
        <h2>Books</h2>
        {toggleForm 
            ? (<form>
                <label>title</label>
                <input value={title} onChange={(v) => setTitle(v.target.value)}/>
                
                <label>author</label>
                <input value={author} onChange={(v) => setAuthor(v.target.value)}/>
                
                <label>title</label>
                <input value={release} onChange={(v) => setRelease(v.target.value)}/>
                
                <button type='submit' onClick={handleSubmit}>add</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    setToggleForm(false)
                }}>cancel</button>
            </form>)
            : <button onClick={()=>setToggleForm(!toggleForm)}>new book</button>}
            <table>
                <thead>
                    <tr>
                        <th onClick={(e) => handleSortClick(e,'title')}>title</th>
                        <th onClick={(e) => handleSortClick(e,'author')}>author</th>
                        <th onClick={(e) => handleSortClick(e,'release_year')}>release_year</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {owned.map( b => <tr key={b._id}>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.release_year}</td>
                        <td onClick={(e) => handleDelete(e,b._id)}>DEL</td>
                    </tr>)}
                </tbody>
            </table>
            
    </div>
}