import {cartConstants} from '../actions/constants.js'
import axiosInstance from '../Components/helpers/axios.js'
import {store} from '../store/store.js'

const getCartItem_actions = () => {
    // console.log("getCartItem_actions")
    return async dispatch => {
        try{
            dispatch({
                type: cartConstants.ADD_TO_CART_REQUEST,
               
            })
            const res = await axiosInstance.post(`/cart/getCartItems`)
            if(res.status ===200)
            {
                const {cartItems} = res.data;
                // console.log({getCartItem_actions: cartItems})
                if(cartItems)
                {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: {cartItems
                        }
                    })
                }
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

export const addTocart_actions = (product, newQty=1) => {
    
    return async dispatch => {
        const {cartItems} = store.getState().Cart_root_reducer;
       
        
       const {Auth_root_reducer} = store.getState()
        // console.log("produtsprodutsproduts", cartItems)
        // // const product = action.pa
        // console.log("addTocart_actions",Auth_root_reducer)

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            qty
        }
        
        if(Auth_root_reducer.authenticate)
        {
            dispatch({
                type: cartConstants.ADD_TO_CART_REQUEST,
                
            })
            const payload = {
                cartItems: [{
                    product: product._id,
                    quantity: qty
                }]
            }
            // console.log("payloadpayloadpayload", payload)
            const res = await axiosInstance.post(`/cart/addtocart`, payload)
            if(res.status == 200)
            {
                dispatch(getCartItem_actions())
            }
        }
        else{
            localStorage.setItem('cart', JSON.stringify(cartItems));
           
        }
        
        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: {cartItems}
        })

        dispatch(getCartItem_actions())

    }
}

export const updatecart_actions = (product) => {
    // console.log("updatecart_actions")
    return async dispatch => {
        const {Auth_root_reducer} = store.getState()
        // console.log("Auth_root_reducerAuth_root_reducer", Auth_root_reducer)
        
        const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

        // console.log("ascaschasgicubaGCIYU", cartItems)
        if(Auth_root_reducer.authenticate)
        {
            localStorage.removeItem('cart')
            if(cartItems){
                const payload = {
                    cartItems:Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                }
                if(Object.keys(cartItems).length > 0){
                    const res = await axiosInstance.post(`/cart/addtocart`, payload)
                    if(res.status == 200)
                    {
                        dispatch(getCartItem_actions())
                    }
                }
                else
                {
                    dispatch(getCartItem_actions())
                }
            }
        }
        else{
        if(cartItems)
            {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: {cartItems }
                })
                dispatch(getCartItem_actions())
            }
        }
        
    }


}

const removeCartItem_actions = (payload) => {
    // console.log("getCartItem_actions")
    return async dispatch => {
        try{
            dispatch({
                type: cartConstants.REMOVE_CART_REQUEST,
               
            })
            const res = await axiosInstance.post(`/cart/removeCartItems`, {payload})
            if(res.status ===200)
            {
                dispatch({
                    type: cartConstants.REMOVE_CART_SUCCESS,
                    
                })
                dispatch(getCartItem_actions())
                
            }
           else
                {
                    const {error} = res.data
                    dispatch({
                        type: cartConstants.REMOVE_CART_FAILURE,
                        payload: {error}
                    })
                }
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

export {getCartItem_actions, removeCartItem_actions}