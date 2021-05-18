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
import { isUserLoggedIn, login_action, logout_action } from '../../actions/auth.action';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

const Header = (props) => {

	const [loginModal, setLoginModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch()
	const auth = useSelector(state => state.Auth_root_reducer)

	const handleLogin = () =>{
		const form = new FormData();
		form.append('email', email);
		form.append('password', password);

		// console.log(form)
		dispatch(login_action({email, password}))
		setLoginModal(false)
		setEmail('');
		setPassword('');
	}

	const handleLogout = () =>{
		dispatch(logout_action())
	}

	//componentDidUpdate
	useEffect(()=>{
		if(auth.authenticate)
			dispatch(isUserLoggedIn)
	},[auth.authenticate])

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
				{ label: 'Orders', href: '', icon: null },
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
				<a className="loginButton" onClick={() => setLoginModal(true)}>
				  Login
				</a>
			  }
			  menus={[
				{ label: 'My Profile', href: '', icon: null },
				{ label: 'Flipkart Plus Zone', href: '', icon: null },
				{ label: 'Orders', href: '', icon: null },
				{ label: 'Wishlist', href: '', icon: null },
				{ label: 'Rewards', href: '', icon: null },
				{ label: 'Gift Cards', href: '', icon: null },
			  ]}
			  firstMenu={
				<div className="firstmenu">
				  <span>New Customer?</span>
				  <a style={{ color: '#2874f0' }}>Sign Up</a>
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
				  <MaterialInput 
					type="text"
					label="Enter Email/Enter Mobile Number"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					active
				  />
  
				  <MaterialInput 
					type="password"
					label="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// rightElement={<a href="#">Forgot?</a>}
				  />
				  <MaterialButton 
					title="Login"
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
			  <a className="cart" style={{color:"white"}}>
				<IoIosCart />
				<Link to='/cart'>
					<span style={{ margin: '0 10px', color:'white'}}>Cart</span>
				</Link>
				
			  </a>
			</div>
		  </div>
  
		</div>
	  </div>
	)
  
  }


export default Header