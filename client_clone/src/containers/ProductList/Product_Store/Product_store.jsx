import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProductsBySlug } from '../../../actions/Product.action'
import './style.css'
import { generatePubliUrl } from '../../../urlConfig'
import { useState } from 'react'
import { Link } from 'react-router-dom';
/**
* @author
* @function Product_Store
**/

const Product_Store = (props) => {

    const product = useSelector(state => state.Product_root_reducer.prducts)
    const [priceRange, setpriceRange ] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under25k: 25000,
        under30k: 30000,
        above50k: 50000,
        above100k: 100000,
    })
    const dispatch = useDispatch()
    useEffect(() => {
            const {match} = props
            dispatch(getProductsBySlug(match.params.slug))

        }, [])
  return(
    <>
            {
                product ?
                
                <>
                    {
                        Object.keys(product.ProductPrice).map((key, index) => {
                            return(
                                <div className="card" key={index}>
                                    <div className="cardHeader">
                                        <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
                                        <button>view all</button>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        {
                                            product.ProductPrice[key].map(product =>
                                                <Link to={`/${product.slug}/${product._id}/p`} className='productContainer' style={{display:'block'}}>
                                                    <div className='productImgContainer'>
                                                        <img src ={generatePubliUrl(product.productPictures[0].img)} alt="sample"/>
                                                    </div>
                                                    <div className='productInfo'>
                                                        <div style={{margin:'5px 0'}}>{product.name}</div>
                                                        <div>
                                                            <span>4.2</span>&nbsp;<br></br>
                                                            <span>3533</span>
                                                        </div>
                                                        <div className="productPrice">{product.price}</div>
                                                    </div>
                                                </Link>

                                            )
                                        }
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </>
                    
                
                
                : 
                
                "Loading...!"
            }
           
        </>
   )
  }


export default Product_Store