import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"


export function homeFunction(req, res) {
    return res.json({ prueba: "saludo" })
}


export function allProductFunction(req, res) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    const basePath = path.join(__dirname, '..', 'public');  // Ruta a la carpeta public
    const folders = ['producto-1', 'producto-2', 'producto-3']; // Nombres de las carpetas

    const products = folders.map(folder => {
        const folderPath = path.join(basePath, folder);
        const images = fs.readdirSync(folderPath).map(file => {
            return `/public/${folder}/${file}`; // Generar la URL para cada imagen
        });
        return { folder, images };
    });

    res.json(products); // Devolver las imágenes como JSON
}


