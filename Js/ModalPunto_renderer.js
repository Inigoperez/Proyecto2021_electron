const { remote, ipcRenderer } = require('electron');

//////////////////////////////
/////// Varibales ///////////
let ListaPuntos = [];
let Punto = {
    "Nombre": '',
    "Cordenadas":[],
    "Calle": ''
};

function cargar(){
    console.log("error1");
    ipcRenderer.on('Datospuntos', (e,data) =>{
        console.log("error");
        console.log(data);
    });
    console.log("error2");
}


    


