import axiosInstance from "../Components/helpers/axios";


const GET_CUSTOMER_ORDER_REQUEST = "GET_CUSTOMER_ORDER_REQUEST";
const GET_CUSTOMER_ORDER_SUCCESS = "GET_CUSTOMER_ORDER_SUCCESS";
const GET_CUSTOMER_ORDER_FAILURE = "GET_CUSTOMER_ORDER_FAILURE";

const UPDATE_CUSTOMER_ORDER_REQUEST = "UPDATE_CUSTOMER_ORDER_REQUEST";
const UPDATE_CUSTOMER_ORDER_SUCCESS = "UPDATE_CUSTOMER_ORDER_SUCCESS";
const UPDATE_CUSTOMER_ORDER_FAILURE = "UPDATE_CUSTOMER_ORDER_FAILURE";

const getCustomer_Order_Action = () => {
    return async (dispatch) => {
           
        try{
            
                dispatch({
                    type:GET_CUSTOMER_ORDER_REQUEST,
                })
                const res = await axiosInstance.get('/order/getCustomerOrders')
                console.log("res.data", res.data)
                if(res.status == 200)
                {
                    const {orders} = res.data
                    dispatch({
                        type:GET_CUSTOMER_ORDER_SUCCESS,
                        payload: {
                            Orders: orders
                        }
                    })
                }
                else{
                    dispatch({
                        type:GET_CUSTOMER_ORDER_FAILURE,
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

let Admin_UpdateOrder_action = (payload) => {
    
    return async (dispatch) => {
           
        try{
            
                dispatch({
                    type:UPDATE_CUSTOMER_ORDER_REQUEST,
                })
                const res = await axiosInstance.post('/order/updateOrder', payload)
                // const {orders} = res.data
                if(res.status == 200)
                {
                    dispatch({
                        type:UPDATE_CUSTOMER_ORDER_SUCCESS,
                        
                    })

                    dispatch(getCustomer_Order_Action())
                }
                else{
                    dispatch({
                        type:UPDATE_CUSTOMER_ORDER_FAILURE,
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

//to fetch all Orders for admin


export {GET_CUSTOMER_ORDER_REQUEST, GET_CUSTOMER_ORDER_SUCCESS, GET_CUSTOMER_ORDER_FAILURE, Admin_UpdateOrder_action, getCustomer_Order_Action}