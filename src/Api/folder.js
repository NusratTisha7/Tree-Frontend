import axios from "axios";

//http://localhost:5000
//https://tree-backend.herokuapp.com

export const createRootFolder = (value) => {
    const data = {
        folderName: value
    }
    return axios.post(`https://tree-backend.herokuapp.com/api/folder/createRoot`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const createFolder = (data) => {
    console.log(data)
    return axios.post(`https://tree-backend.herokuapp.com/api/folder/createSub`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}


export const getFolders = (id) => {
    return axios.get(`https://tree-backend.herokuapp.com/api/folder/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}


