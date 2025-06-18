import React from "react"
import './MovieModal.css'

const genreMap = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };

function MovieModal({movie, handleClose}) {
    console.log("movie.genres:", movie.genres);
    
    let genreNames = [];

    if (movie.genres) {
        genreNames = movie.genres.map(id => id.name);
    }
    return (
    <div className="modal" onClick={handleClose}>
        <div className="modalContent" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={handleClose}>&times;</span>
            <img className="modalImg" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            <div className="modalDetails">
                <h2 className="modalTitle">{movie.title}</h2>
                <h3 className="modalRelease">{movie.release_date}</h3>
                <h3 className="modalTime">Duration: {movie.runtime} minutes</h3>        
                <h3 className="modalOverview">{movie.overview}</h3>
                <h3 className="modalGenre">Genres: {genreNames.join(', ')}</h3>       
            </div>
        </div>
    </div>
  );
}

export default MovieModal;