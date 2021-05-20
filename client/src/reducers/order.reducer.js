const GET_CUSTOMER_ORDER_SUCCESS = "GET_CUSTOMER_ORDER_SUCCESS";

const initState = {
    orders: []
}

export const admin_order_reducer = (state = initState, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case GET_CUSTOMER_ORDER_SUCCESS :           
            return {
                ...state,
                orders: action.payload.Orders,
            }
        default:
            return state;
    }
}