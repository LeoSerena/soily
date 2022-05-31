import Link from 'next/link'
import { useContext, useState } from 'react'

import { UserContext } from '../../contexts/userContext'
import RightHeader from './rightHeader'
import SearchBar from './searchBar'
import NewDiscussionForm from '../discussion/NewDiscussionForm'

export default function ToolBar() {
    const {user} = useContext(UserContext)
    const [toggle, setToggle] = useState(false)
    return (<div  className='toolBar'>
        <div className='newAndHome'>
            <Link  href='/'><a className='homeLink'>Soil</a></Link>
            {user != 'none' && <p className='newDiscussion' onClick={() => setToggle(!toggle)}>New Discussion</p>}
            {user != 'none' && toggle  && <NewDiscussionForm userId={user._id}/>}
        </div>
        <SearchBar user={user}/>
        <RightHeader/>
    </div>
    )
}