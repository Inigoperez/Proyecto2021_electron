var div_tablaRuta = document.getElementById('tabla_ruta');
var div_editRuta = document.getElementById('edit_ruta');

/////   AL cargar la página visibiliza el div donde se muestra la lista de rutas, carga de la BD las rutas existentes y crea la tabla utilizando la funcion SacarRutas()  /////

function onload(){
    div_tablaRuta.style.display = "block";
    div_editRuta.style.display = "none";
    SacarRutas();
}

/////   Visibiliza el div de editar y esconde la tabla de rutas. Saca los datos de la ruta seleccionada y inserta los valores en el formulario como placeholder /////

function Editar(id){
    div_tablaRuta.style.display = "none";
    div_editRuta.style.display = "block";
    SacarDatosRuta(id);
}

/////   La función rellena los campos del formulario de edición de ruta /////

function rellenarForm(Ruta){
    document.getElementById('ID_ruta').innerHTML = Ruta.id;    
    document.getElementById('InputNombreRuta').value = Ruta.nombre;
    document.getElementById('InputDuracion').value = Ruta.duracion;
    document.getElementById('InputCiudad').value = Ruta.ciudad;
    document.getElementById('InputDescripcion').value = Ruta.descripcion;
    document.getElementById("InputPuntos").value = Ruta.puntos;
    document.getElementById("InputKm").value = Ruta.km;

 }

/////   Al pulsar el boton de eliminar ruta, como ya tiene la ID de esta llama a la función de EliminarRuta() y esta hace la llamada a la API para borrarla /////

function Eliminar(id){
    EliminarRuta(id);
    window.location.href = "../Pages/Lista_de_rutas.html";
}

/////   Esta es la función que crea la tabla en el div con los datos que recibimos de la API. /////

function crearTablaRutas(Ruta){
    let bodyTablaPuntos = document.getElementById("tablaRutas").getElementsByTagName('tbody')[0];
    contenidoFila = "<tr>"+
                        "<td>"+Ruta.nombre+"</td>"+
                        "<td>"+Ruta.duracion+"h</td>"+
                        "<td>"+Ruta.ciudad+"</td>"+
                        "<td>"+Ruta.km+"-km</td>"+
                        "<td>"+Ruta.descripcion+"</td>"+
                        "<td><button class='btn btn-warning' onclick='Editar(`"+Ruta.id+"`)'>Edit</button></td>"+
                        "<td><button class='btn btn-danger' onclick='Eliminar(`"+Ruta.id+"`)'>Eliminar</button></td>"+
                    "</tr>";
    bodyTablaPuntos.insertRow().innerHTML = contenidoFila; 
    bodyTablaPuntos.className = 'table-info text-center';                    
}

/////   Recogemos los datos del formulario y se lo pasamos a la función de ModificarRuta()  ///////

document.querySelector('#modificar').addEventListener('click', () => {
    var nombre = document.getElementById('InputNombreRuta').value;
    var duracion = document.getElementById('InputDuracion').value;
    var ciudad = document.getElementById('InputCiudad').value;
    var descripcion = document.getElementById('InputDescripcion').value;
    var puntos = document.getElementById("InputPuntos").value;
    var km = document.getElementById("InputKm").value;
    var id = document.getElementById('ID_ruta').value;
    ModificarRuta(id,nombre,duracion,ciudad,km,puntos,descripcion);
})

////////////////////////////////////////////////////////////////
///////////////// LLAMADAS API ////////////////////////////////
///////////////////////////////////////////////////////////////

/////   Saca todas las rutas de la BD, luego llama a la funión crearTablaRutas() para pintar las rutas en la tabla  ///////

function SacarRutas(){
    const url = 'http://192.168.1.119:8080/rutas/todas';
  
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            for(var i=0;i<json.length;i++){
                crearTablaRutas(json[i])
                console.log(json[i].id);  
            }
        });
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send(null);
}

/////   Saca los datos de una ruta en concreto, la buscamos mediante ID, esta consulta luego llama a la función rellenarForm() que insertará campos en el formulario  ///////

function SacarDatosRuta(id){
    const url = 'http://192.168.1.119:8080/rutas/ruta?id='+id;
  
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            rellenarForm(json);
            console.log(json);
        });
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send(null);
}

/////   Esta llamada a la API elimina una ruta en concreto, esta la filtramos mediante ID  ///////

function EliminarRuta(id){
    const url = 'http://192.168.1.119:8080/rutas/DeleteRuta?id='+id;
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send(null);
}

/////   Modificamos los campos de una ruta en concreto mediante ID  ///////

function ModificarRuta(id,nombre,duracion,km,ciudad,puntos,descripcion){
    const url = 'http://192.168.1.119:8080/rutas/updateRuta';
    const datos = "id="+id+"&nombre="+nombre+"&duracion="+duracion+'&ciudad='+ciudad+'&descripcion='+descripcion+'&puntos='+puntos+"&km="+km;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = "../Pages/Lista_de_rutas.html";
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(datos);
}