import xss from "xss"
import { User } from "../models/authModel.js"
import jwt from "jsonwebtoken"
import authValidator from "../utils/authValidator.js"




const registerController = async (req, res) => {
    const nombreSano = xss(req.body.name.trim())
    const apellidoSano = xss(req.body.apellido.trim())
    const emailSano = xss(req.body.email.trim())
    const passwordSano = xss(req.body.password.trim())
    const edadSano = xss((req.body.edad));

    if (!nombreSano || !apellidoSano || !emailSano || !passwordSano || !edadSano) {
        console.log("waza")
        return res.status(401).json({ error: true, 
            message: "Complete all the fields - name,lastName, password, age, email" })
    }

    //esto de aca son opcionales
    const telefonoSano = xss((req.body?.telefono || "").trim());
    const direccionSano = xss((req.body?.direccion || "").trim()); // Se agrega el manejo de undefined
    const ciudadSano = xss((req.body?.ciudad || "").trim()); // Se agrega el manejo de undefined
    const departamentoSano = xss((req.body?.departamento || "").trim()); // Se agrega el manejo de undefined
    const paisSano = xss((req.body?.pais || "").trim()); // Se agrega el manejo de undefined
    const codigoPostalSano = xss(req.body?.codigoPostal || ""); // Se agrega el manejo de undefined



    const { error, message } = authValidator.isValidName(nombreSano)

    if (error) {
        //si el nombre de usuario no es valido entra aqui
        return res.status(401).json({
            error,
            message,
        })
    }




    const { isValidPasswordBoolean, messageAuthValidator } = authValidator.isValidPassword(passwordSano)

    if (isValidPasswordBoolean) {
        console.log("entro aqi")
        //si password es valido entonces se registra en la database 
        //y se le da un token jwt al usuario
        const { error, message, id, usuario } = await User.register(
            [nombreSano, apellidoSano, emailSano,
                passwordSano, telefonoSano, edadSano,
                direccionSano, ciudadSano, departamentoSano,
                paisSano, codigoPostalSano
            ])


        if (error) {
            //si hay error por ejemplo al haber 2 emails iguales en datbase entra aqui
            return res.status(404).json({ error, message })
        } else {
            const token = jwt.sign({ id, usuario }, "secretKey")

            return res.status(200).json({ error, messageAuthValidator, token })
        }



    } else {
        return res.status(401).json(
            {
                messageAuthValidator,
                error: true
            }
        )
    }


}


const loginController = async (req, res) => {
    const { correo, password } = req.body;

    const inputSanoUser = xss(correo)
    const inputSanoPassword = xss(password)


    const { booleanSuccesLogin, id, usuario, message } = await User.login(inputSanoUser, inputSanoPassword)

    if (booleanSuccesLogin) {


        const token = jwt.sign({ id, usuario }, "secretKey")

        return res.status(200).json({
            token: token,
            message: "You have logged in successfully",//llega esto y se hace redireccion en el frontend
            error: false,

        })
    } else {
        return res.status(404).json({
            error: true,
            message
        })
    }

}


const forgotPassword = async (req, res) => {
    const email = xss(req.body.correo)



    //en el backend se tiene que verificar si ese email existe


    if (await User.existEmail(email)) {
        //si el correo existe en la database entonces entra aqui
        const token = jwt.sign({ email }, "secretKey", { expiresIn: "5m" })
        const sendEmailToken = `https://localhost:8000/reset-password?token=${token}`



        //se necesita configurar un email en donde se envie el sendEmailToken y 
        //y el usuario desde ahi entrara
        //enviamos al correo del usuario este token (falta esto)


        res.json({
            error: false,
            message: "se ha enviado un codigo de verificacion a tu email"
        })
    }

    //y se redirige a tal ruta especial 
}


export default { registerController, loginController, forgotPassword }