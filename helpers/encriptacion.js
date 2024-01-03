const bcrypt = require('bcryptjs')


/**
 * 
 * @param {string} pwd contraseña en claro
 * @returns el hash
 */

async function encrptar(pwd){
    const salt = await bcrypt.genSalt(12)
   const hash =  await bcrypt.hash(pwd , salt)
   return hash
}

/**
 * 
 * @param {string} hash recuperado de la base de datos
 * @param {string} pwd es la contraseña que el usuario está intentando
 * @returns 
 */

async function comprobar(){
 const resultado = await bcrypt.compare(pwd, hash)
 return resultado
}

module.exports = {
    encrptar,
    comprobar,
}