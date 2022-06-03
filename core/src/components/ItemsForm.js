import React, {useState, useEffect, useContext} from 'react'
import { useForm } from "react-hook-form";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function ItemsForm({item, isActive}) {       

    const { register, handleSubmit, formState: { errors } } = useForm();  
    const[token] = useCookies(['mytoken']); 
    const[isEditable, setIsEditable] = useState(false);    
    const[showItemForm, setShowItemForm] = useState(false);       
    const handleError = (errors) => {};
    let navigate = useNavigate();

    const [folder, setFolder] = useState(() => {

        fetch('http://127.0.0.1:8000/api/folder/', {
        'method': 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['mytoken']}`
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
    
    const insertedInformation = (item) => {
    
        const new_item = [...items, item]
        setItems(new_item)
    
    }  
    
    const deleteBtn = (item) => {
    
        APIService.Delete(item.id_item, token['mytoken'], "item")           
        .catch(error => console.log(error));  
    
    }

    const InsertItem = (data) => {

        APIService.Insert({
            'name': data.name,
            'password': data.password,
            'description': data.description,
            'url': data.url,
            'folder': data.folder,
        }, token['mytoken'], "item")
        .then(resp => insertedInformation(resp));

        setShowItemForm(!showItemForm)

    }

    const updateItem = (data) => {
        
        APIService.Update(item.id_item, {
            'name': data.name,
            'password': data.password,            
            'description': () => {{
                if(data.description === ""){                    
                    return data.description
                }else{
                    return item.description
                }
            }},
            'url': data.url ? data.url : item.url,
            'folder': data.folder,
        }, token['mytoken'], "item");        

        setShowItemForm(!showItemForm)
    }

    const handleRegistration = (data) => {

        //? Function calling APIService to insert/update items

        console.log(data)

       /* props.isEditable ? 
        updateItem(data)
        :
        InsertItem(data)*/

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
        folder: {required: "You must select one folder"}
    }

    return (
        <div className="accordion-item">
            <div className="accordion-title">
                <br/>
                <div className="row">
                    <div className="col">
                        <button className = "btn btn-primary" onClick = {() => {
                            setShowItemForm(!showItemForm);
                            setIsEditable(!isEditable);                   
                        }}>Update</button>
                    </div>
                <br/>
                <div className="col">
                  <button className = "btn btn-danger" onClick = {() => deleteBtn(item)}>Delete</button>
                </div>
              </div> 
              <br/>           
          </div>
          {showItemForm && <div className="accordion-content">
          <div className="container">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control" 
                        name="name" 
                        type="text" 
                        placeholder= {isEditable ? item.name : ""}
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
                        {...register('password', registerOptions.password) }
                        />
                        <label className="text-danger">{errors?.password && errors.password.message}</label>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                        className="form-control" 
                        name="description"                          
                        rows = "2"
                        placeholder= {isEditable ? item.description : ""}
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
            </form>
        </div>
            </div>}
        </div>
    );
    
    /*return (
        <div className="container">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control" 
                        name="name" 
                        type="text" 
                        placeholder= {props.isEditable ? props.item.name : ""}
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
                        {...register('password', registerOptions.password) }
                        />
                        <label className="text-danger">{errors?.password && errors.password.message}</label>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                        className="form-control" 
                        name="description"                          
                        rows = "2"
                        placeholder= {props.isEditable ? props.item.description : ""}
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
                        placeholder= {props.isEditable ? props.item.url : "www.example.com"}
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
                    {props.isEditable ?
                        <button className="btn btn-primary">Update</button>
                    :
                        <button className="btn btn-primary">Create</button>
                    }
                </div>
            </form>
        </div>
    )*/
}

export default ItemsForm