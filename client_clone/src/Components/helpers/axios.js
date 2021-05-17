import axios from "axios";
import { api } from "../../urlConfig";
import {store} from '../../store/store.js'

const token = window.localStorage.getItem('token')
// console.log(token)
const axiosInstance = axios.create({
    baseURL : api,
    headers : {
        'authorization' : token ? `Bearer ${token}` : ''
    }
})

axiosInstance.interceptors.request.use((req) => {
    const {Auth_root_reducer} = store.getState()
    // const auth = Auth_root_reducer;
    if(Auth_root_reducer.authenticate)
    {
        req.headers.authorization = `Bearer ${Auth_root_reducer.token}`;
    }
    return req
})

export default axiosInstance