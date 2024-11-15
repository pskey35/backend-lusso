import express from "express"
import ControllerCategory from "../controller/categoriesController.js"


const router = express.Router()


router.get("/categories", (req,res)=>ControllerCategory.readAllCategories(req,res))
router.get("/category/:id", (req,res)=>ControllerCategory.selectByIdCategories(req,res))

router.delete("/delete-category/:id", (req,res)=>ControllerCategory.deleteCategoryById(req,res))

router.post("/add-category",(req,res)=> ControllerCategory.addCategories(req,res))

router.post("/edit-category",(req,res)=> ControllerCategory.editCategoryById(req,res))




export default router