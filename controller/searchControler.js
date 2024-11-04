import {mysqlPromesa} from "../config/mysql.js"


//aqui se maneja toda la busqueda
export const searchControler = async (req, res) => {
    const textSearch = req.query.textSearch
    const size = req.query.size || 7
    const page = req.query.page || 1 //esto pasa a la derecha si es falsy


    //con la busqueda que hace el usuario se tiene que traer todos los datos que 
    //coincidan de la database con el texto "polera", usar offsetop y like en database
    //aqui morty me dara un procedure stored


    //retornar nombreProducto,id,imagen url,categoria producto
    
}

