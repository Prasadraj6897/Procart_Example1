import React, {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../UI/Card/card'
import './style.css'
import CartItems from './CartItems/CartItems'
import { addTocart_actions, getCartItem_actions } from '../../actions/cart.actions'

const Cart = (props) =>{

    const cart = useSelector(state => state.Cart_root_reducer.cartItems)
    const auth = useSelector(state => state.Auth_root_reducer)
    

    const[cartItem, setcartItem] = useState(cart)
    const dispatch = useDispatch()

    useEffect(()=> {
        setcartItem(cart)
    },[cart])

    useEffect(()=>{
        if(auth.authenticate)
        {
            dispatch(getCartItem_actions())
        }
        // console.log("authauthauthauth",auth)
     }, [auth.authenticate])

    const onQuantityIncrement = (_id, qty) =>{
        const {name, price, img} = cartItem[_id]
        dispatch(addTocart_actions({_id, name, price, img}, 1))
    }
    const onQuantityDecrement = (_id, qty) => {
        const {name, price, img} = cartItem[_id]
        dispatch(addTocart_actions({_id, name, price, img}, -1))
    }

    return(
        <Layout>
            {/* <pre>{JSON.stringify(cart)}</pre> */}
            <div className="cartContainer" style={{
                alignItems:'flex-start'
            }}>
                <Card
                    headerleft={`My cart`}
                    headerright={` Deliver To`}
                >
                    {
                        Object.keys(cart).map((key, index) => 
                            <CartItems
                                key={index}
                                cartItem={cart[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }

                    
                </Card>
                <Card
                    headerleft="Price"
                    style={{
                        width:'500px'
                    }}
                >
                    
                </Card>

            </div>
        </Layout>
    )
}

export default Cart;