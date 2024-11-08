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
    
        const {error, message, data} = await ModelProducts.getProductsById(idParams)


        if (error) {
            return res.status(404).json({ error: true, message })
        }




        return res.json({error, message,data})
    }
}



//... ruta:/products


