import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import PageNotFound from './NotFound';

const App = () => (
  <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
  </React.Fragment>
);

export default App;