import React, {useState, useEffect, createContext} from "react";
import APIService from '../APIService';
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {      

    const { register, handleSubmit, formState: { errors } } = useForm();  
    const handleError = (errors) => {};           
    let navigate = useNavigate();
    const[showPwd, setShowPwd] = useState(false);

    const handleRegistration = (data) => {

        APIService.LoginUser(data)
        .then(resp => Cookies.set('mytoken', resp.token, { expires: 1 }))
        .catch(error => console.log(error));    
        window.location.reload(true);
    
    };

    useEffect(() =>{

        if (Cookies.get('mytoken')){            
            
            navigate('/');

        }

    }, [Cookies.get('mytoken')])

    const registerOptions = {               
        username: { 
            required: "Username is required",          
        },
        password: {
            required: "Password is required",                                   
        }        
    }

    return (
        <div className="container-sm">
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
                        type={showPwd ? "text" : "password"} 
                        {...register('password', registerOptions.password) }
                        />
                        <checkbox ></checkbox>
                        <label className="text-danger">{errors?.password && errors.password.message}</label>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"                           
                                id="flexCheckChecked"
                                onClick={ () => {
                                    setShowPwd(!showPwd);                                
                                } }                            
                            />
                            <label className="form-check-label" for="flexCheckChecked">
                                Show Password
                            </label>
                        </div>
                    </div>   
                    <button className="btn btn-success">Login</button>
                    <div className="mb-3">
                        <br/>
                        <h5>If You Don't Have Account, Please Register <button onClick={() => navigate('/register')} className="btn btn-primary">Here</button></h5>
                    </div>                 
                </div>                
            </form>
        </div>
    )    
}

export default Login;