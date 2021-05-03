// import {auth_reducer} from "../reducers/Auth.Reducers"
import {category_reducer} from '../reducers/category.reducer.js'
import product_reducer from '../reducers/product.reducer.js'
import { combineReducers } from 'redux';


let RootReducers = combineReducers(
                                    {
                                        Product_root_reducer : product_reducer,
                                        category_root_reducer : category_reducer,
                                     
                                    }
                                    
                                )

export {RootReducers};