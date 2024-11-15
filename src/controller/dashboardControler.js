import { v2 as cloudinary } from "cloudinary"
import xss from "xss"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/*
 el dashboard debe tener 
 //categoria, producto, imagen productos, banners, agregar admins

 se debe de crear un endpoint donde se reciba el file,categoria, nombreProducto,
 imagen productos(solo url despues de haber subido a cloudinary)
 primero subimos  a cloudinary luego esa url obtenida la subimos a database
 */


export const dashboardController = async (req, res) => {

    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "josue" }, // Opcional: puedes especificar una carpeta
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            console.log(req.file)
            stream.end(req.file.buffer); // Aquí enviamos el buffer directamente
        });


        const categoria = xss(req.body.categoria)
        const nombreProducto = xss(req.body.nombreProducto)
        const urlImageUploaded = result.url 
        
        res.status(200).json({ message: "valid",categoria,nombreProducto,urlImageUploaded})


    } catch (error) {
        console.log("hubo un error...")
        console.log(error)
        res.status(400).json({ message: "error" })
    }
}

