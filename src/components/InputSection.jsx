import { useState } from 'react'

export default function InputSection({area, prevVal, setFunction}){
    const [value, setValue] = useState(prevVal);

    function handleChange(event) {
        // console.log("InputSection");
        setValue(event.target.value);
        setFunction(event.target.value);
    }

    return(
        <li>
            <label>{area}:</label>
            <input className="input_box" type="number" required value={value} onChange={handleChange} />
        </li>
    )
}