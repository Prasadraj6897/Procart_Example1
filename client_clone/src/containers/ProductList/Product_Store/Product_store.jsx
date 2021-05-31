import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProductsBySlug } from '../../../actions/Product.action'
import './style.css'
import { generatePubliUrl } from '../../../urlConfig'
import { Link } from 'react-router-dom';
import Card from '../../UI/Card/card'
import { MaterialButton } from '../../MaterialUi_Layout/UI_Layout'
import Price from '../../UI/PriceUI/PriceUI'
import Rating from '../../UI/RatingUI/RatingUI'
/**
* @author
* @function Product_Store
**/

const Product_Store = (props) => {

    let product = {}
   
    const dispatch = useDispatch()
    useEffect(() => {
            const {match} = props
            dispatch(getProductsBySlug(match.params.slug))

        }, [])

        product = useSelector(state => state.Product_root_reducer)
        const priceRange = product.priceRange;
        // console.log(product.products)
  return(
    <>
        {/* {JSON.stringify(product.priceRange)} */}
            {
                product.prducts &&
                
                <>
                     {Object.keys(product.productByPrice).map((key, index) => {
                        return (
                            <Card
                                headerleft={`${props.match.params.slug.split("-")[0]} mobile under ${priceRange[key]}`}
                                headerright={
                                    <MaterialButton
                                        title={"VIEW ALL"}
                                        style={{
                                        width: "96px",
                                        }}
                                        bgColor="#2874f0"
                                        fontSize="12px"
                                    />
                                }
                                style={{
                                    width: "calc(100% - 40px)",
                                    margin: "20px",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    {product.productByPrice[key].map((product) => (
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{
                                                display: "block",
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            className="productContainer"
                                        >
                                            <div className="productImgContainer">
                                                <img src ={generatePubliUrl(product.productPictures[0].img)} alt="sample"/>
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: "10px 0" }}>{product.name}</div>
                                                <div>
                                                    <Rating value="4.3" />
                                                    &nbsp;&nbsp;
                                                    <span
                                                        style={{
                                                        color: "#777",
                                                        fontWeight: "500",
                                                        fontSize: "12px",
                                                        }}
                                                    >
                                                        (3353)
                                                    </span>
                                                </div>
                                                <Price value={product.price} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </Card>
                        );
                    })} 
                </>
 
            }
           
        </>
   )
  }

export default Product_Store