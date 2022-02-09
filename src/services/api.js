import axios from 'axios';
console.log(process.env.REACT_APP_URL)
const api = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default api;