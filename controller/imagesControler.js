import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv';
dotenv.config();

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const handlerImages = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "josue" }, // Opcional: puedes especificar una carpeta
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        
            stream.end(req.file.buffer); // Aquí enviamos el buffer directamente
        });

        res.status(200).json({message:"valid", result})


    } catch (error) {
        console.log("hubo un error...")
        console.log(error)
        res.status(400).json({ message: "error" })
    }
}


