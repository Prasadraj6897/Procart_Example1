import axiosInstance from "../Components/helpers/axios";

const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS"
const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

let addProduct_action = (form)=> {
    return async dispatch => {
        const res = await axiosInstance.post('/product/createProduct', form)
        console.log(res)
    }
}

export {addProduct_action, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE}