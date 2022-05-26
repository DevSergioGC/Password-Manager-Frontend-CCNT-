import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import APIService from '../APIService';

function Register() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  let navigate = useNavigate()

  const handleRegistration = (data) => {

    APIService.RegisterUser({'first_name':data.name, 'username': data.username, 'password': data.password})
    .then(navigate('/login'))
    .catch(error => console.log(error))

  };

  const handleError = (errors) => {};

  //! Password test with regular expresion: aSa2asda

  const registerOptions = {
    name: { required: "Name is required" },
    username: { required: "username is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      },
      pattern: {
        value: /\w([A-Z]{1})\w([0-9]{1})\w/g,
        message: "Password must have: 8 characters min | 1 mayus character | 1 number"
      }
    },
    password2: {
      required: "Password confirmation is required",
      validate: value => { 
        if (watch('password') != value) {
          return "Your passwords do no match";
        }
      }
    },
  }

  return (

    <div className="container">
      <form onSubmit={handleSubmit(handleRegistration, handleError)}>
        <div className="col">
          <div className="mb-3 col">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              className="form-control" 
              name="name" 
              type="text" 
              {...register('name', registerOptions.name) }
            />
            <label className="text-danger">{errors?.name && errors.name.message}</label>
          </div>
          <div className="mb-3 col">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              {...register('username', registerOptions.username)}
            />
            <label className="text-danger">
              {errors?.username && errors.username.message}
            </label>
          </div>
          <div className="mb-3 col">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              {...register('password', registerOptions.password)}
            />
            <label className="text-danger">
              {errors?.password && errors.password.message}
            </label>
          </div>
          <div className="mb-3 col">
            <label htmlFor="password2" className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              {...register('password2', registerOptions.password2)}
            />
            <label className="text-danger">
              {errors?.password2 && errors.password2.message}              
            </label>
            {registerOptions.password != registerOptions.password ? <label></label> : null}
          </div>
          <button className = "btn btn-primary">Register</button>
        </div>
      </form>
    </div>

  );

  /*

  let navigate = useNavigate()

  const RegisterBtn = () => {

    APIService.RegisterUser({'first_name':formValues.name, 'username': formValues.username, 'password': formValues.password})
    .then(navigate('/login'))
    .catch(error => console.log(error))

  } 

  */

  
}

export default Register;