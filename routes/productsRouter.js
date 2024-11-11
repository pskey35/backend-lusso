import express from "express"
import { mysqlPromesa } from "../config/mysql.js"
import ControllerProducts from "../controller/productController.js"

const router = express.Router()



router.get("/products",(req,res) => ControllerProducts.getAllProducts(req,res))
router.get("/product/:id",(req,res)=>ControllerProducts.getProductsById(req,res))
router.post("/add-product",(req,res)=>ControllerProducts.postInsertProduct(req,res))


router.delete("/delete-product/:id",(req,res)=>ControllerProducts.deleteProduct(req,res))

router.put("/update-product/:id",(req,res)=>ControllerProducts.updateProduct(req,res))


export default router;