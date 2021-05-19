import React from 'react'
import { useState } from 'react'
import { generatePubliUrl } from '../../../urlConfig'
import './style.css'
/**
* @author
* @function CartItems
**/

const CartItems = (props) => {
    const{_id, name, price, img} = props.cartItem

    const [qty, setQty] = useState(props.cartItem.qty)

    const onQuantityIncrement = () => {
        setQty(qty + 1)
        props.onQuantityInc(_id, qty+1)
    }
    
    const onQuantityDecrement = () => {
        if(qty<=1)
        {
            return;
        }
            
        setQty(qty - 1)
        props.onQuantityDec(_id, qty-1)
    }
   
  return(
        <div className="cartItemContainer">
            <div className="flexRow">
            
                <div className="cartProductImgContainer">
                    <img src={generatePubliUrl(img)} alt="" />
                </div>
                <div className="cartItemDetails flexRow">
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div style={{padding:'0 0 0 380px'}}>
                        Delivery in 3 - 5 days
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    margin: '5px 0'
                }}
            >
                <div className = 'quantityControl'>
                    <button onClick={onQuantityDecrement}> - </button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}> + </button>
                </div>
                <button className ='cartActionBtn'> Save For Later </button>
                <button className ='cartActionBtn'> Remove </button>

            </div>
        </div>
   )
  }


export default CartItems
