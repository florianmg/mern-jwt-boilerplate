import React, { useState } from "react";
import Input from "../input";
import Button from "../button";

import "./RegisterForm.scss";

const RegisterForm = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("on register submit", formValues);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          value={formValues.email}
          label="Email"
          id="email"
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required={true}
        />
        <Input
          type="password"
          value={formValues.password}
          label="Mot de passe"
          id="password"
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required={true}
        />
        <Button text="Se connecter" />
      </form>
    </div>
  );
};

export default RegisterForm;
