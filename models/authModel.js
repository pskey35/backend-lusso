import { mysqlPromesa } from "../config/mysql.js"

export class User {

    static async registrar_usuario(...user) {
        try {
            //nombreSano,apellidoSano,emailSano,passwordSano, --- 
            //opcionales::: telefonoSano, edadSano, direccionSano,departamentoSano, paisSano, codigoPostalSano
            const [
                nombreSano, apellidoSano, emailSano,
                passwordSano, telefonoSano, edadSano,
                direccionSano, ciudadSano, departamentoSano, paisSano,
                codigoPostalSano
            ] = user

            await mysqlPromesa(
                "CALL registrar_usuario(?,?,?,?,?,?,?,?,?,?,?,@resultado, @exito)",
                nombreSano, apellidoSano, emailSano,
                passwordSano, telefonoSano, edadSano,
                direccionSano, ciudadSano, departamentoSano,
                paisSano, codigoPostalSano
            );

            // Consulta para obtener los valores de salida de @exito y @resultado
            const [resu] = await mysqlPromesa("SELECT @exito AS exito, @resultado AS mensaje_resultado");


            console.log(resu)
            return {
                error: false,
                message: "Se ha registrado correctamente",
                usuario: nombreSano,
                id: resu.insertId
            }

        } catch (error) {

            console.log("ha ocurrido un error al registrar_usuario")
            console.log(error)
            return {
                error: true,
                message: error
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

            console.log(password.length)
            if (password.length < 2 || password.length > 50) {
                console.log("no es valido")
                return false;
            }

            //aqui faltaria meter mas validaciones a la password
            //tiene que retornar true o false 

            return true



        } catch (error) {
            console.log("ha ocurrido un error en isValidPassword")
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
    static isValid(nombreSano) {

        let message;


        if (nombreSano.length <= 2 && nombreSano.length >= 50) {
            message = {
                error: true,
                message: "Su nombre de usuario debe tener entre 3 a 50 caracteres"
            }


        } else if (/^[0-9]+\S$/g.test(nombreSano)) {
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