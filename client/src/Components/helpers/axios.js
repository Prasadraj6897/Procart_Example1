import axios from "axios";
import { api } from "../../urlConfig";

const token = window.localStorage.getItem('token')
// console.log(token)
const axiosInstance = axios.create({
    baseURL : api,
    headers : {
        'authorization' : token ? `Bearer ${token}` : ''
    }
})

export default axiosInstance