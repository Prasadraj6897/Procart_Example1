import {GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,CREATE_CATEGORIES_REQUEST, CREATE_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAILURE} from '../actions/category.action'
import {GET_INITIAL_DATA_CATEGORIES_SUCCESS} from '../actions/initialData.action'
const initState = {
    categories : [],
    loading: false,
    error: null
}

let buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined)
    {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children:[]
            }
        ]
    }

    for(let cat of categories)
    {
        if(cat._id == parentId)
        {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,[...cat.children,{
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }],category) : []
            })
        }
        else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,cat.children,category) : []
            })
        }
    }
    return myCategories;
}

let category_reducer = (state = initState, action) =>{
    switch(action.type){
        case GET_CATEGORIES_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case GET_CATEGORIES_SUCCESS :    
                           
            return {
                ...state,
                categories: action.payload.category,
                loading: false,
            }
        case GET_INITIAL_DATA_CATEGORIES_SUCCESS: 
            return {
                ...state,
                categories: action.payload.category,
                loading: false,
            }
        case GET_CATEGORIES_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }

            case CREATE_CATEGORIES_REQUEST :           
            return {
                ...state,
                loading: true,
            }
          
        case CREATE_CATEGORIES_SUCCESS :    
            const updatedCategory = buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category)
            return {
                ...state,
                categories: updatedCategory,
                loading: false,
            }
        case CREATE_CATEGORIES_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state;
    }

}

export {category_reducer};