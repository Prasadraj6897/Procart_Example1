import express from "express"
import {signUp, signIn, requiresignin} from '../Controllers/Users.js'


const router = express.Router();


router.post('/signup', signUp)
router.post('/signin', signIn)

router.post('/profile', requiresignin, (req, res)=>{
    res.status(200).json({user:'profile'})
})


export default router;