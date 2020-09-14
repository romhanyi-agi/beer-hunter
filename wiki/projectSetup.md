# Project setup

## Install packages
```
$ npm install express@4 nodemon@1 dotenv@6 react@16 react-dom@16 whatwg-fetch@3 prop-types@15 babel-polyfill@6
$ npm install --save-dev eslint@5 eslint-plugin-import@2 eslint-config-airbnb@17 eslint-config-airbnb-base@13 eslint-plugin-jsx-a11y@6 eslint-plugin-react@7
$ npm install --save-dev @babel/core@7 @babel/cli@7 @babel/preset-env@7 @babel/preset-react@7 babel-loader@8
$ npm install --save-dev webpack@4 webpack-cli@3 webpack-dev-middleware@3 webpack-hot-middleware@2
```
## Set up config files

#### .gitignore

Create a new file in the root folder and name it **.gitignore**
Open and add the files and folders you don't want to sync with your github repo.

```
# dependencies
/node_modules

#environment variables
.env
```

#### .env

Create **.env** file in the root folder, Dotenv will look for this file for the environment variables.

```
## Server Port
SERVER_PORT=3000
```

#### .eslintrc files

Create **.eslintrc** file in the root directory and set basic configuration to inherit only from Airbnb base, and add only one rule to allow debug messages to be displayed.

```json
{
  "extends": "airbnb-base",
  "env": {
    "node": true
  },
  "rules": {
    "no-console": "off"
  }
}
```

We will need another **.eslintrc** in the **src** folder to set configuration for the React code. Here we set the environment to be the browser instead of Node.
**Note**: for simplicity I'll turn off Props validation globally. This is not best practice and shouldn't be done!

```json
{
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "rules": {
    "import/extensions": ["error", "always", { "ignorePackages": true }],
    "react/prop-types": "off"
  }
}
```

#### .babelrc

Step into the **src** directory and create **.babelrc** file. This will contain some basic configuration for older browser support.

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11",
          "edge": "15",
          "safari": "10",
          "firefox": "50",
          "chrome": "49"
        }
      }
    ],
    "@babel/preset-react"
  ]
}
```

#### webpack configuration

Webpack can handle both the transformation JSX files and creating bundles, but it needs a Babel loader for it (we already installed it, see above.)
Let's create **webpack.config.js** in the root folder with the basic configurations.
It is a simple js file with a _module.exports_ variable exporting the properties that specify the transformation and bundling process.
We create two bundles, one for the application code and another for all the libraries that won't change much. Using splitChunks we can exclude these libraries from transformation and enabl optimization.

```js
const path = require("path");

module.exports = {
  mode: "development",
  // When using HMR the entry point has to be an array,
  // so a new entry point can be pushed when needed.
  entry: { app: ["./src/index.jsx"] },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
    },
  },
  // enables debugging
  devtool: "source-map",
};
```

After setting up Webpack to compile and watch for changes we need to modify the **package.json** file as well.

### Update the value of the _scripts_ key in package.json

Open **package.json** and change 'scripts' to the following:

```json
"scripts": {
   "start": "nodemon -w server server/server.js",
   "test": "echo \"Error: no test specified\" && exit 1",
   "#lint": "Runs ESLint on all relevant files",
   "lint": "eslint . --ext js,jsx --ignore-pattern public",
   "#compile": "Generates JS bundles for production. Use with start.",
   "compile": "webpack --mode production",
   "#watch": "Compile, and recompile on any changes.",
   "watch": "webpack --watch"
 },
```