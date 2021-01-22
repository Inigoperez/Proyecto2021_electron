const {ipcRenderer } = require('electron');

//////////////////////////////
/////// Varibales ///////////
let ListaPuntos = [];
let Punto = {
    "Nombre": '',
    "Cordenadas":[],
    "Calle": ''
};

var botonGuardar = document.getElementById("guardarPunto");
botonGuardar.addEventListener('click', function(){
    guardarPunto();
})

function guardarPunto(){

    let Nombre = document.getElementById("InputNombrePunto").value;
    let Descripcion = document.getElementById("InputDescripcion").value;
    let Pregunta = document.getElementById("InputPregunta").value;
    let Respuesta1 = document.getElementById("InputRespuesta1").value;
    let Respuesta2 = document.getElementById("InputRespuesta2").value;
    let Respuesta3 = document.getElementById("InputRespuesta3").value;
    
    console.log(Nombre,Descripcion,Pregunta,Respuesta1,Respuesta2,Respuesta3);
    ipcRenderer.send('datos-ruta',[Nombre,Descripcion,Pregunta,Respuesta1,Respuesta2,Respuesta3]);
    ipcRenderer.send('cerrar-modal');
    
}




    


