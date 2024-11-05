import express from "express"

import { mysqlPromesa } from "../config/mysql.js"


const router = express.Router()


/*
PARA AGREGAR
pool.query('CALL agregar_categoria(?);', [nombre])

PARA EDITAR
pool.query('CALL actualizar_categoria(?, ?);', [id_categoria, nombre])

PARA ELIMINAR
pool.query('CALL eliminar_categoria(?);', [id_categoria])
*/

router.get("/categorias", (req, res) => {
    const [result] = mysqlPromesa("CALL leer_categorias()")

    if (!result) {
        res.json({ error: true })
        return;
    }

    res.json({ data: result })

})


router.get("/categoria/:idCategoria", (req, res) => {
    const id_categoria = req.params.idCategoria

    const [result] = mysqlPromesa('CALL leer_categoria(?);', [id_categoria])

    if (!result) {
        res.json({ error: true })
        return
    }


    res.json({ error: false, data: result })

})

router.post("/addCategoria", (req, res) => {

    const categoria = req.body.addCategoria

    mysqlPromesa('CALL agregar_categoria(?);', [categoria])
})


router.post("/editCategoria", (req, res) => {
    const id_categoria = req.body.id_categoria
    const nombre = req.body.nombre


    mysqlPromesa('CALL actualizar_categoria(?, ?);', [id_categoria, nombre])
})


router.post("/deleteCategoria", (req, res) => {
    const id_categoria = req.body.id_categoria
    mysqlPromesa('CALL eliminar_categoria(?);', [id_categoria])
})



export default router