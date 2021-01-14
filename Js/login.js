
function login(){

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    fetch('https://10.10.12.133/usuario/loginAdmin?email='+email+'&password='+password)
      .then(response => response.json())
      .then(json => console.log(json));

    alert(json);
}