import { authConstants, cartConstants} from './constants.js'
import axiosInstance from "../Components/helpers/axios"


let signup_action = (userdata, history) => {
    
    return async (dispatch) => {
           
        try{
            
            dispatch({type : authConstants.SIGNUP_REQUEST})
            const res = await axiosInstance.post('/users/signup',{...userdata})
           
            
            if(res.status === 200){
                const {message, token, result} = res.data;

                //below put token it causes error
                localStorage.setItem('token', token)
                localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : authConstants.SIGNUP_SUCCESS, 
                        payload:{message,token, result}
                    }
                )
                history.push('/')
            }
            else{
                if(res.status === 400){
                    dispatch({
                            type : authConstants.SIGNUP_FAILURE, 
                            payload:{
                                error : res.data.error
                            }
                        }
                    )
                }
            }

        }catch(error){

        }
    } 
}

let login_action = (email, password) => {
    
    return async (dispatch) => {
        
        try{
                       
            dispatch({type : authConstants.LOGIN_REQUEST})
            const res = await axiosInstance.post('/users/signin',email, password)
           
            console.log("resresresresresresresres", res)
            if(res.status === 200){
                const {token, result} = res.data;
                
                //below put token it causes error
                localStorage.setItem('token', token)
                localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : authConstants.LOGIN_SUCCESS, 
                        payload:{
                            token, result
                        }
                    }
                )
            }
            else{
                if(res.status === 400){
                    dispatch({
                            type : authConstants.LOGIN_FAILURE, 
                            payload:{
                                error : res.data.error
                            }
                        }
                    )
                }
            }
        }catch(error){

        }
    } 
}

let isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if(token)
        {
            const result = JSON.parse(localStorage.getItem('result'))
            // console.log(token)
            dispatch(
                {
                    type : authConstants.LOGIN_SUCCESS, 
                    payload:{
                        token, result
                    }
                }
            )
        }
        else {
            
                dispatch({
                    type : authConstants.LOGIN_FAILURE, 
                    payload:{
                        error : "failed to login"
                    }
                }
                )
                          
        }
    }
}

let logout_action = () => {
    // console.log("result, token", result, token)
    return async (dispatch) => {
        
        try{
            dispatch({type : authConstants.LOGOUT_REQUEST })
            const res = await axiosInstance.post('/users/signout')
            // localStorage.removeItem('result')
            // localStorage.removeItem('token')
            localStorage.clear();
            if(res.status ==200 )
            {
                localStorage.clear();
                dispatch({type : authConstants.LOGOUT_SUCCESS })
                dispatch({type : cartConstants.RESET_CART })
            }
            else{
                dispatch({type : authConstants.LOGOUT_FAILURE,
                            payload : res.data.error
                })
            }
            
        }catch(error){

        }
    } 
}



export {signup_action, login_action, isUserLoggedIn, logout_action};


