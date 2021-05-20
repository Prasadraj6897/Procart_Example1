import {CREATE_PAGE_REQUEST, CREATE_PAGE_SUCCESS, CREATE_PAGE_FAILURE} from '../actions/page.action.js'


let initial_state  = {
    title:'',
    Description:'',
    categoryId:'',
    type:'',
    Banner:[],
    Products:[],
    loading:false,
   
}

let page_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case CREATE_PAGE_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case CREATE_PAGE_SUCCESS :    
                           
            return {
                ...state,
                page: action.payload.data,
                loading: false,
            }
        case CREATE_PAGE_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
                loading:false,
            }
       
        
        
        default:
            return state;
    }
}

export {page_reducer};