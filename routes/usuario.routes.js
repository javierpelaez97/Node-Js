const express = require("express"); //tambien lo tenemos que usar en los ficheros que creemos

const router = express.Router(); //Es una función de express

const {
  buscarTodos,
  busacarPorId,
  crearUsuario,
  login
} = require("../controllers/usuario.controller");


const{middlewareCrearUsuario, middlewareEmailValido, estaLogeado, esAdmin}= require("../middleware/usuario.middleware")
//PARA CONSULTAR TODOS LOS USUARIOS

router.get("/", async (req, res) => {
  //Solo tenemos una / por que la llamamos en Index en app.use
  try {
    let usuarios =[]
    if(req.query.email){
      usuarios = await buscarTodosPorMail(req.query.email)
        }
        else{
            usuarios = await buscarTodos()      // Buscamos en la libreria Usuario arriba declarada
        } 
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

//BUSCAR UN USUARIO

router.get("/:id", async (req, res) => {
  try {
    const usuarioEncontrado = await busacarPorId(req.params.id); // Buscamos el usuario y lo asignanmos a usuarioEncontrado
    if (usuarioEncontrado) {
      res.json(usuarioEncontrado);
    } else {
      res.status(404).json({ msg: "error: usuario no encontado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});


//PARA CREAR UN USUARIO

router.post("/", middlewareCrearUsuario, middlewareEmailValido, async (req, res) => {   //Debemos seguir un orden dentro de los middleware según la restricción
  //.valido es el resultado que nos da la funcion creada en validadores
  try {
    await crearUsuario(req.body.email.trim(), req.body.password);         // Al ser la lnea mas critica debemos meterla en el try catch
  } catch (error) {
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
  res.json({ msg: "usuario creado" });
});

router.post("/login",async (req,res)=>{
  try{
    const resultado = await login( req.body.email, req.body.password)
    res.json({token: resultado.token, msg: resultado.msg})
  }catch(error){
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
})
router.get("/zona-privada/perfil/:id", estaLogeado , async(req,res)=>{                //Para entrar a un perfil en especifico
  const usuarioEncontrado = await buscarPorId(req.params.id)                          //Busca por id el usuaerio que hemos pasado
  res.json({msg: 'bienvenido a tu perfil '+ usuarioEncontrado.email})
})


router.get("/zona-admin/home",esAdmin,async(req,res)=>{
  res.json({msg: 'hola admin!'})
})

module.exports = router;
