import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { login } from "../../utils/API";
import Input from "../input";
import Button from "../button";

import "./LoginForm.scss";

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState(null);
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login(formValues);
      if (result.status !== 200) return setFormErrors(result.data);
      setAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {formErrors && <p>{formErrors.errors.email}</p>}
        {formErrors && <p>{formErrors.errors.password}</p>}
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
