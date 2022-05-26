import DiscussionLink from "../utils/DiscussionLink";

export default function MyDiscussions({ discussions_owned}){
    return <div className='myDiscussions'>
        <h2>Discussions</h2>
        {discussions_owned.map(d =>  
            <DiscussionLink _id={d._id} title={d.title}/> )}
    </div>
}