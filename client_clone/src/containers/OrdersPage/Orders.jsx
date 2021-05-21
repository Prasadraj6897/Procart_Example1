import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderConstants } from '../../actions/constants'
import { getOrder_action } from '../../actions/order.action'
import { generatePubliUrl } from '../../urlConfig'
import Layout from '../Layout/Layout'
import Card from '../UI/Card/card'
import { BiRupee } from "react-icons/bi";
import './style.css'
import { Breed } from '../MaterialUi_Layout/UI_Layout'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'

/**
* @author
* @function Orders
**/

const Orders = (props) => {

	

	const orders = useSelector(state => state.Order_root_reducer.orders);
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(getOrder_action())
	}, [])
	

	return(
		<Layout>
			<div style={{ maxWidth: "1160px", margin: "5px auto" }}>
				<Breed
					breed={[
							{ name: "Home", href: "/" },
							{ name: "My Account", href: "/" },
							{ name: "My Orders", href: "/user/order" },
						]}
					breedIcon={<IoIosArrowForward />}
				/>
				{
					orders.map((order)=>{
						return order.items.map((item, index)=> (
							<Card key={index} style={{display: "block", margin:"5px 8px"}}>
								<Link to={`/order_details/${order._id}`}>
									<div className="orderItemContainer">
										<div className="orderImgContainer">
											<img className="orderImg" src={generatePubliUrl(item.productId.productPictures[0].img)} alt={item.productId.productPictures[0]._id}/>
										</div>
										<div className="orderRow">
											<div className="orderName">{item.productId.name}</div>
											<div className="orderPrice"><BiRupee /> {item.payablePrice}</div>
											<div>{order.paymentStatus}</div>
										</div>
										
									</div>
								</Link>
							</Card>
						))
					})
				}
			</div>
		</Layout>
	)
}


export default Orders