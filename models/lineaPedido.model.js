const mongoose = require('mongoose')            // Requerimos mongoose


const Schema = mongoose.Schema                  //Para importar Schema de Mongoose

const pedidoSchema = new Schema({                 // Definimos y creamos el Schema
    comprador:{
        type:mongoose.Types.ObjectId,
        ref: "usuarios",
        required: true,
    },
    producto:{
        type: mongoose.Types.ObjectId,
        ref:"productos",
        required:true,
    },
    unidades:{
        type: Number,
        required: true,
    }
})

const LineaPedido = mongoose.model('lineasPedido', lineaPedidoSchema)    //Le decimos a mongoose que enlace el esquema de producto con mi producto

module.exports = LineaPedido