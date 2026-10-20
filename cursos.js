// VENTANA DE LOS CURSOS//
const ventana = document.createElement("div");
ventana.className = "modal fade";
ventana.id = "modalCurso";
ventana.tabIndex = -1;
ventana.setAttribute("aria-labelledby", "tituloModal");
ventana.setAttribute("aria-hidden", "true");

ventana.innerHTML = `
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="tituloModal"></h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p id="descripcionModal"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
`;
document.body.appendChild(ventana);

// VENTANA EMERGENTE 
const modalCurso = new bootstrap.Modal(ventana);

// Asignar una acción a cada botón "Ver más".
const botones = document.querySelectorAll(".ver-mas");

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const tarjeta = boton.closest(".curso-card");
    const titulo = tarjeta.querySelector(".card-title").textContent;
    
    document.getElementById("tituloModal").textContent = titulo;
    document.getElementById("descripcionModal").textContent = boton.dataset.detalle;
    modalCurso.show();
  });
});

const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
 
mensaje.addEventListener("input", function () {
  contador.textContent = mensaje.value.length;
});
 
const formulario = document.getElementById("formContacto");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
 
function marcarCampo(campo, errorId, textoError) {
  const caja = document.getElementById(errorId);
  if (textoError) {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    caja.textContent = textoError;
    return false;
  } else {
    campo.classList.add("valido");
    campo.classList.remove("invalido");
    caja.textContent = "";
    return true;
  }
}
 
const modalEnvio = new bootstrap.Modal(document.getElementById("modalEnvio"));
const modalContenido = document.getElementById("modalContenido");

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  let nombreOk = marcarCampo(
    nombre,
    "errorNombre",
    nombre.value.trim().length < 3 ? "Escribe al menos 3 letras." : ""
  );

  let correoOk = marcarCampo(
    correo,
    "errorCorreo",
    !correo.value.includes("@") || !correo.value.includes(".") ? "Escribe un correo válido." : ""
  );

  let mensajeOk = marcarCampo(
    mensaje,
    "errorMensaje",
    mensaje.value.trim().length < 10 ? "El mensaje es muy corto (mínimo 10)." : ""
  );

  if (!(nombreOk && correoOk && mensajeOk)) {
    return;
  }

  modalContenido.innerHTML =
    '<div class="spinner-border text-primary mb-3" role="status"></div>' +
    '<h5>Enviando mensaje...</h5>';
  modalEnvio.show();

  try {
    const envio = await fetch("https://formsubmit.co/ajax/minopepaola@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        nombre: nombre.value.trim(),
        email: correo.value.trim(),
        mensaje: mensaje.value.trim(),
        _subject: "Nuevo mensaje desde mi página",
        _captcha: "false"
      })
    });

    const resultado = await envio.json();
    console.log("Respuesta de FormSubmit:", envio.status, resultado);

      if (envio.ok) {
      modalContenido.innerHTML =
      '<div class="loader-avion"><i class="bi bi-send-fill"></i></div>' +
      '<h5 class="mb-1">Enviando mensaje</h5>' +
      '<p class="text-muted mb-0">Solo tomará un momento</p>';

      formulario.reset();
      contador.textContent = 0;
      nombre.classList.remove("valido");
      correo.classList.remove("valido");
      mensaje.classList.remove("valido");

      setTimeout(function () {
        modalEnvio.hide();
      }, 2000);
      } else {
      mostrarErrorEnvio();
      }
  } catch (error) {
    mostrarErrorEnvio();
  }
});

function mostrarErrorEnvio() {
  modalContenido.innerHTML =
    '<i class="bi bi-x-circle-fill icono-error"></i>' +
    '<h5 class="mt-3">No se pudo enviar</h5>' +
    '<p class="text-muted">Revisa tu conexión e inténtalo de nuevo.</p>' +
    '<button type="button" class="btn btn-naranja" data-bs-dismiss="modal">Cerrar</button>';
}

const btnSubir = document.getElementById("btnSubir");
 
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    btnSubir.classList.add("visible");
  } else {
    btnSubir.classList.remove("visible");
  }
});
 
btnSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
