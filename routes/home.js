const express = require("express")
const firebase = require("firebase/compat/app");
require("firebase/compat/storage");
const fs = require("fs")
const path = require('path');


const routerHome = express.Router()




routerHome.get("/",(req,res)=>{
    res.json({
        saludo:"hola"
    })
})


routerHome.get("/allProducts",(req,res)=>{
    const basePath = path.join(__dirname, '..', 'public'); // Ruta a la carpeta public
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

module.exports = routerHome