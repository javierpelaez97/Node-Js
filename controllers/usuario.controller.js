const Usuarios = require("../models/usuario.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {encrptar, comprobar} = require('../helpers/encriptacion')

async function buscarTodos() {
  const usuarios = await Usuarios.find();
  return usuarios;
}

async function buscarTodosPorMail(mail){
  const usuarios = await Usuarios.find({email: mail})
  return usuarios
}
async function buscarUnoPorMail(mail){
  const usurioEncontrado = await Usuarios.findOne({email: mail})
  return usurioEncontrado
}
async function buscarPorId(id) {
  const usuarioEncontrado = Usuarios.findById(id);
  return usuarioEncontrado;
}

async function crearUsuario(email, pwd, rol) {
  const hash = await encrptar(pwd)
  const nuevoUsuario = new Usuarios({
    email: email,
    password: hash,
    rol:rol, 
  });
  await nuevoUsuario.save();
  return nuevoUsuario;
}
async function login(mail, pwd) {
  const usuarioEncontrado = await Usuarios.findOne({ email: mail }); //Buscamos el email
  if (usuarioEncontrado) {
    const resultadoComprobacion = await comprobar(usuarioEncontrado.password, pwd)
    //Si el email esta bien debemos saber si la password también
    if (resultadoComprobacion) {
      const token = jwt.sign(             //La funcion sign es para añadir un token de inicio de sesión con sus parametros
        {
          id: usuarioEncontrado._id,
          name: usuarioEncontrado.email,
        },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
      );

      return {
        usuario: usuarioEncontrado,
        token: token,
        msg: 'password incorrecto',
      };
    } else {
      return {
        usuario: null,
        token:null,
        msg: "email no encontrado",
      };
    }
  } else {
    return {
      usuario: null,
      token:null,
      msg: "email no encontrado",
    };
  }
}
module.exports = {
  buscarTodos,
  buscarPorId,
  crearUsuario,
  login,
  buscarTodosPorMail,
  buscarUnoPorMail
};
