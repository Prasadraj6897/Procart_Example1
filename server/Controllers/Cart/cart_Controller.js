import Cart from '../../Models/Cart.js'
import Product from '../../Models/Product.js'
import slugify from 'slugify'


// import CreateCategories from '../CategoryList/CategoryList.js'

function runUpdate(increaseCartItem, update)
{
    return new Promise((resolve, reject)=> {
        Cart.findOneAndUpdate(increaseCartItem, update, {upsert: true})
            .then(result => resolve())
            .catch(err => reject(err))
    })
}

export const createCart = async (req, res)=>{
    // const {email, password} = req.body
    // console.log(req.body)
    try{
        
        Cart.findOne({ user: req.user.id }).exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
              //if cart already exists then update cart by quantity
              let promiseArray = [];
        
              req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = cart.cartItems.find((c) => c.product == product);
                let condition, update;
                if (item) {
                  condition = { user: req.user.id, "cartItems.product": product };
                  update = {
                    $set: {
                      "cartItems.$": cartItem,
                    },
                  };
                } else {
                  condition = { user: req.user.id };
                  update = {
                    $push: {
                      cartItems: cartItem,
                    },
                  };
                }
                promiseArray.push(runUpdate(condition, update));
                //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
                // .exec((error, _cart) => {
                //     if(error) return res.status(400).json({ error });
                //     if(_cart){
                //         //return res.status(201).json({ cart: _cart });
                //         updateCount++;
                //     }
                // })
              });
              Promise.all(promiseArray)
                .then((response) => res.status(200).json({ response }))
                .catch((error) => res.status(400).json({ error }));
            } else {
              //if cart not exist then create a new cart
              const cart = new Cart({
                user: req.user.id,
                cartItems: req.body.cartItems,
              });
              cart.save((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) {
                  return res.status(200).json({ cart });
                }
              });
            }
          });
        }
                

    
    
    catch(error){
       
       return res.status(500).json({message : error})
    }
}  


export const getCartItems = (req, res) => {
    //const { user } = req.body.payload;
    //if(user){
    Cart.findOne({ user: req.user.id })
      .populate("cartItems.product", "_id name price productPictures")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPictures[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    //}
  };

export const removeCartItems = (req, res) => {
    const { productId } = req.body.payload;
    if(productId){
		Cart.update({ user: req.user.id },
			{
				$pull:{
					cartItems:{
						product:productId
					},
				},
			}
			).exec((error, result)=>{
			if(error){
				return res.status(400).json({ error });
			} 

			if(result){
				return res.status(200).json({ result });
			} 	
		})
		
		
    }
  };

