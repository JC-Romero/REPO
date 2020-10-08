
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
    if(objetoPaquete.detallePaquete.nombre.includes("MATCH")){
        $('#matchBanner').show();
        $('#licenciaMatch').html(objetoPaquete.detallePaquete.detalle.licencia);
        $('#descripcionLicenciaMatch').html(objetoPaquete.detallePaquete.detalle.licenciaDescripcion);
    }else if(objetoPaquete.detallePaquete.nombre.includes("Unbox")){
        $('#unboxBanner').show();
        $('#licenciaUnbox').html(objetoPaquete.detallePaquete.detalle.licencia);
        $('#descripcionLicenciaUnbox').html(objetoPaquete.detallePaquete.detalle.licenciaDescripcion);
    }
    $('#cntPrecioPaqueteBar').html(objetoPaquete.detallePaquete.detalle.desc6ProntoPago);

    $('#cntNombrePaquete').html(objetoPaquete.detallePaquete.nombre);
    $('#cntPaqueteDescripcion').html(objetoPaquete.detallePaquete.descripcion);

    $('#cntMegas').html('Internet de '+ objetoPaquete.detallePaquete.detalle.megas);
    $('#cntMegasDetalle').html(objetoPaquete.detallePaquete.detalle.megasDetalle);
    $('#cntTVDetalle').html(objetoPaquete.detallePaquete.detalle.canales);
    $('#cntTVPromo').html(objetoPaquete.detallePaquete.detalle.promoCanales);

    

    $('#cntPrecioPaquete').html(objetoPaquete.detallePaquete.detalle.desc6ProntoPago);

    $('#cntCardMegas').html(objetoPaquete.detallePaquete.detalle.megas);
    $('#cntCardMegasPaquete').html(objetoPaquete.detallePaquete.detalle.descriMegasDetalle);
    $('#cntCardMegasDetalle').html(objetoPaquete.detallePaquete.detalle.promoMegasDetalle);

    //$('#cntCardTelevision').html(objetoPaquete.detallePaquete.detalle.promoCanales);
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

var showChannels = function (e) {
    /*Inicio AKHM*/
    obtenerCanales('10658');
    obtenerCanalesParrilla();
    /*Fin AKHM*/
    $("#modalChannels").fadeIn(250);
    event.preventDefault();
};

var hideChannels = function (e) {
    $("#modalChannels").fadeOut(250);
    event.preventDefault();
};
var showChannelsOver = function (e) {
    $("#channelsOverMdoal").fadeIn(250);
    event.preventDefault();
};
var hideChannelsOver = function (e) {
    $("#channelsOverMdoal").fadeOut(250);
    event.preventDefault();
};
var showFilters = function (item, e) {
    if ($('#' + item).is(":visible")) {
        $('#' + item).fadeOut(300);
        $('.filterToggleParagraph').removeClass('closeIconFilters');
    } else {
        $('#' + item).fadeIn(300);
        $('.filterToggleParagraph').addClass('closeIconFilters');
    }
    event.preventDefault();
};

/*AKHM modal canales*/
function obtenerCanalesParrilla(){
    $("body").on('click', '.botonParrilla', function() {

        
        var arregloTexto = ['80 canales, 35 en HD','120 canales, 80 en HD.','255 canales, 130 en HD.','275 canales, 160 en HD.']
        var tipo = $(this).attr('data-tipo');
        var tmCode = $(this).attr('data-code');

        $('#textoTipoParrilla').html('Disfruta de '+ arregloTexto[tipo]);
        $('#cntCanales').remove();
        $('.botonParrilla').removeClass('parrillaSeleccionada');
        $(this).addClass('parrillaSeleccionada');

        obtenerCanales(tmCode);
    });
}

function obtenerCanales(tmcode) {
    
    //consolo.log('', 'INICIANDO EL SERVICIO [obtener-canales]');
    let obtenerCanales = "https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/obtener-canales";
    
    $.ajax({
        url: obtenerCanales,
        data: JSON.stringify({'tmCode':tmcode}),
        dataType: "json",
        type: 'POST'
    }).done(function (respuesta) {
        //printConsole('', 'SERVICIO [obtener-canales] RESPONDE', respuesta);

        try{
            var informacion = respuesta.body;
            localStorage.setItem('TP_OF_OBJ_CANALES', JSON.stringify (respuesta.body) );

            var arrayCategoria = new Array();

            var htmlInterno = '';
            var totalCanales = 0;
            $.each( informacion, function( categoria, objListaCanales ) {
                /*[C=Canales][M=Mosaico][I=Apps]*/
                $.each( objListaCanales, function( key, objCanal ) {
                    if(objCanal.type == 'C'){
                        arrayCategoria.push(categoria);
                        return false;
                    }
                });
                /*[C=Canales][M=Mosaico][I=Apps]*/
                $.each( objListaCanales, function( key, objCanal ) {
                    if(objCanal.type == 'C'){
                        totalCanales++;
                        var srcImage = '';
                        if(objCanal.images['SUPER_LIGHT'] != undefined){
                            srcImage = 'https://imgn.cdn.iutpcdn.com/IMGS/CHANNEL/SUPER_LIGHT/'+objCanal.images['SUPER_LIGHT']['misId']+'-8c.'+objCanal.images['SUPER_LIGHT']['ext'];
                        }

                        htmlInterno += ''+
                            '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 content-channel" data-categoria="'+categoria+'" data-canal="'+objCanal.lchId+'">'+
                                '<div class="row">'+
                                    '<div class="col-12 mx-auto channelItem">'+
                                        '<div class="row channelItemImage">'+
                                            '<div class="col-12">'+
                                                '<img src="'+srcImage+'" width="50" width="100">'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="row channelItemName">'+
                                            '<div class="col-12 logo-channel">'+
                                                '<p>'+objCanal.number+'</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                    }
                        
                });
            });
            
            var htmlCategoria = '<div class="row filterItem filtroCanal" data-filtro="todos">'+
                    '<div class="col-12">'+
                        '<div class="form-check">'+
                            '<input class="form-check-input" type="radio" name="filterName" id="filterRadiotodos" value="filterName">'+
                            '<label class="form-check-label" for="filterRadio">'+
                                'Todos ('+totalCanales+')'+
                            '</label>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            $.each( arrayCategoria, function( index, categoria ) {
                var filtroNoSpaces = categoria;
                filtroNoSpaces = filtroNoSpaces.split(" ").join("");
                htmlCategoria += '<div class="row filterItem filtroCanal" data-filtro="'+categoria+'">'+
                        '<div class="col-12">'+
                            '<div class="form-check">'+
                                '<input class="form-check-input" type="radio" name="filterName" id="filterRadio'+filtroNoSpaces+'" value="filterName">'+
                                '<label class="form-check-label" for="filterRadio'+filtroNoSpaces+'">'+categoria+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            });
            
            $('#channelsContentList1').html('<div class="row" id="cntCanales">'+htmlInterno+'</div>');
            $('#filterCat').html(htmlCategoria);

            /*setTimeout(function(){
                $('#filterRadiotodos').prop('checked', true);
            },2000);*/

        }catch(e){            

            console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [obtenerCanales] ERROR[' + e+ ']');
        }
    }).fail(function (jqXHR, textStatus) {

        printConsole('ER', 'OCURRIO UN ERROR EN EL API [obtener-canales]', jqXHR);
    });

}

$("body").on('click', '.filtroCanal', function (evet) {
    event.preventDefault();

    var filtroSeleccionado = $(this).attr('data-filtro');

    if(filtroSeleccionado == 'todos'){
        $('.content-channel').show();
    }else{
        $.each( $('.content-channel'), function( key, html ) {
            var categoriaCanal = $(this).attr('data-categoria');

            if(filtroSeleccionado == categoriaCanal){
                $(this).show();
                var v = $(this).find("form-check-input");
            }
            if(filtroSeleccionado != categoriaCanal){
                $(this).hide();
            }
        });
    }
});