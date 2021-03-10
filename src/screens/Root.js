import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookDetail from './book/Detail';
import BookList from './book/List';
import BookManage from './book/Manage';
import Print from './book/Print';
import AcceptGroup from './group/AcceptGroup';
import ManageLogic from './group/ManageLogic';
import NotFound from './NotFound';
import FinishRegistration from './user/FinishRegistration';
import Login from './user/Login';
import Register from './user/Register';
import UserOptionsLogic from './user/OptionsLogic';

const ScreensRoot = () => (
  <>
    <Switch>
      <Route exact path='/' component={BookList} />
      <Route path='/libro/crear' component={BookManage} />
      <Route path='/libro/editar/:id' component={BookManage} />
      <Route path='/libro/:id/usuario/:userId' component={BookDetail} />
      <Route path='/login' component={Login} />
      <Route path='/registro' component={Register} />
      <Route path='/finalizar-registro' component={FinishRegistration} />
      <Route path='/aceptar-grupo' component={AcceptGroup} />
      <Route path='/usuario/grupos' component={ManageLogic} />
      <Route path='/usuario/opciones' component={UserOptionsLogic} />
      <Route path='/imprimir' component={Print} />
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
