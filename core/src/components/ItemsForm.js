import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie';

function ItemsForm(props) {

    const initialValues = { name: "", login: "", password: "" , description: "", url: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

    };

    useEffect(() => {

        console.log(formErrors);

        if (Object.keys(formErrors).length === 0 && isSubmit) {

            console.log(formValues);

        }

    }, [formErrors]);

    const validate = (values) => {

        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if (!values.name) {

            errors.username = "Name is required!";

        }

        if (!values.login) {

            errors.email = "Login is required!";

        } 

        if(!values.password) {

            errors.password = "Password is required!";

        }else if (!regex.test(values.password)) {

            errors.password = "Password needs to have: 8 characters min | 1 mayus character | 1 number";

        }

        return errors;

    };

  return (
    <div>
        <form onSubmit={handleSubmit} className="mb-3">
            <h1>Item Form</h1>
            <div className="Container">
                <div className="Form">
                    <div className="field">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Item's name"
                            className="form-control"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.name}</p>
                    <div className="field">
                        <label htmlFor="login" className="form-label">Login:</label>
                        <input
                            type="text"
                            name="login"
                            placeholder="Username/Email"
                            className="form-control"
                            value={formValues.login}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.login}</p>
                    <div className="field">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Item's password"
                            className="form-control"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <div className="field">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input
                            type="richtext"
                            name="description"
                            placeholder="Item's description"
                            className="form-control"
                            value={formValues.description}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.description}</p>
                    <div className="field">
                        <label htmlFor="url" className="form-label">URL:</label>
                        <input
                            type="text"
                            name="url"
                            placeholder="Item's url"
                            className="form-control"
                            value={formValues.url}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.url}</p>  
                    <button className="btn btn-primary">Crear</button>                  
                </div>
            </div>
        </form>
    </div>
  )
}

export default ItemsForm