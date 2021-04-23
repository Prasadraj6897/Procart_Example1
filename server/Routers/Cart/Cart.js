import express from "express"

import {createCart} from '../../Controllers/Cart/cart_Controller.js'
import {requiresignin, userMiddleware} from "../../common-middleware/authMiddleware.js"




const router = express.Router();

router.post('/addtocart', requiresignin, userMiddleware, createCart)
// router.get('/getCategory',   getCategory)

export default router;