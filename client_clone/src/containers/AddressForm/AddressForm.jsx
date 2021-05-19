  
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

	const {initialData} = props;
	const[name, setName] = useState(initialData ? initialData.name : "")
	const[mobileNumber, setmobileNumber] = useState(initialData ? initialData.mobileNumber :'')
	const[pinCode, setpinCode] = useState(initialData ? initialData.pinCode :'')
	const[locality, setlocality] = useState(initialData ? initialData.locality :'')
	const[address, setaddress] = useState(initialData ? initialData.address :'')
	const[cityDistrictTown, setcityDistrictTown] = useState(initialData ? initialData.cityDistrictTown :'')
	const[state, setstate] = useState(initialData ? initialData.state :'')
	const[landmark, setlandmark] = useState(initialData ? initialData.landmark :'')
	const[alternatePhone, setalternatePhoneNumber] = useState(initialData ? initialData.alternatePhone :'')
	const[addressType, setaddressType] = useState(initialData ? initialData.addressType :'')

	const addr = useSelector(state => state.Address_root_reducer.address)
	const[submitFlag, setsubmitFlag] = useState(false)

	const[id, setId] = useState(initialData ? initialData._id :'')

	const inputContainer = {
		width: '100%',
		marginRight: 10
		
	}

	useEffect(()=>{
		if(submitFlag)
		{
			let _address = {}
			
			if(id){
				_address = {
					_id: id,
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
			else{
				
				_address = addr.address.slice(addr.address.length - 1)[0]
			}
			
			props.onSubmitForm(_address);
		}
	},[addr])

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
		if(id)
		{
			payload.address._id = id
		}
		dispatch(addAddress_action(payload))
		// props.onSubmitForm();
		setsubmitFlag(true)
	}
	const oncancel =() =>{
		props.oncancel()
	}

	const renderAddressForm = () => {
		return(
			<>
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
						&nbsp;
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
			</>
		)
	}

	if(props.withoutLayout)
	{
		return<div>{renderAddressForm()}</div>
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
				{renderAddressForm()}
			</div>
		</div>
   )
  }


export default AddressForm