import React, {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import Card from '../UI/Card/card'
import {useDispatch, useSelector} from 'react-redux'
import {Anchor, MaterialButton, MaterialInput} from '../MaterialUi_Layout/UI_Layout'
import AddressForm from '../AddressForm/AddressForm'


import './style.css'
import { getAddress_action } from '../../actions/address.action'
import PriceDetails from '../PriceDetails/PriceDetails'
import { getCartItem_actions } from '../../actions/cart.actions'
import Cart from '../CartPage/cart'
import { addOrder_action } from '../../actions/order.action'
/**
* @author
* @function Checkout
**/

const CheckoutStep = (props) => {
	return(
		<div className="checkoutStep">
			<div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
				<div>
					<span className="stepNumber">{props.stepNumber}</span>
					<span className="stepTitle">{props.title}</span>
				</div>
			</div>
			{props.body && props.body}
		</div>
	)
}

const Checkout = (props) => {

  const auth = useSelector(state => state.Auth_root_reducer)
  const address = useSelector(state => state.Address_root_reducer.address)
  const cart = useSelector(state => state.Cart_root_reducer.cartItems)

  const[newAddress, setNewAddress] = useState(false)
  const[confirmAddress, setconfirmAddress] = useState(false)
  const[selectedAddress, setselectedAddress] = useState(null)
  const[addre, setAddre]= useState([])
  const[orderConfirmation, setorderConfirmation] = useState(false)
  const [orderSummary, setorderSummary] = useState(false)
  const [fullorderSummary, setfullorderSummary] = useState(false)
  const [PaymentOption, setPaymentOption] = useState(false)
  const[confirmOrder, setconfirmOrder] = useState(false)


  const dispatch = useDispatch()

  const onAddressSubmit = (addres) => {
	setselectedAddress(addres)
	setNewAddress(false)
	setconfirmAddress(true)
	setorderSummary(true)
	setfullorderSummary(true)
  }
  const handleCancel = () =>{
	setNewAddress(false)
  }

  const selectSpecificAddress = (addr) => {
	const Eff_Address = address.map(adr =>({
		...adr, 
		selected: false,
		edit: false
	}))
	setAddre(Eff_Address)
		const updatedAddress = addre.map(adr => adr._id === addr._id ? {...adr, selected:true} : {...adr, selected:false})
		setAddre(updatedAddress)
	}	
	const confirmDeleivery = (addr) => {
		setselectedAddress(addr)
		setconfirmAddress(true)
		setorderSummary(true)
		setfullorderSummary(true)
	}
	const confirmOrderbtn = () => {
		setorderConfirmation(true)
		setorderSummary(false)
		setPaymentOption(true)
	}
	const onConfirmOrder =() => {
		const  totalAmount = Object.keys(cart).reduce((totalPrice, key)=>
									{
										const {price, qty} = cart[key]
										return totalPrice + price * qty;
									}, 0
								)
		
		const items = Object.keys(cart).map(key =>(
			{
				productId: key,
				payablePrice: cart[key].price,
				purchasedQty: cart[key].qty,
			}
		))
						

		const payload={
			addressId: selectedAddress._id,
			totalAmount,
			items,
			paymentStatus: "pending",
			paymentType: "cod"
		}
		// console.log("payloadpayloadpayload", payload)
		dispatch(addOrder_action(payload))
		setconfirmOrder(true)
	}


	

  useEffect(()=>{
	auth.authenticate && dispatch(getAddress_action())
	auth.authenticate && dispatch(getCartItem_actions())
	setAddre(address)
  }, [auth.authenticate])

  useEffect(()=>{
		
	setAddre(address)
	
  },[address])


  const enableAddressEditForm =(addr) =>{
		const Eff_Address = address.map(adr =>({
			...adr, 
			selected: false,
			edit: false
		}))
		setAddre(Eff_Address)
		const updatedAddress = addre.map(adr => adr._id === addr._id ? {...adr, edit:true} : {...adr, edit:false})
		setAddre(updatedAddress)
  }

  if(confirmOrder)
  {
	  return(
		  <Layout>
			  <Card>
				  <div>
					  Thank You
				  </div>
			  </Card>
		  </Layout>
	  )
  }

  
  return(
      <Layout>
			<div className="cartContainer" style={{alignItems:'flex-start'}}>
				<div className="checkoutContainer">
					
					{/* CheckoutStep is for user logged in or not */}
					<CheckoutStep
						stepNumber={'1'}
						title={'login'}
						active={!auth.authenticate}
						body={
							auth.authenticate ?
								<div className="loggedIn">
									<span style={{fontWeight:500}}>{auth.result.firstName}&nbsp;{auth.result.lastName}</span>
									<span style={{margin:'0 5px'}}>{auth.result.email}</span>
								</div>
							:
							<div>
								<MaterialInput
									label="Email"
								/>
							</div>
						}
					/>
					
					<CheckoutStep
						stepNumber={'2'}
						title={'Delivery Address'}
						active={!confirmAddress}
						body={
							<>
								{
									confirmAddress ? (
										<div className="stepCompleted">
											{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}
										</div>
									) 
									:
									auth.authenticate ?
										addre.map(adr => 
											<div className="flexRow addressContainer">
												<div>
													<input name="address" type="radio" onClick={() => selectSpecificAddress(adr)}/>
												</div>
												<div className="flexRow sb addressinfo">
													{
														!adr.edit ? (
															<div style={{width: "100%"}}>
																<div className="addressDetail">
																	<div>
																		<span className="addressName">{adr.name}</span>
																		<span className="addressType">{adr.addressType}</span>
																		<span className="addressMobileNumber">{adr.mobileNumber}</span>
																	</div>
																	{
																		adr.selected && (
																			<Anchor
																				name="Edit"
																				onClick={()=> enableAddressEditForm(adr)}
																				style={{
																					fontWeight:"500",
																					color:"#2874f0"
																				}}
																			/>
																		)
																	}
																</div>
																<div className="fullAddress">
																	{adr.address} <br />{" "}
																	{`${adr.state} - ${adr.pinCode}`}

																</div>
																{
																	adr.selected && <MaterialButton
																						title="Delivery Here"
																						style={{
																							width: '200px',
																							margin: "10px 0"
																						}}
																						onClick={()=>confirmDeleivery(adr)}

																					/>

																}

																
															</div>
														)
														:
														(
															<AddressForm
																withoutLayout={true}
																onSubmitForm={onAddressSubmit}
																oncancel={handleCancel}
																initialData={adr}
															/>
														)
													}
													
													
												</div>
											</div>
										
										)
									:
									null
								}
							</>
						}
					/>
					{/* Address Form */}
						{ confirmAddress ? null :
							<CheckoutStep
								title={'Add New Address'}
								stepNumber={'+'}
								active={newAddress}
								onClick={()=>{setNewAddress(true)} }
								body={
									newAddress ?
										<AddressForm
											onSubmitForm={onAddressSubmit}
											oncancel={handleCancel}
										/>
									:
										null
									}
								
							/>
						}
														

					<CheckoutStep
						stepNumber={'3'}
						title={'Order Summary'}
						active={orderSummary}
						body={
							fullorderSummary ? <Cart onlyItems={true} /> : null
						}
					/>
					{
						orderSummary &&
							<Card
								style={{
									margin:"0px 10px 10px 0px"
								}}
									
							>
								<div className="flexRow sb" style={{padding:"0 30px", alignItems:"center"}}>
									<p style={{fontSize:"16px"}}>Order Summary email will sent to <strong>{auth.result.email}</strong></p>
									<MaterialButton
										title="Continue"
										style={{width:"150px", margin:"10px 0 10px 200px"}}
										onClick={confirmOrderbtn}
									/>

								</div>
							</Card>
					}

					<CheckoutStep
						stepNumber={'4'}
						title={'Payment Options'}
						active={PaymentOption}
						body={
							PaymentOption ?
								<div className="flexRow stepCompleted" style={{
									alignItems:"center"
								}}>
									<div>
										<input name="PaymentOption" type="radio" value="COD"/>
									</div>
									&nbsp;
									<div>
										<span>Cash On Delivery</span>
									</div>
									<MaterialButton
										title="Confirm Order"
										onClick={onConfirmOrder}
										style={{
											width: "250px",
											margin:"10px 0px 0px 350px"
										}}
									/>
								</div>	
							:
							null
						}
					/>
				</div>
				
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


export default Checkout