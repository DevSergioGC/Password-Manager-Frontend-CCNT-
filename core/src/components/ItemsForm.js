import React, {useState, useEffect, useContext} from 'react'
import { useForm } from "react-hook-form";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function ItemsForm(props) {       

    const { register, handleSubmit, formState: { errors } } = useForm();  
    const[token] = useCookies(['mytoken']);        
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

    const InsertItem = (data) => {

        APIService.Insert({
            'name': data.name,
            'password': data.password,
            'description': data.description,
            'url': data.url,
            'folder': data.folder,
        }, token['mytoken'], "item")
        .then(resp => props.insertedInformation(resp));

        props.setShowItemForm(!props.showItemForm)

    }

    const updateItem = (data) => {
        
        APIService.Update(props.item.id_item, {
            'name': data.name,
            'password': data.password,
            'description': data.description,
            'url': data.url,
            'folder': data.folder,
        }, token['mytoken'], "item")
        .then(resp => props.updatedInformation(resp));

        props.setShowItemForm(!props.showItemForm)
    }

    const handleRegistration = (data) => {

        //? Function calling APIService to insert/update items

        props.isEditable ? 
        updateItem(data)
        :
        InsertItem(data)

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
            message: "Password must have: 8 characters min | 1 mayus character | 1 number"
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
                message: "Url must be like 'wwww.example.com'"
            }
        },
        folder: {required: "You must select one folder"}
      }
    
    return (
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
                            {props.isEditable ? 
                                folder.map(folder => {
                                    return (
                                        <>
                                        {folder.id_folders === item.folder ? 
                                        <option key={folder.id_folders} value={folder.id_folders} selected>{folder.name}</option> 
                                        : 
                                        <option key={folder.id_folders} value={folder.id_folders}>{folder.name}</option>
                                        }                                        
                                        </>
                                    )
                                })
                            :
                                null
                            }
                            {folder ? 
                                folder.map(folder => {
                                    return (
                                        <option key={folder.id_folders} value={folder.id_folders}>{folder.name}</option>
                                    )
                                })
                                :
                                null
                            }
                        </select>
                        <label className="text-danger">{errors?.id_folder && errors.id_folder.message}</label>
                    </div>
                    <button className="btn btn-primary">Create Item</button>
                </div>
            </form>
        </div>
    )
}

export default ItemsForm