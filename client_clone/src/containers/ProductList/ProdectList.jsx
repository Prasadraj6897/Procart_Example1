import React, {useEffect, useState} from 'react'
import Product_Store from '../ProductList/Product_Store/Product_store'
import {useDispatch, useSelector} from 'react-redux'
import Product_Page from '../ProductList/Product_Page/Product_Page'
import './style.css'

import getParams from '../../utils/getParams'
import Layout from '../Layout/Layout'
import ClothingAndAccessories from './ClothingAndAccessories/ClothingAndAccessories'
/**
* @author
* @function ProductList
**/

const ProductList = (props) => {

   

        const renderProduct = () =>{
            const params = getParams(props.location.search)
            let content = null;
            switch(params.type)
            {
                case 'store':
                    content = <Product_Store {...props} />
                    break;
                case 'page':
                    content = <Product_Page {...props} />
                    break;
                default:
                    content = <ClothingAndAccessories {...props}/>
            }
            return content;
        }

  return(
        <>
            <Layout>
                {renderProduct()} 
            </Layout>
            
        </>
            
    
   )
  }


export default ProductList