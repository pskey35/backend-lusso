import express from "express"
import {dashboardController} from "../controller/dashboardControler.js"
import multer from "multer"


const router = express.Router()

const memoria = multer.memoryStorage()
const upload = multer({storage:memoria})



router.post("/dashboard",upload.single("image"),dashboardController)



export default router;