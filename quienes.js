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