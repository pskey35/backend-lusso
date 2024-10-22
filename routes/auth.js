const e = require("express")
const express = require("express")



const router = express.Router()


const authToken = (req,res,next) =>{

    //esto es para el middleware y autenticar en los endpoints que se requiera
    console.log(req.headers)
    const token = req.headers["authorization"]


    if(!token){
        //si no hay token mandamos error
        return res.status(400).json({message:"Acceso denegado"})
    }

    next()
}



router.post("/login", authToken,(req, res) => {
    const { username, password } = req.body;


    //si el usuario coincide con la password entonces
    //devolvemos el jwt caso contrario no


    if (true) {
        //el id se genera de database 
        const token = jwt.sign({ id: 3, username:"pablito"}, "secretKey")

        return res.json({
            token:token,
            message:"Se ha logeado con exito",//llega esto y se hace redireccion en el frontend
            error:false
        })
    }

    res.json({ error: "usuario o password incorrecto" })


})


router.post("/register",(req,res)=>{
    const {user,password,telefono,address} = req.body


    //si existe el user en la databse mandarle un error porque 
    //no debe de haber mas de un usuario con el mismo nombre
    if(false){
        res.json({
            error:true,
            message:"Este usuario ya existe en la database prueba con otro nombre de usuario",

        })
        res.status(200);
        return
    }

 
    //hacer consulta de sql para recibir el id de tal usuario
    const token = jwt.sign({id:12,usuario:"juanito"},"secretKey")
    
    res.json()
})

module.exports = router