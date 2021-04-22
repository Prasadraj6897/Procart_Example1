import React from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import HomePage from '../Pages/HomePages'
import Admin from '../Pages/AdminPages/Admin'
// import Laptops from '../Pages/Laptops'
import Mobiles from '../Pages/Mobiles/Mobiles'
// import Watches from '../Pages/Watches'
import Footer from '../Pages/Footer'

let Routers = () => {
    return(
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/register' component={Admin} />
                    {/* <Route exact path='/laptops' component={Laptops} /> */}
                    <Route exact path='/mobiles' component={Mobiles} />
                    {/* <Route exact path='/watches' component={Watches} /> */}

                </Switch>
                <Footer />
            </Router>
        </>
        

    )
}

export default Routers;