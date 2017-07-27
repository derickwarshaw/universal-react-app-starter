import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';

import App from './app';

// Redux stuff
import Store from './redux/store';

import Helpers from './helpers';

Helpers.init();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>, document.getElementById('app'));

Helpers.postInit();
