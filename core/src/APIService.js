import {useCookies} from 'react-cookie';

export default class APIService {

    static Update(id, body, token, model){        

        return fetch(`http://127.0.0.1:8000/api/${model}/${id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static Insert(body, token, model){

        return fetch(`http://127.0.0.1:8000/api/${model}/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static Delete(id, token, model, folder){

        if(model === 'item'){

            return fetch(`http://127.0.0.1:8000/api/${model}/${id}/?folder=${encodeURIComponent(folder)}`, {
                'method': 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }

            })

        }else{

            return fetch(`http://127.0.0.1:8000/api/${model}/${id}/`, {
                'method': 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }

            })

        }

    }    

    static LoginUser(body) {

        return fetch('http://127.0.0.1:8000/auth/', {
          'method':'POST',
          headers: {
              'Content-Type':'application/json',              
            }, 
            body:JSON.stringify(body)
  
        })
        .then(resp => resp.json())
        .catch(err => err.json());
  
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