import Page from '../../Models/Page.js'


export const createPage = async (req, res)=>{
    const {banners, products} = req.files;
    
    try{
        // console.log(req.body)
        if(banners.length > 0)
        {
            
               req.body.banners =  banners.map((banner, index) => ({
                    img : `${process.env.API}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
                }))
            
        }
        if(products.length > 0)
        {
            
            req.body.products =  products.map((product, index) => ({
                    img : `${process.env.API}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
                }))
            
        }
        

        req.body.createdBy = req.user.id
        // console.log(req.body)
        const result = await Page.create(req.body)
        

        return res.status(200).json({ result})
    }
    catch(error)
    {
        return res.status(500).json({message:error})
    }


}


