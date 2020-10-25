import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home"

function App() {
  
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>React FileBin</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper container">
        <div className="auth-inner container-fluid">
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;