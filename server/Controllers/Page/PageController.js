import Page from '../../Models/Page.js'


export const createPage = async (req, res)=>{
    const {banners, products} = req.files;
    
    try{
        // console.log(req.body)
        if(banners && banners.length > 0)
        {
            
               req.body.banners =  banners.map((banner, index) => ({
                    img : `${process.env.API}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
                }))
            
        }
        if(products && products.length > 0)
        {
            
            req.body.products =  products.map((product, index) => ({
                    img : `${process.env.API}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
                }))
            
        }
        

        req.body.createdBy = req.user.id
        // console.log(req.body)
        Page.findOne({ category: req.body.category})
        .exec((error, page) => {
            if(error)
            {
                return res.status(400).json({message:error})
            }
            if(page)
            {
               Page.findOneAndUpdate({category: req.body.category}, req.body)
               .exec((error, updatedPage) => {
                    if(error)
                    {
                        return res.status(400).json({message:error})
                    }
                    if(updatedPage)
                    {
                        return res.status(201).json({page:updatedPage})
                    }
               })
            }
            else{
                const page = new Page(req.body)

                page.save((error, page) => {
                    if(error)
                    {
                        return res.status(400).json({message:error})
                    }
                    if(page)
                    {
                        return res.status(201).json({page})
                    }
                })
            }
        })

    }
    catch(error)
    {
        return res.status(500).json({message:error})
    }


}

export const getPage = async (req, res)=>{
    const {category, type} = req.params;
    // console.log({category, type})
    if(type==='page')
    {
        Page.findOne({category : category})
        .exec((error, page) =>{
            if(error)
            {
                return res.status(400).json({message:error})
            }
            if(page)
            {
                return res.status(201).json({page})
            }
        })
    }
}


