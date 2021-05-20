import {auth_reducer} from "../reducers/Auth.Reducers"
import {category_reducer} from '../reducers/category.reducer.js'
import {product_reducer} from '../reducers/product.reducer.js'
import {page_reducer} from '../reducers/Page.reducers.js'
import {order} from '../reducers/order.reducer.js'
import {admin_order_reducer} from '../reducers/order.reducer.js'
import { combineReducers } from 'redux';


let RootReducers = combineReducers(
                                    {
                                        Auth_root_reducer : auth_reducer,
                                        category_root_reducer : category_reducer,
                                        product_root_reducer : product_reducer,
                                        page_root_reducer : page_reducer,
                                        Admin_Order_root_reducer: admin_order_reducer,
                                       
                                    }
                                    
                                )

export {RootReducers};