const { remote, ipcRenderer } = require('electron');

//////////////////////////////
/////// Varibales ///////////
let ListaPuntos = [];
let Punto = {
    "Nombre": '',
    "Cordenadas":[],
    "Calle": ''
};

ipcRenderer.on('Datospuntos', (e,arg) =>{
    console.log(arg);
});

    


