import express from "express"

import {createCart, getCartItems, removeCartItems} from '../../Controllers/Cart/cart_Controller.js'
import {requiresignin, userMiddleware} from "../../common-middleware/authMiddleware.js"




const router = express.Router();

router.post('/addtocart', requiresignin, userMiddleware, createCart)
router.post('/getCartItems', requiresignin, userMiddleware,  getCartItems)
router.post('/removeCartItems', requiresignin, userMiddleware,  removeCartItems)

export default router;