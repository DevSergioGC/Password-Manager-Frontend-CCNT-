import React, {useState, useEffect, useContext} from 'react'
import { useForm } from "react-hook-form";
import APIService from '../APIService';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function ItemsForm({item, isActive, folder_id, setIsActive, isFull}) {       

    const { register, handleSubmit, formState: { errors } } = useForm();  
    const token = Cookies.get('mytoken');
    const[isEditable, setIsEditable] = useState(false);  
    const[randomPassword, setPassword] = useState(null)  
    const[showItemForm, setShowItemForm] = useState(false); 
    const[isChecked, setIsChecked] = useState(false)      
    const handleError = (errors) => {};
    let navigate = useNavigate();

    const [folder, setFolder] = useState(() => {

        fetch('http://127.0.0.1:8000/api/folder/', {
        'method': 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(resp => resp.json())
      .then(resp => setFolder(resp))
      .catch(error => console.log(error))      

    });    

    useEffect(() =>{
        if(!isActive){
            setShowItemForm(false);
        }
    }, [isActive]);   
    
    const deleteBtn = (item) => {
    
        APIService.Delete(item.id_item, token, "item", folder_id)           
        .catch(error => console.log(error));  
    
    }

    const InsertItem = (data) => {

        APIService.Insert({
            'name': data.name,
            'password': data.password,
            'description': data.description,
            'url': data.url,
            'folder': data.folder,
        }, token, "item");        

        setShowItemForm(!showItemForm);
        setIsCreate(!iscreate);

    }

    const updateItem = (data) => {
        
        APIService.Update(item.id_item, {
            'name': data.name,
            'password': data.password,            
            'description': data.description,
            'url': data.url,
            'folder': data.folder,
        }, token, "item");        

        setShowItemForm(!showItemForm)
    }

    const handleRegistration = (data) => {       
        
        data.password = data.password === "" ? item.password : data.password
        data.description = (data.description === "" ? item.description : data.description)
        data.url = (data.url === "" ? item.url : data.url)

        isEditable ? updateItem(data) : InsertItem(data)

        setIsActive(true);        

    };

    const generarString = (longitud) => {

        let result = "";
        const abc = "a b c d e f g h i j k l m n o p q r s t u v w x y z ! @ # $ % &".split(" "); // Espacios para convertir cara letra a un elemento de un array
        for(let i=1;i<=longitud;i++) {
          if (abc[i]) { // Condicional para prevenir errores en caso de que longitud sea mayor a 26
            const random = Math.floor(Math.random() * 4); // Generaremos el número
            const random2 = Math.floor(Math.random() * abc.length); // Generaremos el número
            const random3 = Math.floor(Math.random() * abc.length + 3); // Generaremos el número
            if (random == 1) {
              result += abc[random2]
            } else if (random == 2) {
              result += random3 + abc[random2]
            } else {
              result += abc[random2].toUpperCase()
            }
          }
        }
    
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    
        if(regex.test(result)){
    
          return result;
    
        }else{
    
          generarString(longitud);
    
        }
        
    };

    const registerOptions = {
        name: { required: "Name is required" },        
        password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            message: "Password must have: 1 Uppercase | 1 Number"
          }
        },
        description: {
            maxLength: {
                value: 150,
                message: "Description can not be too large"
            }
        },
        url: {
            pattern: {
                value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
                message: "Url must be like 'wwww.example.com' | 'example.com'"
            }
        },
        folder: {required: "You must select one folder"},
    }

    return (
        <div className="accordion-item">
            <div className="card-body">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button className = "btn btn-success" onClick = {() => {
                        setShowItemForm(!showItemForm);
                        setIsEditable(false);                        
                    }}>Create Item</button>
                    <button className = "btn btn-primary" onClick = {() => {
                        setShowItemForm(!showItemForm);
                        setIsEditable(true);                                       
                    }}>Update</button>
                    <button className = "btn btn-danger" onClick = {() => deleteBtn(item)}>Delete</button>
                </div>                         
            </div>
          {(showItemForm) && <div className="accordion-content">
          <div className="container">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <div className="col">
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control" 
                        name="name" 
                        type="text" 
                        placeholder= {isEditable ? item.name : null}
                        {...register('name', registerOptions.name) }
                        />
                        <label className="text-danger">{errors?.name && errors.name.message}</label>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                        className="form-control" 
                        name="password" 
                        type="password" 
                        value={isChecked ? randomPassword : null}                      
                        {...register('password', registerOptions.password) }
                        />
                        <label className="text-danger">{errors?.password && errors.password.message}</label>
                    </div> 
                    <div className="mb-3 col">
                        <div className="form-check">
                            <input 
                            className="form-check-input" 
                            type="checkbox"                           
                            id="flexCheckChecked"
                            onClick={ () => {
                                setIsChecked(!isChecked);
                                setPassword(generarString(20));
                            } }                            
                            />
                            <label className="form-check-label" for="flexCheckChecked">
                                Generate Password
                            </label>
                        </div>
                    </div>                  
                    <div className="mb-3 col">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                        className="form-control" 
                        name="description"                          
                        rows = "4"                       
                        placeholder= {isEditable ? item.description : null}
                        {...register('description', registerOptions.description) }
                        />
                        <label className="text-danger">{errors?.description && errors.description.message}</label>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="url" className="form-label">Site URL:</label>
                        <input
                        className="form-control"                        
                        name="url" 
                        type="text" 
                        placeholder= {isEditable ? item.url : "www.example.com"}
                        {...register('url', registerOptions.url) }
                        />
                        <label className="text-danger">{errors?.url && errors.url.message}</label>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="id_folder" className="form-label">Folder:</label>
                        <select className="form-select" {...register('folder', registerOptions.folder) }>                            
                            {folder ?
                                folder.map(fol => {
                                    return (
                                        <option value={fol.id_folders}>{fol.name}</option>
                                    )
                                })
                            :
                                null
                            }
                        </select>
                        <label className="text-danger">{errors?.id_folder && errors.id_folder.message}</label>
                    </div>                    
                    {isEditable ?
                        <button className="btn btn-primary">Update</button>
                    :
                        <button className="btn btn-primary">Create</button>
                    }
                </div>   
                <br/>             
            </form>
        </div>
            </div>}
        </div>
    );   
    
}

export default ItemsForm