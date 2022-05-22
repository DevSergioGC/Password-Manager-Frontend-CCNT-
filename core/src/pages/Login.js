import React, {useState, useEffect} from "react";
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {  

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[token, setToken] = useCookies(['mytoken'])
    let history = useNavigate()

    useEffect(() =>{

        if (token['mytoken']){

            history('/folder')

        }

    }, [token])

    const loginBtn = () => {

        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token))
        

    }

    return (              
        <form className="container">
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
                    <button onClick={loginBtn} className="btn btn-primary">Login</button>
                </div>
        </form>               
    )
}

export default Login;