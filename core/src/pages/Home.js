import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Home() {

  const token = Cookies.get('mytoken'); 
  let navigate = useNavigate();  

  useEffect(() => {

    if(!token) {

      navigate('/login')        
       
    }
  }, [token]); 

  return (   
        
    <div className="container">
      <div className="home">
          <div className="headerContainer">
            <h1>Password Manager - Sergio Guzman</h1>
            <h3>SAVE ANYTHING YOU WANT</h3>             
          </div>
      </div>      
    </div>

  )
}

export default Home