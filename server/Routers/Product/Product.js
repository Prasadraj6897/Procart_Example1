import express from "express"
import {createProduct, getProductsBySlug} from '../../Controllers/Product/Product.js'
import {requiresignin, adminMiddleware} from "../../common-middleware/authMiddleware.js"
import multer from 'multer'
import shortid from 'shortid'
import * as path from 'path';



const router = express.Router();

const __dirname = path.resolve();

//below is for destination for uploading files 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), '/server/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({storage})
  

router.post('/createProduct', requiresignin, adminMiddleware, upload.array('productPictures'), createProduct)
router.get('/:slug', getProductsBySlug);
// router.get('/getCategory',  getCategory)

export default router;