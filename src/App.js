
import './App.css';
import Navbar from './components/header/navbar';
import { WatchLaterProvider } from './context/watchLaterContext';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchList from './pages/watchList';
import Movie from './pages/movie/movie';
import Genre from './pages/genre/genre';
import { GenreProvider } from './context/genressContext';
import { ViewedMoviesProvider } from './context/viewedMovieContext';
import Actor from './pages/actor/actor';
import MyActors from './pages/myActors';
import { MyActorsProvider } from './context/myActorsContext';
import Movies from './pages/movies';
import TvShow from './pages/tvShow/tvshow';
function App() {
  return (
    <WatchLaterProvider>
      <ViewedMoviesProvider>
        <MyActorsProvider>
      <GenreProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home></Home>} />
            <Route path="/watchList" element={<WatchList />} />
            <Route path="/myactors" element={<MyActors />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tvShow/:id" element={<TvShow />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/actor/:id" element={<Actor />} />
            <Route path="/movies" element={<Movies/>} />
          </Routes>
        </BrowserRouter>
      </GenreProvider>
      </MyActorsProvider>
      </ViewedMoviesProvider>
    </WatchLaterProvider>
  );
}

export default App;
