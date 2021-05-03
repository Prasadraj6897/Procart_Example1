import axiosInstance from "../Components/helpers/axios";

const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";


let get_category_action = () => {
    
    return async (dispatch) => {
           
        try{
            dispatch({
                type:GET_CATEGORIES_REQUEST,
            })
            const res = await axiosInstance.get('/category/getCategory')
            console.log(res)
            if(res.status == 200)
            {
                dispatch({
                    type:GET_CATEGORIES_SUCCESS,
                    payload: {
                        category: res.data.CategoryList
                    }
                })
            }
            else{
                dispatch({
                    type:GET_CATEGORIES_FAILURE,
                    payload: 
                    {
                        error: res.data.error
                    }
                })
            }

        }
        catch(error)
        {
           
        }

    }

}


export {get_category_action, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE};