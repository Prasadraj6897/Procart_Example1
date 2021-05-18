  
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress_action } from "../../actions/address.action";
import {MaterialButton, MaterialInput} from '../MaterialUi_Layout/UI_Layout'


/**
* @author
* @function AddressForm
**/

const AddressForm = (props) => {
    const dispatch = useDispatch()

	const[name, setName] = useState('')
	const[mobileNumber, setmobileNumber] = useState('')
	const[pinCode, setpinCode] = useState('')
	const[locality, setlocality] = useState('')
	const[address, setaddress] = useState('')
	const[cityDistrictTown, setcityDistrictTown] = useState('')
	const[state, setstate] = useState('')
	const[landmark, setlandmark] = useState('')
	const[alternatePhone, setalternatePhoneNumber] = useState('')
	const[addressType, setaddressType] = useState('')

	const inputContainer = {
		width: '100%',
		marginRight: 10

	}

	const onAddressSubmit = (e) => {
		const payload = {
			address: {
				name,
				mobileNumber,
				pinCode,
				locality,
				address,
				cityDistrictTown,
				state,
				landmark,
				alternatePhone,
				addressType
			}
		}
		dispatch(addAddress_action(payload))
		props.onSubmitForm();
	}
	const oncancel =() =>{
		props.oncancel()
	}

  return(
    	<div className="checkoutStep" style={{background: '#f5faff'}}>
			<div className="checkoutHeader">
				<div>
					{/* <span className="stepNumber">+</span> */}
					<span className="stepTitle">{'Add New Address'}</span>
				</div>
			</div>
			<div style={{
				padding: '0 60px',
				paddingBottom: '20px',
				boxSizing: 'border-box'
			}}>
				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div style={inputContainer}>
						<MaterialInput
							label="Mobile Number"
							value={mobileNumber}
							onChange={(e) => setmobileNumber(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="Pin Code"
							value={pinCode}
							onChange={(e) => setpinCode(e.target.value)}
						/>
					</div>
					<div style={inputContainer}>
						<MaterialInput
							label="locality"
							value={locality}
							onChange={(e) => setlocality(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="Address"
							value={address}
							onChange={(e) => setaddress(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="City/District/Town"
							value={cityDistrictTown}
							onChange={(e) => setcityDistrictTown(e.target.value)}
						/>
					</div>
					<div style={inputContainer}>
						<MaterialInput
							label="State"
							value={state}
							onChange={(e) => setstate(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="LandMark"
							value={landmark}
							onChange={(e) => setlandmark(e.target.value)}
						/>
					</div>
					<div style={inputContainer}>
						<MaterialInput
							label="AlterNate Phone Number"
							value={alternatePhone}
							onChange={(e) => setalternatePhoneNumber(e.target.value)}
						/>
					</div>
				</div>

				<div>
					<label>Address Type</label>
					<div className="flexRow">
						<div>
							<input type="radio" onClick={()=>setaddressType('home')} name="addressType" value="home"/>
							<span>Home</span>
						</div>
						<div>
							<input type="radio" onClick={()=>setaddressType('work')} name="addressType" value="work"/>
							<span>Work</span>
						</div>
					</div>
				</div>
				<div className="flexRow">
					<MaterialButton
						title="Save and Deliver Here"
						onClick={onAddressSubmit}
						style={{
							width:'250px',
							margin:'20px 10px'
						}}
					/>

					<MaterialButton
						title="Cancel"
						onClick={oncancel}
						style={{
							width:'250px',
							margin:'20px 0'
						}}
					/>
				</div>
			</div>
		</div>
   )
  }


export default AddressForm