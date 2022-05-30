import Link from 'next/link'
import { useContext, useState } from 'react'

import { UserContext } from '../../contexts/userContext'
import NewDiscussionForm from '../discussion/NewDiscussionForm'
import RightHeader from './rightHeader'

export default function ToolBar() {

    const [toggle, setToggle] = useState(false)
    const {user} = useContext(UserContext)

    return (<div  className='toolBar'>
        <Link  href='/'>
            <a className='homeLink'>Soil</a>
        </Link>
        {user != 'none' && !toggle && <p className='newDiscussion' onClick={() => setToggle(true)}>New Discussion</p>}
        {user != 'none' && toggle  && <NewDiscussionForm userId={user._id}/>}
        <RightHeader/>
    </div>
    )
}