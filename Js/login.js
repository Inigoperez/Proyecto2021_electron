function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = 'https://192.168.1.119:8080/usuario/loginAdmin?email='+email+'&password='+password;
  
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("perfecto");
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send(nul);
    /*fetch(url)
      .then(response => response.json())
      .then(json => console.log(json));*/
}