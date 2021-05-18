import {userAddressConstants} from "./constants.js"
import axiosInstance from "../Components/helpers/axios"

let getAddress_action = () => {
    
    return async (dispatch) => {
           
        try{
            
            dispatch({type : userAddressConstants.GET_USER_ADDRESS_REQUEST})
            const res = await axiosInstance.post('/address/getAddress')
           
            
            if(res.status === 200){
                const {
                    userAddress : {
                        address
                    }
                } = res.data;

                dispatch(
                    {
                        type : userAddressConstants.GET_USER_ADDRESS_SUCCESS, 
                        payload:{address}
                    }
                )
                
            }
            else{
               
                dispatch({
                        type : userAddressConstants.GET_USER_ADDRESS_FAILURE, 
                        payload:{
                            error : res.data.error
                        }
                    }
                )
                
            }

        }catch(error){

        }
    } 
}

let addAddress_action = (payload) => {
    
    return async (dispatch) => {
           
        try{
            
            dispatch({type : userAddressConstants.ADD_USER_ADDRESS_REQUEST})
            const res = await axiosInstance.post('/address/addAddress', {payload})
           
            
            if(res.status === 200){
                console.log("addAddress_actionaddAddress_action",res.data)
                // const {
                //     userAddress : {
                //         address
                //     }
                // } = res.data;

                // dispatch(
                //     {
                //         type : userAddressConstants.ADD_USER_ADDRESS_SUCCESS, 
                //         payload:{address}
                //     }
                // )
                
            }
            else{
               
                dispatch({
                        type : userAddressConstants.ADD_USER_ADDRESS_FAILURE, 
                        payload:{
                            error : res.data.error
                        }
                    }
                )
                
            }

        }catch(error){

        }
    } 
}


export {getAddress_action, addAddress_action}