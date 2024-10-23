//este middelware servira para proximos endpoints
export const authToken = (req, res, next) => {

    //esto es para el middleware y autenticar en los endpoints que se requiera
    console.log(req.headers)
    const token = req.headers["authorization"]


    if (!token) {
        //si no hay token mandamos error
        return res.status(400).json({ message: "Acceso denegado" })
    }

    next()
}
