export const readAllCategories = async (req, res) => {
    const [result] = await mysqlPromesa("CALL leer_categorias()", "")

    console.log(result)

    if (!result) {
        res.json({ error: true })
        return;
    }

    res.json({ data: result })

}


export const selectByIdCategories = async (req, res) => {
    const id_categoria = req.params.id_categoria

    const [result] = await mysqlPromesa('CALL leer_categoria(?);', [id_categoria])

    if (!result) {
        res.json({ error: true })
        return
    }


    res.json({ error: false, data: result })
}



export const addCategories = async (req, res) => {
    try {
        const categoria = req.body.addCategoria
        console.log("categoira controler:::", categoria)
        const result = await mysqlPromesa('CALL agregar_categoria(?);', [categoria])
        res.json({ error: false, data: result })
    } catch (error) {
        console.log(error)


        res.json({ error: true, message: error })
    }


}



export const editByIdCategories = async (req, res) => {
    const id_categoria = req.body.id_categoria
    const nombre = req.body.nombre


    const result = await mysqlPromesa('CALL actualizar_categoria(?, ?);', [id_categoria, nombre])
    res.json({ data: result })
}



export const deleteByIdCategories = async (req, res) => {
    const id_categoria = req.body.id_categoria

    console.log("categoria a eliminar", id_categoria)

    const result = await mysqlPromesa('CALL eliminar_categoria(?)', [id_categoria])

    if (!result) {
        res.json({ error: true })
    }
    res.json({ data: result })

}