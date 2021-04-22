import express from "express"
import {adminsignUp, adminsignIn} from '../../Controllers/Admin/admincontrolers.js'
import {SignUpValidationRequest, SignInValidationRequest, isRequestValidators} from "../../Validatotors/auth-validator.js"
const router = express.Router();


router.post('/signup', SignUpValidationRequest, isRequestValidators, adminsignUp)
router.post('/signin', SignInValidationRequest, isRequestValidators, adminsignIn)


export default router;