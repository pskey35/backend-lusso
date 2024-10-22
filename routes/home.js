const express = require("express")

const routerHome = express.Router()


routerHome.get("/",(req,res)=>{
    res.json({
        saludo:"hola"
    })
})

module.exports = routerHome