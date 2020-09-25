import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { isAuthenticated } from "./utils/API";
import AuthContext from "./context/AuthContext";
import Routes from "./Routes";
import NavBar from "./components/nav-bar";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await isAuthenticated();
        if (result.status !== 401) setAuth(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
