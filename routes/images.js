import express from "express"

import multer from "multer"
import {handlerImages} from "../controller/imagesControler.js"
const router = express.Router()

//esto guarda en memoria temporalmente
const storage = multer.memoryStorage()
const upload = multer({storage})



router.post("/upload",upload.single("image"),handlerImages)


export default router