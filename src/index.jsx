import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from './Authentication/AuthContext.jsx';
import { App } from './App.jsx';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
