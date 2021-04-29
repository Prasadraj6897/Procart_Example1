import axiosInstance from "../Components/helpers/axios";


const GET_INITIAL_DATA_CATEGORIES_SUCCESS = "GET_INITIAL_DATA_CATEGORIES_SUCCESS";

const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS"
const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE'


const getInitialData_action = () => {
    return async (dispatch) => {
       try{
            
            const res = await axiosInstance.post('/data/initialData')
            console.log(res)
            if(res.status ==200)
            {
                const {categories, products} = res.data;
                dispatch({
                    type:GET_INITIAL_DATA_CATEGORIES_SUCCESS,
                    payload: {
                       category: categories
                    }
                })
                dispatch({
                    type:GET_ALL_PRODUCTS_SUCCESS,
                    payload: {
                        products
                    }
                })
            }
            

        }
        catch(error)
        {

        }
    }

}



export {getInitialData_action, GET_INITIAL_DATA_CATEGORIES_SUCCESS, GET_ALL_PRODUCTS_SUCCESS};