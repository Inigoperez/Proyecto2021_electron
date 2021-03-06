// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, webContents, ipcRenderer} = require('electron')
const path = require('path')

let IDpunto;

var LoginWindow;
function LoginWindow (){
  LoginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable:true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })
  LoginWindow.loadFile('Pages/Login.html')
}

var CreateRouteWindow ;
function CreateRoutesWindow() {
  CreateRouteWindow = new BrowserWindow({
    width: 900,
    height: 700,
    maximizable:true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })
  CreateRouteWindow.loadFile('Pages/Creacion_de_rutas.html')
}

var RouteList;
function ListRouteWindow() {
  RouteList = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable:true,
    contextIsolation: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  });
  RouteList.loadFile('Pages/Lista_de_rutas.html');
}

var ModalCrearRuta;
function ModalPunto(){
    ModalCrearRuta = new BrowserWindow({
      title: 'Datos de ruta',
      modal: true,
      width: 800,
      height: 600,
      alwaysOnTop:true,
      contextIsolation: false,
      parent: CreateRouteWindow,
      webPreferences:{
        nodeIntegration: true,
      }
    });
    ModalCrearRuta.loadFile('Pages/ModalPunto.html');
}

///// Iniciamos la aplicación /////
app.whenReady().then(() => {
  LoginWindow()  
})

//// Abrimos el modal ////
ipcMain.on('iniciar-modal', (e,datos) =>{
    ModalPunto()
})

ipcMain.on('cerrar-modal', (e,datos)=>{
 ModalCrearRuta.close();
})

///// Cerramos la aplicación ///////
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
