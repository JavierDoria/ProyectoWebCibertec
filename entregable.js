let fecha = new Date();

let d = fecha.getDate();
let m = fecha.getMonth() + 1;
let y = fecha.getFullYear();
document.getElementById("pf").innerHTML = "Fecha: " + d + "/" + m + "/" + y;

function reloj() {
    let fecha = new Date();
    let h = fecha.getHours();
    let m = fecha.getMinutes();
    let s = fecha.getSeconds();

    document.getElementById("ph").innerHTML = "Hora: " + h + ":" + m + ":" + s;
    setTimeout("reloj()", 1000);
}

var c = 0;
function carrusel() {
    c++;
    if (c > 5) c = 1;
    document.getElementById("imgcab").setAttribute("src", "img/cab" + c + ".jpg");
    setTimeout("carrusel()", 1000);
}

function ventana() {
    var x = window.innerWidth;
    var y = window.innerHeight;

    document.getElementById("ventana").style.transition = "all 1s ease";

    // Abre la ventana en el centro, ocupando la mitad de la pantalla
    document.getElementById("ventana").style.left = x / 4 + "px";
    document.getElementById("ventana").style.top = y / 4 + "px";
    document.getElementById("ventana").style.width = x / 2 + "px";
    document.getElementById("ventana").style.height = y / 2 + "px";

    // A los 5 segundos se cierra
    setTimeout(() => {
        document.getElementById("ventana").style.left = x / 2 + "px";
        document.getElementById("ventana").style.top = y / 2 + "px";
        document.getElementById("ventana").style.width = "0px";
        document.getElementById("ventana").style.height = "0px";
        document.getElementById("h1ventana").style.display = "none";
    }, 5000);
}

document.body.setAttribute("onload", "ventana(); reloj(); carrusel()");