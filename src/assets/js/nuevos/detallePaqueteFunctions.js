
$(window).scroll(function () {
    if ($(this).scrollTop() > 550) {
        $('#detailBar').removeClass("hide");
        $('#detailBar').addClass("appear");
    }
    else {
        $('#detailBar').removeClass("appear");
        $('#detailBar').addClass("hide");
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
        $('#insideBar').removeClass("small");
        $('#insideBar').addClass("grow");
    }
    else {
        $('#insideBar').removeClass("grow");
        $('#insideBar').addClass("small");
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
        $("#packageName").fadeIn(500);
        $("#priceAndDiscount").fadeIn(500);
        $("#buyButton").addClass('col-sm-12 col-md-12 col-lg-3 col-xl-3');
    }
    else {
        $("#packageName").hide();
        $("#priceAndDiscount").hide();
        $("#buyButton").removeClass('col-sm-12 col-md-12 col-lg-3 col-xl-3');
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 850) {
        $('#insideBar').addClass('changeColor');
        $('#insideBar').addClass('towhiteBack');
    }
    else {
        $('#insideBar').removeClass('changeColor');
        $('#insideBar').removeClass('towhiteBack');
    }
});

$(document).ready(function () {
    console.log('SCRIPT DETALLE DE PAQUETE OK');
    iniciarObjetoPaquete()
});

function iniciarObjetoPaquete(){
    
    let objetoPaquete;
    let paqueteCadena = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
    try {
        objetoPaquete = JSON.parse(paqueteCadena);
        
        pintarDetallePaquete(objetoPaquete);
        //obtenerComplementos();
    } catch (error) {
        console.log('ERROR:', error);
        //window.location = "paquetes.html";
    }
}

function pintarDetallePaquete(objetoPaquete){
    console.log('objetoPaquete', objetoPaquete);

    if(objetoPaquete.detallePaquete.detalle.canales == ''){
        $('#cntTelevision').hide();
        $('#cntTarjetaTelevision').hide();
    }

    console.log('objetoPaquete.detallePaquete.tipoOferta=>', objetoPaquete.detallePaquete.tipoOferta);
    if(objetoPaquete.detallePaquete.tipoOferta == '2P'){
        $('.tarjeta3P').hide();
    }

    var regexMegas = /(\d{1,3})\s/;
    var arrayMegas = regexMegas.exec(objetoPaquete.detallePaquete.detalle.megas);
    if(parseInt(arrayMegas[1]) < 150){
        $('#tarjetaPromocionPremium').hide();
    }

    $('#cntNombrePaqueteBar').html(objetoPaquete.detallePaquete.nombre);
    $('#cntPrecioPaqueteBar').html(objetoPaquete.detallePaquete.detalle.desc6ProntoPago);

    $('#cntNombrePaquete').html(objetoPaquete.detallePaquete.nombre);

    $('#cntMegas').html('Internet de '+ objetoPaquete.detallePaquete.detalle.megas);
    $('#cntMegasDetalle').html(objetoPaquete.detallePaquete.detalle.megasDetalle);
    $('#cntTVDetalle').html(objetoPaquete.detallePaquete.detalle.canales);

    

    $('#cntPrecioPaquete').html(objetoPaquete.detallePaquete.detalle.desc6ProntoPago);

    $('#cntCardMegas').html(objetoPaquete.detallePaquete.detalle.megas);
    $('#cntCardMegasPaquete').html(objetoPaquete.detallePaquete.detalle.descriMegasDetalle);
    $('#cntCardMegasDetalle').html(objetoPaquete.detallePaquete.detalle.promoMegasDetalle);

    $('#cntCardTelevision').html(objetoPaquete.detallePaquete.detalle.promoCanales);
    $('#cntCardTelevisionPaquete').html(objetoPaquete.detallePaquete.detalle.canales);
    $('#cntCardTelevisionDetalle').html(objetoPaquete.detallePaquete.detalle.promoCanalesDetalle);

    obtenerComplementos(objetoPaquete.idPaquete)
    
}

function obtenerComplementos(idPaquete) {
    
    var parametros = {
        "idPlan": idPaquete,
        "plaza": "CIUDAD DE MEXICO",
        "estimuloFiscal": false
    };
    console.log('', 'INVOCANDO EL SERVICIO [obtener-complementos]');

    //$('#btn_transparentLinkDetailPaq').html('<i class="fas fa-circle-notch fa-spin" style="color: #1a76d2;"></i>');

    $.ajax({
        url: 'https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/obtener-complementos',
        data: JSON.stringify(parametros),
        dataType: "json",
        type: 'POST'
    }).done(function (respuesta) {
        console.log('RESPUESTA DE COMPLEMENTOS');
        console.log(respuesta);

        let arregloGarantia = respuesta.datos.infoAddons.costoGarantiaAdd.productos;
        let arregloPromociones = respuesta.datos.infoAddons.promocionesAdd.promociones;
        let arregloProductos = respuesta.datos.infoAddons.productosAdd.productos;
        let arregloServicios = respuesta.datos.infoAddons.serviciosAdd.servicios;

        buscarInfoComplementos(arregloPromociones,arregloProductos,arregloServicios, arregloGarantia);


    }).fail(function (jqXHR, textStatus) {
        console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE COMPLEMENTOS');
        console.log(jqXHR);
    });
}

function buscarInfoComplementos(arregloPromociones, arregloProductos,arregloServicios, arregloGarantia){
    let objetoComplementos = {};
    let arregloPromocion = new Array();
    let infoParrilla = new Array();
    $.each(arregloPromociones, function (key, objetoPromociones) {
    //$.each(arregloProductos[0].adicional, function (key, objetoPromociones) {
        //let nombrePromocion = objetoPromociones.adicionalProductoNombre;
        let nombrePromocion = objetoPromociones.nombre;
        if (nombrePromocion == "FOX PREMIUM.") {
            objetoPromociones.tipo = 'PROMO_FOX';
            arregloPromocion.push(objetoPromociones);
        }

        if (nombrePromocion == "HBO x 2 meses Gratis") {
            objetoPromociones.tipo = 'PROMO_HBO';
            arregloPromocion.push(objetoPromociones);
        }
    });
    objetoComplementos.promocion = arregloPromocion;

    let arregloTelevision = new Array();
    $.each(arregloProductos, function (key, objetoProductos) {
        if (objetoProductos.Agrupacion == "Canales") {
            arregloTelevision.push(objetoProductos);
        }

        if (objetoProductos.Agrupacion == "Parrillas") {
            arregloTelevision.push(objetoProductos);

            $.each(objetoProductos.adicional, function (index, objetoParrilla) {
                if(objetoParrilla.nombre == 'TV BASICA'){
                    infoParrilla[0] = objetoParrilla.idPlanParrilla;
                }
                if(objetoParrilla.nombre == 'TV AVANZADA'){
                    infoParrilla[1] = objetoParrilla.idPlanParrilla;
                }
                if(objetoParrilla.nombre == 'TV PREMIUM'){
                    infoParrilla[2] = objetoParrilla.idPlanParrilla;
                }
                console.log('idPlanParrilla=>', objetoParrilla.idPlanParrilla);
            });
            localStorage.setItem('TP_PARRILLAS', JSON.stringify(infoParrilla));
        }
    });
    objetoComplementos.television = arregloTelevision;

    let arregloEquipoAdicional = new Array();
    let arregloTelefonia = new Array();
    $.each(arregloServicios, function (key, objetoServicio) {
        if (objetoServicio.nombre == 'WIFI EXTENDER 89' || objetoServicio.nombre == 'Wifi Extender') {
            objetoServicio.tipo = 'ADDON_WIFI';
            arregloEquipoAdicional.push(objetoServicio);
        }
        if (objetoServicio.nombre == 'TV ADICIONAL.' || objetoServicio.nombre == 'Television Adicional 129') {
            objetoServicio.tipo = 'ADDON_TV_ADCIONAL';
            arregloEquipoAdicional.push(objetoServicio);
        }
        if (objetoServicio.nombre == 'LINEA TELEFONICA ADICIONAL' || objetoServicio.nombre == 'Telefonia Adicional') {
            objetoServicio.tipo = 'ADDON_LINEA_ADCIONAL';
            arregloTelefonia.push(objetoServicio);
        }
    });

    objetoComplementos.equipoAdicional = arregloEquipoAdicional;
    objetoComplementos.telefonia = arregloTelefonia;

    let costoIntalacion = 0;

    $.each(arregloGarantia, function (key, objetoGarantia,) {
        if(objetoGarantia.Agrupacion == 'Costo y Garantia'){
            $.each(objetoGarantia.adicional, function (index, objetoAdicional) {
                costoIntalacion += objetoAdicional.precio;
            });
        }
    });

    objetoComplementos.costoinstalacion = costoIntalacion;

    localStorage.setItem("TP_STR_COMPLEMENTOS", JSON.stringify(objetoComplementos));

    $('#btnObtenerPaquete').html('Lo quiero <span></span>');
    $('#btnObtenerPaquete').removeClass('btnDeshabilitado');
    $('#btnObtenerPaquete').removeAttr('disabled');
}