import React from "react"
import './MovieCard.css'

function MovieCard({movie}) {
  return (
    <div className="Card">
        <img className="moviePosterImg" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        <h2 className="movieTitle">{movie.title}</h2>
        <h3 className="movieRating">Votes: {movie.vote_average}</h3>
    </div>
  );
}

export default MovieCard;