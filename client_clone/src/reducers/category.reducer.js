import {GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE} from '../actions/category.action'
// import {GET_INITIAL_DATA_CATEGORIES_SUCCESS} from '../actions/initialData.action'
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

          
        default:
            return state;
    }

}

export {category_reducer};