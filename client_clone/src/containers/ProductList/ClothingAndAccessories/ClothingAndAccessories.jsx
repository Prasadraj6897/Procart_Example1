import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './style.css'
import { generatePubliUrl } from '../../../urlConfig'
import { Link } from 'react-router-dom';
import { BiRupee } from "react-icons/bi";
import Card from '../../UI/Card/card'
import { getProductsBySlug } from '../../../actions/Product.action';
/**
* @author
* @function ClothingAndAccessories
**/

const ClothingAndAccessories = (props) => {
	const productss = useSelector(state => state.Product_root_reducer)
	const dispatch = useDispatch()
    
	useEffect(() => {
            const {match} = props
            dispatch(getProductsBySlug(match.params.slug))

        }, [])
		// console.log(productss)
	return(
		<div style={{padding:"10px"}}>
			<Card style={{
				boxSizing:"border-box",
				padding:"10px",
				display:"flex"
				}}
				className="flexRow"
			>
				{
                productss.prducts ?
                
					<>
						 {
							productss.prducts.map((product) => (

									<div className="caContainer">
										<Link
											className="caImgContainer flexRow"
											to={`/${product.slug}/${product._id}/p`}
										>
											<img src= {generatePubliUrl(product.productPictures[0].img)} alt={product.productPictures[0]._id}  />
										</Link>
										<div>
											<div className="caProductName">{product.name}</div>
											<div className="caProductPrice">
												<BiRupee />
												{product.price}
											</div>
										</div>
									</div>
							
							))
						}
					</>
					:
					null
				}
			</Card>
		</div>
	)
}


export default ClothingAndAccessories