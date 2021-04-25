import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT} from "../actions/auth.action"

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
        case LOGOUT:
            localStorage.clear();
            return{ ...initial_state};
        
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
        default:
            return state;
    }
}

export {auth_reducer};