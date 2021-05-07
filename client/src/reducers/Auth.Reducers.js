import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS} from "../actions/auth.action"

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
    console.log("action_Reducers", action)
    switch(action.type){
        case LOGIN_REQUEST :           
            return {
                ...state,
                authenticating: true,
            }
          
        case LOGIN_SUCCESS :    
                           
            return {
                ...state,
                result: action.payload.result,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            }
        case LOGIN_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }
       
        
        case SIGNUP_REQUEST:           
            return {
                ...state,
                authenticating: true,
            }
        case SIGNUP_SUCCESS :           
            return {
                ...state,
                result: action.payload.result,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
        case SIGNUP_FAILURE :           
            return {
                ...state,
                authenticating: false,
            }
        case LOGOUT_REQUEST:
            // localStorage.clear();
            return{ ...state, loading :true};
        case LOGOUT_SUCCESS:
            
            return{ ...initial_state,
                loading: false};
        case LOGOUT_FAILURE:
           
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