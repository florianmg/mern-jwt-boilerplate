import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.LOGIN}>Se connecter</Link>
        </li>
        <li>
          <Link to={ROUTES.REGISTER}>Créer un compte</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
