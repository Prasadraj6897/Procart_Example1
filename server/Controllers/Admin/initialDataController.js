import Category from '../../Models/Category.js'
import Product from '../../Models/Product.js'
import Order from '../../Models/Orders.js'


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
            parentId: categ.parentId,
            type: categ.type,
            children: CreateCategories(CategoryfromResult, categ._id),
        })
    }
    return CategoryList;
   

}


export const initialData = async (req, res) => {

    const categories = await Category.find({})

    const products = await Product.find({})
                                .select('_id name price quantity slug description productPictures category')
                                .populate({path: 'category', select:'_id name'})

    const Orders = await Order.find({})
    .populate("items.productId", "name")
    .exec()
    
    res.status(200).json({
                        categories: CreateCategories(categories),
                        products,
                        Orders
        }
         )
}