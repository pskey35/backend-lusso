
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


}