import './App.css';
import React, {useEffect} from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Folder from './components/Folder';
import Items from './components/Items'
import {useCookies} from 'react-cookie';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {  

  const[token, removeToken] = useCookies(['mytoken'])
  //let navigate = useNavigate()

  const logoutBtn = () => {

    removeToken(['mytoken'])    

  } 

  return (
    <div className="App"> 
    <Router>
      <Navbar token={token['mytoken']} logoutBtn={logoutBtn} />
      <Routes>
        <Route path="/" element={<Home />} token={token['mytoken']}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/item" element={<Items />} />
      </Routes>
    </Router> 

    {token['mytoken']  ? <button onClick={logoutBtn} className="btn btn-primary">Logout</button> : null}  
    </div>
  );
}

export default App;