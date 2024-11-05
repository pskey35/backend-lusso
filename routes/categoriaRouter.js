import express from "express"
import { mysqlPromesa } from "../config/mysql.js"
import { editByIdCategories, readAllCategories } from "../controller/categoriaControler.js"
import { selectByIdCategories } from "../controller/categoriaControler.js"
import { addCategories } from "../controller/categoriaControler.js"
import { deleteByIdCategories } from "../controller/categoriaControler.js"

const router = express.Router()


router.get("/categorias", readAllCategories)


router.get("/categoria/:id_categoria", selectByIdCategories)

router.post("/addCategoria", addCategories)


router.post("/editCategoria", editByIdCategories)


router.post("/deleteCategoria", deleteByIdCategories)



export default router