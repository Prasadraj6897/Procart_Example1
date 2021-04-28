import express from "express"
import { requiresignin } from "../../common-middleware/authMiddleware.js";
import {adminsignUp, adminsignIn, adminsignout} from '../../Controllers/Admin/admincontrolers.js'
import {SignUpValidationRequest, SignInValidationRequest, isRequestValidators} from "../../Validatotors/auth-validator.js"
const router = express.Router();


router.post('/signup', SignUpValidationRequest, isRequestValidators, adminsignUp)
router.post('/signin', SignInValidationRequest, isRequestValidators, adminsignIn)
router.post('/signout', adminsignout)


export default router;