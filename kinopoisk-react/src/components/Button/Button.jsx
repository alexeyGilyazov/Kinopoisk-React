import './Button.css'

export default function Button({ ...props }) {
    return (
        <button className='btn' disabled={props.disabled} onClick={props.searchFilm}>{props.text}</button>
    )
}