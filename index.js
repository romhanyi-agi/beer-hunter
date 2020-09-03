require('dotenv').config();
const express = require('express');

const app = express();

const enableHMR = (process.env.ENABLE_HMR) === 'true';
console.log('HMR is on: &s', enableHMR);

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middlware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack.config.js');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(express.static('public'));

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
