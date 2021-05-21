import axiosInstance from "../Components/helpers/axios";


const GET_CUSTOMER_ORDER_REQUEST = "GET_CUSTOMER_ORDER_REQUEST";
const GET_CUSTOMER_ORDER_SUCCESS = "GET_CUSTOMER_ORDER_SUCCESS";
const GET_CUSTOMER_ORDER_FAILURE = "GET_CUSTOMER_ORDER_FAILURE";


let Admin_UpdateOrder_action = (payload) => {
    
    return async (dispatch) => {
           
        try{
            
                // dispatch({
                //     type:GET_CUSTOMER_ORDER_REQUEST,
                // })
                const res = await axiosInstance.post('/order/updateOrder', payload)
                console.log("res.data", res.data)
                if(res.status == 200)
                {
                    // dispatch({
                    //     type:GET_CUSTOMER_ORDER_SUCCESS,
                    //     payload: {
                    //         category: res.data.result
                    //     }
                    // })
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


export {GET_CUSTOMER_ORDER_REQUEST, GET_CUSTOMER_ORDER_SUCCESS, GET_CUSTOMER_ORDER_FAILURE, Admin_UpdateOrder_action}