const path = require('path');

module.exports = {
  mode: 'development',
  // When using HMR the entry point has to be an array,
  // so a new entry point can be pushed when needed.
  entry: { app: ['./src/App.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  // enables debugging
  devtool: 'source-map',
};
