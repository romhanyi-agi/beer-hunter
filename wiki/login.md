# Authentication, login, and logout

It is substitute authentication consisting of an authentication context, a login, and a home component.
Instead of the usual password and token-based authentication, it simply sends a request to _https://yesno.wtf_ API to decide if the user is allowed to log in or not. The user stays logged in until clicking the logout button.

In this basic example, I do not use routing. If `isAuthenticated` is true, the `<App />` component renders `<Home />` otherwise it renders `<Login />`.

## Authentication context - AuthContext.jsx

According to the React documentation:
> Context provides a way to share values [...] between components without having to explicitly pass a prop through every level of the tree. [...] Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

Therefore, authentication is a fitting example of when to use contexts. We probably want to know if the user is logged in, what are the user name or email they have set, and we would also like to access methods, e.g., log in or logout in various components.

Therefore, I've created a context called `AuthContext` and a hook `useAuth()` to utilize it.

``` js
export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);
```
We also need a Provider component that lets the consuming components - descendants of the Provider - to subscribe to context changes. The `AuthProvider` passes down the `login`, `logout`,  `setError`, and `setUser` methods, as well as the `isLoading`, `isError`, `isAuthenticated`, `user`, and `error` values to the consuming components in its value prop.

``` js
export const AuthProvider = ({ children }) => {
  const [{ isLoading, isAuthenticated, isError, error, user }, dispatch] = useReducer(authReducer, initialState);

 function login() {
 ...
 }

 function logout() {
 ...
 }

 function setUser(newUser) {
 ...
 }

 function setError(errorMsg) {
 ...
 }

 return (
  <AuthContext.Provider value={{ setUser, setError, login, logout, isLoading, isAuthenticated, isError, error, user }}>
    {children}
  </AuthContext.Provider>
 );
};
```

Instead of `useState`, I chose `useReducer` to handle state for this component. Reducers are great for managing complex states with multiple sublevels, so for this basic example,`useState` would have been perfectly fine, but I just wanted to see how it works with a reducer, and in a real-life scenario this state would probably more complex. 
The React `useReducer` hook takes the current state and an action as its arguments and returns a new state and a dispatch method. Reducers are pure functions without side-effects. Therefore, the same input (current state and action) shall always produce the same output (new state).


In the children components we can now access to these states and methods by calling the `useAuth` hook. E.g.:
``` js 
const { logout } = useAuth();
  ...
logout();
```

## Login component - Login.jsx

The login component has a simple login form, with an input field for the user name and a submit button.

Via the `useAuth` hook, we access the `setUser`, `setError`, `login`, methods and the `isLoading`, `user`, and `error` values of the authentication context:

``` js
  const { setUser, setError, login, isLoading, user, error } = useAuth();
```

The login component implements the `handleChange` and `handleSubmit` functions.
 `handleChange` calls the `setUser` method of the AuthConontext and updates the user based on the user name input value:
 ``` js
 const handleChange = (event) => {
 setUser(event.target.value);
 };
 ```

 While `handleSubmit` validates the user name (it is required and has to be shorter than 16 characters). It calls the AuthContext's `setError` method if the user name fails the validation or the `login` method if it passes. 

 ``` js
 const handleSubmit = () => {
  if (!user) {
    setError('User name is required!');
  } else if (user.length > 16) {
    setError('User name cannot be longer than 16 characters.'); 
  } else {
    setError(null);
    login();
  }
 };
 ```
`login` is an async function that fetches data from the _https://yseno.wtf/api_. If the fetch is successful, based on the response (yes or no), it sets the `isAuthenticated` state (true, false), thus the user is either logged in or not.

## Logout - Header.jsx

When the user passes authentication, the username and a logout button are displayed on the `<Header />` component.
Both the value of `user` and the `logout` method are obtained from the AuthContext.
``` js
const { user, isAuthenticated, logout } = useAuth(); 
```
