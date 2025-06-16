import { useState } from 'react'
import './App.css'
import MovieList from './MovieList';
import AppHeader from './AppHeader';
import axios from 'axios';

const App = () => {
  // need to be a string
  const [searchRequest, setNewSearch] = useState('');
   //there are no results yet - will need to be an array of the movies tho
  const [searchResults, setSearchResults] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;


  const handleSearchSubmit = async(e) => {
    // stop the page from reloading this is important because othwerise it loses everything
    e.preventDefault();
    // okay so get the parameters for the url like the key and dthe search request
    const params = new URLSearchParams ({
      api_key: apiKey,
      query: searchRequest,
      include_adult: false,
      language: 'en-US' 
    })
    try {
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?${params.toString()}`);
      // if nothng matches the search 
      if (data.results.length === 0) {
        setSearchResults([]);
      } else {
        // otherwise display it
  
        setSearchResults(data.results);
      }
    }
    catch (error) {
      console.error("Error fetching search results:", error);
      // honestly do i leave it blank? 
      setSearchResults([]); 
    }
  }

  const resetMovies = () => {
    setNewSearch('');
    setSearchResults(null);
  };

  return (
    <div className="App">
      <header>
        <AppHeader
          // grab whatever the user typed
          searchRequest={searchRequest}
          // okay so whenever the user typed
          // update the state so react knows what the user typed
          onSearch={(event) => setNewSearch(event.target.value)}
          onSearchSubmit={handleSearchSubmit}
          onReset={resetMovies}
        />
      </header>
      <main>
        <MovieList searchResults={searchResults} />
      </main>
    </div>
  )
}

export default App
