import express from "express"
import {authToken} from "../utils/middlewareAuth.js"

//aqui sera para devolver data de el usuario en caso se registra pero con authtoken

const router = express.Router()



router.get("/userPerfil",authToken,userPerfilControler)