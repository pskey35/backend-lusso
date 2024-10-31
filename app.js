import express from "express"

import cors from "cors"
import home from "./routes/routerHome.js"
import auth from "./routes/auth.js"
import path from "path"
//import search from "./routes/search.js"
import dashboard from "./routes/dashboard.js"

import { fileURLToPath } from 'url';
import dotenv from "dotenv"
import images from "./routes/images.js"





const app = express()

dotenv.config();
app.use(express.json())
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));



app.use(home, auth, images,dashboard)



const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log("corriendo en el puerto", PORT))