import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from '../../containers/HomePage/HomePages'
import ProductList from "../../containers/ProductList/ProdectList";


let Routers = () => {

  

    return(
        <>
            <Router>
                {/* <Navbar /> */}
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/:slug'  component={ProductList} />
                    
                </Switch>
                {/* <Footer /> */}
            </Router>
        </>
        

    )
}

export default Routers;