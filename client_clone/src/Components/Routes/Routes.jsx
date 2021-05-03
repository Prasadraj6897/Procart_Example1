import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from '../../containers/HomePage/HomePages'


let Routers = () => {

  

    return(
        <>
            <Router>
                {/* <Navbar /> */}
                <Switch>
                    <HomePage />
                    
                </Switch>
                {/* <Footer /> */}
            </Router>
        </>
        

    )
}

export default Routers;