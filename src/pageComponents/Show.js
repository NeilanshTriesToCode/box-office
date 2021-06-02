// React Component for page showing TV Show info
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

// reducer function for userReducer() hook
/* takes 2 args:
   1. prevState: previous state
   2. action: a user-defined object defining action types and data
*/
const reducer = (prevState, action) => {
  // defining actions
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      // in case data from the API has been fetched successfully
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

// initial states to be used for useReducer
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams(); // to get id of the show from the page URL

  /* useReducer() hook:
      1. Works like useState(), but is used for managing states of complex types such as objects.
      2. Takes 2 args: 
         - reducer(prevState, action): a function that manipulates the prevState based on the "action" required
         - initialState: object consisting of variables/data whose states are to be changed
  */
  // using the useReducer() hook to manage states of the variables being used
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // the useEffect() hook is used to access the stages between the lifecycles of the Components.
  /*
    - takes 2 args: 
    1. a callback function that executes whenever any of the element inside the dependency array changes.
    2. dependency array: array of items that could change. 
    - the callback function sent to the useEffect() hook returns a "cleanup" function which always executes 
      before the execution of the callback function. the ComponentWillUnmount lifecyvle can be achieved through the 
      cleanup function.
  */
  useEffect(() => {
    // variable to state whether the Component is mounted or not
    let isMounted = true;

    // retrieving the TV show's main info
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(showInfo => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: showInfo }); // when results have loaded successfully
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message }); // if fetch fails
        }
      });

    // cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Loading results...</div>;
  }
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return <div>this is the show page</div>;
};

export default Show;
