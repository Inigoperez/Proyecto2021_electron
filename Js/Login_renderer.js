
function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //const url = 'https://10.10.12.133/usuario/loginAdmin?email='+email+'&password='+password;
    const url = 'http://192.168.1.119:8080/usuario/loginAdmin?email='+email+'&password='+password;
    console.log(email+" "+password);
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send(null);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("perfecto");
        window.location.href = "../Pages/Creacion_de_rutas.html";
      }
    };
    
}
