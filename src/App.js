
import './App.css';
import Navbar from './components/header/navbar';
import { WatchLaterProvider } from './context/watchLaterContext';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchList from './pages/watchList';
import Movie from './pages/movie/movie';
import Genre from './pages/genre/genre';
import { GenreProvider } from './context/genressContext';
function App() {
  return (
    <WatchLaterProvider>
      <GenreProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home></Home>} />
            <Route path="/watchList" element={<WatchList />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/genre/:id" element={<Genre />} />
          </Routes>
        </BrowserRouter>
      </GenreProvider>
    </WatchLaterProvider>
  );
}

export default App;
