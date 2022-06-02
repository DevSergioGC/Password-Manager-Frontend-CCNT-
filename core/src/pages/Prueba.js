import React, { useContext } from 'react'
import UserContext from '../components/Context';

const Prueba = ({ prueba }) => {
    const user = useContext(UserContext)  
    console.log(user);   

    return (
        <h1> {user} </h1>
    )
}

export default Prueba