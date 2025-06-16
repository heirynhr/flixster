import React,{ useState, useEffect} from 'react'
import axios from "axios";
import './MovieList.css'
import MovieCard from './MovieCard';

function MovieList( {searchResults}) {
    const [page, setPage] = useState(1);
    const [movies,setMovies] = useState([]);
    const [selectedMovie, setSelectedMovies]=useState(null);
    
    // this runs everytime searchResults is changed
    useEffect(() => {
        if (searchResults === null) {
        setPage(1);
        }
    }, [searchResults]);

    //1. fetch list on mount - fetch the info as soon as page loads
    useEffect(() => {
        // if there are no search results jsut default to the popular movies 
        if (!searchResults) {
            const fetchList = async () => {
                const apiKey = import.meta.env.VITE_API_KEY;
                //console.log("API Key:", import.meta.env.VITE_API_KEY);
                try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&include_adult=false`);

                if (page === 1) {
                    setMovies(data.results);
                } 
                else {
                    // ff it's not the first page, add new movies to the old list
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                }
                console.log(data.results);
                }
                catch (err) {
                    console.error("Error fetch list:" ,err)
                }
            };
            fetchList();
    }
    }, [page, searchResults])
    // brackets are the depencacy list

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // okay this are the movies i am going to display on the cards
    let moviesToShow;

    // if the user did have a search then display those
    if (searchResults !== null) {
        console.log(searchResults);
        moviesToShow = searchResults;
    } 
    // if not just show the popular movies like normal
    else {
        moviesToShow = movies;
    }

    //okay then this is the card logic, displays everything in the array
    let movieContent;

    // need to display then use our movie card to show them
    if (moviesToShow.length > 0) {
        movieContent = moviesToShow.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
        });
    } 
    else {
    movieContent = <p>No movies found.</p>;
    }

    let loadMoreButton = null;
    // okay so if youre not in the search page then have the load button show up meaning you are showing the popular moives 
    if (searchResults === null) {
        loadMoreButton = (
            <button className="moreBtn" onClick={handleLoadMore}>
            Load More
            </button>
        );
    }
    
    return (
    <>
        <div className="MovieGrid">
            {movieContent}
        </div>
        {loadMoreButton}

    </>
  );
}

export default MovieList;
