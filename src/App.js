import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="home" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
