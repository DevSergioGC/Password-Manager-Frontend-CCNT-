import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Folder from './components/Folder';
import Items from './components/Items'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {  
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/item" element={<Items />} />
      </Routes>
    </Router>   
    </div>
  );
}

export default App;