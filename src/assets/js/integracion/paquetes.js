$(document).ready(function () {
    console.log('SCRIPT CARGADO CORRECTAMENTE');

    $("#unboxCarouselContainer").slick({
        autoplay: true,
        autoplaySpeed: 9000,
        dots: true,
        draggable: true,
        fade: true,
        infinite: true,
        pauseOnHover: true,
        swipe: true,
        touchMove: true,
        swipeToSlide: true
    });

    cargarPaquetes();
    
});

var showPackageContainer = function (item, item2, item3, item4, e) {
    $("#" + item).hide();
    $("#" + item2).fadeIn(500);
    $("#" + item3).removeClass('active');
    $("#" + item4).addClass('active');
    event.preventDefault();
};

var showMorePackages = function (item, item2, item3, e) {
    $("." + item).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).show();
    event.preventDefault();
};

var showLessPackages = function (item, item2, item3, e) {
    $("." + item).fadeOut(300);
    $("#" + item2).show();
    $("#" + item3).hide();
    event.preventDefault();
};

function cargarPaquetes() {
    console.group('Paquetes.js FUNCION cargarPaquetes()');
    
    var tipopaquetes = "totalplay_paquetes.json";
    if (localStorage.getItem("TP_OF_OBJ_FACTIBILIDAD") != null) {
        var datosfactibilidad = JSON.parse(localStorage.getItem("TP_OF_OBJ_FACTIBILIDAD"));
        if (datosfactibilidad.estimulofiscal == "true") {
            tipopaquetes = "totalplay_paquetes_fronterizo.json";
        }
    }
    console.log(tipopaquetes);
    //var url = Constantes.endpoints.obtenerPaquetes + tipopaquetes;
    var url = '/assets/media/totalplay_paquetes_2020_09_09.json';
    console.log('URL ARCHIVO:',url);
    fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            throw "Error en la llamada Ajax";
        }
    }).then(async function (respuesta) {
        localStorage.setItem("TP_INFO_PAQUETES", JSON.stringify(respuesta));
        pintarPaquetes(respuesta["TriplePlayNetFlix"], "ctnPaquetesTripleplay");
        pintarPaquetes(respuesta["DoblePlayNetFlix"], "ctnPaquetesDobleplay");
    });
    console.groupEnd();
}

function pintarPaquetes(arregloPaquetes, idContenedor) {
    var plantillaHTML = "";
    var arreglo = ordenarObjeto(arregloPaquetes);
    
    var arregloRecomendacion = new Array();

    $.each(arreglo, function (key, objPaquete) {
        
        var regexMegas = /\s(\d{1,3})\sMbps/;
        var arrayMegas = regexMegas.exec(objPaquete.detalleServicio);

        var regexPantallas = /(\d)\spantalla/;
        var arrayPantallas = regexPantallas.exec(objPaquete.detalleServicio);

        var arrayCanales= objPaquete.detalle.canales.split('/');
        console.log('arrayCanales=>',arrayCanales);

        var claseOcultar = '';
        if(key > 2){
            if(idContenedor == 'ctnPaquetesTripleplay'){
                claseOcultar = 'hiddenPackageTriple';
            }
            if(idContenedor == 'ctnPaquetesDobleplay'){
                claseOcultar = 'hiddenPackageDoble';
            }
        }
        
        var canalesDescripcion = (arrayCanales[1] != undefined)? arrayCanales[1]: '';
        plantillaHTML += ``+
        `<div class="col-12 col-sm-6 mx-sm-auto col-md-6 col-lg-4 col-xl-4 ${claseOcultar}">
            <div class="row">
                <div class="col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto mainContainerpackage match">
                    <div class="packageInfoContainer" id="${objPaquete.id}">
                        <div class="titlePackage">
                            <p>${objPaquete.nombre}</p>
                        </div>
                        <div class="velocityPackage">
                            <p>${arrayMegas[1]} Megas</p>
                        </div>
                        <div class="descriptionPackage">
                            <p>${canalesDescripcion}</p>
                            <p><span>1 línea</span> de teléfono</p>
                        </div>
                        <hr>
                        <div class="imagePackage">
                            <img src="/assets/img/nuevos/1200px-Netflix_2015_logo.svg.png" alt="Image Paquete">
                        </div>
                        <div class="descriptionApp">
                            <p>${arrayPantallas[1]} pantalla(s) <span>Premium UHD</span></p>
                        </div>
                        <div class="packageDiscount">
                            <p>Descuento de por vida</p>
                        </div>
                        <div class="packagePrice">
                            <p><a >Desde: <span>$ ${formatoMonedad(objPaquete.precioLista, 0, ".", ",") } al mes</span></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        
    });

    $("#" + idContenedor).html(plantillaHTML);
    
    localStorage.setItem("TP_PAQUETES_RECOMENDACION", JSON.stringify(arregloRecomendacion));
}

function ordenarObjeto(objetoInicial) {
    try {
        var objetoOrdenado = objetoInicial.slice(0);
        objetoOrdenado.sort(function (a, b) {
            return b.precioLista - a.precioLista;
        });
        return objetoOrdenado;	
    } catch (error) {
        console.log('ERROR:', error);
    }
    
}

function formatoMonedad(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return (s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$0" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ""));
}