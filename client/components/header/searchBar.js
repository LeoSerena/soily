import Image from 'next/image'
import searchImg from '../../public/search.png'

export default function SearchBar(){

    return <div className='searchBar'>
        <input placeholder="search..."></input>
        <Image src={searchImg} height='100%' width='30%'/>
    </div>
}