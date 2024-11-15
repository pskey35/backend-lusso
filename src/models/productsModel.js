import { mysqlPromesa } from "../config/mysql.js"
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"


dotenv.config()

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


        if (resu.error == 0) {
            return { error: false, message: resu.message }
        }


        return { error: true, message: resu.message }









    }



    static async getAllImagesProductById(dataReceived) {

        try {
            const idParams = dataReceived


            const data = await mysqlPromesa("call leer_imagenes_producto(?, @problem, @message)", [idParams])

            const [result] = await mysqlPromesa("SELECT @problem AS error,@message AS message")


            if (result.error == 0) {
                //aqui entra si no hay error
                console.log("no hay error")
                return { error: false, message: result.message, data }
            }



            return { error: result.error, message: result.message }
        } catch (error) {
            console.log("hubo un error")
            console.log(error)
            return { error: true, message: error }
        }




    }


    static async addImageProduct(dataReceived) {
        try {
            const fileBuffer = dataReceived.fileBuffer

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "josue" }, // Opcional: puedes especificar una carpeta
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(fileBuffer); // Aquí enviamos el buffer directamente
            });



            //idProduct to insert image
            const idProduct = dataReceived.idParams

            const urlImage = result.url
            const nameFile = result.display_name

            await mysqlPromesa(`call insertar_imagen(?, ?, ?,@problem, @message)`, [idProduct, nameFile, urlImage])


            const [data] = await mysqlPromesa("SELECT @problem AS error,@message AS message")


            if (data.error == 1) {
                return { error: true, message: data.message }
            }




            return { error: data.error, message: data.message }
        } catch (error) {

            return { error: true, message: error }

        }
    }


    static async deleteAllImagesProductById(dataReceived) {
        try {

            const idParams = dataReceived

            await mysqlPromesa("call eliminar_imagen_producto(?,@problem,@message)", [idParams])
            const [result] = await mysqlPromesa("SELECT @problem AS error,@message AS message")


            console.log("models")
            console.log(result)

            if (result.error == 0) {
                return { error: false, message: result.message }
            }


            return { error: true, message: result.message}


        } catch (error) {
            return { error: true, message: error }
        }
    }


}