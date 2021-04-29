import {GET_CATEGORIES_SUCCESS, GET_ALL_PRODUCTS_SUCCESS} from '../actions/initialData.action'

const initState = {
    products : [],
    // loading: false,
    // error: null
}

let product_reducer = (state = initState, action) =>{
    switch(action.type){
        // case GET_CATEGORIES_REQUEST :           
        //     return {
        //         ...state,
        //         loading: true,
        //     }
          
        case GET_ALL_PRODUCTS_SUCCESS :    
                           
            return {
                ...state,
                products: action.payload.products,
                // loading: false,
            }
        // case GET_CATEGORIES_FAILURE :    
                           
        //     return {
        //         ...state,
        //         error: action.payload.error,
        //     }

        default:
            return state;
    }

}

export {product_reducer}