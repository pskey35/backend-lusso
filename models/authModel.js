import { mysqlPromesa } from "../config/mysql.js"

export class User{

    static async registrar_usuario(...user) {
        const [user,password,telefono,address, edad] = user
        try {
            await mysqlPromesa("CALL registrar_usuario(?,?,?,?,?,?)", [user, password, telefono, address, edad])

        } catch (error) {
            console.log("ha ocurrido un error al registrar_usuario")
            console.log(error)

        }
    }


    static async Login(user,password){
        try{
            await mysqlPromesa("CALL")
        }catch(error){
            console.log("hubo un error al loguearse")
        }
    }
}