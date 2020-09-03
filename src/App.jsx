import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Welcome, Beer lover!</h1>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
