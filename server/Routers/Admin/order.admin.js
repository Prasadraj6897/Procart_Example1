import express from "express"
import { adminMiddleware, requiresignin } from "../../common-middleware/authMiddleware.js";
import { AdminUpdateOrder, getCustomerOrder } from "../../Controllers/Admin/order.admin.js";


const router = express.Router();


router.post('/updateOrder', requiresignin, adminMiddleware, AdminUpdateOrder)

router.get('/getCustomerOrders', requiresignin, adminMiddleware, getCustomerOrder)

export default router;