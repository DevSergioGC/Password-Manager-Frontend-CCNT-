import React from 'react'
import Form from './Form'
import {useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import APIService from '../APIService';
import Items from './Items';

export default function Folder() {

  const [folders, setFolders] = useState([]); 
  const[token] = useCookies(['mytoken']); 

  useEffect(() =>{

    fetch('http://127.0.0.1:8000/api/folder/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
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
