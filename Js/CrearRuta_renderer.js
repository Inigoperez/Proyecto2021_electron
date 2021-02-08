window.L = require('leaflet');
const {ipcRenderer, ipcMain } = require('electron');


//////////////////////////////
/////// Varibales ///////////
var contenidoFila = Array();
let markerList = new Array();
let cordenadas = new Array();
let ListaPuntos = [];
let idPunto;
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
        /*
        -LLAMADA A LA API
        -INSERTAMOS EL NUEVO PUNTO Y LE ADJUDICAMOS LAS CORDENADAS
        -DEVOLVEMOS LA ID DEL PUNTO CREADO ANTERIORMENTE 

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                name: "Taylor",
                surname: "Swift"
            }),
            headers: {
                "Content-type": "application/json"
            })
      .then(response => response.json())
      .then(json => console.log(json))

        */
       ipcRenderer.send('envio-cordenadas',cordenadas);
       ipcRenderer.send('iniciar-modal');

        /*var opcion = confirm("¿Quieres guardar este punto? (Lat/Long: "+e.latlng.lat+" / "+e.latlng.lng+"", "Crear localización");
        if (opcion == true) {
            Punto ={
                "Nombre": 
                "Cordenadas":[e.latlng.lat , e.latlng.lng],
                "Calle":""
            }
            ListaPuntos.push(Punto);
            crearTablaPuntos(Punto,ListaPuntos.length);
            addMarker(Punto.Cordenadas[0],Punto.Cordenadas[1],Punto.Nombre);
        }*/
    });

    
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


function crearTablaPuntos(Punto, Cantidad){
    
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<td>"+Punto.Nombre+"</td>"+
                        "<td>"+Punto.Cordenadas[0]+"</td>"+
                        "<td>"+Punto.Cordenadas[1]+"</td>"+
                        "<td><button class='btn btn-warning' onclick=\"window.location.href='ModalPunto.html'\">Modificar</button></td>"+
                        "<td><button class='btn btn-danger' onclick='deleteRow(this)'>Eliminar</button></td>"+
                    "</tr>";
    
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info text-center';
                        
}

//////////////////////////////////////////
////////////////// Menú //////////////////

function ViewListaRutas(view){
    ipcRenderer.send('Vista',view);
}