//en el authToken se maneja lo que vendria a ser todo sobre autenticacion del usuario
import express from "express"
import controler from "../controller/authControler.js"
import {authToken} from "../utils/middlewareAuth.js"
//aqui no se neceista el authToken

const routerAuth = express.Router()


routerAuth.post("/login",controler.loginControler)

routerAuth.post("/register",controler.registerControler)




routerAuth.post("/forgot-password",authToken,controler.forgotPassword)
//reset password
//change password



/*si se quiere reseat el password entonces seria primero el usuario
da click en resetear su password luego en el backend se llega esa peticion y se le envia algo 
al correo un codigo como tal para reiniciar su password
*/
export default routerAuth
