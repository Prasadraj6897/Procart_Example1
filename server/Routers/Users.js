import express from "express"
import {signUp, signIn, signout} from '../Controllers/Users.js'
import { SignUpValidationRequest, SignInValidationRequest, isRequestValidators } from "../Validatotors/auth-validator.js"

const router = express.Router();


router.post('/signup', SignUpValidationRequest, isRequestValidators, signUp)
router.post('/signin',  SignInValidationRequest, isRequestValidators, signIn)
router.post('/signout', signout)
// router.post('/profile', requiresignin, (req, res)=>{
//     res.status(200).json({user:'profile'})
// })


export default router;