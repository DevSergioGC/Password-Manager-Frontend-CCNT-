import {useCookies} from 'react-cookie';

export default class APIService {

    static UpdateFolder(id_folders, body, token){

        return fetch(`http://127.0.0.1:8000/api/folder/${id_folders}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static InsertFolder(body, token){

        return fetch('http://127.0.0.1:8000/api/folder/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static DeleteFolder(id_folders, token){

        return fetch(`http://127.0.0.1:8000/api/folder/${id_folders}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }

        })

    }

    static LoginUser(body) {

        return fetch('http://127.0.0.1:8000/auth/', {
          'method':'POST',
          headers: {
              'Content-Type':'application/json',              
            }, 
            body:JSON.stringify(body)
  
        }).then(resp => resp.json())
  
    }

    static RegisterUser(body) {

        return fetch('http://127.0.0.1:8000/api/user/', {
          'method':'POST',
          headers: {
              'Content-Type':'application/json',              
            }, 
            body:JSON.stringify(body)
  
        }).then(resp => resp.json())
  
    }

}