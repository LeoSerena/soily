import { useState } from "react"
import Input from "../utils/input"

export default function MyLists() {

    const [toggleNewList, setToggleNewList] = useState(false)
    function newList(){setToggleNewList(!toggleNewList)}

    return <div className='myLists'>
        <h2>Lists</h2>
        <button onClick={newList}>+</button>
        {toggleNewList && <form>
                <Input></Input>
            </form>}
    </div>
}