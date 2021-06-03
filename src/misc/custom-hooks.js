// JS file containing user-defined hooks
import { useReducer, useEffect } from 'react';

// reducer function for userPersistedReducer custom-hook
function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      // add (STAR) a show
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      // remove (unSTAR a show)
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  // useReducer() also takes a third argument, which is a function used to initialise the initialState
  // this function would replace the initialState passed to userReducer()
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key); // access local storage and get item associated with the given key

    // return parsed version of "persisted" if it's not undefined
    return persisted ? JSON.parse(persisted) : initial;
  });

  // using the useEffect() hook whenever the state of "state" changes
  useEffect(() => {
    // adding the item to localStorage
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
