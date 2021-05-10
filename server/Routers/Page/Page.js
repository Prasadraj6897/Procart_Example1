import express from "express"
import {createPage} from '../../Controllers/Page/PageController.js'
import upload, { requiresignin, adminMiddleware } from '../../common-middleware/authMiddleware.js'

const router = express.Router();


router.post('/createPage', upload.fields([
    {
        name: 'banners'
    },
    {
        name: 'products'
    }
]), requiresignin, adminMiddleware ,createPage)

export default router;