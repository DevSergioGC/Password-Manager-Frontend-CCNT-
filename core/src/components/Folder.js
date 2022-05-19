import React from 'react'
import Form from './Form'
import {useState, useEffect} from 'react';

export default function Folder() {

    const [folders, setFolders] = useState([])
    const [editFolder, setEditFolder] = useState(null)

    useEffect(() =>{
      fetch('http://127.0.0.1:8000/api/folder/', {
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

    const editBtn = (folder) => {
      setEditFolder(folder)
  
    }
  
    return (
        <div className="folders">
          <div className="headerContainer">            
            <h2>Folders</h2>    
            {folders.map(folder => {
              return (
                <div>
                  <h3>{folder.name}</h3>
                  <div className = "row">
                    <div className = "col-md-1">
                      <button className = "btn btn-primary" onClick  = {() => editBtn(folder)}>Update</button>
                    </div>
                    <div className = "col">
                      <button onClick = {() => deleteBtn(folder)} className = "btn btn-danger">Delete</button>
                    </div>
                  </div>
                  <hr className = "hrclass"/>
                </div>
              )              
            })} 
          </div>        

          {editFolder ? <Form folder={editFolder}/> : null}
                      
        </div>        
    )
}
