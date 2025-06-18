import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';
import AppHeader from './AppHeader';

const App = () => {
  const [searchResults, setSearchResults] = useState(null);
  //create the variable of filter which is a string
  const [sortFilter, setFilter] = useState('default');
  
  return (
    <div className="App">
      <header>
        <AppHeader onSearchResults={setSearchResults} sortFilter={sortFilter} setFilter={setFilter} />
      </header>
      <main>
        <MovieList searchResults={searchResults} sortFilter={sortFilter} />
      </main>
      <footer>
        <p id="footertxt">&copy; Heiryn Hernandez Rojas - FTL 2025. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
