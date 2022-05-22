import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie';

function Form(props) {

  const [name, setName] = useState('')
  const[token] = useCookies(['mytoken'])

  useEffect(() => {

    setName(props.folder.name)
    
  }, [props.folder])

  const updateFolder = () => {

    APIService.UpdateFolder(props.folder.id_folders, {name}, token['mytoken'])
    .then(resp => props.updatedInformation(resp))

  }

  const insertFolder = () => {

    APIService.InsertFolder({name}, token['mytoken'])
    .then(resp => props.insertedInformation(resp))

  }

  return (
    <div>
      {props.folder ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Name:</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          placeholder={props.folder.name}          
          value= {name} 
          onChange={e => setName(e.target.value)} />
          <br/>
          {            
            props.folder.id_folders ? <button onClick={updateFolder} className="btn btn-success">Update</button>
            : <button onClick={insertFolder} className="btn btn-success">Create</button>
          }
        </div>
      ) : null}
    </div>
  )
}

export default Form