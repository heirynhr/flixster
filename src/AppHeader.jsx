import './AppHeader.css'

function AppHeader({ searchRequest, onSearch, onSearchSubmit, onReset}) {
  return (
    <div className="App-header">
        <h1 id="websiteTitle"> Flixster </h1>
        <div className="UserHeader">
            <h3 className ="headerNowPlaying" onClick={onReset} style={{ cursor: 'pointer' }}> Now Playing </h3>
            <form onSubmit={onSearchSubmit} >
                <input className="searchBox" type="text" placeholder="Search.." value={searchRequest} onChange={onSearch}/>
                <button> Submit</button>
            </form>
            
        {/* <div className="dropdown">
          <button onclick="myFunction()" className="dropbtn">Sort By..</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
          </div>
        </div> */}
        </div>
      </div>
  );
}

export default AppHeader;