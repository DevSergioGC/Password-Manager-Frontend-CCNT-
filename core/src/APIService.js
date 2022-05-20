export default class APIService {

    static UpdateFolder(id_folders, body){

        return fetch(`http://127.0.0.1:8000/api/folder/${id_folders}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token b177a25b4583b9ddff077c2bb5b6c4a89a6d1e9f'
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static InsertFolder(body){

        return fetch('http://127.0.0.1:8000/api/folder/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token b177a25b4583b9ddff077c2bb5b6c4a89a6d1e9f'
            },
            body:JSON.stringify(body)
            
        }).then(resp => resp.json())

    }

}