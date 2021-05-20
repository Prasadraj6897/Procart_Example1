import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderConstants } from '../../actions/constants'
import { getOrder_action } from '../../actions/order.action'
import { generatePubliUrl } from '../../urlConfig'
import Layout from '../Layout/Layout'
import Card from '../UI/Card/card'
import './style.css'

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
			{
				orders.map((order)=>{
					return order.items.map((item, index)=> (
						<Card key={index} style={{maxWidth:"1200px", margin:"5px aoto"}}>
							<div className="orderItemContainer">
								<div style={{width:80, height:80, overflow:"hidden", textAlign:"center"}}>
									<img style={{maxWidth:80, maxHeight:80}} src={generatePubliUrl(item.productId.productPictures[0].img)} alt={item.productId.productPictures[0]._id}/>
								</div>
								<div
									style={{
										display:'flex',
										flex:1,
										justifyContent:'space-between'
									}}
								>
									<div style={{width:300}}>{item.productId.name}</div>
									<div>{item.payablePrice}</div>
									<div>{order.paymentStatus}</div>
								</div>
								
							</div>
						</Card>
					))
				})
			}
			
		</Layout>
	)
}


export default Orders