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


    static async postInsertProduct(req,res){

        const dataPostBody = {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            stock:req.body.stock,
            principal_img:req.body.principal_img,
            brand:req.body.brand,
            model:req.body.model,
            dimention:req.body.dimencion,
            weight:req.body.weight,
            color:req.body.color,
            material:req.body.material,
            state:req.body.state,
            category_id:req.body.category_id
        }


        const {error,data,message} = await ModelProducts.postInsertProduct(dataPostBody)
        
        if(error){
            return res.status(404).json({error,message})
        }


      
        res.status(200).json({error,message,data})


    
    }
}



//... ruta:/products


