import xss from "xss"
import { User } from "../models/authModel.js"
import jwt from "jsonwebtoken"


export const registerControler = async (req, res) => {
    const userSano = xss(req.body.name.trim())
    const apellidoSano = xss(req.body.apellido.trim())
    const emailSano = xss(req.body.email.trim())
    const passwordSano = xss(req.body.password.trim())


    //esto de aca son opcionales
    const telefonoSano = xss(req.body.telefono.trim())
    const edadSano = xss(req.body.edad.trim())
    const direccionSano = xss(req.body.direccion.trim())
    const ciudadSano = xss(req.body.cuidad.trim())
    const departamentoSano = xss(req.body.departamento.trim())
    const paisSano = xss(req.body.paid.trim())
    const codigoPostalSano = xss(req.body.codigoPostal)



    const boleanoEmail = User.correoExist(emailSano)
    if (boleanoEmail) {
        //si el email ya estaba registrado en la database entra aqui
        return res.status(401).json({
            error: true,
            message: "Este email ya ha sido registrado prueba con otro"
        })
    }



    const { error, message } = User.isValid(userSano)

    if (error == false) {
        //si el nombre de usuario es valido entra aqui
        res.status(200).json({
            error,
            message,
        })
    } else {
        return res.status(401).json({
            error,
            message,
        })
    }



    const passwordValid = User.isValidPassword(passwordSano)

    if (passwordValid) {
        //si password es valido entonces se registra en la database 
        //y se le da un token jwt
        const {error,message,id,usuario} = User.registrar_usuario([userSano, apellidoSano,
            emailSano, passwordSano, telefonoSano, edadSano, direccionSano,
            departamentoSano, paisSano, codigoPostalSano
        ])


        const token = jwt.sign({id,usuario},"secretKey")
    
        return res.json({error,message,token})
    }





    //si no hay error entra aqui
    //hacer consulta de sql para recibir el id de tal usuario

    token = jwt.sign({ id: 12, usuario: "juanito" }, "secretKey")
    return res.status(200).json({
        error: false,
        token,
        message: "Se ha creado su cuenta exitosamente",
    })



}


const loginControler = (req, res) => {
    const { username, password } = req.body;

    const inputSanoUser = xss(req.body.username)
    const inputSanoPass = xss(req.body.password)


    //si el usuario coincide con la password entonces
    //devolvemos el jwt caso contrario no
    if (true) {
        //el id se genera de database 
        const token = jwt.sign({ id: 3, username: inputSanoUser }, "secretKey")

        return res.status(200).json({
            token: token,
            message: "Se ha logeado con exito",//llega esto y se hace redireccion en el frontend
            error: false
        })
    }

    res.json({ error: "usuario o password incorrecto" })
}


export default { registerControler, loginControler }