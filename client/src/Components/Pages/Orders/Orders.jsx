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

		const formatDate = (date) => {
			if(date)
			{
				const d = new Date(date)
				return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
			}
		}
	return(
		<div>
			
			{orders.map((orderItems, index) => (
				<Card key={index} headerleft={orderItems._id} style={{margin:"10px 0"}}>
					<div style={{
						boxSizing: "border-box",
						padding:"50px 50px",
						// display:"flex",
						alignItems: "center",
						justifyContent:"space-between"
					}}
					>	<div style={{
						display:'flex',
						alignItems: "center",
						justifyContent:"space-between"
					}}>
							<div>
								<div className="title">Items</div>
								{orderItems.items.map((item, index) => (
									<div className="value" key={index}>
										{item.productId.name}
									</div>
								))}
							</div>

							<div>
								<span className="title">Total Price</span>
								<br />
								<span className="value">{orderItems.totalAmount}</span>
							</div>

							<div>
								<span className="title">Payment Type</span>
								<br />
								<span className="value">{orderItems.paymentType}</span>
							</div>

							<div>
								<span className="title">Payment Status</span>
								<br />
								<span className="value">{orderItems.paymentStatus}</span>
							</div>
						</div>
						
						<div style={{
								boxSizing: "border-box",
								padding:"100px",
								display:"flex",
								alignItems: "center",
								// justifyContent:"space-between"
							}}	
						>
							<div className="orderTrack">
								{orderItems.orderStatus.map((status)=>(
									<div className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
										<div className={`point ${status.isCompleted ? "active" : ""}`}></div>
										<div className="orderInfo">
											<div className="status">
												{status.type}
											</div>
											<div className="date">
												{formatDate(status.date)}
											</div>
										</div>
									</div>
								))}
								
								
								

								{/* <div className="orderStatus">
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
								</div> */}
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
					</div>
				</Card>
			))}
			
		</div>
	)
}


export default Orders