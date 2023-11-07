import React from 'react';
import './button.css';

export default function Button ({ type, text, callback }) {
  const buttonClassName = type === 'submit' ? 'button button-submit' : 'button button-cancel';
  return (
    <div className="button" onClick={callback}>
      {text}
    </div>
  );
}
