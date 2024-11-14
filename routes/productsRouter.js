import express from "express"
import ControllerProducts from "../controller/productController.js"

const router = express.Router()



router.get("/products",(req,res) => ControllerProducts.getAllProducts(req,res))
router.get("/product/:id",(req,res)=>ControllerProducts.getProductsById(req,res))

router.post("/add-product",(req,res)=>ControllerProducts.postInsertProduct(req,res))
router.delete("/delete-product/:id",(req,res)=>ControllerProducts.deleteProduct(req,res))
router.put("/update-product/:id",(req,res)=>ControllerProducts.updateProduct(req,res))




//esto recien agregue
router.get("/all-images-products/:id",(req,res)=>ControllerProducts.getAllProductsImagesById(req,res))
router.post("/add-image-product",(req,res)=> ControllerProducts.addImageProduct(req,res))
router.delete("/delete-all-images-product/:id",(req,res)=>ControllerProducts.deleteAllImagesProductById(req,res))

export default router;