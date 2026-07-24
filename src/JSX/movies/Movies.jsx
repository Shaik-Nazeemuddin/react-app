import { useEffect, useState } from "react";
import _ from 'lodash';

import MovieCard from "./MovieCard";

const Movies = ({ movies }) => {
  const [sortedMovies, setSortedMovies] = useState([]);

  const [sort, setSort] = useState({
    by: 'default',
    order: 'asc'
  })

  useEffect(() => {
    setSortedMovies(movies);
    if (sort.by !== 'default') {
      const sortedMovies = _.orderBy(movies, [sort.by], [sort.order]);
      setSortedMovies(sortedMovies);
    }
  }, [sort, movies])

  // useEffect(() => {
  //   setSortedMovies(movies);
  // }, [movies])

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="custom-component">
      <h1> Movies List - Public API </h1>
      <div className="sorting-select">
        <select name='by' id='' className='' onChange={handleSort} value={sort.by}>
          <option value='default'>Sortby</option>
          <option value='release_date'>Date</option>
          <option value='vote_average'>Rating</option>
        </select>
        <select name='order' id='' className='' onChange={handleSort} value={sort.order}>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div className="movie-list-container">
        {sortedMovies.toReversed().map((movie, index) => (
          <MovieCard key={index + 1} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Movies