import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../../actions/Product.action';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../UI/Card/card';
/**
* @author
* @function Product_Page
**/

const Product_Page = (props) => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.Product_root_reducer.page)

    useEffect(()=>{
        const params = getParams(props.location.search);
        const datas = {
            params
        }
        dispatch(getPage(datas))
    },[])

  return(
    // {
    //     page.banners && page.banners.map((banner, index) => {
    //         <div key={index}>
    //             <img src={banner.img} alt=""/>
    //         </div>
    //     })
    // }

    <div style={{margin:"0px 10px"}}>
        {/* {<pre>{JSON.stringify(page.banners)}</pre>} */}

        
         <Carousel
            renderThumbs ={() =>{}}
         >
            {
                page.banners && page.banners.map((banner, index) => 
                    <a
                     key={index}
                     style={{display:'block'}}
                     href={banner.navigateTo}
                     >
                        <img src={banner.img} alt=""/>
                    </a>
                )
            }
        </Carousel>
        <div style={{display:"flex",
                        justifyContent:'center',
                        flexWrap:'wrap',
                        margin:'10px 0'
        }}>
            {
                page.products && page.products.map((product, index) =>
                
                    <Card key={index}
                    style={{
                        width:'400px',
                        height:'200px',
                        margin:'5px 5px'
                    }}>
                        <img style={{width:'100%', height:"100%"}} src={product.img} alt=""/>

                    </Card>
                )
            }
        </div>
    </div> 
   )
  }


export default Product_Page