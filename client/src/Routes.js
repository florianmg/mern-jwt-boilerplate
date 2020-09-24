import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ROUTES } from "./constants";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";

const simulateIsLogged = false;

const Routes = () => {
  return (
    <Switch>
      <RouteCredentials path={ROUTES.LOGIN} component={Login} />
      <RouteCredentials path={ROUTES.REGISTER} component={Register} />
      <RouteProtected path={ROUTES.DASHBOARD} component={Dashboard} />
      <RouteCredentials path={ROUTES.LANDING} component={Landing} />
    </Switch>
  );
};

const RouteCredentials = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !simulateIsLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.DASHBOARD} />
        )
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  // const ctx = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        simulateIsLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
};

export default Routes;
