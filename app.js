const express = require("express")
const app = express()
const cors = require("cors")
const home = require("./routes/home")
const auth = require("./routes/auth")
app.use(express.json())
const path = require('path');
app.use(cors())
//crear el endpoint de autenticacion
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'))); 



app.use(home,auth)




app.listen(8000)