import express from "express"

import {createCategory, getCategory} from '../../Controllers/Category/Category_controller.js'

const router = express.Router();

router.post('/create', createCategory)
router.get('/getCategory', getCategory)
// router.post('/admin/signin', SignInValidationRequest, isRequestValidators, adminsignIn)


export default router;