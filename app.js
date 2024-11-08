import express from "express"
import cors from "cors"
import auth from "./routes/auth.js"
import path from "path"
//import search from "./routes/search.js"
import dashboard from "./routes/dashboard.js"
import products from "./routes/productos.js"

import { fileURLToPath } from 'url';
import dotenv from "dotenv"
import images from "./routes/images.js"
import categoriaRouter from "./routes/categoriaRouter.js"





const app = express()

dotenv.config();
app.use(express.json())
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));



app.use( auth, images,dashboard,categoriaRouter,products)



const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log("corriendo en el puerto", PORT))