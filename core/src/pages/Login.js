import React, {useState, useEffect, createContext} from "react";
import APIService from '../APIService';
import { useForm } from "react-hook-form";
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {      

    const { register, handleSubmit, formState: { errors } } = useForm();  
    const handleError = (errors) => {};
    const[token, setToken] = useCookies(['mytoken']);       
    let navigate = useNavigate();

    const handleRegistration = (data) => {

        APIService.LoginUser(data)
        .then(resp => setToken('mytoken', resp.token))
        .catch(error => console.log(error));    
    
    };

    useEffect(() =>{

        if (token['mytoken']){            
            
            navigate('/');

        }

    }, [token])

    const registerOptions = {               
        username: { 
            required: "Username is required",            
            /*validate: value => {
                myuser = user.filter(myuser => myuser.username === value)
                if(!myuser){
                    return "User not register"
                }
            }*/
        },
        password: {
            required: "Password is required",
            //! Add validate property                       
        }        
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <div className="col">
                    <div className="mb-3 col">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                        className="form-control" 
                        name="username" 
                        type="text" 
                        {...register('username', registerOptions.username) }
                        />
                        <label className="text-danger">{errors?.username && errors.username.message}</label>
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
                    <button className="btn btn-success">Login</button>
                    <div className="mb-3">
                        <br/>
                        <h5>If You Don't Have Account, Please <button onClick={() => navigate('/register')} className="btn btn-primary">Register</button> Here</h5>
                    </div>                 
                </div>                
            </form>
        </div>
    )    
}

export default Login;