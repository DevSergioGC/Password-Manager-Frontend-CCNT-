import React from 'react';
import ItemsForm from './ItemsForm';
import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';

function Item(props) {

  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const[showItemForm, setShowItemForm] = useState(false);
  const[token] = useCookies(['mytoken']);

  /* --------------------------------------------------- */

  const[isEditable, setIsEditable] = useState(false);

  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/api/item/?folder=${encodeURIComponent(props.folder)}`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setItems(resp))
    .catch(error => console.log(error))

  }, [items]) 
  

  const updatedInformation = (item) => {      

    return item    

  } 

  const insertedInformation = (item) => {

    const new_item = [...items, item]
    setItems(new_item)

  }

  const DeleteBtn = (item) => {

    return false
    
  }

  const deleteBtn = (item) => {

    APIService.Delete(item.id_item, token['mytoken'], "item")
    .then(() => DeleteBtn(item))    
    .catch(error => console.log(error))  

  }

  return(

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
                    setShowItemForm(!showItemForm)
                    setIsEditable(!isEditable)
                  }}>Update</button>
                </div>
                <div className="col-md-2">
                  <button className = "btn btn-danger" onClick = {deleteBtn}>Delete</button>
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
                        item={item} 
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

  )
}

export default Item