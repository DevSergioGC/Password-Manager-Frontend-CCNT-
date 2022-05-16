import React from 'react'
import {useState, useEffect} from 'react';

export default function Folder() {
    const [folders, setFolders] = useState([])

    useEffect(() =>{
      fetch('http://127.0.0.1:8000/api/folder', {
        'method': 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token b177a25b4583b9ddff077c2bb5b6c4a89a6d1e9f'
        }
      })
      .then(resp => resp.json())
      .then(resp => setFolders(resp))
      .catch(error => console.log(error))
  
    }, [])
  
    return (
        <div className="folders">
          <div className="headerContainer">            
            <h2>Folders</h2>    
            {folders.map(folder => {
              return <h4 key={folder.id}>{folder.name}</h4>
            })}
          </div>
        </div>
    )
}
