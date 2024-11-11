import express from "express"
import multer from "multer"
import {handlerImages} from "../controller/imageController.js"
import {authToken} from "../utils/middlewareAuth.js"

const router = express.Router()

//esto guarda en memoria temporalmente
const storage = multer.memoryStorage()
const upload = multer({storage})


//esta ruta se usara en /
router.post("/upload",authToken,upload.single("image"),handlerImages)


export default router