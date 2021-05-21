import {orderConstants} from '../actions/constants.js'

const initialState = {
   orders:[],
   orderLoading: false
}

export default (state = initialState, action) => {
    // console.log("action.payloadaction.payload",action.payload)
    switch(action.type)
    {
        case orderConstants.ADD_ORDER_REQUEST:
            state = {
                ...state,
                orderLoading: true
            }
            break;
        case orderConstants.ADD_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderLoading: false
            }
            break;

        case orderConstants.ADD_ORDER_FAILURE:
            state = {
                ...state,
                orderLoading: false,
                error: action.payload.error
            }
            break;

        case orderConstants.GET_ORDER_REQUEST:
            state = {
                ...state,
                orderLoading: true
            }
            break;
        case orderConstants.GET_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderLoading: false
            }
            break;

        case orderConstants.GET_ORDER_FAILURE:
            state = {
                ...state,
                orderLoading: false,
                error: action.payload.error
            }
            break;
        
    }
    return state;

}