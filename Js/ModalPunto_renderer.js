const { remote, ipcMain, ipcRenderer } = require('electron');

//////////////////////////////
/////// Varibales ///////////
let ListaPuntos = [];
let Punto = {
    "Nombre": '',
    "Cordenadas":[],
    "Calle": ''
};

ipcMain.on('envio-cordenadas', (e,data) => {
    console.log(data)
});



    


