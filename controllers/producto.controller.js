// Esto lo que hace es atacar a la base de datos y no routes

const Producto = require('../models/producto.model')

/* Necesitamos añadirtantas funciones  aqui todo lo que vamos a hacer con la base de datos
añadir un producto, buscar un producto,buscar todos los productos*/ 

//Función para buscar todos los productos
async function buscarTodos(){
    const productos = await Producto.find()
    return productos
}

async function buscarTodosQueContengan(palabra){
    const productos = await Producto.find({nombre:{"$regex":palabra,"$options": "i"}})
    return productos
}

//Función para buscar un prodcucto por ID

async function buscarPorId(id){
    const productoEncontrado = await Producto.findById(id)
    return productoEncontrado
}
async function crearProducto(nom, mar, mod){
    const nuevoProducto = new Producto({
        nombre: nom,
        marca: mar,
        modelo: mod,
    })
    await nuevoProducto.save()
    return nuevoProducto
}

async function eliminarProducto(id){
    const productoBorrado= await Producto.findByIdAndDelete(id)
    return productoBorrado
}

async function modificarProducto(id, nom, mar, mod){
    //inportate findByIdAndUpdate me devuelve el objeto antiguo
    const productoModificar = await Producto.findByIdAndUpdate(id,{nombre: nom, marca: mar, modelo: mod })
    return productoModificar
}



module.exports = {
    buscarTodos,
    buscarPorId,
    crearProducto,
    eliminarProducto,
    modificarProducto,
    buscarTodosQueContengan
}