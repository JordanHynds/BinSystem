import axios from 'axios'


console.log(process.env.REACT_APP_BACKEND_URL);
const apiClient = axios.create({
    baseURL: "http://localhost:3001",
})

export default apiClient