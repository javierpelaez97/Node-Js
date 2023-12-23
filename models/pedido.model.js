const mongoose = require('mongoose')            // Requerimos mongoose


const Schema = mongoose.Schema                  //Para importar Schema de Mongoose

const pedidoSchema = new Schema({                 // Definimos y creamos el Schema
    comprador:{
        type:mongoose.Types.ObjectId,
        ref: "usuarios",
        required: true,
    },
    lineaPedido:[{                          //para poder meter varios pedido debemos crear un array de objetos
        type: mongoose.Types.ObjectId,
        ref:"lineasPedido",
        required:true,
    }],
    
})

const Pedido = mongoose.model('pedidos', pedidoSchema)    //Le decimos a mongoose que enlace el esquema de producto con mi producto

module.exports = Pedido