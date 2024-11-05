import express from "express"
import {searchControler} from "./controller/searchControler.js"


export const router = express.Router()

router.get("/search",searchControler)

