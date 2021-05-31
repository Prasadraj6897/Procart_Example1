import axios from "axios";
// import { store } from "../../store/store";
import { api } from "../../urlConfig";
// import {store} from "../../store/store.js"



const token = window.localStorage.getItem('token')
console.log("sackasckhjasj")
console.log(token)
const axiosInstance = axios.create({
    baseURL : api,
    headers : {
        'authorization' : token ? `Bearer ${token}` : ''
    }
})

// axiosInstance.interceptors.request.use((req)=>{
//     const {auth} = store.getState()
//     if(auth.token)
//     {
//         req.headers.authorization = `Bearer ${token}`
//     }
//     return req;
// })

// axiosInstance.interceptors.response.use(
//     (res) =>{
//         return res
//     },
//     (error)=>{
//         const status = error.response ? error.response.status : 500;

//         if(status && status == 500)
//         {
//             const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

//             localStorage.clear();
//             store.dispatch({
//                 type: LOGOUT_SUCCESS
//             })
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance