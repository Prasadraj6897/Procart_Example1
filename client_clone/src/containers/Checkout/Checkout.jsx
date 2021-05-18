import React, {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import Card from '../UI/Card/card'
import {useDispatch, useSelector} from 'react-redux'
import {MaterialButton} from '../MaterialUi_Layout/UI_Layout'
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
			<div className={`checkoutHeader ${props.active && 'active'}`}>
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
  const dispatch = useDispatch()

  const onAddressSubmit = () => {

  }

  useEffect(()=>{
    dispatch(getAddress_action())
  }, [])
  
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
							<div className="loggedIn">
								<span style={{fontWeight:500}}>{auth.result.firstName}&nbsp;{auth.result.lastName}</span>
								<span style={{margin:'0 5px'}}>{auth.result.email}</span>
							</div>
						}
					/>
					
					<CheckoutStep
						stepNumber={'2'}
						title={'Delivery Address'}
						active={false}
						body={
							<>
								{
									address.map(adr => 
										<div className="flexRow addressContainer">
											<div>
												<input name="address" type="radio" />
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
													<MaterialButton
														title="Delivery Here"
														style={{
															width: '250px'
														}}

													/>
												</div>
												<div>
													Edit
												</div>
											</div>
										</div>
									
									)
								}
							</>
						}
					/>
					{/* Address Form */}
					<AddressForm
						onSubmitForm={onAddressSubmit}
						onCancel={()=>{}}
					/>

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