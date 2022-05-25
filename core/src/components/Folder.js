import React from 'react'
import Form from './Form'
import {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import APIService from '../APIService'

export default function Folder(props) {

    const [folders, setFolders] = useState([])
    const [editFolder, setEditFolder] = useState(null)
    const[token] = useCookies(['mytoken'])

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
  
    }, [folders])

    const editBtn = (folder) => {

      setEditFolder(folder)
  
    }

    const updatedInformation = (folder) => {      

      return folder    

    }

    const folderForm = () => {

      setEditFolder({name:''})

    }

    const insertedInformation = (folder) => {

      const new_folder = [...folders, folder]
      setFolders(new_folder)

    }

    const DeleteBtn = (folder) => {

      return false
      
    }

    const deleteBtn = (folder) => {

      APIService.DeleteFolder(folder.id_folders, token['mytoken'])
      .then(() => DeleteBtn(folder))    
      .catch(error => console.log(error))  

    }
  
    return (
        <div className="folders">
          <div className="headerContainer">            
            <h2>Folders</h2>    
            <div className="col-md-2">
              <button onClick={folderForm} className="btn btn-primary">Create Folder</button>
            </div>
            {folders.map(folder => {
              return (
                <div key={folder.id_folders}>
                  <h3>{folder.name}</h3>
                  <div className = "row">
                    <div className = "col-md">
                      <button className = "btn btn-primary" onClick  = {() => editBtn(folder)}>Update</button>
                    </div>
                    <div className = "col-md">
                      <button onClick = {() => deleteBtn(folder)} className = "btn btn-danger">Delete</button>
                    </div>
                  </div>
                  <hr className = "hrclass"/>
                </div>
              )              
            })} 
          </div>  
          {editFolder ? <Form folder={editFolder} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation} /> : null}                      
        </div>        
    )
}
