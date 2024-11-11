import express from "express"
import ControllerCategory from "../controller/categoriasController.js"


const router = express.Router()


router.get("/categorias", (req,res)=>ControllerCategory.readAllCategories(req,res))
router.get("/categoria/:id_categoria", (req,res)=>ControllerCategory.selectByIdCategories(req,res))
router.post("/deleteCategoria", (req,res)=>ControllerCategory.deleteByIdCategories(req,res))
router.post("/addCategoria",(req,res)=> ControllerCategory.addCategories(req,res))
router.post("/editCategoria",(req,res)=> ControllerCategory.editByIdCategories(req,res))




export default router