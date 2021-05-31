// React Component for homepage of the app
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config'; // user-defined function
import ShowGrid from '../components/show/ShowGrid';

const Home = () => {
  // initial state for input
  const [input, setInput] = useState('');

  // initial state for results
  const [results, setResults] = useState(null);

  // initial state for search options (i.e., either shows or people)
  const [searchOption, setSearchOption] = useState('shows');

  // boolean const to keep track if the search made is for 'shows' or 'people'
  const isShowsSearch = searchOption === 'shows';

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
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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

  // function to search for shows or people based on the radio button selected
  const onRadioChange = event => {
    // updating state of searchOption (based on the radio button selected)
    setSearchOption(event.target.value); // value is either 'shows' or 'people'
  };

  // function to return results
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results found</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  // return page layout
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={isShowsSearch ? 'Search for shows' : 'Search for people'}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
