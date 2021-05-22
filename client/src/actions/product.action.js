import axiosInstance from "../Components/helpers/axios";

const ADD_PRODUCTS_REQUEST = "ADD_PRODUCTS_REQUEST";
const ADD_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS"
const ADD_PRODUCTS_FAILURE = 'ADD_PRODUCTS_FAILURE'

const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS"
const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

const DELETE_PRODUCTS_REQUEST = "DELETE_PRODUCTS_REQUEST";
const DELETE_PRODUCTS_SUCCESS = "DELETE_PRODUCTS_SUCCESS"
const DELETE_PRODUCTS_FAILURE = 'DELETE_PRODUCTS_FAILURE'

const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS"

let addProduct_action = (form)=> {
    return async dispatch => {
       

        dispatch({
            type:ADD_PRODUCTS_REQUEST,
        })
        const res = await axiosInstance.post('/product/createProduct', form)
        
        if(res.status == 200)
        {
            
            dispatch({
                type:ADD_PRODUCTS_SUCCESS,
               
            })
            dispatch(getALLProducts_Action())
        }
        else{
            dispatch({
                type:ADD_PRODUCTS_FAILURE,
                payload: 
                {
                    error: res.data.error
                }
            })
        }
    }
}

const getALLProducts_Action = () => {
    return async (dispatch) => {
           
        try{
            
                dispatch({
                    type:GET_PRODUCTS_REQUEST,
                })
                const res = await axiosInstance.post('/product/getAllProducts')
                console.log("res.data", res.data)
                if(res.status == 200)
                {
                    const products= res.data.products
                    dispatch({
                        type:GET_ALL_PRODUCTS_SUCCESS,
                        payload: { products
                        }
                    })
                }
                else{
                    dispatch({
                        type:GET_PRODUCTS_FAILURE,
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

const deleteProductById_Action = (payload) => {
    // console.log({payload})
    return async (dispatch) => {
           
        try{
            
                dispatch({
                    type:DELETE_PRODUCTS_REQUEST,
                })
                const res = await axiosInstance.post('/product/deleteProduct', {payload})
                // console.log("res.data", res.data)
                if(res.status == 200)
                {
                    
                    dispatch({
                        type:DELETE_PRODUCTS_SUCCESS})
                    dispatch(getALLProducts_Action())
                }
                else{
                    dispatch({
                        type:DELETE_PRODUCTS_FAILURE,
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

export {addProduct_action, getALLProducts_Action, deleteProductById_Action, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, ADD_PRODUCTS_REQUEST, ADD_PRODUCTS_SUCCESS,
    ADD_PRODUCTS_FAILURE}