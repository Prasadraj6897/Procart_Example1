import express from "express"

import {createCategory, getCategory, updateCategories} from '../../Controllers/Category/Category_controller.js'
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

router.post('/createCategory', requiresignin, adminMiddleware, upload.single('categoryImage'), createCategory)
router.get('/getCategory',   getCategory)
router.post('/updateCategory', upload.array('categoryImage'), updateCategories)

export default router;