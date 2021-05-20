import express from "express"
import { adminMiddleware, requiresignin } from "../../common-middleware/authMiddleware.js";
import { AdminUpdateOrder } from "../../Controllers/Admin/order.admin.js";


const router = express.Router();


router.post('/updateOrder', requiresignin, adminMiddleware, AdminUpdateOrder)

export default router;