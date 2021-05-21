import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Card from '../../Card/card'
import {Admin_UpdateOrder_action} from '../../../actions/order.action'
import './style.css'

const Orders = (props) => {

		const orders = useSelector(state => state.Admin_Order_root_reducer.orders)
		const dispatch = useDispatch()
		const[type, setType] = useState(null)

		const onOrderUpdate = (orderId) => {
			const payload = {
				orderId,
				type
			}
			dispatch(Admin_UpdateOrder_action(payload))
		}
	return(
		<div>
			
			{orders.map((orderItems, index) => (
				<Card key={index} headerleft={orderItems._id}>
					<div style={{
						boxSizing: "border-box",
						padding:"150px",
						display:"flex",
						alignItems: "center"
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
						
						<div  style={{
								boxSizing: "border-box",
								padding:"0 50px"
								}}
							>
							<select onChange={(e) => setType(e.target.value)}>
								<option value={""}>Select Status</option>
								{orderItems.orderStatus.map((status) => {
									return(
										<>
											
											{!status.isCompleted ?
												<option key={status.type} value={status.type} >
													{status.type}
												</option>
											:
											null
											}
											

										</>
									)
								})}
							</select>
						</div>
						<div style={{
							boxSizing: "border-box",
							padding:"0 50px"
						}}
						>
							<button onClick={() =>onOrderUpdate(orderItems._id)}>
								Confirm
							</button>
						</div>
					</div>
				</Card>
			))}
			
		</div>
	)
}


export default Orders