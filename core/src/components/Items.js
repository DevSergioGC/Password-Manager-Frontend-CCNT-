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
  const token = Cookies.get('mytoken');
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
          </div>         
          <div>              
            <br/>
            <Form folder={props.folder} create={create} setCreate={setCreate} isDefault={props.folder.name === "Default" ? true : false} />         
            <br/>  
          </div>         
          <div className="row">                
            <div className="col">
              <ItemsForm isFull={items.length > 0 ? true : false} /> 
              <br/>
              <button className = "btn btn-primary" onClick = {() => setIsActive(!isActive)}>View Items</button>              
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