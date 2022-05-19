import React, {useState} from 'react'
import APIService from '../APIService'

function Form(props) {

  const [name, setName] = useState(props.folder.name)

  const updateFolder = () => {

    APIService.UpdateFolder(props.folder.id_folders, {name})
    .then(resp => console.log(resp))

  }

  return (
    <div>
      {props.folder ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Name:</label>
          <input type="text" className="form-control" id="title" placeholder={props.folder.name}
          value= {name} onChange={e => setName(e.target.value)} />
          <br/>
          <button onClick={updateFolder} className="btn btn-success">Update</button>
        </div>
      ) : null}
    </div>
  )
}

export default Form