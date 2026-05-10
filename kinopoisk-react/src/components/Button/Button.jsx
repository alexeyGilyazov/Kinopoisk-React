import "./Button.css";

export default function Button({ text, onClick, disabled }) {
  return (
    <button className="btn" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
