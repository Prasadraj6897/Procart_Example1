import React, {useEffect} from 'react'
import Layout from '../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../UI/Card/card'
import './style.css'

const Cart = (props) =>{

    const cart = useSelector(state => state.Cart_root_reducer.cartItems)


    return(
        <Layout>
            {/* <pre>{JSON.stringify(cart)}</pre> */}
            <div className="cartContainer">
                <Card
                    headerleft={`My cart`}
                    headerright={` Deliver To`}
                >
                    {
                        Object.keys(cart).map((key, index) => 
                            <div key={index} className="flexRow">
                            
                                <div className="cartProductContainer">
                                    <img src="" />
                                </div>

                                <div className="cartItemDetails">
                                    <div>
                                       {cart[key].name}
                                    </div>
                                    <div>
                                        Delivery in 3 - 5 days
                                    </div>
                                </div>

                            </div>
                        )
                    }

                    
                </Card>
                <Card
                    style={{
                        width:'500px'
                    }}
                >
                    Price
                </Card>

            </div>
        </Layout>
    )
}

export default Cart;