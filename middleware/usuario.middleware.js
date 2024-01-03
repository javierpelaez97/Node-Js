const{validarCrearUsuarios} = require("../helpers/validadores")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {buscarPorId, buscarUnoPorMail} = require('../controllers/usuario.controller')

function middlewareCrearUsuario(req, res, next) {
    const resultadoValidacion = validarCrearUsuarios(req.body);
    if (resultadoValidacion.valido) {
      next(); // es una función de express que me permite saltar al siguiente middlleware
    } else {
      res.status(400).json({ msg: resultadoValidacion.mensaje }); //.mensaje también nos lo proporciona la funcion en validadores
    }
  }

function middlewareEmailValido(req,res,next){
  if(req.body.email.includes("@")){
    next()
  }else{
    res.status(400).json({msg:"error: email no es correcto"})
  }
 }
function estaLogeado(req,res,next){
  if(req.query.token){
    try{
      const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
      if(resultado.id === req.param.id){
        next()
      }else{
        res.status(403).json({msg: "No tines permiso para acceder"})
      }
      next()
    }catch(error){
      res.status(401).json({msg:"Token no válido"})
    }
      
  }else{
    res.status(400).json({msg:"error: email no es correcto"})
  }
}
async function esAdmin(req,res,next){
  if(req.query.token){

    try{
        const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
        const usuarioEncontrado = await buscarPorId(resultado.id)
        if(usuarioEncontrado.rol === "admin"){
            next()
        }
        else{
            res.status(403).json({msg: "no tienes permiso para acceder a este recurso"})
        }
       
    }catch(error){
        res.status(401).json({msg: "token no valido"})
    }
}
else{
    res.status(400).json({msg: "no has proporcionado token"})
}
}

async function esEmailDuplicado(req, res, next){
  const usuarioMismoMail = await buscarUnoPorMail(req.body.mail)
  if(usuarioMismoMail){
    res.status(400).json({msg: "email duplicado"})
  }else{
    next()
  }
}


module.exports= {
    middlewareCrearUsuario,
    middlewareEmailValido,
    estaLogeado,
    esAdmin,
    esEmailDuplicado
}