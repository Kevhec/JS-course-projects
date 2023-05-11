/* Variables */
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agregar curso btn agregar
  listaCursos.addEventListener('click', agregarCurso);

  // Eliminar curso
  carrito.addEventListener('click', eliminarCurso)

  // Limpiar carrito
  vaciarCarrito.addEventListener('click', limpiarCarrito)
}

/* Funciones */
function agregarCurso(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('agregar-carrito')) {
    const CursoSeleccionado = evt.target.parentElement.parentElement;
    leerDatosCurso(CursoSeleccionado);
  }
}

// Eliminar curso
function eliminarCurso(evt) {
  if(evt.target.classList.contains('borrar-curso')) {
    const cursoId = evt.target.getAttribute('data-id');

    // Eliminar por data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    
    carritoHTML(); // Itera sobre carro y muestra html
  }
}

// Limpiar carrito
function limpiarCarrito() {
  limpiaHTML();
  articulosCarrito = [];
}

// Leer y extraer contenido del curso
function leerDatosCurso(curso) {
  // Objeto - contenido del curso
  const infoCurso = {
    imagen : curso.querySelector('img').src,
    titulo : curso.querySelector('h4').textContent,
    precio : curso.querySelector('.precio span').textContent,
    id : curso.querySelector('a').getAttribute('data-id'),
    cantidad : 1
  }

  // Revisar si elemento ya existe
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe) {
    const cursoExistente = articulosCarrito.forEach( curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
      }
    })
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso]
  }

  // Revisar si elemento ya existe
  /* const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe) {
    // Actualizar cantidad
    const cursos = articulosCarrito.map( curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
        return curso;
      } else {
        return curso;
      }
    })
  } else {
    // Agregar - arreglo de elementos
    articulosCarrito = [...articulosCarrito, infoCurso]
  } */
  carritoHTML();
}

// HTML del carrito de compras
function carritoHTML() {

  //Limpiar HTML
  limpiaHTML();

  //Generar HTML
  articulosCarrito.forEach( curso => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width = 100px>
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;

    // Agregar HTML en el tbody
    contenedorCarrito.appendChild(row);
  })
}

// Eliminar contenido del tbody
function limpiaHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = '';

  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}