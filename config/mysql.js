import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

export const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,        // Cambia al host de tu base de datos
  port: process.env.DATABASE_PORT,    
  user: process.env.DATABASE_USER,   
  password: process.env.DATABASE_PASSWORD, // Contraseña de la base de datos
  database: process.env.DATABASE_SCHEMA     // Nombre de la base de datos a la que te conectarás
});

