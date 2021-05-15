import {cartConstants} from '../actions/constants.js'
import {store} from '../store/store.js'

export const addTocart_actions = (product) => {
    return async dispatch => {
        const {cartItems} = store.getState().Cart_root_reducer;
       
        // console.log("produtsprodutsproduts", cartItems)
        // // const product = action.pa

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty +1) : 1;
        cartItems[product._id] = {
            ...product,
            qty
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));

        dispatch({
            type: cartConstants.ADD_TO_CART,
            payload: {cartItems
            }
        })

    }
}

export const updatecart_actions = (product) => {
    return async dispatch => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

        if(cart)
        {
            dispatch({
                type: cartConstants.ADD_TO_CART,
                payload: {cartItems : cart
                }
            })
        }
    }


}