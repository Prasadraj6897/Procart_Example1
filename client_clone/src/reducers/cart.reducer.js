import {cartConstants} from '../actions/constants.js'

const initialState = {
    cartItems:{

    }
}

export default (state = initialState, action) => {
    // console.log("action.payloadaction.payload",action.payload)
    switch(action.type)
    {
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems: action.payload.cartItems
            }
            break;

    }
    return state;

}