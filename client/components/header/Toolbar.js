import Link from 'next/link'
import { useContext, useState } from 'react'

import { UserContext } from '../../contexts/userContext'
import NewDiscussionForm from '../discussion/NewDiscussionForm'

export default function ToolBar() {

    const [toggle, setToggle] = useState(false)
    const {user} = useContext(UserContext)

    return (<div  className='toolBar'>
        <Link href='/'>
            <a>Soil</a>
        </Link>
        {!toggle && <p onClick={() => setToggle(true)}>New Discussion</p>}
        {user != 'none'  && toggle  && <NewDiscussionForm userId={user._id}/>}
    </div>
    )
}