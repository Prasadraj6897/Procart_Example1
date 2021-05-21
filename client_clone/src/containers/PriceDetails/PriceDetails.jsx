import React from 'react'
import Card from '../UI/Card/card'
import './style.css'
/**
* @author
* @function PriceDetails
**/

const PriceDetails = (props) => {
  return(
    	<Card headerleft={'Price Details'} style={{maxWidth: "380px"}}>
			<div style={{padding:"20px", boxSizing:"border-box"}}>
				<div className="flexRow sb" style={{margin:"10px 0"}}>
					<div>
						Price ({props.totalItem} items)
					</div>
					<div style={{margin:"0 0 0 180px"}}>
						{props.totalPrice}
					</div>
				</div>

				<div className="flexRow sb" style={{margin:"10px 0"}}>
					<div>Delivery Charges </div>
					<div style={{margin:"0 0 0 160px"}}>Free</div>
				</div>

				<div className="flexRow sb" style={{margin:"10px 0"}}>
					<div>Total Amount</div>
					<div style={{margin:"0 0 0 180px"}}>{props.totalPrice}</div>
				</div>

			</div>
		</Card>

   )
  }


export default PriceDetails;