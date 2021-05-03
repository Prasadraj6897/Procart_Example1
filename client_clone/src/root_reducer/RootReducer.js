// import {auth_reducer} from "../reducers/Auth.Reducers"
import {category_reducer} from '../reducers/category.reducer.js'

import { combineReducers } from 'redux';


let RootReducers = combineReducers(
                                    {
                                        // Auth_root_reducer : auth_reducer,
                                        category_root_reducer : category_reducer,
                                     
                                    }
                                    
                                )

export {RootReducers};