# API calls

I decided to use the fetch API to handle the HTTP requests because it is a simple and powerful interface to obtain resources.

In this sample app, I will only call the Punk API `https://api.punkapi.com/v2/` to get some beers that we display on the home screen. (I will implement filter, sort, and pagination later.)

## Custom hook to handle fetches

First, I create a custom hook `useAPI` that can handle API calls to distinct providers and endpoints. 
`useAPI` hook takes the same two arguments as the fetch() method: the path to the resource and an object with the request options such as method, mode, cache, headers, body, etc.
After sending the request and managing the response it returns an object with the response data, an error object, and the isLoading and isError booleans.

``` js
function useAPI(fetchUrl, options) {
  const [{ data, isLoading, isError, error }, dispatch] = useReducer(fetchReducer, initState);
  const fetchData = async () => {
    ...
  };

  useEffect(() => {
    ...
    fetchData();
    return function cleanup() {
      ...
    };
  }, [fetchUrl]);

  return { data, isLoading, isError, error };
}
```

`fetchData` is an asynchronous method that fetches the resources and handles the response: dispatches the data array on success or an error message when an error occurs.

``` js
  const fetchData = async (abortSignal) => {
    dispatch({ type: 'FETCH_PENDING' });
    await fetch(fetchUrl, {
      ...options,
      signal: abortSignal,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong. Possible problems: network error, permission issues, or resource not found.');
        }
        return response.json();
      })
      .then((responseJson = {}) => {
        dispatch({ type: 'FETCH_SUCCESS', data: responseJson });
      })
      .catch((e) => {
        dispatch({ type: 'FETCH_ERROR', error: e });
      });
  };
```

`fetchData` is called inside a `useEffect` that has a second argument - the array of values the effect depends on - in our case, it is the `fetchUrl`.

``` js
useEffect(() => {
    const abortController = new AbortController();
    const mysignal = abortController.signal;
    fetchData(mysignal);

    return function cleanup() {
      abortController.abort();
    };
  }, [fetchUrl]);
```

Each fetch result is stored in a state object that has a data array, an error object, and two boolean values: isLoading and isError. 
The `useReducer` hook manages the state of our fetch result. It takes the current state (`initState`) and an action (`fetchReducer`) as its arguments and returns a new state and a dispatch method.
For simplicity, I deconstruct the returned state.

``` js
const [{ data, isLoading, isError, error }, dispatch] = useReducer(fetchReducer, initState);
```

The `fetchReducer` updates and returns the state according to the type of the action, which in our example can be: `FETCH_PENDING`, `FETCH_SUCCESS`, and `FETCH_ERROR`.

``` js
const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PENDING':
      return {
        data: [],
        isLoading: true,
        isError: false,
        error: {},
      };
    case 'FETCH_SUCCESS':
      return {
        data: action.data,
        isLoading: false,
        isError: false,
        error: {},
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error,
      };
    default:
      return state;
  }
};
```

## Displaying the fetch result

I want to show some beers on the home screen (for logged in users), so in the Home component, I call the `useAPI` hook and fetch the beers from the Punk API (`https://api.punkapi.com/v2/`).

``` js
const { data, isLoading, isError, error } = useApi(PUNK_API, { method: 'GET' }, 'punk_api');
```
Then in the return() function of the component, we render the current state of the API call, e.g., Loading... while the resource is being loaded, an error message if an error occurs, or the data if we retrieve it successfully.

``` js
    {isLoading
      ? 'LOADING ...'
      : isError
        ? error.message
        : data.map(d => (
            <div key={d.id}>
              <img title={d.name || 'title'} src={d.image_url || ''} alt={d.name || 'title'} height="150" />
              <h3>{d.name || 'No title'}</h3>
              <strong>ABV: {d.abv || 'No abv'}</strong>
              <p>{d.description || 'description missing'}</p>
            </div>
        ))
    }
```


To test the hook, we can call it several times and display the results for each call, such as
``` js
const PUNK_API = 'https://api.punkapi.com/v2/beers?page=1&per_page=2';
// this is an incorrect path, it will thorw an exception, and display an error message instead of beers
const PUNK_API2 = 'https://api.punkapi.com/v2/beerssss?page=2&per_page=2'; 
const PUNK_API2 = 'https://api.punkapi.com/v2/beerds?page=3&per_page=2';

const first = useApi(PUNK_API, { method: 'GET' });
const second = useApi(PUNK_API2, { method: 'GET' });
const third = useApi(PUNK_API3, { method: 'GET' });

// in the return function display the responds, e.g. second.data, second.error.message ...
```


## Filtering and sorting

TO DO