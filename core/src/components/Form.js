import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';

function Form({ folder, create, setCreate, isDefault }) {

  //! Add to body the user id

  //const [name, setName] = useState('')
  const[token] = useCookies(['mytoken']);
  const [isActive, setIsActive] = useState(false);
  const[isEditable, setIsEditable] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const handleError = (errors) => {};  

  const handleRegistration = (data) => {

    isEditable ? 

      updateFolder(data)

    :

      insertFolder(data)      

  };

  const updateFolder = (data) => {
    
    APIService.Update(folder.id_folders, {'name': data.name}, token['mytoken'], "folder")
    .then(resp => updatedInformation(resp))

  }

  const insertFolder = (data) => {    

    APIService.Insert({'name': data.name}, token['mytoken'], "folder")
    .then(resp => insertedInformation(resp))

  }  

  const registerOptions = {

    name: { required: "Name is required" },    

  }  

  const updatedInformation = (folder) => {      

    return folder    

  }  

  const insertedInformation = (folder) => {

    const new_folder = [...folders, folder]
    setFolders(new_folder)

  }

  const deleteBtn = (folder) => {

    APIService.Delete(id=folder.id_folders, token=token['mytoken'], model="folder")
    .then(() => setIsActive(false))    
    .catch(error => console.log(error));  

  }
  
  return (

    <div className="container">
      {isDefault ?
        null
        :
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-secondary" onClick={() => {
            setIsActive(!isActive);
            setCreate(!create)
            setIsEditable(false);
          }}>Create</button>
          <button className="btn btn-secondary" onClick={() => {
            setIsActive(!isActive);
            setCreate(!create)
            setIsEditable(true);
          }}>Update</button>
          <button className="btn btn-secondary" onClick={() => deleteBtn(folder)}>Delete</button>
        </div>
      }
      {(isActive || create) && <div className="accordion-content">
        <div className="container">
          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div className="mb-3 col">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                className="form-control" 
                name="name" 
                type="text" 
                placeholder= {isEditable ? folder.name : ""}
                {...register('name', registerOptions.name) }
              />
              <label className="text-danger">{errors?.name && errors.name.message}</label>
            </div>
            {isEditable ?
              <button className="btn btn-primary">Update</button>
            :
              <button className="btn btn-primary">Create</button>
            }
          </form>
        </div>
      </div>}
    </div>

  )
  
}

export default Form