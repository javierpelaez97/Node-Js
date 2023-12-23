const http = require("http"); //Creamos una variable que llame a una libreria HTTP que ya está creada precargada por Node

const port = 3000; // asignamos a una variable el puerto que queremos usar para el servidor

function answer(req, res) {
  //Creamos una función que tenga una llamada y una respuesta
  console.log(req.url); //req. s la pregunta que se está mandadno desde el navegador donde queremos acceder

  /* if(req.url === '/productos'){        // Con este if hacemos varias condiciones segun la llamda vamos a dar una respuesta
        res.end('hola')                 // devuelve la respuesta en texto "Plano"
   }else if (req.url === '/usuarios'){
        res.end('adios')                //
   }else{
        res.end('Página no encontrada')
   } */

  res.setHeader("Content-Type", "application/json");

  if (req.url === "/usuario") {

    res.end(JSON.stringify({ nombre: "javier", dni: "765234523C" })); //Pasamos la respuesta de JSON a string con ese método

  } else if (req.url === "/productos") {
        res.end(JSON.stringify([
            {
                id: 1,
                nombre: 'lavadora'
            },
            {
                id: 2,
                nombre: 'microondas'
            }
        ]))
  }else{
    res.end('ruta no encontrada')
  }
}

const server = http.createServer(answer); //creamos una variable server que nos guardará la creación del server

server.listen(port, () => {
  //creamos una función que llame al server creado y le decimos que lo escuche, le asignamos el puerto.
  console.log(`Ya está el servidor funcionando en el puerto ${port}`);
});
