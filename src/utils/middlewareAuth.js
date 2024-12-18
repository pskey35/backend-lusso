import jwt from "jsonwebtoken"
//este middelware servira para proximos endpoints
export const authToken = (req, res, next) => {

    //esto es para el middleware y autenticar en los endpoints que se requiera
    console.log(req.headers)
    const token = req.headers["authorization"].split(" ")[1]

    if (!token) {
        //si no hay token mandamos error
        return res.status(400).json({ message: "Acceso denegado" })
    }



    jwt.verify(token,"secretKey",(err,decode)=>{
    
        if(err){
            return res.status(401).json({error:"Token invalid"})
        }else{
            next()
        }
    })



    next()
}



