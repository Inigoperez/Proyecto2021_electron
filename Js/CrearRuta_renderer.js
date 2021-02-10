window.L = require('leaflet');
const {ipcRenderer, ipcMain } = require('electron');


//////////////////////////////
/////// Varibales ///////////
var contenidoFila = Array();
let markerList = new Array();
let cordenadas = new Array();
let ListaPuntos = [];
let Punto = {
    "Nombre": "",
    "Cordenadas":[],
    "Descripcion": "",
    "Pregunta": "",
    "Respuesta1": "",
    "Respuesta2": "",
    "Respuesta3": "",
    "Solucion": 0
};
////////////////////////////
////////// Mapa ///////////

var map = L.map('map').setView([43.338318, -1.788809], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


/// Crear puntos y añadirlos a un array
    map.on('click', function(e) {
        cordenadas.push(e.latlng.lat);
        cordenadas.push(e.latlng.lng);
        Punto.cordenadas = cordenadas;
        ipcRenderer.send('iniciar-modal');
        var opcion = confirm("¿Quieres guardar este punto? (Lat/Long: "+e.latlng.lat+" / "+e.latlng.lng+"", "Crear localización");
        if (opcion == true) {

            ListaPuntos.push(Punto);
            
            crearTablaPuntos(Punto,ListaPuntos.length);
            addMarker(Cordenadas[0],Cordenadas[1],Nombre);
        }
        ipcRenderer.send('cerrar-modal');
    })

    document.querySelector('#guardar_ruta').addEventListener('click', () => {
        nombre = document.getElementById('InputNombreRuta').value
        duracion = document.getElementById('InputDuracion').value
        ciudad = document.getElementById('InputCiudad').value
        km = document.getElementById('InputKm').value
        puntos = document.getElementById('InputPuntos').value
        descripcion = document.getElementById('InputDescripcion').value
        
        AddRuta(nombre,duracion,ciudad,km,puntos,descripcion)
    })
    /*function crearPunto(){

        Punto.Nombre = document.getElementById("InputNombrePunto").value;
        Punto.Descripcion = document.getElementById("InputDescripcion").value;
        Punto.Pregunta = document.getElementById("InputPregunta").value;
        Punto.Respuesta1 = document.getElementById("InputRespuesta1").value;
        Punto.Respuesta2 = document.getElementById("InputRespuesta2").value;
        Punto.Respuesta3 = document.getElementById("InputRespuesta3").value;
        Punto.Solucion = document.getElementById("solucion").value;

        var opcion = confirm("¿Quieres guardar este punto? (Lat/Long: "+e.latlng.lat+" / "+e.latlng.lng+"", "Crear localización");
        if (opcion == true) {

            ListaPuntos.push(Punto);
            
            crearTablaPuntos(Punto,ListaPuntos.length);
            addMarker(Punto.Cordenadas[0],Punto.Cordenadas[1],Punto.Nombre);
        }
        ipcRenderer.send('cerrar-modal');
    }*/

    
    function addMarker(Lat, Lng, Nombre){
        let marker = L.marker([Lat,Lng]).bindPopup(Nombre)     
        map.addLayer(marker);
        markerList.push(marker);
    }

    function deleteMarker(NumPunto){
        for(i=0;i<=markerList.length;i++){
            if(NumPunto == i){
                var index = i-1;
                map.removeLayer(markerList[index])
                markerList.splice(index,1)
                ListaPuntos.splice(index,1)
            }
        }
    }
//////////////////////////////////////////
///////// Vista creación puntos /////////

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tablaPuntos").deleteRow(i);
    deleteMarker(i);
}


function crearTablaPuntos(Punto){
    
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<td>"+Punto.Nombre+"</td>"+
                        "<td>"+Cordenadas[0]+"</td>"+
                        "<td>"+Cordenadas[1]+"</td>"+
                        "<td><button class='btn btn-warning' onclick=\"window.location.href='ModalPunto.html'\">Modificar</button></td>"+
                        "<td><button class='btn btn-danger' onclick='deleteRow(this)'>Eliminar</button></td>"+
                    "</tr>";
    
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info text-center';
                        
}


////////////////////////////////////////
/////////// LLAMADAS API    ////////////
////////////////////////////////////////

/////   Añadimos una nueva ruta  a la BD  ///////

function AddRuta(nombre,duracion,ciudad,km,puntos,descripcion){
    const url = 'http://192.168.1.119:8080/rutas/add';
    var datos = "nombre="+nombre+"&duracion="+duracion+"&ciudad="+ciudad+"&km="+km+"&puntos="+puntos+"&descripcion="+descripcion;
    console.log(datos);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(datos);
}