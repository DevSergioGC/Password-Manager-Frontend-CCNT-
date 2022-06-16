import React from 'react';
import {useState, useEffect} from 'react';
import Items from './Items';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

export default function Folder() {

  const [folders, setFolders] = useState([]); 
  const token = Cookies.get('mytoken');
  let navigate = useNavigate();  

  useEffect(() => {

    if(!token) {

      navigate('/login')        
       
    }
  }, [token]);

  useEffect(() =>{

    fetch('http://127.0.0.1:8000/api/folder/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setFolders(resp))
    .catch(error => console.log(error))      
  
  }, [folders]); 

  return(

    <div className="container-md">
      <h1>Folders</h1>
      <div className="container">
        <div className="row g-2">            
          {folders.map(folder => (             

            <div className="col-6" key={folder.id_folders}>              
              <div className="p-3 "> <Items folder={folder} /> </div>
            </div>                               
                        
          ))}        
        </div>
      </div>
    </div>   

  )

}
