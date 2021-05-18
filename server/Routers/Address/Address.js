import express from "express"
import {requiresignin, userMiddleware} from "../../common-middleware/authMiddleware.js"
import {addAddress, getAddress} from "../../Controllers/Address/Address_Controller.js"

const router = express.Router();

router.post('/addAddress', requiresignin, userMiddleware, addAddress)
router.post('/getAddress', requiresignin, userMiddleware, getAddress)
export default router;