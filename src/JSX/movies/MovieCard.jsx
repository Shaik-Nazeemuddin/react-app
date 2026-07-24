
const MovieCard = ({ movie }) => {
  return (
    <div className="custom-component movie">
      <h2 className="movieheading">{movie.title}</h2>
      <div className="movie-image-container">
        {/*https://dummyimage.com/360x500/33b6ea/fff.jpg  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path} ` } alt={movie.original_title} width='auto' />  */}
        <img src={`https://dummyimage.com/360x420/00b8c0/fff.jpg`} alt={movie.original_title} width='auto' />
        <p>
          <span> <strong>Movie Rating ({movie.id}) - {(Math.trunc(movie.vote_average))}</strong> <img className='rating' src='https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png' alt='rating' /> </span>
          {movie.vote_average} {movie.overview}
        </p>
      </div>
    </div>
  )
}

export default MovieCard;
