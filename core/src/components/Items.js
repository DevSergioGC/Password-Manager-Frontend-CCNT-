import React from 'react';
import ItemsForm from './ItemsForm';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form';
import Cookies from 'js-cookie';

function Item(props) {

  const [items, setItems] = useState([]);   
  const [isActive, setIsActive] = useState(false); 
  const [create, setCreate] = useState(false);     
  const [createItem, setCreateItem] = useState(false);     
  const token = Cookies.get('mytoken');
  const [isItem, setIsItems] = useState(false);
  let navigate = useNavigate();  

  useEffect(() => {

    if(!token) {

      navigate('/login')        
       
    }
  }, [token]);

  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/api/item/?folder=${encodeURIComponent(props.folder.id_folders)}`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
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
            <h4><br/>{props.folder.name}</h4>     
            <h6>{items.length} Items</h6>       
          </div>         
          <div>              
            <br/>
            <Form folder={props.folder} create={create} setCreate={setCreate} isDefault={props.folder.name === "Default" ? true : false} />         
            <br/>  
          </div>         
          <div className="row">                
            <div className="col">
              <button className="btn btn-success" onClick={ () => {setCreateItem(!createItem); setIsActive(!isActive);} }>Create Item</button> 
              <br/>
              <br/>
              <ItemsForm createItem={createItem} setCreateItem={setCreateItem} />
              <br/>
              <button className = "btn btn-primary" onClick = {() => {setIsActive(!isActive); setIsItems(!isItem)}}>View Items</button>              
            </div>
          </div>                  
        </div>    
        <br/>        
        {isActive && <div className="card-body">                
          {items.map(item => (
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
                  isFull={isItem}                                 
                />
              </div>  
              <br/>
            </div> 
          ))}                
        </div>}            
    </div>

  )
  
}

export default Item