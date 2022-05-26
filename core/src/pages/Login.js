import React, {useState, useEffect} from "react";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {  

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[token, setToken] = useCookies(['mytoken'])    
    let navigate = useNavigate()

    //! Usar este hook en el formulario de registro
    useEffect(() =>{

        if (token['mytoken']){

            navigate('/folder')

        }

    }, [token])

    const loginBtn = () => {

        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token));
        

    }    

    const handleSubmit = (e) => {

        e.preventDefault();

    }

    return (              
        <form className="container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter a username"                        
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />                    
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter a password"                        
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                    </div>               
                    <button onClick={loginBtn} className="btn btn-success">Login</button>

                    <div className="mb-3">
                        <br/>
                        <h5>If You Don't Have Account, Please <button onClick={() => navigate('/register')} className="btn btn-primary">Register</button> Here</h5>
                    </div>
                </div>
        </form>                      
    )
}

export default Login;