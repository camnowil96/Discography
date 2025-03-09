import React from 'react'
import "../styles/Button.css"

interface Props {
    className: string;
    disabled: boolean;
    onClick: () => void;
    text: string;
    type: "button" | "submit" | "reset";
    
    
}

const Button = ({ onClick, text, className, type = "button", disabled = false  }: Props) => {
  return (
    <div>
       <button onClick={onClick} className={`btn ${className}`} type={type} disabled={disabled}>{text}</button>
    </div>
  )
}

export default Button