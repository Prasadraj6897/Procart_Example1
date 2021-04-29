import express from "express"
import {initialData} from "../../Controllers/Admin/initialDataController.js";

const router = express.Router();


router.post('/initialData',initialData)



export default router;