import React, {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Home() {

  const token = Cookies.get('mytoken'); 
  const [isActive, setIsActive] = useState(false);
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
      <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>
                    <h4>Hola</h4>
                </div>
                <div>{isActive ? '⇑' : '⇓'}</div>
            </div>            
            {isActive && <div className="card">                
                Hola                
            </div>}            
        </div>    
    </div>

  )
}

export default Home