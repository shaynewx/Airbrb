import "./button.css";

export default function Button({ text, callback }) {    return (
        <div className="button" onClick={callback}>
            {text}
        </div>
    )
}