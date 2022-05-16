export default function Input({inputNameDisplay, name, value, handleChange}) {

    return (
        <label>
            {inputNameDisplay}:
            <input type = 'text' name = {name} value = {value} onChange = {handleChange} required/>
        </label>
    )

}