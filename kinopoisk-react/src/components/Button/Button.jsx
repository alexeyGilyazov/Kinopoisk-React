import "./Button.css";

export default function Button({ text, onClick, disabled,className }) {
  return (
    <button className={className ? `btn ${className}` : 'btn'} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
