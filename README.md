# beer-hunter

This is a simple app to practice React.

## Content

- [Project setup](/wiki/projectSetup.md)
    I don't use create-react-app, and try to keep it very simple, installing only a few packages. Such as `express`, `nodemon`, `dotenv`, `babel`, `eslint`, and `webpack`.
- [Basic Login](/wiki/login.md)
    It is makeshift authentication consisting of an authentication context, a login, and a home component.
    Instead of the usual token-based authentication, it simply sends a request to _https://yesno.wtf_ API to decide if the user is allowed to log in or not.
- [Data Fetch](/wiki/APICalls.md)
    I implement a custom hook that handles api calls for the app. The Home component shows beers from Punk API, https://api.punkapi.com/v2/

## Resources:

## Project setup:

- _Subramanian, Vasan_. Pro Mern Stack: Full Stack Web App Development with Mongo, Express, React, and Node. , 2019. Internet resource.

## Login

-  _Using the fetch API_, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

- _React Context guide_, https://reactjs.org/docs/context.html

- _React hooks API Reference_, https://reactjs.org/docs/hooks-reference.html

## Data Fetch

- _MDN web docs, Using Fetch_, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

- _How to fetch data with React Hooks_,BY ROBIN WIERUCH https://www.robinwieruch.de/react-hooks-fetch-data
