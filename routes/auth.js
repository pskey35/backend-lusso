import express from "express"
import controler from "../controller/authControler.js"
import {authToken} from "../utils/middlewareAuth.js"


const routerAuth = express.Router()


routerAuth.post("/login",authToken,controler.loginControler)

routerAuth.post("/register",authToken,controler.registerControler)


export default routerAuth