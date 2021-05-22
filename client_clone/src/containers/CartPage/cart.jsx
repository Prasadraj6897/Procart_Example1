import React, {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../UI/Card/card'
import './style.css'
import CartItems from './CartItems/CartItems'
import { addTocart_actions, getCartItem_actions, removeCartItem_actions } from '../../actions/cart.actions'
import {MaterialButton} from '../MaterialUi_Layout/UI_Layout'
import PriceDetails from '../PriceDetails/PriceDetails'

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

    const onRemoveCartItem = (_id) => {
        console.log(_id)
        dispatch(removeCartItem_actions({productId:_id}))
    }

    if(props.onlyItems)
    {
        return(
            <>
                {
                    Object.keys(cart).map((key, index) => 
                        <CartItems
                            key={index}
                            cartItem={cart[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                            removeCartItem={onRemoveCartItem}
                        />
                    )
                }
            </>
        )
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
                    style={{width: 'calc(100% - 400px)', overflow: 'hidden'}}
                >
                    {
                        Object.keys(cart).map((key, index) => 
                            <CartItems
                                key={index}
                                cartItem={cart[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                removeCartItem={onRemoveCartItem}
                            />
                        )
                    }

                    <div className="PlaceOrderBtnContainer">
                        <div style={{width:'250px'}}>
                            <MaterialButton
                                title="Place Order"
                                onClick={()=>props.history.push('/checkout')}
                            />
                        </div>
                    </div>

                    
                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart).reduce(function(qty, key)
                         {
                             return qty + cart[key].qty;
                         }, 0
                    )
                    
                    }

                    totalPrice={Object.keys(cart).reduce((totalPrice, key)=>
                        {
                            const {price, qty} = cart[key]
                            return totalPrice + price * qty;
                        }, 0
                   )
                   
                   }

                />

            </div>
        </Layout>
    )
}

export default Cart;