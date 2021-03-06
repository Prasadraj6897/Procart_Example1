import React, { useState }  from 'react'

import flipkartLogo from '../../images/logo/flipkart-plus_8d85f4.png'
import goldenStar from '../../images/logo/plus_aef861.png'
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { 
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUi_Layout/UI_Layout'
import './style.css'
import { useDispatch } from 'react-redux';
import { isUserLoggedIn, login_action, logout_action, signup_action } from '../../actions/auth.action';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { getOrder_action } from '../../actions/order.action';
import CartLogo from '../UI/Cart/CartLogo';

const Header = (props) => {

	const [loginModal, setLoginModal] = useState(false);
	const [signUpModal, setSignupModal] = useState(false)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch()
	const auth = useSelector(state => state.Auth_root_reducer)
	const cart = useSelector(state => state.Cart_root_reducer.cartItems)
	// const order = useSelector(state => state.Order_root_reducer.orders)
	useEffect(()=>{
		if(auth.authenticate)
			dispatch(isUserLoggedIn)
	},[auth.authenticate])

	useEffect(() => {
		if (auth.authenticate) {
		  setLoginModal(false);
		}
	  }, [auth.authenticate]);

	  const userSignup = () => {
		const user = { firstName, lastName, email, password, ConfirmPassword };
		if (
		  firstName === "" ||
		  lastName === "" ||
		  email === "" ||
		  password === "" ||
		  ConfirmPassword ===""
		) {
		  return;
		}
	
		dispatch(signup_action(user));
	  };
	
	const handleLogin = () =>{
		if (signUpModal) {
			userSignup();
		  } else {
			const form = new FormData();
			form.append('email', email);
			form.append('password', password);
	
			// console.log(form)
			
			dispatch(login_action({email, password}))
			setLoginModal(false)
			setEmail('');
			setPassword('');
		}
		
	}

	const handleLogout = () =>{
		dispatch(logout_action())
	}

	const handleOrders = () =>{
		dispatch(getOrder_action())
	}

	
	//componentDidUpdate
	

	// if(!order.orderLoading){
    //     return <Redirect to={'/user/order'} />
    // }


	const renderLoggedInMenu = () => {
		return(
			<DropdownMenu
			  menu={
				<a className="userName" style={{color:"white"}}>
				  {auth.result.firstName}&nbsp;{auth.result.lastName}
				</a>
			  }
			  menus={[
				{ label: 'My Profile', href: '', icon: null },
				{ label: 'Super Coin Zone', href: '', icon: null },
				{ label: 'Flipkart Plus Zone', href: '', icon: null },
				{ label: 'Orders', href: '/user/order', icon: null },
				{ label: 'Wishlist', href: '', icon: null },
				{ label: 'My Chats', href: '', icon: null },
				{ label: 'Coupons', href: '', icon: null },
				{ label: 'Rewards', href: '', icon: null },
				{ label: 'Notification', href: '', icon: null },
				{ label: 'Gift Cards', href: '', icon: null },
				{ label: 'Logout', href: '', icon: null, onClick:handleLogout },
			  ]}
			  
			/>
		)
	}
  
	const renderNonLoggedInMenu = () => {
		return(
			<DropdownMenu
			  menu={
				<a className="loginButton" onClick={() =>{setLoginModal(true); setSignupModal(false)}}>
				  Login
				</a>
			  }
			  menus={[
				{ label: 'My Profile', href: '', icon: null },
				{ label: 'Flipkart Plus Zone', href: '', icon: null },
				{ label: 'Orders', href: '/user/order', icon: null, onClick:()=>{!auth.authenticate && setLoginModal(true)} },
				{ label: 'Wishlist', href: '', icon: null },
				{ label: 'Rewards', href: '', icon: null },
				{ label: 'Gift Cards', href: '', icon: null },
			  ]}
			  firstMenu={
				<div className="firstmenu">
				  <span>New Customer?</span>
				  <a
					onClick={() => {
						setLoginModal(true);
						setSignupModal(true);
					}}
					style={{ color: "#2874f0" }}
					>
					Sign Up
					</a>
				</div>
			  }
			/>
		)
	}
  
	return (
	  <div className="header">
		<Modal 
		  visible={loginModal}
		  onClose={() => setLoginModal(false)}
		>
		  <div className="authContainer">
			<div className="row">
			  <div className="leftspace">
				<h2>Login</h2>
				<p>Get access to your Orders, Wishlist and Recommendations</p>
			  </div>
			  <div className="rightspace">
			
				<div className = "loginInputContainer">
					{auth.error && (
						<div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
					)}
					{
						signUpModal && (
							<MaterialInput 
								type="text"
								label="Enter First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								focus
							/>
						)
					}

					{
						signUpModal && (
							<MaterialInput 
								type="text"
								label="Enter Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								focus
							/>
						)
					}
				  <MaterialInput 
					type="text"
					label="Enter Email/Enter Mobile Number"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					focus
				  />
  
				  <MaterialInput 
					type="password"
					label="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// rightElement={<a href="#">Forgot?</a>}
				  />
				  
				  {
						signUpModal && (
							<MaterialInput 
								type="text"
								label="Enter Confirm Password"
								value={ConfirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								focus
							/>
						)
					}
				  <MaterialButton 
					title={signUpModal ? "Register" : "Login"}
					bgColor="#fb641b"
					textColor="#ffffff"
					style={{
						margin: '20px 0 20px 0'
					}}
					onClick ={handleLogin}
				  />
				  <p style={{textAlign:'center'}}>OR</p>

				  <MaterialButton 
					title="Request OTP"
					bgColor="#ffffff"
					textColor="#2874f0"
					style={{
						margin: '20px 0'
					}}
				  />
				</div>
				
  
			  </div>
			</div>
		  </div>
		</Modal>
		<div className="subHeader">
		  <div className="logo">
			<Link to="/">
			  <img src={flipkartLogo} className="logoimage" alt="" />
			</Link>
			<a style={{ marginTop: '-10px' }}>
			  <span className="exploreText">Explore</span>
			  <span className="plusText">Plus</span>
			  <img src={goldenStar} className="goldenStar" alt="" />
			</a>
		  </div>
		  <div style={{
			padding: '0 10px'
		  }}>
			<div className="searchInputContainer">
			  <input
				className="searchInput"
				placeholder={'search for products, brands and more'}
			  />
			  <div className="searchIconContainer">
				<IoIosSearch style={{
				  color: '#2874f0'
				}} />
			  </div>
  
			</div>
		  </div>
		  <div className="rightMenu">
			{
				!auth.authenticate
				?
					renderNonLoggedInMenu()
				:
					renderLoggedInMenu()
			}



			<DropdownMenu
			  menu={
				<a className="more" style={{color:"white"}}>
				  <span>More</span>
				  <IoIosArrowDown />
				</a>
			  }
			  menus={[
				{ label: 'Notification Preference', href: '', icon: null },
				{ label: 'Sell on flipkart', href: '', icon: null },
				{ label: '24x7 Customer Care', href: '', icon: null },
				{ label: 'Advertise', href: '', icon: null },
				{ label: 'Download App', href: '', icon: null }
			  ]}
			/>
			<div>
				<Link to='/cart'>
					<a className="cart" style={{color:"white"}}>
						<CartLogo count={Object.keys(cart).length} />
						<span style={{ margin: '0 10px', color:'white'}}>Cart</span>
					</a>
				</Link>			  
			</div>
		  </div>
  
		</div>
	  </div>
	)
  
  }


export default Header