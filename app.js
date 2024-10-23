import express from "express"
import cors from "cors"
import home from "./routes/routerHome.js"
import auth from "./routes/auth.js"
import path from "path"
import { fileURLToPath } from 'url';

const app = express()


app.use(express.json())
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));



app.use(home, auth)




app.listen(8000)