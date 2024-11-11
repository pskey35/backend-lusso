//este dashboard se usa en la ruta /dashboard cuando el usuario quiere ver su perfil
import express from "express"
import {dashboardController} from "../controller/dashboardControler.js"
import multer from "multer"
import {authToken} from "../utils/middlewareAuth.js"

const router = express.Router()
const memoria = multer.memoryStorage()
const upload = multer({storage:memoria})



router.post("/dashboard",authToken,upload.single("image"),dashboardController)



export default router;