import React from "react";

function Register() {
  return (
    <div className="container">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Full name
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          name="name"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Username
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="username"
        ></input>        
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput1"
          name="password"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput1"
          name="password_confirm"
        />
      </div>
      <div>        
        <input
          type="button"          
          name="name"
          value="Register"
        />
      </div>
    </div>
  );
}

export default Register;