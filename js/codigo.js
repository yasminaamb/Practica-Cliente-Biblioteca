// Variables globales
var oBiblioteca = new Biblioteca();

function cambio(isCambio) {

  switch (isCambio) { 
    case "libro":
      txtAutor.style.display = "block";
      txtNumPag.style.display = "block";
      txtFecha.style.display = "none";
      txtSub.style.display = "none";
      break;
    case "DVD":
      txtFecha.style.display = "block";
      txtSub.style.display = "block";
      txtAutor.style.display = "none";
      txtNumPag.style.display = "none";
      break;
  }
}

//Datos base////////////////////////////////////////////////////////////////////////////////////////////////////////
datosIniciales();

function datosIniciales(){
    oBiblioteca.articulos = [ 
        {idArticulo : 1 , nombre : "El Quijote", prestado: false},
        {idArticulo : 2 , nombre : "El Quijote II", prestado: false},
        {idArticulo : 3 , nombre : "El Quijote III", prestado: true},
        {idArticulo : 4 , nombre : "El Quijote IV", prestado: false},
        {idArticulo : 5 , nombre : "El Quijote V", prestado: false}
    ];
}

//Funcion para ocultar los formularios por defecto///////////////////////////////////////////////////////////////////
ocultarFormularios();

function ocultarFormularios() {
    frmListados.style.display = "none";
    frmAltaUsuario.style.display = "none";
    frmAltaArticulo.style.display = "none";
    frmAltaPrestamo.style.display = "none";
}

//Resgistro de eventos para mostrar formularios///////////////////////////////////////////////////////////////////////
document.querySelector("#mnuListados").addEventListener("click",gestionListados);
document.querySelector("#mnuAltaUsuario").addEventListener("click",gestionUsuarios);
document.querySelector("#mnuAltaArticulo").addEventListener("click",gestionArticulos);
document.querySelector("#mnuAltaPrestamo").addEventListener("click",gestionFormularios);


//Mostrar formularios-------------------------------------------------------------------
// Gestion de listados
function gestionListados(){
    ocultarFormularios();
    frmListados.style.display = "block";
}

// Gestion de usuarios
function gestionUsuarios(){
    ocultarFormularios();
    frmAltaUsuario.style.display = "block";
}

// Gestion de articulos
function gestionArticulos(){
    ocultarFormularios();
    frmAltaArticulo.style.display = "block";
    txtAutor.style.display = "none";
    txtFecha.style.display = "none";
    txtNumPag.style.display = "none";
    txtSub.style.display = "none";

}

// Gestion de formulario
function gestionFormularios(oEvento){
    let oE = oEvento || window.event;

    if( oE.target.id == 'mnuAltaPrestamo'){
        
         ocultarFormularios();

        frmAltaPrestamo.style.display = "block";

        // Inicializar el formulario
        frmAltaPrestamo.lstLibros1.innerHTML = oBiblioteca.optionsLibros();
        frmAltaPrestamo.lstLibros2.innerHTML = frmAltaPrestamo.lstLibros1.innerHTML;
        frmAltaPrestamo.lstDVD1.innerHTML = oBiblioteca.optionsDVD();
        frmAltaPrestamo.lstDVD2.innerHTML = frmAltaPrestamo.lstDVD1.innerHTML;

    }
}

//Aceptar Funciones//////////////////////////////////////////////////////////////////////////////////

  // aceptarAltaBicicleta
  function aceptarAltaUsuario() {
    let iIdUsuario = parseInt(frmAltaUsuario.lstIDUsuario.value.trim());
    let sNombre = frmAltaUsuario.lstNombre.value.trim();
    let sApellidos = frmAltaUsuario.lstApellidos.value.trim();
    let iTelefono = parseInt(frmAltaUsuario.lstTelefono.value.trim());
    let oUsuario;
  
  
  if (isNaN(iIdUsuario) ||isNaN(iTelefono) || sNombre.length == 0 || sApellidos.length == 0){
    alert("Faltan datos por rellenar");
  }
  else {
    // Continuo con el alta del usuario
    
      oUsuario = new Usuario(iIdUsuario,sNombre,sApellidos,iTelefono);
  
        // Insertar el nuevo usuario
        if (oBiblioteca.altaUsuario(oUsuario)) {
          alert("Usuario Registrado OK");
          frmAltaUsuario.reset(); // Vaciamos los campos del formulario
          frmAltaUsuario.style.display = "none";
        } else {
          
          alert("Usuario Registrado Previamente");      
        }
  }
}

  // aceptarAltaArticulo
  function aceptarAltaArticulo() {
    let iIdArticulo = parseInt(frmAltaArticulo.lstIDArticulo.value.trim());
    let sTitulo = frmAltaArticulo.lstTitulo.value.trim();
    let sAutor = frmAltaArticulo.lstAutor.value.trim();
    let iPaginas = parseInt(frmAltaArticulo.lstPaginas.value.trim());
    let dFechaEstreno = new Date (frmAltaArticulo.lstEstreno);
    let oArticulo;
    let bSubtitulado;
    
    if(subtitles.optradio2=="s"){
      bSubtitulado=true;
    }
    else{
      bSubtitulado=false;
    }
  //Elegir tipo de articulo
    if (txtTipo.optradio=="dvd") {
      oArticulo = new Dvd(iIdArticulo,sTitulo,dFechaEstreno,bSubtitulada);
    } else {
      // libro
      oArticulo = new Libro(iIdArticulo,sTitulo, sAutor, iPaginas);
    }
 
          // Insertar la nueva bicicleta
          if (oBiblioteca.altaArticulo(oArticulo)) {
            alert("Articulo registrado OK");
            frmAltaArticulo.reset(); // Vaciamos los campos del formulario
            frmAltaArticulo.style.display = "none";
          } else {
            alert("Articulo registrado previamente");
          }
    
    }
  

    function aceptarAltaPrestamo(){

      if (validarAltaPrestamo()){
          // Construir un objeto prestamo
          let idPrestamo = parseInt(frmAltaPrestamo.txtIdPrestamo.value.trim());
          let oArticulos = [];
          if (parseInt(frmAltaPrestamo.lstLibro1.value.trim()) != -1 ){
              oArticulos.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstLibro1.value.trim())));
          }
          if (parseInt(frmAltaPrestamo.lstLibros2.value.trim()) != -1 ){
              oArticulos.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstLibro2.value.trim())));
          }
          if (parseInt(frmAltaPrestamo.lstDVD1.value.trim()) != -1 ){
              oArticulos.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstDVD1.value.trim())));
          }
          if (parseInt(frmAltaPrestamo.lstDVD2.value.trim()) != -1 ){
              oArticulos.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstDVD2.value.trim())));
          }
          // Usuario
          let idUsuario = parseInt(frmAltaPrestamo.txtIdUsuario.value.trim());
  
          let oUsuario = oBiblioteca.buscarUsuario(idUsuario);
  
          // Fechas 
          let dtFechaInicio = new Date(frmPrestamo.txtFechaInicio.value);
          let dtFechaFin = new Date(frmPrestamo.txtFechaInicio.value);
  
          // Construyo el objeto
          let oPrestamo = new Prestamo(idPrestamo,oArticulos,oUsuario,dtFechaInicio,dtFechaFin);
  
          // Llamar al método de Biblioteca --> altaPrestamo
  
          sResultado = oBiblioteca.altaPrestamo(oPrestamo);
  
      }
  
  }
  
  function validarAltaPrestamo(){
  
      return true;
  }

    function listadoUsuario() {
      let ventana = window.open();
      ventana.document.body.innerHTML = oBiblioteca.listadoUsuario();
  }

  function listadoArticulos() {
    let ventana = window.open();
    ventana.document.body.innerHTML = oBiblioteca.listadoArticulos();
}

function listadoArticulosTipo() {
  let ventana = window.open();
  ventana.document.body.innerHTML = oBiblioteca.listadoArticulosTipo();
}

function listadoPrestamos() {
  let ventana = window.open();
  ventana.document.body.innerHTML = oBiblioteca.listadoPrestamos();
}

