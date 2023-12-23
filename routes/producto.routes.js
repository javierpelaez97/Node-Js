/** En este documento tenemos que meter todos los get y post de los productos de nuestra BBDD, con  GET y POST */

const express = require('express')

const router = express.Router()

const {buscarTodos, buscarPorId, crearProducto, eliminarProducto, modificarProducto,buscarTodosQueContengan} = require('../controllers/producto.controller') // Lo que hacemos es ir abuscar la función en controllers

const {validarCrearProducto} = require('../helpers/validadores')

router.get("/", async (req, res) => {                               //Debemos hacer una llamad async por que al conectarnos a una base de datos no sabemos el tiempo de respuesta
    try{
        let productos=[]
        if (req.query.nombreContiene || req.query.marcaContiene) {
            const nombre = req.query.nombreContiene ? req.query.nombreContiene : ""
            const marca = req.query.marcaContiene ? req.query.marcaContiene : ""
            productos = await buscarTodosQueContengan(nombre, marca)      // LLamamos a la función en la carpeta producto.controller
        }else{
            productos = await buscarTodos()                           // LLamamos a la función en la carpeta producto.controller
        }
         
        res.json(productos)
    }catch (error){
        res.status(500).json({ msg: 'error interno' })
    }
    
})

router.get("/:id", async (req, res) => {
    try{
        const objetoEncontrado = await buscarPorId(req.params.id)               // Esto es un filtro por ID en la base de datos es un método
        if (objetoEncontrado) {
            res.json(objetoEncontrado)
        }
        else {
            res.status(404).json({ msg: 'error: producto no encontado' }) 
        }

    }catch(error){
        res.status(500).json({ msg: 'error interno' })
    }
    
})

router.post("/", async (req, res) => {
    // Generar el objeto
     await crearProducto(
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())

    res.json({ msg: 'producto creado correctamente' })
})

router.delete("/:id", async (req, res) => {
    const productoBorrado = await eliminarProducto(req.params.id)
    //equivale a comparar con !== undefined && productoBorrado !== null
    if (productoBorrado) {
        res.json({ msg: 'producto borrado!' })
    }
    else {
        res.json({ msg: 'error: producto no encontrado' })
    }
})

// CRUD
/**
 * C: CREATE - POST
 * R: READ - GET
 * U: UPDATE - PUT/PATCH
 * D: DELETE - DELETE
 */

router.put("/:id", async (req, res) => {
    let encontrado = null
    let msg = []
    // tengo que comprobar que todos los atributos que se pueden tocar, vienen al completo
    const resultadoValidacion = validarCrearProducto(req.body)
    if(!resultadoValidacion.valido){
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    } else {
        //encontrado = await Producto.findByIdAndUpdate(req.params.id, req.body)
        encontrado = await modificarProducto(
            req.params.id, 
            req.body.nombre.trim(), 
            req.body.marca.trim(),
            req.body.modelo.trim())

        res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })
    }

})

// MVC

router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    // solamente varío los atributos que yo considero que se podrían tocar
    encontrado = await modificarProducto(
        req.params.id,
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())

    res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })

})

module.exports = router   // nos sirve para hacer que este código salga y pase a formar parte de otro fichero y necesitamos indicarle que queremos que salga

