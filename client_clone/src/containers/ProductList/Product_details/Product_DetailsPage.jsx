import React, {useEffect} from 'react'
import Layout from '../../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import { getProductDetailsbyID_action } from '../../../actions/Product.action'
import { 
    IoIosArrowForward, 
    IoIosStar, 
    IoMdCart 
  } from 'react-icons/io';
  import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import './style.css';
import { MaterialButton } from '../../MaterialUi_Layout/UI_Layout'
import { generatePubliUrl } from '../../../urlConfig';
import {Container, Row, Col} from 'react-bootstrap';
import { addTocart_actions, getCartItem_actions } from '../../../actions/cart.actions';


/**
* @author
* @function ProductDetails
**/

const ProductDetails = (props) => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.Product_root_reducer.productDetails)
    
    useEffect(() => {
            const {ProductId} = props.match.params
            // console.log("ProductIdProductIdProductId", ProductId)
            const payload = {
                params:{
                    ProductId
                }
            }
            dispatch(getProductDetailsbyID_action(payload))

        }, [])

    if(Object.keys(product).length === 0){
        return null;
        }
  return(
    <Layout>
        <div className="productDescriptionContainer">
            <Container>
                <Row className="flexRow">
                    <Col xs={2} className="verticalImageStack">
                        {
                        product.productPictures.map((thumb, index) => 
                        <div className="thumbnail">
                            <img src={generatePubliUrl(thumb.img)} alt={thumb.img} />
                        </div>
                        )
                        }
                        {/* <div className="thumbnail active">
                        {
                            product.productDetails.productPictures.map((thumb, index) => 
                            <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
                        }
                        </div> */}
                    </Col>
                    <Col xs={6} className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img src={generatePubliUrl(product.productPictures[0].img)} alt={`${product.productPictures[0].img}`} />
                        </div>
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                marginRight: '5px',
                                marginBottom:'5px'
                                }}
                                icon={<IoMdCart />}
                                onClick = {() => {
                                    const {_id, name, price} = product;
                                    const img = product.productPictures[0].img
                                    dispatch(addTocart_actions({
                                        _id, name, price, img
                                    }))
                                    // dispatch(getCartItem_actions())
                                    props.history.push(`/cart`)
                                }}
                                
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                marginLeft: '5px'
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                        {/* action buttons */}                 
                    </Col>    
                </Row>
            
            </Container>
            <div style={{width:"100%"}}>

                {/* home > category > subCategory > productName */}
                <div className="breed">
                    <ul>
                    <li><a href="#">Home</a><IoIosArrowForward /></li>
                    <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                    <li><a href="#">Samsung</a><IoIosArrowForward /></li>
                    <li><a href="#">{product.name}</a></li>
                    </ul>
                </div>
                {/* product description */}
                <div className="productDetails">
                    <p className="productTitle">{product.name}</p>
                    <div>
                        <span className="ratingCount">4.3 <IoIosStar /></span>
                        <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                    </div>
                    <div className="extraOffer">Extra <BiRupee />4500 off </div>
                    <div className="flexRow priceContainer">
                        <span className="price"><BiRupee />{product.price}</span>
                        <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
                    {/* <span>i</span> */}
                    </div>
                    <div>
                        <p style={{ 
                            color: '#212121', 
                            fontSize: '14px',
                            fontWeight: '600' 
                            }}>Available Offers</p>
                        <p style={{ display: 'flex' }}>
                            <span style={{
                                width: '100px',
                                fontSize: '12px',
                                color: '#878787',
                                fontWeight: '600',
                                marginRight: '20px'
                            }}>Description</span>
                            <span style={{
                                fontSize: '12px',
                                color: '#212121',
                            }}>{product.description}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
   )
  }


export default ProductDetails