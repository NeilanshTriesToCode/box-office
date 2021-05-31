// React Component for page showing TV Show info
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams(); // to get id of the show from the page URL

  // initial state for show info
  const [show, setShow] = useState(null);

  // initial state for loading information
  const [isLoading, setIsLoading] = useState(true); // true since info starts loading when page is loading

  // initial state for errors that might occur while loading results
  const [error, setError] = useState(null);

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
          setShow(showInfo);
          setIsLoading(false); // when results have loaded successfully
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message); // set error message
          setIsLoading(false);
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
