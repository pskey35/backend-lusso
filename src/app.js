import path from "node:path"
import { fileURLToPath } from 'node:url';

import express from "express"
import cors from "cors"

import authRouter from "./routes/authRouter.js"
import categoryRouter from "./routes/categoryRouter.js"
import dashboardRouter from "./routes/dashboardRouter.js"
import productsRouter from "./routes/productsRouter.js"
import imagesRouter from "./routes/imageRouter.js"



import swaggerUi from "swagger-ui-express"

//importing json in ESM6
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../openapi.json");


// dotenv only work on localhost but not in vercel when you deploy
//import dotenv from "dotenv"
//dotenv.config();


const app = express()
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(cors())

//serve files statics from folder "public"
app.use(express.static(path.join(fileURLToPath(import.meta.url), 'public')));


//routes
app.use(authRouter, imagesRouter, dashboardRouter)
app.use(categoryRouter, productsRouter)


export default app