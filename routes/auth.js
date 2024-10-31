import express from "express"
import controler from "../controller/authControler.js"
import {authToken} from "../utils/middlewareAuth.js"
//aqui no se neceista el authToken

const routerAuth = express.Router()


routerAuth.post("/login",controler.loginControler)

routerAuth.post("/register",controler.registerControler)


export default routerAuth
