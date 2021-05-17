import {cartConstants} from '../actions/constants.js'

const initialState = {
    cartItems:{

    },
    updatingCart: false,
    error: null
}

export default (state = initialState, action) => {
    // console.log("action.payloadaction.payload",action.payload)
    switch(action.type)
    {
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;

        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initialState,
            }
            break;
    }
    return state;

}