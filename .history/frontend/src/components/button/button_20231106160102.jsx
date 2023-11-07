import React from 'react';
import './button.css';

export default function Button ({ text, callback }) {
  const buttonClassName = t
  return (
    <div className="button" onClick={callback}>
      {text}
    </div>
  );
}
