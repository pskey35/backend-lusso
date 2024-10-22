const express = require("express")
const app = express()

const home = require("./routes/home")
const auth = require("./routes/auth")

app.use(express.json())


//crear el endpoint de autenticacion

app.use(home,auth)




app.listen(8000)