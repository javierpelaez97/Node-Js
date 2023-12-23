//Todas las librerias se usan solo en este proyecto.
const dotenv = require('dotenv').config()
const express = require('express')                          //Aquí estamos llamando a la framework Express
const bodyParser = require('body-parser')                   //Aqui estamos llamando a la framework body parser
const usuarioRouter = require('./routes/usuario.routes')    //Aqui estmaos llamando al archivo que hemos creado en la carpeta Routes
const productRouter = require('./routes/producto.routes')   //Aquí estamos llamando al archivo que hemos creado en la carpeta routes
const pedidoRouter = require('./routes/pedido.routes')
const mongoose = require('mongoose');                       //Aquí llamamos a la framework mongoose

/* --------------------------------------------------- */

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("secretKey", process.env.JWTSECRET)                   //Necesitamos crear una contraseña secreta y la guardamos en un fichero externo para guardarla

mongoose.connect(process.env.CONNECTIONSTRING,{        //Aquí estmos accediendo a nuestra BBDD en mongo atlas
    useNewUrlParser: true,                                                                                          //
    useUnifiedTopology: true,  
})
    
.then(()=> console.log('connected!'))                                                                     //Para que nos avise si nos hemos conectado  
.catch(err=> console.log('err'));                                                                         //Lanza un mensaje de error

//const productos =[{id: 5, nombre: 'lavadora', brand: 'bosh'}]

// BUENAS  PRACTICAS (GOOD PRACTICES)
// ARQUITECTURA LIMPIA (CLEAN ARCHICTECTURE)


app.use('/pedidos', pedidoRouter)
//IMPORTAR PRODUCTO ROUTES

app.use('/productos',productRouter)     // Para llamar a la ruta de productos como si fuera una libreria 
        // el enpoint de la ruta
//IMPORTAR USUARIO ROUTES

app.use('/usuarios',usuarioRouter)      // Para llamar a la ruta de productos como si fuera una libreria
        // el endpoint de la ruta
app.listen(process.env.PORT)            //Llamamos al pùerto en .env


// CRUD
/**
 * C: CREATE - POST
 * R: READ - GET
 * U: UPDATE - PUT/PATCH
 * D: DELETE - DELETE
 */