import ModelProducts from "../models/productsModel.js"


export default class Products {
    static async getAllProducts(req, res) {

        const { error, message, data } = await ModelProducts.getAllProducts()

        if (error == false) {
            return res.status(200).json({ error, message, data })
        }


        return res.status(404).json({ error: true, message: message, data })




    }

    static async getProductsById(req, res) {

        const idParams = req.params.id

        const { error, message, data } = await ModelProducts.getProductsById(idParams)


        if (error) {
            return res.status(404).json({ error: true, message })
        }




        return res.json({ error, message, data })
    }


    static async postInsertProduct(req, res) {

        const dataPostBody = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            principal_img: req.body.principal_img,
            brand: req.body.brand,
            model: req.body.model,
            dimention: req.body.dimencion,
            weight: req.body.weight,
            color: req.body.color,
            material: req.body.material,
            state: req.body.state,
            category_id: req.body.category_id
        }


        const { error, data, message } = await ModelProducts.postInsertProduct(dataPostBody)

        if (error) {
            return res.status(404).json({ error, message })
        }



        res.status(200).json({ error, message, data })



    }


    static async deleteProduct(req, res) {
        const idParams = req.params.id


        const { error, message } = await ModelProducts.deleteProduct(idParams)

        if (error) {
            return res.status(404).json({ error: true, message })
        }

        return res.status(200).json({ error: false, message })



    }


    static async updateProduct(req, res) {

        const idParams = req.params.id
        if (isNaN(idParams)) {
            return res.status(404).json({ error: true, message: "enter a valid ID" })
        }
        const body = {
            id_product: idParams,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            main_image: req.body.main_image,
            brand: req.body.brand,
            model: req.body.model,
            dimension: req.body.dimension,
            weight: req.body.weight,
            color: req.body.color,
            material: req.body.material,
            state: req.body.state,
            category_id: req.body.category_id
        }



        const { error, message } = await ModelProducts.updateProduct([
            body.id_product,
            body.name,
            body.description,
            body.price,
            body.stock,
            body.main_image,
            body.brand,
            body.model,
            body.dimension,
            body.weight,
            body.color,
            body.material,
            body.state,
            body.category_id
        ]);

        if (error) {
            return res.status(400).json({ error, message })
        }


        return res.status(200).json({ error, message })





    }


    static async getAllProductsImagesById(req, res) {
        try {

            const idParams = req.params.id


            if (!idParams) {
                return res.status(400).json({ error: true, message: "IdParams is not defined in your payload body" })
            }


            if (isNaN(idParams)) {
                return res.status(400).json({ error: true, message: "Id params need to be a number" })
            }



            const { error, message, data } = await ModelProducts.getAllProductsImagesById(idParams)


            if (error) {
                return res.status(500).json({ error: true, message })
            }

            


            return res.status(200).json({ error: false, message, data })






        } catch (error) {


            return res.status(500).json({ error: true, message: error })
        }
    }

}



