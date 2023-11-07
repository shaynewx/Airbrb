import React from 'react';
import './button.css';

export default function Button ({ type, text, callback }) {
  const buttonClassName = type === 'submit' ? 'button-submit' : 'button button-cancel';
  return (
    <div className={`button ${buttonClassName}`} onClick={callback}>
      {text}
    </div>
  );
}
