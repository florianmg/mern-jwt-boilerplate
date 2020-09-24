import React, { useState } from "react";
import Input from "../input";
import Button from "../button";

import "./LoginForm.scss";

const LoginForm = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("on login submit", formValues);
  };

  return (
    <div>
      <h1>Login :</h1>
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
        <Button text="S'inscrire" />
      </form>
    </div>
  );
};

export default LoginForm;
