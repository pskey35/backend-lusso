import express from "express"
import { mysqlPromesa } from "../config/mysql.js"
import ControllerProducts from "../controller/productos.js"

const router = express.Router()

//se mostraran los productos aqui en ruta home o en su slug


router.get("/products",(req,res) => ControllerProducts.getAllProducts(req,res))
router.get("/product/:id",(req,res)=>ControllerProducts.getProductsById(req,res))


export default router;