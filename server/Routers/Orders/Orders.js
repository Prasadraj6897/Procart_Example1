import express from "express"
import {requiresignin, userMiddleware} from "../../common-middleware/authMiddleware.js"
import { addOrder, getInvoiceOrderDetails, getOrder } from "../../Controllers/Order/Order_Controller.js";

const router = express.Router();

router.post('/addOrder', requiresignin, userMiddleware, addOrder)
router.get('/getOrder', requiresignin, userMiddleware, getOrder)
router.post('/getInvoiceOrderDetail', requiresignin, userMiddleware, getInvoiceOrderDetails)
export default router;