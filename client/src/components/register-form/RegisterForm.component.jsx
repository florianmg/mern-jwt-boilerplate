import React, { useState, useContext } from "react";
import { register } from "../../utils/API";
import AuthContext from "../../context/AuthContext";
import Input from "../input";
import Button from "../button";

import "./RegisterForm.scss";

const RegisterForm = () => {
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
      const result = await register(formValues);
      if (result.status !== 201) return setFormErrors(result.data);
      setAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {formErrors && <p>{formErrors.errors.email}</p>}
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
