import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Home(props) {

  let navigate = useNavigate()

  useEffect(() => {

    if(!props.token) {

      navigate('/login')        
       
    }
  }, [props.token])

  return (
    <div className="home">
        <div className="headerContainer">
          <h1>Password Manager - Sergio Guzman</h1>
          <h3>SAVE ANYTHING YOU WANT</h3>     
        </div>
    </div>
  )
}

export default Home