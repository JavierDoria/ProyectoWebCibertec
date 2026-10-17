document.addEventListener('DOMContentLoaded', () => {
        const botonesFiltro = document.querySelectorAll('.btn-filtro');
        const tarjetas = document.querySelectorAll('.tarj-articulo');
        const inputBuscar = document.getElementById('inputBuscar');
        const btnBuscar = document.getElementById('btnBuscar');
        const sinResultados = document.getElementById('sinResultados');
        const itemsPagina = document.querySelectorAll('#paginacionBlog .page-item[data-pagina]');
        const itemAnterior = document.getElementById('itemAnterior');
        const itemSiguiente = document.getElementById('itemSiguiente');
        let paginaActual = 1;

        function renderizarVisualizacion() {
          const categoriaActiva = document.querySelector('.btn-filtro.active').dataset.categoria;
          const textoBusqueda = inputBuscar.value.toLowerCase().trim();
          let visibles = 0;

          tarjetas.forEach(tarjeta => {
            const catTarjeta = tarjeta.dataset.categoria;
            const tituloTarjeta = tarjeta.dataset.titulo;
            const pagTarjeta = parseInt(tarjeta.dataset.pagina);

            const coincideCategoria = (categoriaActiva === 'todos' || catTarjeta === categoriaActiva);
            const coincideTexto = (tituloTarjeta.includes(textoBusqueda) || textoBusqueda === '');
            const filtrando = (categoriaActiva !== 'todos' || textoBusqueda !== '');
            const coincidePagina = filtrando ? true : (pagTarjeta === paginaActual);

            if (coincideCategoria && coincideTexto && coincidePagina) {
              tarjeta.classList.remove('d-none');
              visibles++;
            } else {
              tarjeta.classList.add('d-none');
            }
          });

          if (visibles === 0) {
            sinResultados.classList.remove('d-none');
          } else {
            sinResultados.classList.add('d-none');
          }
        }

        function cambiarPagina(nuevaPagina) {
          if (nuevaPagina < 1 || nuevaPagina > 3) return;
          paginaActual = nuevaPagina;

          itemsPagina.forEach(item => {
            if (parseInt(item.dataset.pagina) === paginaActual) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });

          itemAnterior.classList.toggle('disabled', paginaActual === 1);
          itemSiguiente.classList.toggle('disabled', paginaActual === 3);

          renderizarVisualizacion();
        }

        botonesFiltro.forEach(btn => {
          btn.addEventListener('click', () => {
            botonesFiltro.forEach(b => {
              b.classList.remove('active', 'btn-primary');
              b.classList.add('btn-outline-secondary');
            });
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-secondary');
            renderizarVisualizacion();
          });
        });

        inputBuscar.addEventListener('input', renderizarVisualizacion);
        btnBuscar.addEventListener('click', renderizarVisualizacion);

        itemsPagina.forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPagina(parseInt(item.dataset.pagina));
          });
        });

        document.getElementById('btnAnterior').addEventListener('click', (e) => {
          e.preventDefault();
          cambiarPagina(paginaActual - 1);
        });

        document.getElementById('btnSiguiente').addEventListener('click', (e) => {
          e.preventDefault();
          cambiarPagina(paginaActual + 1);
        });

        renderizarVisualizacion();
      });
      
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