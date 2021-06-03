// JS file containing user-defined hooks
import { useReducer, useEffect } from 'react';

// reducer function for userPersistedReducer custom-hook
function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      // add (STAR) a show
      return [...prevState, action.showId]; // returns array with new show ID added
    }
    case 'REMOVE': {
      // remove (unSTAR a show)
      return prevState.filter(showId => showId !== action.showId); // returns array with removed show ID
    }

    default:
      return prevState;
  }
}

/* In order to "store" the state in localStorage, so that it remains even when the page is refreshed, we have custom-hooks
   - usePersistedReducer() wraps around useReducer() and stores the state in the browser's local storage, with a key
   - it works just like useReducer(), but also reads and writes from/to the browser's localStorage
   - the states would be show IDs which would look something like [123, 512, 578,...] (array of show IDs) in the local storage
*/

function usePersistedReducer(reducer, initialState, key) {
  // useReducer() also takes a third argument, which is a function used to initialise the initialState
  // this function would replace the initialState passed to userReducer()
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key); // access local storage and get item associated with the given key

    // return parsed version of "persisted" if it's not undefined
    return persisted ? JSON.parse(persisted) : initial;
  });

  // using the useEffect() hook whenever the state of "state" changes
  // as the state of the "state" variable changes, useEffect() comes into play
  // the "state" variable is nothing but an array of show IDs which have been starred
  // so useEffect() replaces the current array with the updated array ("state" variable)
  // so now, the localStorage would contain an updated array of starred show IDs
  useEffect(() => {
    // adding the item to browser's localStorage
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

/*
   if the usePersistedReducer() custom-hook is to be used mutiple times for different components, the reducer function 
   and initial states would have to be defined everytime. This is not convenient.
   Therefore, we custom function useShows() (with a default key) has been built around the usePersistedReducer() custom-hook.
   So anytime we want to use userPersistedReducer(), we can use useShows() instead.
*/
export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
