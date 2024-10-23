import express from "express"
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"



const routerHome = express.Router()




routerHome.get("/", (req, res) => {
    res.json({
        saludo: "hola"
    })
})


routerHome.get("/allProducts", (req, res) => {
    const basePath = path.join(fileURLToPath(import.meta.url), '..', 'public'); // Ruta a la carpeta public
    const folders = ['producto-1', 'producto-2', 'producto-3']; // Nombres de las carpetas

    const products = folders.map(folder => {
        const folderPath = path.join(basePath, folder);
        const images = fs.readdirSync(folderPath).map(file => {
            return `/public/${folder}/${file}`; // Generar la URL para cada imagen
        });
        return { folder, images };
    });

    res.json(products); // Devolver las imágenes como JSON
})



export default routerHome 