import React from "react";

import "./Input.scss";

const Input = ({ label, type, placeholder, value, onChange, id }) => {
  return (
    <div className="input">
      {label && (
        <label className="input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="input__field"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default Input;
