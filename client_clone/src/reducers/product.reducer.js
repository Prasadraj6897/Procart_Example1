import { Product_constants } from "../actions/constants"

const initState = {
    products:[],
    productByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under25k: [],
        under30k: [],
        above50k: [],
        above100k: [],
    }
}

export default (state = initState, action) => {
    switch(action.type)
    {
        case Product_constants.GET_PRODUCT_SLUG:
            state = {
                ...state,
                prducts:action.payload.product,
                productByPrice: {
                    ...action.payload.productByPrice
                }
            }
        break ;
    }
    return state;
}

