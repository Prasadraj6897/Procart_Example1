import React, {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import Card from '../UI/Card/card'
import {useDispatch, useSelector} from 'react-redux'
import {MaterialButton, MaterialInput} from '../MaterialUi_Layout/UI_Layout'
import AddressForm from '../AddressForm/AddressForm'


import './style.css'
import { getAddress_action } from '../../actions/address.action'
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

  const[newAddress, setNewAddress] = useState(false)
  const[confirmAddress, setconfirmAddress] = useState(false)
  const[selectedAddress, setselectedAddress] = useState(null)
  const[addre, setAddre]= useState([])

  const dispatch = useDispatch()

  const onAddressSubmit = () => {
	setNewAddress(false)
  }
  const handleCancel = () =>{
	setNewAddress(false)
  }

  const selectSpecificAddress = (addr) => {
		const updatedAddress = addre.map(adr => adr._id === addr._id ? {...adr, selected:true} : {...adr, selected:false})
		setAddre(updatedAddress)
	}	
	const confirmDeleivery = (addr) => {
		setselectedAddress(addr)
		setconfirmAddress(true)
	}

  useEffect(()=>{
	auth.authenticate && dispatch(getAddress_action())
  }, [auth.authenticate])

  useEffect(()=>{
	const Eff_Address = address.map(adr =>({
		...adr, 
		selected: false,
		edit: false
	}))
	setAddre(Eff_Address)
  },[address])
  
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
									confirmAddress ? JSON.stringify(selectedAddress)
									:
									auth.authenticate ?
										addre.map(adr => 
											<div className="flexRow addressContainer">
												<div>
													<input name="address" type="radio" onClick={() => selectSpecificAddress(adr)}/>
												</div>
												<div className="flexRow sb addressinfo">
													<div>
														<div>
															<span>{adr.name}</span>
															<span>{adr.addressType}</span>
															<span>{adr.mobileNumber}</span>
														</div>
														<div>
															{adr.address}
														</div>
														{
															adr.selected && <MaterialButton
																				title="Delivery Here"
																				style={{
																					width: '250px'
																				}}
																				onClick={()=>confirmDeleivery(adr)}

														/>

														}
														
													</div>
													<div>
														{
															adr.selected && <div> Edit </div>
														}
													</div>
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
					/>

					<CheckoutStep
						stepNumber={'4'}
						title={'Payment Options'}
					/>
				</div>
			</div>
      </Layout>
   )
  }


export default Checkout