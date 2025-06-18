import React, { useState } from "react"
import './MovieCard.css'
import MovieModal from './MovieModal';
import brokenImg from './assets/missing.png';
import axios from "axios";

function MovieCard({movie}) {
  
    // track if the modal is open
    const [open, setOpen] = useState(false);
    const [newMovieDeets, setMovieDeets]= useState(null);

    const handleClose = () => {
        setOpen(false);
        };
    
    const handleOpen = async (movie) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
            setMovieDeets(data);
            setOpen(true);
        }
        catch(err) {
            console.error("Error fetching Movie:" ,err)
        }
    };

    // need it to show nothing
    let modalElement = null;
    // if it open then create/render that component
    if (open) {
        modalElement = <MovieModal movie={newMovieDeets} handleClose={handleClose} />;
    }

    const [isFavorite, setFavorite] = useState(false);

    //favorite and watched
    const changeFavorite = (e) => {
        // need to NOT open the modal
        e.stopPropagation(); 
        if (isFavorite === true) {
            setFavorite(false);
        } 
        else {
            setFavorite(true);
        }
    };

    let starIconType = "\u2606"
    let starType = "defaultIcon"
    
    if (isFavorite==true){
        starType ="starLiked"
        starIconType ="\u2605"
    }

    const [isWatched, setWatched] = useState(false);

    const changeWatched = (e) => {
        // need to NOT open the modal
        e.stopPropagation(); 
        if (isWatched === true) {
            setWatched(false);
        } 
        else {
            setWatched(true);
        }
    };
    
    let checkType ="defaultCheck"
    if (isWatched==true){
        checkType ="watched"
    }



    return (
    <>
    <div className="Card" onClick={() => handleOpen(movie)}>
        <img className="moviePosterImg" 
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
        alt={movie.title} 
        // if there is an error loadng the img
        onError={(event) => {
            //replace it with this
        event.target.src = brokenImg; 
        }} />
        <h2 className="movieTitle">{movie.title}</h2>
        <h3 className="movieRating">Rating: {movie.vote_average}</h3>
        <div className="extrasUserInteractions">
            <span className ={starType} onClick={changeFavorite}> {starIconType}</span>
            <span className= {checkType} onClick={changeWatched}> &#10003;</span>
        </div>
    </div>
    {modalElement}
    </>
    );
}

export default MovieCard;