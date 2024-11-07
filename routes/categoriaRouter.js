import express from "express"
import { editByIdCategories, readAllCategories } from "../controller/categoriaControler.js"
import { selectByIdCategories } from "../controller/categoriaControler.js"
import { addCategories } from "../controller/categoriaControler.js"
import { deleteByIdCategories } from "../controller/categoriaControler.js"

const router = express.Router()


router.get("/categorias", readAllCategories)


router.get("/categoria/:id_categoria", selectByIdCategories)


router.post("/deleteCategoria", deleteByIdCategories)

router.post("/addCategoria", addCategories)






router.post("/editCategoria", editByIdCategories)




export default router