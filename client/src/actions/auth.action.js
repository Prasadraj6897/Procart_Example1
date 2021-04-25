import axiosInstance from "../Components/helpers/axios";


const SIGNUPUSERDATA = "SIGNUPUSERDATA";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";


let signup_action = (userdata, history) => {
    console.log(userdata)
    return async (dispatch) => {
           
        try{
            
            // dispatch({type : SIGNUPUSERDATA})
            // let format = {
            //     headers: {
            //         type : "application/json"
            //     }
            // }
            // await axios.post(USER_API_BASE_URL, userdata); 
            // history.push("/")
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

export {SIGNUPUSERDATA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, signup_action, login_action, isUserLoggedIn}