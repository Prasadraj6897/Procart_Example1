import express from "express"

import {createCategory, getCategory} from '../../Controllers/Category/Category_controller.js'
import {requiresignin, adminMiddleware} from "../../common-middleware/authMiddleware.js"
import bodyParser from 'body-parser'

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/createCategory', requiresignin, adminMiddleware, createCategory)
router.get('/getCategory', urlencodedParser,  getCategory)
// router.post('/admin/signin', SignInValidationRequest, isRequestValidators, adminsignIn)


export default router;