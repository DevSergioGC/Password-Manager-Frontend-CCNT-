import React from 'react';
import ItemsForm from './ItemsForm';
import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';
import APIService from '../APIService';
import Form from './Form';

function Item(props) {

  const [items, setItems] = useState([]);   
  const [isActive, setIsActive] = useState(false); 
  const [create, setCreate] = useState(false);
  const [iscreate, setIsCreate] = useState(false);
  const [isDefault, setIsDefault] = useState(false);  
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

  return (
    
    <div className="accordion-item">
        <div className="">
          <div>
            <h4>{props.folder.name}</h4>            
          </div>         
          <div>
            {props.folder.name === 'Default' ?             
              <div className="col">
                <button className="btn btn-primary" onClick = {() => {setCreate(!create); () => setIsDefault(true);}}>Create</button>            
              </div>
              :
              () => setIsDefault(false)                       
            }  
            <br/>
            <Form folder={props.folder} create={create} setCreate={setCreate} isDefault={isDefault} />         
            <br/>  
          </div>
          <div className="row">           
            <div className="col">
              <button className="btn btn-primary" onClick = {() => setIsCreate(!iscreate)}>Create</button>            
            </div>
            <div className="col">
              <button className = "btn btn-primary" onClick = {() => setIsActive(!isActive)}>View Items</button>
            </div>
          </div> 
          {
            iscreate ?
            <>
              <br/>
              <div className = "card-body">
                <ItemsForm iscreate={iscreate} setIsCreate = {setIsCreate} />
              </div>
              <br/>
            </>
            :
            null
          }         
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
                    folder_id={props.folder.id_folders} 
                    item={item}  
                    isActive = {isActive} 
                    setIsActive = {setIsActive}
                    iscreate={iscreate}
                    setIsCreate = {setIsCreate}                 
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