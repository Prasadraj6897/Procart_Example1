import axiosInstance from "../Components/helpers/axios";


const CREATE_PAGE_REQUEST = "CREATE_PAGE_REQUEST";
const CREATE_PAGE_SUCCESS = "CREATE_PAGE_SUCCESS";
const CREATE_PAGE_FAILURE = "CREATE_PAGE_FAILURE";


let create_page_action = (form) => {
    console.log("form", form)
    return async (dispatch) => {
        
        try{
            dispatch({type : CREATE_PAGE_REQUEST })
            const res = await axiosInstance.post('/page/createPage', form)
            console.log(res)
           
            if(res.status ==201 )
            {
               
                dispatch({
                        type : CREATE_PAGE_SUCCESS,
                        payload: res.data,
                    })
            }
            else{
                dispatch({
                    type : CREATE_PAGE_FAILURE,
                            payload : res.data.error
                })
            }
            
        }catch(error){

        }
    } 
}

export {create_page_action, CREATE_PAGE_REQUEST, CREATE_PAGE_SUCCESS, CREATE_PAGE_FAILURE}