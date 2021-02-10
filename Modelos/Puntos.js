class Puntos{

    Puntos(nombre,descripcion,pregunta,respuesta1,respuesta2,respuesta3){
        this.lat;
        this.lng;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.pregunta = pregunta;
        this.respuesta1 = respuesta1;
        this.respuesta2 = respuesta2;
        this.respuesta3 = respuesta3;
    }

    setLat(lat){
        this.lat=lat;
    }

    setLng(lng){
        this.lng=lng;
    }

    getNombre(){
        return this.nombre;
    }

    getLat(){
        return this.lat;
    }
    
    getLng(){
        return this.lng;
    }
}