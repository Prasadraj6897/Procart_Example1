import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBLink , MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon,  MDBTabPane, MDBTabContent, MDBBtn ,MDBRow } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import {Link,useHistory} from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from "@material-ui/core/Avatar/Avatar"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography  from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';

import {useDispatch, useSelector} from "react-redux"
import useStyles from "./css/SideNavStyles.js"

import {logout_action} from '../../actions/auth.action.js'

let NavBar = () => {
    const [collapseID, setcollapseID] = useState("")
    const [isOpen, setisOpen] =  useState(false)
    const [activeItemPills, setactiveItemPills] = useState(1)

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const history = useHistory()
    const dispatch = useDispatch();

    const Auth_token = useSelector( (state) =>
            
        state.Auth_root_reducer

    )


    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const logout = () => {
        dispatch(logout_action())
        // Auth_token = null;
        history.push('/admin')

    }
    const handleSideBar = (e) => {
        console.log(e)
    }
 

  return (
    // <MDBContainer>      
        <MDBNavbar color="primary-color"  dark expand="sm" style={{height:'10%'}}>
            {/* <pre>{JSON.stringify(Auth_token.result)}</pre> */}
            {/* <pre>{JSON.stringify(AuthToken)}</pre> */}
            
            {/* for side toogle */}
           

            {/* <CssBaseline /> */}
        {
            Auth_token.token ? 
                (
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                )
            
            :
            
            
            ""
        }
           

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {/* component={() => <Link to='/mobiles' />} component={() => <Link to='/watches' />} */}
                    <Link to='/page' onClick={handleDrawerClose}>
                        <ListItem  >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Page"/>
                        </ListItem> 
                    </Link>

                    <Link to='/products' onClick={handleDrawerClose}>
                        <ListItem >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products"/>
                        </ListItem> 
                    </Link>
                    <Link to='/orders' onClick={handleDrawerClose}>
                        <ListItem  >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ordered"/>
                        </ListItem> 
                    </Link>
                    <Link to='/categories' onClick={handleDrawerClose}>
                        <ListItem  >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories"/>
                        </ListItem> 
                    </Link>
                    
                </List>

                <Divider />
            </Drawer>

            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
            
                <MDBCollapse  navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <Link className='navbar-brand' to='/' active={activeItemPills === '1'} >
                               
                                <strong className="white-text">Home</strong>
                               
                            </Link>
                        
                        </MDBNavItem>
                       {/*  <MDBNavItem>
                            <Link className='navbar-brand' to='/mobiles' active={activeItemPills === '2'} >
                                <strong className="white-text">Mobiles</strong>
                            </Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link className='navbar-brand' to='/watches' active={activeItemPills === '3'} >
                                <strong className="white-text">Watches</strong>
                            </Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            
                            <Link className='navbar-brand' to='/laptops'>
                                <strong className="white-text">Laptops</strong>
                            </Link>
                        </MDBNavItem> */}
                        <MDBNavItem>
                            {/* <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">MDBDropdown</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown> */}
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {/* <MDBNavItem className="nav-item active">
                            <Link className="nav-link" to="/envelope">1
                                <MDBIcon icon="shopping-cart" className="ml-1" />
                            </Link>
                        </MDBNavItem> */}
                        {" "}
                        {
                            Auth_token.token == null?
                                ""
                            :
                            (
                                <MDBNavItem>
                                    <MDBDropdown>
                                
                                        <MDBDropdownToggle className="dopdown-toggle" nav>
                                            {/* <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                                                style={{ height: "35px", padding: 0 }} alt="" /> */}
                                                 <Avatar >
                                                    {Auth_token.result.firstName.charAt(0)}
                                                </Avatar>
                                                 
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu className="dropdown-default" right>
                                            <Typography variant="h6"> 
                                                {Auth_token.result.firstName} {" "} {Auth_token.result.lastName}
                                            </Typography>
                                            <Link className='navbar-brand' >
                                                <MDBDropdownItem onClick = {logout}>Logout</MDBDropdownItem>
                                            </Link> 
                                            
                                            {/* <Link className='navbar-brand' to='/signin'>
                                                <MDBDropdownItem >SignIn</MDBDropdownItem>
                                            </Link> */}
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            )
                            
                        }
                            
                            
                       
                    </MDBNavbarNav>
                </MDBCollapse>
            </main>
        </MDBNavbar>
    // </MDBContainer>
    );
  
}

export default NavBar;