import { mysqlPromesa } from "../config/mysql.js"

export default class ModelProducts {
    static async getAllProducts() {

        try {
            const [data] = await mysqlPromesa("CALL leer_productos(@exito,@mensaje)")
            const [outputs] = await mysqlPromesa("SELECT @exito AS success, @mensaje AS message")

            console.log(data, outputs)
            if (outputs.success == 1) {
                return { error: false, message: outputs.message, data }
            }

            return { error: true, message: outputs.message, data }
        } catch (error) {

            return { error }
        }



    }

    static async getProductsById(idParams) {



        try {
            if (isNaN(idParams)) {
                console.log("papu hubo error")
                return { error: true, message: "Introduce an id valid" }
            }


            const data = await mysqlPromesa("CALL leer_producto(?,@exito,@mensaje)", parseInt(idParams))
            const [resu] = await mysqlPromesa("SELECT @exito AS success,@mensaje AS message")

            if (resu.success == 0) {
                return { error: true, message: resu.message }
            }


            return { error: false, message: resu.message, data: data[0][0] }



        } catch (e) {
            return { error: true, message: "There is an error", errorDescription: e }
        }




    }


    static async postInsertProduct(dataReceived) {

        try {
            await mysqlPromesa("CALL insertar_producto(?,?,?,?,?,?,?,?,?,?,?,?,?,@exito,@mensaje)",
                [dataReceived.name,
                dataReceived.description,
                dataReceived.price,
                dataReceived.stock,
                dataReceived.principal_img,
                dataReceived.brand,
                dataReceived.model,
                dataReceived.dimention,
                dataReceived.weight,
                dataReceived.color,
                dataReceived.material,
                dataReceived.state,
                dataReceived.category_id]
            )

            const [resu] = await mysqlPromesa("SELECT @exito AS success,@mensaje AS message")

            if (resu.success == 0) {
                return { error: true, message: resu.message }
            }

            return { error: false, message: resu.message }



        } catch (e) {
            return { error: true, errorDetail: e }

        }




    }


    static async deleteProduct(dataReceived) {

        const idParams = dataReceived;

        await mysqlPromesa("CALL eliminar_producto(?, @problem, @message)", idParams)
        const [resu] = await mysqlPromesa("SELECT @problem AS error, @message AS message")


        if (resu.error == 0) {

            return { error: false, message: resu.message }
        }





        return { error: true, message: resu.message }



    }


    static async updateProduct(...dataReceived) {


        console.log("model")
        console.log(...dataReceived)
        await mysqlPromesa("CALL actualizar_producto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@problem,@message)",
            ...dataReceived
        )


        
        const [resu] = await mysqlPromesa("SELECT @problem AS error,@message AS message")


        if(resu.error == 0){
            return {error:false,message:resu.message}
        }


        return {error:true,message:resu.message}









    }

}