
import './App.css';
import Navbar from './components/navbar';
import { WatchLaterProvider } from './context/watchLaterContext';
import Home from './pages/Home';

function App() {
  return (
    <WatchLaterProvider>
      <div className="App">
        <Navbar></Navbar>
        <Home></Home>
      </div>
    </WatchLaterProvider>
  );
}

export default App;
