import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../Card/card'
import './style.css'

const Orders = (props) => {

		const orders = useSelector(state => state.Admin_Order_root_reducer.orders)

	return(
		<div>
			{JSON.stringify(orders)}
			<Card headerleft="Order_ID">
				<div style={{
					boxSizing: "border-box",
					padding:"100px"
				}}
				>	
				
					<div className="orderTrack">
						<div className="orderStatus">
							<div className="point"></div>
							<div className="orderInfo">
								<div className="status">
									Ordered
								</div>
								<div className="date">
									Fri, 2021
								</div>
							</div>
						</div>

						<div className="orderStatus">
							<div className="point"></div>
							<div className="orderInfo">
								<div className="status">
									Packed
								</div>
								<div className="date">
									Fri, 2021
								</div>
							</div>
						</div>

						<div className="orderStatus">
							<div className="point"></div>
							<div className="orderInfo">
								<div className="status">
									Shipped
								</div>
								<div className="date">
									Fri, 2021
								</div>
							</div>
						</div>

						<div className="orderStatus">
							<div className="point"></div>
							<div className="orderInfo">
								<div className="status">
									Delivered
								</div>
								<div className="date">
									Fri, 2021
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</Card>
		</div>
	)
}


export default Orders