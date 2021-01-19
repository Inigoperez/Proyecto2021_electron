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

let map = L.map('map').setView([43.338318, -1.788809], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function addMarker(Lat, Lng, Nombre){
        let marker = L.marker([Lat, Lng]).bindPopup(Nombre).openPopup();
        marker.addTo(map);
    }

/// Crear puntos y añadirlos a un array
    map.on('click', function(e) {
        var opcion = confirm("¿Quieres guardar este punto? (Lat/Long: "+e.latlng.lat+" / "+e.latlng.lng);
        if (opcion == true) {
            Punto ={
                "nombre":"",
                "Cordenadas":[e.latlng.lat , e.latlng.lng],
                "Calle":""
            }
            ListaPuntos.push(Punto);
            crearTablaPuntos(Punto,ListaPuntos.length);
            addMarker(Punto.Cordenadas[0],Punto.Cordenadas[1],Punto.Nombre);
            console.log(ListaPuntos);
        }
    });



//////////////////////////////////////////
///////// Vista creación puntos /////////

function crearTablaPuntos(Punto, Cantidad){
    
    let bodyTablaPuntos = document.getElementById("tablaPuntos").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<th scope='row'>"+Cantidad.toString()+"</th>"+
                        "<td>"+Punto.nombre+"</td>"+
                        "<td>"+Punto.Cordenadas[0]+"</td>"+
                        "<td>"+Punto.Cordenadas[1]+"</td>"+
                    "</tr>";
    
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info';
                        
}




/*
<tr class="table-info">
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
</tr>
<tr class="table-info">
    <th scope="row">2</th>
    <td>Jacob</td>
    <td>Thornton</td>
    <td>@fat</td>
</tr>
<tr class="table-info">
    <th scope="row">3</th>
    <td colspan="2">Larry the Bird</td>
    <td>@twitter</td>
</tr>*/