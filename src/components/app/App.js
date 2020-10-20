import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import './App.scss';

const App = () => (
  <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
  </div>
);

export default App;