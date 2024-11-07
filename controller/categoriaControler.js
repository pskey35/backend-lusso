import { mysqlPromesa } from "../config/mysql.js"

const readAllCategories = async (req, res) => {
    const [data] = await mysqlPromesa("CALL leer_categorias(@exito,@mensaje)")


    const [result] = await mysqlPromesa("SELECT @exito AS exito, @mensaje AS mensaje")



    if (result.exito == 1) {
        res.json({ error: false, data, message: result.mensaje })
        return;
    }



    res.json({ error: true, mensaje: result.mensaje })

}





const selectByIdCategories = async (req, res) => {
    const id_categoria = req.params.id_categoria

    const [data] = await mysqlPromesa('CALL leer_categoria(?,@exito,@mensaje);', [id_categoria])

    const [result] = await mysqlPromesa(`SELECT @exito AS exito,@mensaje AS mensaje`)



    if (result.exito == 1) {
        res.json({ error: false, message: result.mensaje, data })
        return;
    }


    res.json({ error: true, message: result.mensaje })
}



const addCategories = async (req, res) => {

    const categoria = req.body.addCategoria
    console.log("categoira controler:::", categoria)

    await mysqlPromesa('CALL agregar_categoria(?,@exito,@mensaje);', [categoria])


    const [result] = await mysqlPromesa(`SELECT @exito AS exito,
            @mensaje AS mensaje`)


    if (result.exito == 1) {
        res.json({ error: false, message: result.mensaje })
        return;
    }


    res.json({ error: true, message: result.mensaje })



}



 const editByIdCategories = async (req, res) => {
    const id_categoria = req.body.id_categoria
    const nombre = req.body.nombre


    await mysqlPromesa('CALL actualizar_categoria(?, ?,@exito,@mensaje);', [id_categoria, nombre])


    const [result] = await mysqlPromesa("SELECT @exito AS exito, @mensaje AS mensaje")


    if (result.exito == 1) {
        res.json({ error: false, message: result.mensaje })
        return;
    }


    res.json({ error: true, message: result.mensaje })
}



const deleteByIdCategories = async (req, res) => {
    const id_categoria = req.body.id_categoria


    const data = await mysqlPromesa('CALL eliminar_categoria(?,@exito,@mensaje)', [id_categoria])

    const [result] = await mysqlPromesa("SELECT @exito AS exito,@mensaje AS mensaje")


    if(result.exito == 1){
        res.json({error:false,mensaje:result.mensaje,data})
        return;
    }


    res.json({error:true,mensaje:result.mensaje})

    

}



export default {readAllCategories,selectByIdCategories,addCategories,deleteByIdCategories}