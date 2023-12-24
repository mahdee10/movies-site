
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Jomhuria&family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}

export default App;
