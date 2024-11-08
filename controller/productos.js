import { mysqlPromesa } from "../config/mysql.js"
import ModelProducts from "../models/productos.js"


export default class Products {
    static async getAllProducts(req, res) {

        const { error, message, data } = await ModelProducts.getAllProducts()


        if (error == false) {
            return res.status(200).json({ error, message, data })
        }


        return res.status(404).json({ error: true, message: message,data })




    }

    static async getProductsById(req, res) {
        const idParams = req.params.id
        const [data] = await mysqlPromesa("CALL leer_producto(?,@exito,@mensaje)", idParams)

        const [resu] = await mysqlPromesa("SELECT @exito AS exito,@mensaje AS mensaje")


        if (resu.exito == 0) {
            return res.status(404).json({ error: true, message: resu.mensaje })
        }


        return res.json({ data, error: false, message: resu.mensaje })
    }
}



//... ruta:/products


