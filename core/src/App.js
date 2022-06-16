import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Folder from './components/Folder';
import Items from './components/Items'
import {useCookies} from 'react-cookie';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {   

  const token = Cookies.get('mytoken');
  //let navigate = useNavigate()

  const logoutBtn = () => {

    Cookies.remove('mytoken');
    window.location.reload(true);
    
  }  

  return (
    <div className="App"> 
    <Router>
      <Navbar token={token} logoutBtn={logoutBtn} />
      <Routes>
        <Route path="/" element={<Home />} token={token}/>
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