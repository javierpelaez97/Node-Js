/** Aquí vamos a añadir todos los validadores  */

function validarCrearProducto(body){
    if (body.marca === undefined
        || body.marca.trim() === ""
        || body.nombre === undefined
        || body.nombre.trim() === "") {
        return{
            valido: false,
            mensaje: 'falta nombre o marca'
        }
    }else{
        return{
            valido: true,
            mensaje: null
        }
    }
}

 function validarCrearUsuarios(body){
    if(body.email === undefined || body.email.trim() === ""){    //Siempre debemos procurar que existe y comprobar si existe o está vacío
        return{
            valido: false,
            mensaje: 'error: email no proporcionado'
        }}
        else{
            return{
                valido: true,
                mensaje: ""
            }
        }
    } 



module.exports = {
    validarCrearProducto,
    validarCrearUsuarios 
}