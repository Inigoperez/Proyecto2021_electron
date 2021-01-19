const { icon, Icon } = require('leaflet');

window.L = require('leaflet');

//////////////////////////////
/////// Varibales ///////////

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
            console.log(ListaPuntos);
        }
    });

    function addMarker(Lat, Lng, Nombre){
        L.marker([Lat,Lng]).addTo(map)
        .bindPopup(Nombre);        
    }

//////////////////////////////////////////
///////// Vista creación puntos /////////

function crearTablaPuntos(Punto, Cantidad){
    
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<th scope='row'>"+Cantidad.toString()+"</th>"+
                        "<td>"+Punto.nombre+"</td>"+
                        "<td>"+Punto.Cordenadas[0]+"</td>"+
                        "<td>"+Punto.Cordenadas[1]+"</td>"+
                        "<td><input class='btn btn-warning' type='button' value='Modificar'></td>"+
                        "<td><input class='btn btn-danger' type='button' value='Eliminar'></td>"+
                    "</tr>";
    
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info text-center';
                        
}