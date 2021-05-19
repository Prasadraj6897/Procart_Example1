import express from "express"
import {requiresignin, userMiddleware} from "../../common-middleware/authMiddleware.js"
import { addOrder, getOrder } from "../../Controllers/Order/Order_Controller.js";

const router = express.Router();

router.post('/addOrder', requiresignin, userMiddleware, addOrder)
router.get('/getOrder', requiresignin, userMiddleware, getOrder)
export default router;