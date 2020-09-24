import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";
import NavBar from "./components/nav-bar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
