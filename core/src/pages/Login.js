import React from "react";

function Login() {  
    return (              
        <form className="container">
                <div className="row">
                    <div className="mb-3 col">
                        <label for="exampleInputEmail1" className="form-label">Username:</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>                    
                    </div>
                    <div className="mb-3 col-12">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>               
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>
        </form>               
    )
}

export default Login;