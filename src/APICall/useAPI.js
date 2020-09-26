import { useEffect, useReducer } from 'react';

const initState = {
  data: [],
  isLoading: true,
  isError: false,
  error: {},
};

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

// A custom hook serves as a low level interface for fetching data asynchronously
function useAPI(fetchUrl, options) {
  const [{ data, isLoading, isError, error }, dispatch] = useReducer(fetchReducer, initState);

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
        // console.log('SUCCESS: ', responseJson);
        dispatch({ type: 'FETCH_SUCCESS', data: responseJson });
      })
      .catch((e) => {
        dispatch({ type: 'FETCH_ERROR', error: e });
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const mysignal = abortController.signal;
    fetchData(mysignal);

    return function cleanup() {
      abortController.abort();
      // console.log('cleaned up..');
    };
  }, [fetchUrl]);

  return { data, isLoading, isError, error };
}

export default useAPI;
