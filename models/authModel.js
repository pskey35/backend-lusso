import { mysqlPromesa } from "../config/mysql.js"

export class User {

    static async registrar_usuario(...user) {

        //userSano,apellidoSano,emailSano,passwordSano, --- 
        //opcionales::: telefonoSano, edadSano, direccionSano,departamentoSano, paisSano, codigoPostalSano
        try {
            //registramos a la base de datos
            const [resu] = await mysqlPromesa("CALL registrar_usuario(?,?,?,?,?,?,?,?,?,?,@resultado)", [userSano,
                apellidoSano, emailSano,
                passwordSano, telefonoSano, edadSano, direccionSano,
                departamentoSano, paisSano, codigoPostalSano])

            return {
                error:false,
                id:resu.insertId
            }

        } catch (error) {
            
            console.log("ha ocurrido un error al registrar_usuario")
            console.log(error)
            return {
                error:true,
                message:error
            }
        }
    }


    static async Login(user, password) {
        try {

            await mysqlPromesa("")
        } catch (error) {
            console.log("hubo un error al loguearse")
        }
    }


    static async isValidPassword(password) {
        try {


            if (password.length < 2 && password.length > 50) {
                return true;
            }

            //aqui faltaria meter mas validaciones a la password
            //tiene que retornar true o false 

            return false;



        } catch (error) {
            console.log(error)
        }
    }


    static async correoExist() {
        try {
            const boleano = await mysqlPromesa("")
            if (boleano) {

            }
        } catch (error) {
            console.log("hubo un error")


        }
    }

    //esto valida usuario
    static isValid(userSano) {

        let message;


        if (userSano.length <= 2 && userSano.length >= 50) {
            message = {
                error: true,
                message: "Su nombre de usuario debe tener entre 3 a 50 caracteres"
            }


        } else if (/^[0-9]+\S$/g) {
            message = {
                error: true,
                message: "El nombre de usuario no debe de contener unicamente numeros"
            }

        } else {
            message = {
                error: false,
                message: "Nombre de usuario valido,"
            }
        }

        return message;



    }




}