import { Product_constants, Page_constants } from "../actions/constants"

const initState = {
    prducts:[],
    productByPrice: {},
    pageRequest: false,
    page:{},
    loading:false,
    productDetails:{},
    priceRange:{},
}

export default (state = initState, action) => {
    console.log("action.payload Productsss",action.payload)
    switch(action.type)
    {
        case Product_constants.GET_PRODUCT_SLUG:
            state = {
                ...state,
                prducts:action.payload.products,
                priceRange:action.payload.priceRange,
                productByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;

        case Page_constants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest:true,
               
            }
            break;
        case Page_constants.GET_PRODUCT_PAGE_SUCCESS:
            // console.log(action.payload.pages)
            state = {
                ...state,
                page:action.payload.pages,
                pageRequest:false,
            }
            break;
        case Page_constants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                pageRequest:true,
            }
        break ;

        case Product_constants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading:true,
               
            }
            break;
        case Product_constants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            // console.log(action.payload.pages)
            state = {
                ...state,
                productDetails:action.payload.productDetails,
                loading:false,
            }
            break;
        case Product_constants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:true,
            }
        break ;
    }
    return state;
}

