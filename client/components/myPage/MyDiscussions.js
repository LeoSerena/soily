export default function MyDiscussions({ discussions_owned}){
    return <div className='myDiscussions'>
        <h2>Discussions</h2>
        {discussions_owned.map(d =>  
            <p key={d._id}>{d.title}</p> )}
    </div>
}