import Category from '../../Models/Category.js'
import slugify from 'slugify'


// import CreateCategories from '../CategoryList/CategoryList.js'

export const createCategory = async (req, res)=>{
    // const {email, password} = req.body
    // console.log(req.body.name)
    try{
        
       const categoryObj = {
           name: req.body.name,
           slug: slugify(req.body.name),
           
       }
       if(req.file){
        categoryObj.categoryImage =  process.env.API + '/public/' + req.file.filename
    }

       if(req.body.parentId)
       {
        categoryObj.parentId = req.body.parentId
       }

       const result = await Category.create(categoryObj)
       
       return res.status(200).json({result})
    }
    catch(error){
       
       return res.status(500).json({message : error})
    }
}

export const getCategory = async (req, res)=>{


        // for getting whole category
        Category.find({})
        .exec((error, Categ)=>{
            if(error)
            {
                return res.status(500).json({error})
            }
            if(Categ)
            {
                // for getting sub category
                const CategoryList = CreateCategories(Categ)
                return res.status(200).json({CategoryList})
            }
        })
        
        
    
}

function CreateCategories (CategoryfromResult, parentId = null){
    
    const CategoryList=[]
    let category;

    if(parentId == null)
    {
        //if there is no parentId it is undefined so we are pushing cateogory without parentid like Electronics, men, women
        category = CategoryfromResult.filter(cat => cat.parentId == undefined)
    }
    else{
        //if there is parentId it is pushing cateogory with parentid like mobiles, laptops from Electronics
        category = CategoryfromResult.filter(cat => cat.parentId == parentId)
    }
    // // for pushing samsung, Mi into Mobiles
    //don't forget to put of in for loop

    for(let categ of category)
    {
        CategoryList.push({
            _id: categ._id,
            name: categ.name,
            slug: categ.slug,
            childern: CreateCategories(CategoryfromResult, categ._id),
        })
    }
    return CategoryList;
   

}