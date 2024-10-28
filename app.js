import express from "express"
import cors from "cors"
import home from "./routes/routerHome.js"
import auth from "./routes/auth.js"
import path from "path"
import { fileURLToPath } from 'url';
import dotenv from "dotenv"
import images from "./routes/images.js"
import { connection } from "./config/mysql.js"


connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


const app = express()

dotenv.config();
app.use(express.json())
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));



app.use(home, auth, images)



const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log("corriendo en el puerto", PORT))