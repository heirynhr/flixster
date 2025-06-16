import React,{ useState, useEffect} from 'react'
import axios from "axios";
import './MovieList.css'
import MovieCard from './MovieCard';

function MovieList() {
    const [page, setPage] = useState(1);
    const [movies,setMovies] = useState([]);
    const [selectedMovie, setSelectedMovies]=useState(null);
    
    
    //1. fetch list on mount - fetch the info as soon as page loads
    useEffect(() => {
        const fetchList = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            //console.log("API Key:", import.meta.env.VITE_API_KEY);
            try {
            // ise the api link but would we use the api ket?
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&include_adult=false`);
    
            
            setMovies(prev => [...prev, ...data.results]);
            console.log(data.results);
            }
            catch (err) {
                console.error("Error fetch list:" ,err)
            }
        };
        fetchList();
    }, [page])
    // brackets are the depencacy list

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    
  return (
    <>
        <div className="MovieGrid">
            {movies.map((m) => (
                <MovieCard
                    key={m.id}
                    movie={m}
                />
            ))}
        </div>
         <button className ="moreBtn" onClick={handleLoadMore}>Load More</button>

    </>
  );
}

export default MovieList;
