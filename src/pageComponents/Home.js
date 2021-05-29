// React Component for homepage of the app
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config'; // user-defined function

const Home = () => {
  // initial state for input
  const [input, setInput] = useState('');

  // initial state for results
  const [results, setResults] = useState(null);

  // function to take action when a text is typed in the input box (like onChange)
  // it's called wby the onChange() function of the input field
  const onInputChange = event => {
    // the text entered in the text-box can be found using event.target.box
    // update state
    setInput(event.target.value);
  };

  // function to make an API request for the text search
  const onSearch = () => {
    // calling apiGet() function to perform a http fetch API request to get results
    apiGet(`/search/shows?q=${input}`).then(result => {
      // updating state of results
      setResults(result);
    });
  };

  // function to make search even when the user presses "Enter" on the keyboard
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      // keyCode for "Enter" is 13
      onSearch(); // call search function
    }
  };

  // function to return results
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results found</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}> {item.show.name} </div>
          ))}
        </div>
      );
    }

    return null;
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
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
