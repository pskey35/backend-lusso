import express from "express"
import ControllerProducts from "../controller/productController.js"
import multer from "multer"

const storage = multer.memoryStorage()

const upload = multer({storage:storage})


const router = express.Router()



router.get("/products",(req,res) => ControllerProducts.getAllProducts(req,res))
router.get("/product/:id",(req,res)=>ControllerProducts.getProductById(req,res))

router.post("/add-product",(req,res)=>ControllerProducts.postInsertProduct(req,res))
router.delete("/delete-product/:id",(req,res)=>ControllerProducts.deleteProduct(req,res))
router.put("/update-product/:id",(req,res)=>ControllerProducts.updateProduct(req,res))




//esto recien agregue
router.get("/all-images-product/:id",(req,res)=>ControllerProducts.getAllImagesProductById(req,res))

router.post("/add-image-product/:id",upload.single("image"),(req,res)=> ControllerProducts.addImageProduct(req,res))

router.delete("/delete-all-images-product/:id",(req,res)=>ControllerProducts.deleteAllImagesProductById(req,res))

export default router;