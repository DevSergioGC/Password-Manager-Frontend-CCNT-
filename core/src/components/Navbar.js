import React from "react";
import {Link} from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            PWD-Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'>
                  Home
                </Link>
              </li>    
              {
                props.token ?
                  <li className="nav-item">
                    <Link className="nav-link" to='/folder'>
                        Folder
                    </Link>
                  </li>
                :
                  null
              }                    
              {
                !props.token ?
                  <li className="nav-item">
                    <Link className="nav-link" to='/login'>
                        Login
                    </Link>
                  </li>
                :
                  <button className="btn btn-danger" onClick={props.logoutBtn}>Logout</button>
              }                    
              {
                !props.token ?
                  <li className="nav-item">
                    <Link className="nav-link" to='/register'>
                        Register
                    </Link>
                  </li>
                :
                  null
              }                       
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;