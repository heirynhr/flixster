import { useState } from 'react'
import './App.css'
import MovieList from './MovieList';
import AppHeader from './AppHeader';

const App = () => {

  /// INSERT JAVASCRIPT

  return (
    <div className="App">
      <header>
        <AppHeader/>
      </header>
      <main>
        <MovieList>
        </MovieList>
      </main>
    </div>
  )
}

export default App
