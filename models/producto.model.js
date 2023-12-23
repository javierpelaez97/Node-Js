const mongoose = require('mongoose')            // Requerimos mongoose

const Schema = mongoose.Schema                  //Para importar Schema de Mongoose

const productoSchema = new Schema({                 // Definimos y creamos el Schema
    nombre: {                                       // Definimos el producto
        type:String,                                //Tipo del nombre producto
        required: true,                             //Restricciones 
    },
    marca:{
        type: String,
        required: true,
    },
    modelo:{
        type: String,
        required: false,
    }
})

const Productos = mongoose.model('productos', productoSchema)    //Le decimos a mongoose que enlace el esquema de producto con mi producto

module.exports = Productos