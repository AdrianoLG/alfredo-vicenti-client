import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/configurestore';
import * as serviceWorker from './serviceWorker';
import './main.scss';
import 'semantic-ui-css/semantic.min.css';
import ScreensRoot from './screens/Root';

const store = configureStore();
render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <ScreensRoot />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
