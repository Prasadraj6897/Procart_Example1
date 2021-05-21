import React from "react";
import { IoIosCart } from "react-icons/io";
import './style.css'


const CartLogo = (props) => {
    return (
      <div style={{ fontSize: "20px", position: "relative" }}>
        <span className="cartCount">
          {props.count > 0 && props.count}
        </span>
        <IoIosCart />
      </div>
    );
  };
  
  export default CartLogo;