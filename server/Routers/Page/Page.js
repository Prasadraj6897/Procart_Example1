import express from "express"
import {createPage, getPage} from '../../Controllers/Page/PageController.js'
import upload, { requiresignin, adminMiddleware } from '../../common-middleware/authMiddleware.js'

const router = express.Router();


router.post('/createPage', requiresignin, adminMiddleware, upload.fields([
    {
        name: 'banners'
    },
    {
        name: 'products'
    }
]) ,createPage)

router.get(`/:category/:type`, getPage);

export default router;