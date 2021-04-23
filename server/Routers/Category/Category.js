import express from "express"

import {createCategory, getCategory} from '../../Controllers/Category/Category_controller.js'
import {requiresignin, adminMiddleware} from "../../common-middleware/authMiddleware.js"


const router = express.Router();

router.post('/createCategory', requiresignin, adminMiddleware, createCategory)
router.get('/getCategory',   getCategory)

export default router;