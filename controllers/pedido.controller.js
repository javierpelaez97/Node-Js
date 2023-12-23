const Pedido = require('../models/pedido.model')

async function obtenerTodosReducidos(){
    const pedidos = await Pedido.find().populate('producto').populate('comprador','-password -__v')  //.populate es para "poblar" una colección y le podemos decir lo que no queremos que nos devuelva
    return pedidos
}
async function obtenerTodosCompletos(){
    const pedidos = await Pedido.find().populate('producto').populate('comprador')  //.populate es para "poblar" una colección y le podemos decir lo que no queremos que nos devuelva
    return pedidos
}

async function crearPedido(usuario,producto,cantidad){
    const nuevoPedido = new Pedido({
        comprador : usuario,
        producto: producto,
        unidades: cantidad
    })
    await nuevoPedido.save()
    return nuevoPedido
}

module.exports={
    obtenerTodosReducidos,
    obtenerTodosCompletos,
    crearPedido,
}
