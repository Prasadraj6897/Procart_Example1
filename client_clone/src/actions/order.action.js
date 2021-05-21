import {orderConstants, cartConstants} from './constants.js'
import axiosInstance from "../Components/helpers/axios"

let addOrder_action = (payload) => {
    
    return async (dispatch) => {
           
        try{
            dispatch({type : orderConstants.ADD_ORDER_REQUEST})
            const res = await axiosInstance.post('/order/addOrder',payload)
           
            
            if(res.status === 200){
                const orders = res.data.order;
                // console.log("ordersactionordersaction", orders)
                 dispatch(
                    {
                        type : cartConstants.RESET_CART, 
                        
                    }
                )
                dispatch(
                    {
                        type : orderConstants.ADD_ORDER_SUCCESS, 
                        payload:{orders}
                    }
                )
                
            }
            else{
               
                dispatch({
                        type : orderConstants.ADD_ORDER_FAILURE, 
                        payload:{
                            error : res.data.error
                        }
                    }
                )
            }
        }
        catch(error)
        {

        }
    }

}

let getOrder_action = () => {
    
    return async (dispatch) => {
           
        try{
            dispatch({type : orderConstants.GET_ORDER_REQUEST})
            const res = await axiosInstance.get('/order/getOrder')
            // console.log("getOrder_action", res.data.orders)
            
            if(res.status === 200){
                const orders = res.data.orders;

                dispatch(
                    {
                        type : orderConstants.GET_ORDER_SUCCESS, 
                        payload:{orders}
                    }
                )
                
            }
            else{
               
                dispatch({
                        type : orderConstants.GET_ORDER_FAILURE, 
                        payload:{
                            error : res.data.error
                        }
                    }
                )
            }

        }
        catch(error)
        {
            
        }
    }

}

// get single product full order details with address and payment (Invoice)

let getInvoiceOrder_action = (payload) => {
    
    return async (dispatch) => {
           
        try{
            dispatch({type : orderConstants.GET_INVOICE_ORDER_REQUEST})
            const res = await axiosInstance.post('/order/getInvoiceOrderDetail', payload)
            console.log("getInvoiceOrder_action", res.data.order)
            
            if(res.status === 200){
                const {order} = res.data;

                dispatch(
                    {
                        type : orderConstants.GET_INVOICE_ORDER_SUCCESS, 
                        payload:{order}
                    }
                )
                
            }
            else{
               
                dispatch({
                        type : orderConstants.GET_INVOICE_ORDER_FAILURE, 
                        payload:{
                            error : res.data.error
                        }
                    }
                )
            }

        }
        catch(error)
        {
            
        }
    }

}

export {addOrder_action, getOrder_action, getInvoiceOrder_action}