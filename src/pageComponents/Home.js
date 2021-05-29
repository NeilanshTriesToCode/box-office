// React Component for homepage of the app
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  // state for input
  const [input, setInput] = useState('');

  // function to take action when a text is typed in the input box (like onChange)
  // it's called wby the onChange() function of the input field
  const onInputChange = event => {
    // the text entered in the text-box can be found using event.target.box
    // update state
    setInput(event.target.value);
  };

  // function to make an API request for the text search
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=g
    // calling the fetch() function to make a HTTP request
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        console.log(result[0].show.name);
      });
  };

  // function to make search even when the user presses "Enter" on the keyboard
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      // keyCode for "Enter" is 13
      onSearch(); // call search function
    }
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
