import React from 'react';
import ItemsForm from './ItemsForm';
import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';
import APIService from '../APIService';

function Item(props) {

  const [items, setItems] = useState([]);   
  const [isActive, setIsActive] = useState(false);
  const [editFolder, setEditFolder] = useState(null); 
  const[token] = useCookies(['mytoken']);  

  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/api/item/?folder=${encodeURIComponent(props.folder.id_folders)}`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setItems(resp))
    .catch(error => console.log(error))

  }, [items]);  

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

    APIService.Delete(folder.id_folders, token['mytoken'], "folder")
    .then(() => DeleteBtn(folder))    
    .catch(error => console.log(error))  

  }
  
  return (
    
    <div className="accordion-item">
        <div className="accordion-title">
          <div>
            <h4>{props.folder.name}</h4>            
          </div>  
          <div>
            {props.folder.name === 'Default' ? 
              null
              :
              <div className = "row">
                <div className = "col-md">
                  <button className = "btn btn-primary" onClick  = {() => editBtn(props.folder)}>Update</button>
                </div>                    
                <div className = "col-md">
                  <button onClick = {() => deleteBtn(props.folder)} className = "btn btn-danger">Delete</button>
                </div> 
                                                  
              </div>              
            }          
            <br/>  
          </div>
          <div className="row">            
            <div className="col">
              <button className = "btn btn-secondary" onClick = {() => setIsActive(!isActive)}>View Items</button>
            </div>
          </div>          
        </div>    
        <br/>        
        {isActive && <div className="card-body">                
          {items.map(item => {

            return (
              <div className="accordion-item" key={item.id}>
                <h3>{item.name}</h3>
                <p><b>Password:</b> {item.password}</p>
                <p><b>Description:</b> {item.description}</p>
                <p><b>URL:</b> {item.url}</p>     
                <br/>                    
                <div className="card-body">
                  <ItemsForm 
                    folder={props.folder.id_folders} 
                    item={item}  
                    isActive = {isActive}                  
                  />
                </div>  
                <br/>
              </div>
            )              

          })}                
        </div>}            
    </div>

  )

  /*return(

    <div className="card">
      <div className="card-body">
        <div className = "col-md-2">
          <button className = "btn btn-primary" onClick = {() => setShowItemForm(!showItemForm)}>Create Item</button>
        </div>
        {items.map(item => {
          return(
            <div className="container" key={item.id}>
              <h3>{item.name}</h3>
              <p><b>Password:</b> {item.password}</p>
              <p><b>Description:</b> {item.description}</p>
              <p><b>URL:</b> {item.url}</p>
              <div className="row">
                <div className="col-md-2">
                  <button className = "btn btn-primary" onClick = {() => {
                    setShowItemForm(!showItemForm);
                    setIsEditable(!isEditable);
                    editBtn(item);
                  }}>Update</button>
                </div>
                <div className="col-md-2">
                  <button className = "btn btn-danger" onClick = {() => deleteBtn(item)}>Delete</button>
                </div>
              </div>
              {showItemForm ?
                <>
                  <br/>
                  <div className="card">
                    <div className="card-body">
                      <ItemsForm 
                        folder={props.folder} 
                        isEditable={isEditable} 
                        item={editItem} 
                        updatedInformation = {updatedInformation} 
                        insertedInformation = {insertedInformation}
                        showItemForm = {showItemForm}
                        setShowItemForm = {setShowItemForm}
                      />
                    </div>
                  </div>
                </>
                :
                null
              }
              <hr className = "hrclass"/>
            </div>
          )
        })}
      </div>
    </div>

  )*/
}

export default Item