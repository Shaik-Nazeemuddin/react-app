import { use } from 'react';
import Display from './display/Display';
import Messenger from './messenger/Messenger';
import LoggedContextProvider from './useContext/LoggedContextProvider';
import IncrementDecrement from './useReducer/IncrementDecrement';
import AppProvider from './store/store';
import MyComponent from './display/MyComponent';
import Fancy from './useImperative/Fancy';
import Comments from './use/Comments';
import { fetchTodos } from './routes/component/fetchWithAuth';
//import Movies from './movies/Movies';
import MovieCard from './movies/MovieCard';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DisplayParent from './display/DisplayParent';
const Movies = lazy(() => import('./movies/Movies'));


const dataCache = new Map();

function getData(url) {
  if (!dataCache.has(url)) {
    dataCache.set(
      url,
      fetch(url).then(res => res.json())
    );
  }
  return dataCache.get(url);
}

export const Data = ({ url }) => {
  const data = use(getData(url));
  return (
    <div className="custom-component">
      <h2>Use (Hook) with cache - React 19</h2>
      {data && data.map((item, index) => {
        if (index < 10) {
          return (
            <div key={index} style={{ textAlign: 'left', marginLeft: '50px' }}>
              <p>{item.id}: {item.title}</p>
            </div>
          )
        }

      })}
    </div>
  );
}

const SampleComponent = () => {
  const [movies, setMovies] = useState([]);
  const url = 'https://jsonplaceholder.typicode.com/photos';

  useEffect(() => {
    getMovies();
  }, [])

  const getMovies = async () => {
    //const res  = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=98e31a0b8b4e2586697c5f2b8a90b484')
    const res = await fetch('http://localhost:3000/movies')
    const data = await res.json();
    //setMovies(data.results);
    setMovies(data);
  }

  return (
    <>
      <h1>JSX Format</h1>
      <AppProvider>

        <LoggedContextProvider>
          <Display />
        </LoggedContextProvider>
        <DisplayParent />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<h4>Loading ...  </h4>}>
            <Comments fetchTodos={fetchTodos()} />
            <Data url={url} />
          </Suspense>
        </ErrorBoundary>
        <Messenger />
        <IncrementDecrement />
        <MyComponent />
        <Fancy />
        <Suspense fallback={<div> Movies Component Loading ...</div>}>
          <Movies movies={movies}>
            <MovieCard />
          </Movies>
        </Suspense>

      </AppProvider>
    </>
  )
}

export default SampleComponent;

