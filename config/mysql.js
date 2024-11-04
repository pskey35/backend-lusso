import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,        // Cambia al host de tu base de datos
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, // Contraseña de la base de datos
  database: process.env.DATABASE_SCHEMA,    // Nombre de la base de datos a la que te conectarás
  waitForConnections: true,
  connectionLimit: 10000,  // Número máximo de conexiones en el pool
});



export const mysqlPromesa = (consulta, values) => {
  console.log(values)
  return new Promise((resolve, reject) => {
    connection.query(consulta, values, (err, query) => {
      if (err) {
        reject(err)
      }
      resolve(query)
    })
  })


}