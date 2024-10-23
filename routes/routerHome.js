import express from "express"
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import {homeFunction,allProductFunction} from "../controller/homeControler.js"


const routerHome = express.Router()


routerHome.get("/",homeFunction)
routerHome.get("/allProducts",allProductFunction)





export default routerHome 