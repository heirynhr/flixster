import './AppHeader.css'

function AppHeader() {
  return (
    <div className="App-header">
        <h1 id="websiteTitle"> Flixster </h1>
        <div className="UserHeader">
            <form>
          <input type="text" placeholder="Search.."/>
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