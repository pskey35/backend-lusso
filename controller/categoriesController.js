
import CategoriesModel from "../models/categoriesModel.js"

const readAllCategories = async (req, res) => {


    const { error, message, data } = await CategoriesModel.readAllCategories()

    if (error) {
        return res.status(500).json({ error, message })
    }

    return res.status(200).json({ error, message, data })
}





const selectByIdCategories = async (req, res) => {


    const id_categoria = req.params.id_categoria



    const { error, message, data } = await CategoriesModel.selectByIdCategories(id_categoria)


    if (error) {
        return res.json({ error: true, message: result.mensaje })
    }


    return res.status(500).json({ error: false, message, data })
}



const addCategories = async (req, res) => {

    try {
        const categoria = req.body.addCategories

        if (!categoria) {
            return res.status(400).json({ error: true, message: "addCategories is not defined" })
        }

        const { error, message } = await CategoriesModel.addCategories(categoria)

        if (error) {
            return res.status(505).json({ error: true, message })
        }


        return res.status(200).json({ error: false, message: message })


    } catch (error) {
        res.status(500).json({ errro: true, descriptionError: error })
    }


}



const editCategoryById = async (req, res) => {
    try {
        const id_categoria = req.body.id_category
        const nombre = req.body.name

        if (!id_categoria || !nombre) {
            return res.status(400).json({ error: true, message: "No such properties exist in the request body" })
        }

        const data = {id_categoria,nombre}

        const { error, message } = await CategoriesModel.editCategoryById({id_categoria,nombre})


        if (error) {
            return res.status(505).json({ error: true, message })
        }


        return res.status(200).json({ error: false, message })
    } catch (error) {
  
        return res.status(500).json({ error: true, message: error })
    }

}



const deleteByIdCategories = async (req, res) => {
    const id_categoria = req.body.id_categoria


    const data = await mysqlPromesa('CALL eliminar_categoria(?,@exito,@mensaje)', [id_categoria])

    const [result] = await mysqlPromesa("SELECT @exito AS exito,@mensaje AS mensaje")


    if (result.exito == 1) {
        res.json({ error: false, mensaje: result.mensaje, data })
        return;
    }


    res.json({ error: true, mensaje: result.mensaje })



}



export default { readAllCategories, selectByIdCategories, addCategories, deleteByIdCategories,editCategoryById }