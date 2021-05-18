import {userAddressConstants} from "../actions/constants.js"

let initial_state  = {
    address:[],
    error: null,
    loading: false
   
}

let address_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case userAddressConstants.GET_USER_ADDRESS_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case userAddressConstants.GET_USER_ADDRESS_SUCCESS :    
                           
            return {
                ...state,
                address: action.payload.address,
                loading: false,
            }
        case userAddressConstants.GET_USER_ADDRESS_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            }
       
        
        case userAddressConstants.ADD_USER_ADDRESS_REQUEST:           
            return {
                ...state,
                loading: true,
            }
        case userAddressConstants.ADD_USER_ADDRESS_SUCCESS :           
            return {
                ...state,
                // result: action.payload.result,
                // token: action.payload.token,
                loading: false
            }
        case userAddressConstants.ADD_USER_ADDRESS_FAILURE :           
            return {
                ...state,
                loading: false,
            }
                
        
        default:
            return state;
    }
}

export {address_reducer};