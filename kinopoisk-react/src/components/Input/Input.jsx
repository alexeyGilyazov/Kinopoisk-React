import './Input.css'

export default function Input({ ...props }) {
    return (
        <input className='input' onChange={props.handleInputChange} value={props.valueInput} type="text" placeholder={props.placeholder} />
    )
}