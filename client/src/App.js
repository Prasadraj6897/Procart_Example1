import React from 'react'
import Routers from './Components/Routes/Routes'
import {Provider} from "react-redux"
import {store} from "./store/store"

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

let App = () =>{
	return(
		<>
			<Provider store = {store}>
				<Routers />
			</Provider>

		</>
	)
}

export default App;