import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { isUserLoggedIn } from "../../actions/auth.action";

import HomePage from '../../containers/HomePage/HomePages'
import ProductList from "../../containers/ProductList/ProdectList";
import ProductDetails from "../../containers/ProductList/Product_details/Product_DetailsPage";


let Routers = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.Auth_root_reducer)
    
    useEffect(() => {
        // setauthToken(auth)
        if(!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
       
    }, [auth.authenticate])

    return(
        <>
            <Router>
                {/* <Navbar /> */}
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route exact path='/:Productslug/:ProductId/p'  component={ProductDetails} />
                    <Route exact path='/:slug'  component={ProductList} />
                    
                </Switch>
                {/* <Footer /> */}
            </Router>
        </>
        

    )
}

export default Routers;