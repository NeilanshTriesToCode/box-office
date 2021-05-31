// React Component for page showing TV Show info
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams(); // to get id of the show from the page URL

  // initial state for show info
  const [show, setShow] = useState(null);

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
    // retrieving the TV show's main info
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(showInfo => {
      setShow(showInfo);
    });
  }, [id]);
  return <div>this is the show page</div>;
};

export default Show;
