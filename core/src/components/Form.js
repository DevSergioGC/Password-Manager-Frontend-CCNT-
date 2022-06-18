import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import APIService from '../APIService';
import Cookies from 'js-cookie';

function Form({ folder, create, setCreate, isDefault }) {
    
  const token = Cookies.get('mytoken');
  const [isActive, setIsActive] = useState(false);
  const[isEditable, setIsEditable] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const handleError = (errors) => {};  

  const handleRegistration = (data) => {

    if(isEditable){

      updateFolder(data);
      setCreate(!create);
      setIsActive(!isActive);

    }else{

      insertFolder(data);
      setCreate(!create);
      setIsActive(!isActive);

    }

  };

  const updateFolder = (data) => {
    
    APIService.Update(folder.id_folders, {'name': data.name}, token, "folder")    

  }

  const insertFolder = (data) => {      

    try{
      APIService.Insert({'name': data.name}, token, "folder")  
    } catch (err){
      console.log(err.message)
    }    

  }  

  const registerOptions = {

    name: { required: "Name is required" },    

  }    

  const deleteBtn = (folder) => {

    APIService.Delete(folder.id_folders, token, "folder")
    .then(() => setIsActive(false))    
    .catch(error => console.log(error));  

  }
  
  return (

    <div className="container">
      {isDefault ?
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-secondary" onClick={() => {
            setIsActive(!isActive);
            setCreate(!create)
            setIsEditable(false);
          }}>Create Folder</button>       
        </div>
        :
        <div className="btn-group" role="group" aria-label="Basic example">          
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