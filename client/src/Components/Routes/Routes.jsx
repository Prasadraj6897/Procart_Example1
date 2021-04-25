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

let Routers = () => {
    const dispatch = useDispatch();
    
    const auth = useSelector( (state) =>
            
            state.Auth_root_reducer,
            
        
    )
    const [authToken, setauthToken] = useState(auth)
    

    useEffect(() => {
        // setauthToken(auth)
        if(!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
    }, [])
    


    return(
        <>
            <Router>
                <Navbar AuthToken={authToken}/>
                <Switch>
                    <PrivateRoute exact path='/' component={HomePage} />
                    <Route exact path='/admin' component={Admin} />
                    {/* <Route exact path='/laptops' component={Laptops} /> */}
                    <PrivateRoute exact path='/mobiles' component={Mobiles} />
                    {/* <Route exact path='/watches' component={Watches} /> */}

                </Switch>
                <Footer />
            </Router>
        </>
        

    )
}

export default Routers;