import {SIGNUPUSERDATA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,} from "../actions/auth.action"

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
            break;
        case LOGIN_SUCCESS :    
            console.log("LOGIN_SUCCESS")
               
            return {
                ...state,
                result: action.payload.result,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            }
            break;
        //     case SIGNUPUSERDATA :
           
        //     return {
        //         // state,
        //         User_Data :action.payload,
        //     }
        default:
            return state;
    }
}

export {auth_reducer};