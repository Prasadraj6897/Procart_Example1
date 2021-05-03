import axiosInstance from "../Components/helpers/axios"
import { Product_constants } from "./constants.js";

export const getProductsBySlug = (slug) => {
    console.log(slug)
    return async dispatch => {
        const res = await axiosInstance.get(`/product/${slug}`);
        if(res.status === 200)
        {
            dispatch({
                type: Product_constants.GET_PRODUCT_SLUG,
                payload:{
                    product:res.data,
                }
            })
        }
        else
        {

        }
    }
}