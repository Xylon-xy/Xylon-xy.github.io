let cajadatos, bd;

function iniciar() {
  cajadatos = document.getElementById("cajadatos");

  let grabar = document.getElementById("grabar");
  grabar.addEventListener("click", agregarobjeto);

  let buscar = document.getElementById("buscarbtn");
  buscar.addEventListener("click", buscarobjetos);

  let solicitud = indexedDB.open("basededatos");

  solicitud.addEventListener("error", mostrarerror);
  solicitud.addEventListener("success", comenzar);
  solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
  alert("Error: " + evento.target.error.name);
}

function comenzar(evento) {
  bd = evento.target.result;
  mostrar(); // Lista los objetos al iniciar
}

function crearbd(evento) {
  let basededatos = evento.target.result;
  let almacen = basededatos.createObjectStore("peliculas", { keyPath: "id" });
  almacen.createIndex("BuscarFecha", "fecha", { unique: false });
}

function agregarobjeto() {
  let clave = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let fecha = document.getElementById("fecha").value;

  let transaccion = bd.transaction(["peliculas"], "readwrite");
  let almacen = transaccion.objectStore("peliculas");
  almacen.add({ id: clave, nombre: nombre, fecha: fecha });

  transaccion.addEventListener("complete", mostrar);
}

function mostrar() {
  cajadatos.innerHTML = "";
  let transaccion = bd.transaction(["peliculas"]);
  let almacen = transaccion.objectStore("peliculas");
  let indice = almacen.index("BuscarFecha");
  let puntero = indice.openCursor(null, "prev");
  puntero.addEventListener("success", mostrarlista);
}

function mostrarlista(evento) {
  let puntero = evento.target.result;
  if (puntero) {
    cajadatos.innerHTML += `<div>${puntero.value.id} - ${puntero.value.nombre} - ${puntero.value.fecha}
    <input type="button" value="Remover" onclick="removerobjeto('${puntero.value.id}')"></div>`;
    puntero.continue();
  }
}

function removerobjeto(clave) {
  if (confirm("¿Está seguro?")) {
    let transaccion = bd.transaction(["peliculas"], "readwrite");
    let almacen = transaccion.objectStore("peliculas");
    almacen.delete(clave);
    transaccion.addEventListener("complete", mostrar);
  }
}

function buscarobjetos() {
  cajadatos.innerHTML = "";
  let buscar = document.getElementById("buscar").value;
  let transaccion = bd.transaction(["peliculas"]);
  let almacen = transaccion.objectStore("peliculas");
  let indice = almacen.index("BuscarFecha");
  let rango = IDBKeyRange.only(buscar);
  let puntero = indice.openCursor(rango);
  puntero.addEventListener("success", mostrarlista);
}

window.addEventListener("load", iniciar);	