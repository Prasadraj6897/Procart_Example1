import axiosInstance from "../Components/helpers/axios";


const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "SIGNUP_FAILURE";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";


let signup_action = (userdata, history) => {
    
    return async (dispatch) => {
           
        try{
            
            dispatch({type : SIGNUP_REQUEST})
            const res = await axiosInstance.post('/signup',{...userdata})
           
            
            if(res.status === 200){
                const {message, token, result} = res.data;

                //below put token it causes error
                localStorage.setItem('token', token)
                localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : SIGNUP_SUCCESS, 
                        payload:{message,token, result}
                    }
                )
                history.push('/')
            }
            else{
                if(res.status === 400){
                    dispatch({
                            type : SIGNUP_FAILURE, 
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

let login_action = (userdata) => {
    
    return async (dispatch) => {
        
        try{
                       
            dispatch({type : LOGIN_REQUEST})
            const res = await axiosInstance.post('/signin',{...userdata})
           
            
            if(res.status === 200){
                const {token, result} = res.data;
                
                //below put token it causes error
                localStorage.setItem('token', token)
                localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : LOGIN_SUCCESS, 
                        payload:{
                            token, result
                        }
                    }
                )
            }
            else{
                if(res.status === 400){
                    dispatch({
                            type : LOGIN_FAILURE, 
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
                    type : LOGIN_SUCCESS, 
                    payload:{
                        token, result
                    }
                }
            )
        }
        else {
            
                dispatch({
                    type : LOGIN_FAILURE, 
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
            
            
            dispatch({type : LOGOUT})
        }catch(error){

        }
    } 
}

export {SIGNUP_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAILURE, signup_action, login_action, isUserLoggedIn, logout_action}