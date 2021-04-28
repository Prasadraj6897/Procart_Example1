import {GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,CREATE_CATEGORIES_REQUEST, CREATE_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAILURE} from '../actions/category.action'

const initState = {
    categories : [],
    loading: false,
    error: null
}

let category_reducer = (state = initState, action) =>{
    switch(action.type){
        case GET_CATEGORIES_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case GET_CATEGORIES_SUCCESS :    
                           
            return {
                ...state,
                categories: action.payload.category,
                loading: false,
            }
        case GET_CATEGORIES_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }

            case CREATE_CATEGORIES_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case CREATE_CATEGORIES_SUCCESS :    
                           
            return {
                ...state,
                loading: false,
            }
        case CREATE_CATEGORIES_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state;
    }

}

export {category_reducer};