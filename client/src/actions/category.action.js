import axiosInstance from "../Components/helpers/axios";

const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

const CREATE_CATEGORIES_REQUEST = "CREATE_CATEGORIES_REQUEST";
const CREATE_CATEGORIES_SUCCESS = "CREATE_CATEGORIES_SUCCESS";
const CREATE_CATEGORIES_FAILURE = "CREATE_CATEGORIES_FAILURE";

const UPDATE_CATEGORIES_REQUEST = "UPDATE_CATEGORIES_REQUEST";
const UPDATE_CATEGORIES_SUCCESS = "UPDATE_CATEGORIES_SUCCESS";
const UPDATE_CATEGORIES_FAILURE = "UPDATE_CATEGORIES_FAILURE";

const DELETE_CATEGORIES_REQUEST = "DELETE_CATEGORIES_REQUEST";
const DELETE_CATEGORIES_SUCCESS = "DELETE_CATEGORIES_SUCCESS";
const DELETE_CATEGORIES_FAILURE = "DELETE_CATEGORIES_FAILURE";


let get_category_action = () => {
    
    return async (dispatch) => {
           
        try{
            dispatch({
                type:GET_CATEGORIES_REQUEST,
            })
            const res = await axiosInstance.get('/category/getCategory')
            console.log(res)
            if(res.status == 200)
            {
                dispatch({
                    type:GET_CATEGORIES_SUCCESS,
                    payload: {
                        category: res.data.CategoryList
                    }
                })
            }
            else{
                dispatch({
                    type:GET_CATEGORIES_FAILURE,
                    payload: 
                    {
                        error: res.data.error
                    }
                })
            }

        }
        catch(error)
        {
           
        }

    }

}

const addCategory_action = (form) => {
    return async (dispatch) => {
       try{
        dispatch({
            type:CREATE_CATEGORIES_REQUEST,
        })
        const res = await axiosInstance.post('/category/createCategory', form)
        console.log("res.data", res.data)
        if(res.status == 200)
        {
            dispatch({
                type:CREATE_CATEGORIES_SUCCESS,
                payload: {
                    category: res.data.result
                }
            })
        }
        else{
            dispatch({
                type:CREATE_CATEGORIES_FAILURE,
                payload: 
                {
                    error: res.data.error
                }
            })
        }
       } 
       catch(error)
       {
          
       }
       

    }
   
}

const UpdateCategory_action = (form) => {
    return async (dispatch) => {
       try{
        dispatch({
            type:UPDATE_CATEGORIES_REQUEST,
        })
        const res = await axiosInstance.post('/category/updateCategory', form)
        console.log("res.data", res.data)
        if(res.status == 200)
        {
            
            dispatch({
                type:UPDATE_CATEGORIES_SUCCESS,
                // payload: {
                //     category: res.data.result
                // }
            })
            dispatch(get_category_action())
        }
        else{
            dispatch({
                type:UPDATE_CATEGORIES_FAILURE,
                payload: 
                {
                    error: res.data.error
                }
            })
        }
       } 
       catch(error)
       {
          
       }
       

    }
   
}

const DeleteCategory_action = (ids) => {
    // console.log("datadadatay", ids)
    return async (dispatch) => {
       try{
        dispatch({
            type:DELETE_CATEGORIES_REQUEST,
        })
        const res = await axiosInstance.post('/category/deleteCategory', {ids})
        
       
        if(res.status == 200)
        {
            
            dispatch({
                type:DELETE_CATEGORIES_SUCCESS,
                
            })
            dispatch(get_category_action())
        }
        else{
            dispatch({
                type:DELETE_CATEGORIES_FAILURE,
                payload: 
                {
                    error: res.data.error
                }
            })
        }
       } 
       catch(error)
       {
          
       }
       

    }
   
}


export {get_category_action, addCategory_action, UpdateCategory_action, DeleteCategory_action, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, CREATE_CATEGORIES_REQUEST, CREATE_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAILURE,
    UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAILURE,
    DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_SUCCESS, DELETE_CATEGORIES_FAILURE


};