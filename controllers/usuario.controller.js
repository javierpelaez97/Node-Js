const Usuarios = require("../models/usuario.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

async function buscarTodos() {
  const usuarios = await Usuarios.find();
  return usuarios;
}

async function buscarTodosPorMail(mail){
  const usuarios = await Usuario.find({email: mail})
  return usuarios
}

async function busacarPorId(id) {
  const usuarioEncontrado = Usuarios.findById(id);
  return usuarioEncontrado;
}

async function crearUsuario(email, pwd) {
  const nuevoUsuario = new Usuarios({
    email: email,
    password: pwd,
  });
  await nuevoUsuario.save();
  return nuevoUsuario;
}
async function login(mail, pwd) {
  const usuarioEncontrado = await Usuarios.findOne({ email: mail }); //Buscamos el email
  if (usuarioEncontrado) {
    //Si el email esta bien debemos saber si la password también
    if (usuarioEncontrado.password === pwd) {
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
  busacarPorId,
  crearUsuario,
  login,
  buscarTodosPorMail
};
