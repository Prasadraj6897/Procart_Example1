import {authConstants} from "../actions/constants.js"

let initial_state  = {
    token: null,
    result : {
        firstName:'',
        lastName:'',
        email:'',
        picture:''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: '',
   
}

let auth_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST :           
            return {
                ...state,
                authenticating: true,
            }
          
        case authConstants.LOGIN_SUCCESS :    
                           
            return {
                ...state,
                result: action.payload.result,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            }
        case authConstants.LOGIN_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }
       
        
        case authConstants.SIGNUP_REQUEST:           
            return {
                ...state,
                authenticating: true,
            }
        case authConstants.SIGNUP_SUCCESS :           
            return {
                ...state,
                result: action.payload.result,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
        case authConstants.SIGNUP_FAILURE :           
            return {
                ...state,
                authenticating: false,
            }
        case authConstants.LOGOUT_REQUEST:
            // localStorage.clear();
            return{ ...state, loading :true};
        case authConstants.LOGOUT_SUCCESS:
            
            return{ ...initial_state,
                loading: false};
        case authConstants.LOGOUT_FAILURE:
           
            return{ 
                ...state,
                error : action.payload.error,
                loading: false
            };
        
        default:
            return state;
    }
}

export {auth_reducer};