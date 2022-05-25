import React from 'react';
import ItemsForm from './ItemsForm';
import {useState, useEffect} from 'react';

function Item() {

  const [items, setItems] = useState([])

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/item', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token b177a25b4583b9ddff077c2bb5b6c4a89a6d1e9f'
      }
    })
    .then(resp => resp.json())
    .then(resp => setItems(resp))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="item">
        <div className="headerContainer">          
          <h2>Items</h2> 
          {items.map(item => {
            return (
                <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>{item.url}</p>                    
                </div>
            )
          })}
        </div>
        <ItemsForm />
    </div>    
  )
}

export default Item