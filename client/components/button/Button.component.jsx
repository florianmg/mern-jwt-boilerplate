import React from "react";

import "./Button.scss";

const Button = ({ text }) => {
  return (
    <div className="button>">
      <button>{text}</button>
    </div>
  );
};

export default Button;
