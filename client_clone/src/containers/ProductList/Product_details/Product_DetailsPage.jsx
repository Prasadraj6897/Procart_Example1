import Reactt, {useEffect} from 'react'
import Layout from '../../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import { getProductDetailsbyID_action } from '../../../actions/Product.action'
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
  return(
    <Layout>
        <div>
            ProductDetails
            <pre>{JSON.stringify(product)}</pre>
        </div>
    </Layout>
   )
  }


export default ProductDetails