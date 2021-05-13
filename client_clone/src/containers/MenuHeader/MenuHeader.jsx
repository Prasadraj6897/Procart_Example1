import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { get_category_action } from '../../actions/category.action'
import './style.css'


const MenuHeader = () => {

    useEffect(() => {
        dispatch(get_category_action())
    }, [])
    
    const category = useSelector(state => state.category_root_reducer.categories)
    const dispatch = useDispatch();
    
    

    const renderCategories = (category) => {
        let ALL_categories = []
        for(let categ of category)
        {
            ALL_categories.push( 
            <li key = {categ._id}>
                {
                    //slug in here for /elec /mob
                    categ.parentId ? <Link to={`${categ.slug}?cid=${categ._id}&type=${categ.type}`}>{categ.name}</Link> 
                        :
                    <span>{categ.name}</span>

                }
                <ul>
                    {categ.children.length > 0 ?
                        (
                            renderCategories(categ.children)
                        )
                    :
                    null

                    }
                </ul>

            </li>)
           
        }
        return ALL_categories;
    }

  return(
    <div className="menuHeader">
        {/* <pre>{JSON.stringify(category)}</pre> */}
        <ul>
            {category.length > 0 ? renderCategories(category) : null}
        </ul>
    </div>
   )
  }


export default MenuHeader