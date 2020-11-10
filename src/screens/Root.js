import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BookForm from '../components/book/Form';
import BookDetail from './book/Detail';
import Login from './app/Login';
import PageNotFound from './app/NotFound';
import BookList from './book/List';
import BookManage from './book/Manage';

const ScreensRoot = () => (
  <React.Fragment>
    <Switch>
      <Route exact path='/' component={BookList} />
      <Route path='/libro/crear' component={BookManage} />
      <Route path='/libro/:id' component={BookDetail} />
      <Route path='/login' component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  </React.Fragment>
);

export default ScreensRoot;
