const { icon, Icon, marker } = require('leaflet');
const { remote } = require('electron');
window.L = require('leaflet');

//////////////////////////////
/////// Varibales ///////////
var contenidoFila = Array();
let markerList = new Array();
let ListaPuntos = [];
let Punto = {
    "Nombre": '',
    "Cordenadas":[],
    "Calle": ''
};
////////////////////////////
////////// Mapa ///////////

var map = L.map('map').setView([43.338318, -1.788809], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


/// Crear puntos y añadirlos a un array
    map.on('click', function(e) {
        var opcion = confirm("¿Quieres guardar este punto? (Lat/Long: "+e.latlng.lat+" / "+e.latlng.lng+"", "Crear localización");
        if (opcion == true) {
            Punto ={
                "Nombre":"",
                "Cordenadas":[e.latlng.lat , e.latlng.lng],
                "Calle":""
            }
            ListaPuntos.push(Punto);
            crearTablaPuntos(Punto,ListaPuntos.length);
            addMarker(Punto.Cordenadas[0],Punto.Cordenadas[1],Punto.Nombre);
        }
    });

    
    function addMarker(Lat, Lng, Nombre){
        let marker = L.marker([Lat,Lng]).bindPopup(Nombre)     
        map.addLayer(marker);
        markerList.push(marker);
    }

    function deleteMarker(NumPunto){
        console.log("entrada deleteMarker, NumPunto="+NumPunto);
        for(i=0;i<=markerList.length;i++){
            console.log("for recorrer markerlist");
            if(NumPunto == i){
                console.log("entra en if "+NumPunto+" == "+i);
                var index = i-1;
                map.removeLayer(markerList[index])
                console.log("elimina marker");
                markerList.splice(index,1)
                console.log("elimina ListaPuntos");
                ListaPuntos.splice(index,1)
                console.log("termino deleteMarket");
            }
        }
    }
//////////////////////////////////////////
///////// Vista creación puntos /////////

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tablaPuntos").deleteRow(i);
    deleteMarker(i);
    console.log("-----------");
    console.log(i);
    console.log("ListaPuntos"+ListaPuntos+"-"+ListaPuntos.length);
    console.log("MarkerList"+markerList+"-"+markerList.length);
    console.log("-----------");
}


function crearTablaPuntos(Punto, Cantidad){
    
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<td>"+Punto.nombre+"</td>"+
                        "<td>"+Punto.Cordenadas[0]+"</td>"+
                        "<td>"+Punto.Cordenadas[1]+"</td>"+
                        "<td><input class='btn btn-warning' type='button' value='Modificar'></td>"+
                        "<td><input class='btn btn-danger' type='button' value='Eliminar' onclick='deleteRow(this,"+Cantidad+")'></td>"+
                    "</tr>";
    
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info text-center';
                        
}

/*function contenidoTabla(Punto, Cantidad){
    var Fila = "<tr>"+
                    "<th scope='row'>"+Cantidad.toString()+"</th>"+
                    "<td>"+Punto.nombre+"</td>"+
                    "<td>"+Punto.Cordenadas[0]+"</td>"+
                    "<td>"+Punto.Cordenadas[1]+"</td>"+
                    "<td><input class='btn btn-warning' type='button' value='Modificar' onclick=''></td>"+
                    "<td><input class='btn btn-danger' type='button' value='Eliminar' onclick='deleteRow(this)'></td>"+
                "</tr>";
    contenidoFila.push(Fila);
    crearTablaPuntos();               
}

function crearTablaPuntos(){
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    for(i=0;i<contenidoFila.length;i++){
        bodyTablaPuntos.insertRow().innerHTML = contenidoFila[i]; 
    }
    bodyTablaPuntos.className = 'table-info text-center';   
}*/

