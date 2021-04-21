import express from "express"
import {adminsignUp, adminsignIn} from '../../Controllers/Admin/admincontrolers.js'


const router = express.Router();


router.post('/admin/signup', adminsignUp)
router.post('/admin/signin', adminsignIn)


export default router;