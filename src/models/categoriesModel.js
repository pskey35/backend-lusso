import { mysqlPromesa } from "../config/mysql.js"


export default class CategoriesModel {
    static async readAllCategories() {

        const [data] = await mysqlPromesa("CALL leer_categorias(@exito,@mensaje)")
        const [result] = await mysqlPromesa("SELECT @exito AS exito, @mensaje AS message")

        if (result.exito == 1) {
            return { error: false, message: result.message, data }
        }

        console.log("debuging")
        console.lo(result.error)
        console.log(result.message)
        return { error: true, message: result.message }

    }


    static async selectByIdCategories(id_categoria) {

        const [data] = await mysqlPromesa('CALL leer_categoria(?,@exito,@mensaje);', [id_categoria])
        const [result] = await mysqlPromesa(`SELECT @exito AS exito,@mensaje AS message`)

        if (result.exito == 1) {
            return { error: false, message: result.message, data }
        }


        return { error: true, message: result.message }

    }


    static async addCategories(dataReceived) {


        const categoria = dataReceived

        await mysqlPromesa('CALL agregar_categoria(?,@exito,@mensaje);', [categoria])

        const [result] = await mysqlPromesa(`SELECT @exito AS exito,
                @mensaje AS message`)
        if (result.exito == 1) {
            return { error: true, message: result.message }
        }


        return { error: false, message: result.message }




    }

    static async editCategoryById(dataReceived) {
        try {
            const { id_categoria, nombre } = dataReceived



            await mysqlPromesa('CALL actualizar_categoria(?, ?,@exito,@mensaje);', [id_categoria, nombre])
            const [result] = await mysqlPromesa("SELECT @exito AS exito, @mensaje AS message")

            if (result.exito == 1) {
                return { error: false, message: result.message }
            }


            return { error: false, message: result.message }


        } catch (error) {
            return { error: true, message: error }
        }
    }


    static async deleteCategoryById(idReceived) {
        try {
            const id_categoria = idReceived

            await mysqlPromesa('CALL eliminar_categoria(?,@exito,@mensaje)', [id_categoria])
            const [result] = await mysqlPromesa("SELECT @exito AS exito,@mensaje AS message")

            if(result.exito == 1){
                return {error:false,message:result.message}
            }

            return {error:true,message:result.message}

        } catch (error) {
          
            return {error:true,message:error}
        }


    }

}