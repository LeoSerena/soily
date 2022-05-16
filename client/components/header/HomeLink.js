import Link from 'next/link'

export default function HomeLink() {
    return (<div  className='ToolBar'>
        <Link href='/'>
            <a>Soil</a>
        </Link>
    </div>
    )
}