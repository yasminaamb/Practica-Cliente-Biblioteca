"use strict";

//Clase Usuario-------------------------------------------------------------------------------------------
function Usuario(iIdUsuario,sNombre,sApellidos,iTelefono){
    this.idUsuario=iIdUsuario;
    this.nombre=sNombre;
    this.apellidos=sApellidos;
    this.telefono=iTelefono;
}

//Funciones de la clase usuario
Usuario.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idUsuario +"</td>";
    sFila += "<td>" + this.nombre +"</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.telefono + "</td>";

    return sFila;
}

//Clase Articulo------------------------------------------------------------------------------------------
function Articulo(iIdArticulo,sTitulo){
    this.idArticulo=iIdArticulo;
    this.titulo=sTitulo;
}

//Funciones de la clase Articulo
Articulo.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idArticulo +"</td>";
    sFila += "<td>" + this.titulo + "</td>";

    return sFila;
}

//Clase Libro

function Libro(iIdArticulo,sTitulo, sAutor, iPaginas){
    Articulo.call(this,iIdArticulo,sTitulo);

    this.autor=sAutor;
    this.paginas=iPaginas;
}

Libro.prototype = Object.create(Articulo.prototype);
Libro.prototype.constructor = Articulo;

Libro.prototype.toHTMLRow = function() {
    let sFila = "<tr>";
    sFila += "<td>" + this.idArticulo + "</td>";
    sFila += "<td>" + this.titulo + "</td>";
    sFila += "<td>" + this.autor + "</td>";
    sFila += "<td>" + this.paginas + "</td>";

    return sFila;
}

//Clase DVD

function Dvd(iIdArticulo,sTitulo,dFechaEstreno,bSubtitulada){
    Articulo.call(iIdArticulo,sTitulo);
    this.fechaEstreno = dFechaEstreno;
    this.subtitulada = bSubtitulada;
}

Dvd.prototype = Object.create(Articulo.prototype);
Dvd.prototype.constructor = Articulo;

Dvd.prototype.toHTMLRow = function() {
    let sFila = "<tr>";
    sFila += "<td>" + this.idArticulo + "</td>";
    sFila += "<td>" + this.titulo + "</td>";
    sFila += "<td>" + (this.subtitulada?"SI":"NO") + "</td></tr>";
    sFila += "<td>" + this.fechaEstreno + "</td>";

    return sFila;
}

//Clase Prestamo-------------------------------------------------------------------------------------------

function Prestamo(iIdPrestamo,aArticulos,oUsuario,dFechaInicio,dFechaFin){
    this.idPrestamo=iIdPrestamo;
    this.articulos=aArticulos;
    this.usuario=oUsuario;
    this.fechaInicio=dFechaInicio;
    this.fechaFin=dFechaFin;
}

//Funciones de la clase Prestamo
Prestamo.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idPrestamo +"</td>";
    sFila += "<td>" + this.articulos +"</td>";
    sFila += "<td>" + this.usuario + "</td>";
    sFila += "<td>" + this.fechaInicio + "</td>";
    sFila += "<td>" + this.fechaFin + "</td>";

    return sFila;
}


//Clase Biblioteca
class Biblioteca{
    constructor(){
        this.usuarios=[];
        this.articulos=[];
        this.prestamos=[];
    }
    
    altaUsuario(oUsuario){
        let bEncontrado = false;
        let bInsertado;

        for(let i=0; i < this.usuarios.length && !bEncontrado; i++){
            if(this.usuarios[i].idUsuario == oUsuario.idUsuario){
                bEncontrado = true;
            }
        }
    
        if(bEncontrado){ // dado de alta previamente
            bInsertado = false;
        } else {
            bInsertado = true;
            this.usuarios.push(oUsuario);
        }

        return bInsertado;
    }

    altaArticulo(oArticulo){
        let bEncontrado = false;
        let bInsertado;

        for(let i=0; i < this.articulos.length && !bEncontrado; i++){
            if(this.articulos[i].idArticulo == oArticulo.idArticulo){
                bEncontrado = true;
            }
        }
    
        if(bEncontrado){ // dado de alta previamente
            bInsertado = false;
        } else {
            bInsertado = true;
            this.articulos.push(oArticulo);
        }

        return bInsertado;
    }
    

    listadoUsuario(){
        let tabla = "<h1>Listado de Usuarios</h1><table border='1'><th>ID Usuario</th><th>Nombre</th><th>Apellido</th><th>NIF Telefono</th>";
        for (var i = 0; i < this.usuarios.length; i++) {
            tabla += this.usuarios[i].toHTMLRow();
        }
        tabla += "</table>";
        return tabla;
    }

    listadoArticulos(){
        let tabla = "<h1>Listado de Articulos</h1><table border='1'><th>ID Articulo</th><th>Titulo</th>";
        for (var i = 0; i < this.articulos.length; i++) {
            tabla += this.articulos[i].toHTMLRow();
        }
        tabla += "</table>";
        return tabla;
    }

    listadoArticulosTipo(){
        let tabla = "<h1>Listado de Articulos</h1><table border='1'><th>ID Articulo</th><th>Titulo</th>";
        for (var i = 0; i < this.articulos.length; i++) {
            tabla += this.articulos[i].toHTMLRow();
        }
        tabla += "</table>";
        return tabla;

    }

    listadoPrestamos(){
        let tabla = "<h1>Listado de Prestamos</h1><table border='1'><th>ID Prestamo</th><th>Articulos</th><th>Usuario</th><th>Fecha de Inicio</th><th>Fecha de Fin</th>";
        for (var i = 0; i < this.prestamos.length; i++) {
            tabla += this.prestamos[i].toHTMLRow();
        }
        tabla += "</table>";
        return tabla;

    }
}
