import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import * as serviceWorker from './serviceWorker';
import Start from './components/start/Start';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <div className="every">
    <Router>
      <Switch>
        <Route className="all" exact path="/login" component={Login}/>
        <Route exact path="/" component={Start}/>
        <ProtectedRoute exact path="/learning" component={App}/>
        <Route path="*" component={() => <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>404 NOT FOUND</div>}/>
      </Switch>
    </Router>
  </div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
