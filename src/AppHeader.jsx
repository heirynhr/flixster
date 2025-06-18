import { useState } from 'react';
import axios from 'axios';
import './AppHeader.css';
import logoCut from './assets/clapperboard gif.gif';

function AppHeader({ onSearchResults, sortFilter, setFilter }) {
    const [searchRequest, setNewSearch] = useState('');
    
    //there are no results yet - will need to be an array of the movies tho
    const apiKey = import.meta.env.VITE_API_KEY;

    // call this function when  the user selects a different option in the sort dropdown
    const handleSort = (event) => {
        // this updates the sortFilter with whatever value the option was
        setFilter(event.target.value);
    };

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
            //try the parameters on the url
            const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?${params.toString()}`);
            // if nothng matches the search 
            if (data.results.length === 0) {
                onSearchResults([]);
            } else {
            // otherwise display it
                onSearchResults(data.results);
            }
        }
            catch (error) {
                console.error("Error fetching search results:", error);
                // honestly do i leave it blank? 
                onSearchResults([]);
            }
        
        
        
    }

    const resetMovies = () => {
    setNewSearch('');
    onSearchResults(null);
    setFilter(null)
    };


    return (
        <div className="App-header">
            {/* <div className="logoHeader">
                
            </div> */}
            <img id="logo"src={logoCut} alt="and cut" />
            <h1 id="websiteTitle">  FLIXSTER </h1>
            <div className="UserHeader">
                <h3 className ="headerNowPlaying" onClick={resetMovies} style={{ cursor: 'pointer' }}> 
                    &#9654;
                    <span>Now Playing</span>
                </h3>
                <form id="searchBox" onSubmit={handleSearchSubmit} >
                    <input className="searchTyping" type="text" placeholder="Search.." value={searchRequest} onChange={e => setNewSearch(e.target.value)}/>
                    <button type="submit" className="btn"> &#128269;</button>
                </form> 
                <div className="dropdownSort"> 
                    <select id="sorts" value={sortFilter} onChange={handleSort}>
                        <option className="dropdowntype" value="default" style={{ cursor: 'pointer' }}>Default Popularity</option>
                        <option className="dropdowntype" value="date" style={{ cursor: 'pointer' }}>Release Date (Recent-Oldest)</option>
                        <option className="dropdowntype" value="title" style={{ cursor: 'pointer' }}>Title (A-Z)</option>
                        <option className="dropdowntype" value="voteAvg" style={{ cursor: 'pointer' }}>Vote Average (Descending)</option>
                    </select>
                </div> 
            </div>
        </div>
    );
}

export default AppHeader;