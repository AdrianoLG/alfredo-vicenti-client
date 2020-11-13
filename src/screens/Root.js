import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BookDetail from './book/Detail';
import Login from './user/Login';
import NotFound from './NotFound';
import BookList from './book/List';
import BookManage from './book/Manage';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScreensRoot = () => (
  <>
    <Switch>
      <Route exact path='/' component={BookList} />
      <Route path='/libro/crear' component={BookManage} />
      <Route path='/libro/editar/:id' component={BookManage} />
      <Route path='/libro/:id' component={BookDetail} />
      <Route path='/login' component={Login} />
      <Route component={NotFound} />
    </Switch>
    <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  </>
);

export default ScreensRoot;
