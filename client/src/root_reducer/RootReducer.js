import {auth_reducer} from "../reducers/Auth.Reducers"
// import {post_reducer} from "./action_reducer/post.reducer"

import { combineReducers } from 'redux';


let RootReducers = combineReducers(
                                    {
                                        Auth_root_reducer : auth_reducer,
                                       
                                       
                                    }
                                    
                                )

export {RootReducers};