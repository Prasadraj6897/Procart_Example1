import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import HomePage from '../Pages/HomePages'
import Admin from '../Pages/AdminPages/Admin'
// import Laptops from '../Pages/Laptops'
import Mobiles from '../Pages/Mobiles/Mobiles'
// import Watches from '../Pages/Watches'
import Footer from '../Pages/Footer'
import PrivateRoute from '../Hig_Ord_Comp/PrivateRoute'
import {useDispatch, useSelector} from "react-redux"
import { isUserLoggedIn } from "../../actions/auth.action";
import Products from '../Pages/Products/Products'
import Orders from '../Pages/Orders/Orders'
import category from '../Pages/categories/categories'
import { get_category_action } from "../../actions/category.action";
import {getInitialData_action} from '../../actions/initialData.action'

let Routers = () => {
    const dispatch = useDispatch();
    
    const auth = useSelector( (state) =>
            
            state.Auth_root_reducer,
            
        
    )
   

    useEffect(() => {
        // setauthToken(auth)
        if(!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
        dispatch(getInitialData_action())
    }, [])
    


    return(
        <>
            <Router>
                <Navbar />
                <Switch>
                    <PrivateRoute exact path='/' component={HomePage} />
                    <Route exact path='/admin' component={Admin} />
                    {/* <Route exact path='/laptops' component={Laptops} /> */}
                    <PrivateRoute exact path='/mobiles' component={Mobiles} />
                    {/* <Route exact path='/watches' component={Watches} /> */}
                    <PrivateRoute path='/products' component={Products} />
                    <PrivateRoute path='/orders' component={Orders} />
                    <PrivateRoute path='/categories' component={category} />
                </Switch>
                <Footer />
            </Router>
        </>
        

    )
}

export default Routers;