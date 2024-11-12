import { mysqlPromesa } from "../config/mysql.js"






export class User {

    static async register(...user) {
        try {
            await mysqlPromesa(
                `CALL registrar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_exito, @p_resultado, @p_id_usuario, @p_nombre_usuario)`,

                ...user

            );

            // Consulta para obtener los valores de salida de las variables de MySQL
            const [resu] = await mysqlPromesa(`
    SELECT @p_exito AS exito, 
           @p_resultado AS mensaje_resultado, 
           @p_id_usuario AS id_usuario,
           @p_nombre_usuario AS nombre_usuario;
`);






            if (resu.id_usuario == null && resu.nombre_usuario == null) {
                //aqui entra solo si el correo ya habia sido registrado
                return {
                    error: true,
                    message: "This email has already been registered before, try another",

                }
            }

            return {
                error: false,
                message: "You have successfully registered",
                usuario: resu.nombre_usuario,
                id: resu.id_usuario
            }

        } catch (error) {
            return {
                error: true,
                message: error
            }
        }
    }



    static async login(correo, password) {
        try {


            await mysqlPromesa(`CALL login_usuario( ? , ?, @exito, @resultado, @id_usuario, @nombre, @apellido) `, [correo, password]);




            const [resu] = await mysqlPromesa(`SELECT @exito AS exito, 
                @resultado AS resultado,
                @id_usuario AS id_usuario,
                 @nombre AS nombre, 
                 @apellido AS apellido`)




            if (resu.exito == 0) {
                throw "Correo no registrado"
            }


            return {
                booleanSuccesLogin: resu.exito == 1 ? true : false,
                id: resu.id_usuario,
                usuario: resu.nombre
            }

        } catch (error) {
   
            return {
                booleanSuccesLogin: false,
                error: true,
                message: error
            }

        }
    }


    static async existEmail(email) {

        try {
            const boleano = await mysqlPromesa("")
            if (boleano) {

            }
        } catch (error) {
            console.log("hubo un error")


        }
    }

}