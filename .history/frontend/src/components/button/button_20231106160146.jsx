import React from 'react';
import './button.css';

export default function Button ({ type, text, callback }) {
  const buttonClassName = type === 'submit' ? 'button button-submit' : 'button button-cancel';
  return (
    <div className={} onClick={callback}>
      {text}
    </div>
  );
}
