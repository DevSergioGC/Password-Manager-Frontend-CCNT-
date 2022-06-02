import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Home() {

  const[token] = useCookies(['mytoken']);  
  let navigate = useNavigate();     

  useEffect(() => {

    if(!token) {

      navigate('/login')        
       
    }
  }, [token])    

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