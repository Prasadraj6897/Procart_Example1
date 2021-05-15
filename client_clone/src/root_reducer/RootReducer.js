import {auth_reducer} from "../reducers/auth.reducer.js"
import {category_reducer} from '../reducers/category.reducer.js'
import product_reducer from '../reducers/product.reducer.js'
import cart_reducer from '../reducers/cart.reducer.js'
import { combineReducers } from 'redux';


let RootReducers = combineReducers(
                                    {
                                        Product_root_reducer : product_reducer,
                                        category_root_reducer : category_reducer,
                                        Auth_root_reducer : auth_reducer,
                                        Cart_root_reducer: cart_reducer,
                                    }
                                    
                                )

export {RootReducers};