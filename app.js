import express from "express"
import cors from "cors"
import authRouter from "./routes/authRouter.js"

//import search from "./routes/search.js"
import categoryRouter from "./routes/categoryRouter.js"
import dashboardRouter from "./routes/dashboardRouter.js"
import productsRouter from "./routes/productsRouter.js"
import imagesRouter from "./routes/imageRouter.js"
import cartShopRouter from "./routes/cartShopRouter.js"
import path from "node:path"
import { fileURLToPath } from 'url';

import dotenv from "dotenv"




const app = express()

dotenv.config();
app.use(express.json())
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));



app.use(authRouter, imagesRouter,dashboardRouter)
app.use(categoryRouter,productsRouter,cartShopRouter)


const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log("corriendo en el puerto", PORT))