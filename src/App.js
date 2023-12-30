
import './App.css';
import Navbar from './components/navbar';
import { WatchLaterProvider } from './context/watchLaterContext';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchList from './pages/watchList';
function App() {
  return (
    <WatchLaterProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home></Home>} />
          <Route path="/watchList" element={<WatchList/>} />
        </Routes>
      </BrowserRouter>
    </WatchLaterProvider>
  );
}

export default App;
