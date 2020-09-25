import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { ROUTES } from "../../constants";

import "./NavBar.scss";

const NavBar = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="nav-bar">{auth ? <LoggedMenu /> : <NotLoggedMenu />}</div>
  );
};

const handleLogout = () => {};

const LoggedMenu = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </li>
      <li>
        <p onClick={() => handleLogout()}>Logout</p>
      </li>
    </ul>
  );
};
const NotLoggedMenu = () => {
  return (
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
  );
};

export default NavBar;
