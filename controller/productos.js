
import { mysqlPromesa } from "../config/mysql.js"



export default class Products {
    static async getAllProducts(req, res) {
        const [data] = await mysqlPromesa("CALL leer_productos(@exito,@mensaje)")
        const [resu] = await mysqlPromesa("SELECT @exito AS exito, @mensaje AS mensaje")



        if (resu.exito == 0) {
            return res.status(404).json({
                error: true,
                message: resu.mensaje
            })
        }


        res.json({ data, message: resu.mensaje, error: false })

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


