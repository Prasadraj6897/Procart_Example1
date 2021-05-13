import axiosInstance from "../Components/helpers/axios"
import { Product_constants, Page_constants } from "./constants.js";

export const getProductsBySlug = (slug) => {
    // console.log(slug)
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

export const getPage = (datas) => {
    // console.log("datasdatasdatasdatas",datas.params)
    return async dispatch => {
        try{
            const {cid, type} = datas.params;
            
            const res = await axiosInstance.get(`/page/${cid}/${type}`);
            dispatch({
                type: Page_constants.GET_PRODUCT_PAGE_REQUEST,
                
            })
            // console.log("resresresresres",res.data.page)
            if(res.status === 201)
            {
                dispatch({
                    type: Page_constants.GET_PRODUCT_PAGE_SUCCESS,
                    payload:{
                        pages:res.data.page,
                    }
                })
            }
            else
            {
                dispatch({
                    type: Page_constants.GET_PRODUCT_PAGE_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                    
                })
            }
        }
        catch(error)
        {

        }

       
    }
}

export const getProductDetailsbyID_action = (datas) => {
   
    return async dispatch => {
        try{

            const ProductId = datas.params.ProductId;
             dispatch({
                type: Product_constants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
                
            })
            const res = await axiosInstance.get(`/product/get/${ProductId}`);
           
            console.log("resresresresres",res)
            if(res.status === 200)
            {
                dispatch({
                    type: Product_constants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                    payload:{
                        productDetails:res.data.product,
                    }
                })
            }
            else
            {
                dispatch({
                    type: Product_constants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                    
                })
            }

        }
        catch(error)
        {

        }
    }
}