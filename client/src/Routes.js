import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { ROUTES } from "./constants";

import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";

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
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Component {...props} /> : <Redirect to={ROUTES.DASHBOARD} />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
};

export default Routes;
