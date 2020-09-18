import * as Constantes from "../../utils/Constantes";
import {Paquetes} from '../paquetes/Paquetes';

export class ClaseCobertura {
    constructor() {
        this.init();
    }

    init() {
        console.group('ClaseCobertura.js FUNCION init()');
        this.validarPermisosUbicacion();
        //this.revisarcobertura();
        this.setListeners();
        console.groupEnd();
    }

    validarPermisosUbicacion() {
        var apuntador = this;

        if (localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME') == null) {
            var cabeceraMC = new Headers();
            cabeceraMC.append("Content-type", "application/json;charset=utf-8");

            fetch("https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/ip-geolocalizacion-ciudad", {
                method: 'POST',
                headers: cabeceraMC
            }).then(function (data) {
                if (data.ok) {
                    return data.json();
                } else {
                    throw "Error en la llamada Ajax fetch con parametros " + URL2LOAD;
                }
            }).then(function (texto) {
                try {
                    var respuesta = texto;

                    if (respuesta !== null || respuesta !== "") {
                        $('#cd-cobertura-index').html(respuesta);
                        $('#cd-cobertura-index-seccion').html(respuesta);
                        $('#cd-cobertura-index-span').html(respuesta);
                        localStorage.setItem('TP_STR_DIRECCION_CIUDAD_HOME', respuesta);
                        var path = window.location.pathname;
                        if(path.includes("/")){
                            path = "home";
                        }else{
                            path = path.replace("/","");
                            if(path.includes(".html")){
                                path = path.replace(".html","");
                            }
                        }
                        apuntador.checkEstimulo(localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME'),path);
                    }
                } catch (e) {
                    $('#cd-cobertura-index').html("Ciudad de México");
                    $('#cd-cobertura-index-seccion').html("Ciudad de México");
                    $('#cd-cobertura-index-span').html("Ciudad de México");
                    console.log("ERROR EN TRAER LA CIUDAD:", e);
                }
            }).catch(function (err) {
                $('#cd-cobertura-index').html("Ciudad de México");
                $('#cd-cobertura-index-seccion').html("Ciudad de México");
                $('#cd-cobertura-index-span').html("Ciudad de México");
                console.log("err=>", err);
            });

        } else {
            console.log('YA TIENE UNA CIUDAD PREDETERMINADA');
            $('#cd-cobertura-index').html(localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME'));
            $('#cd-cobertura-index-seccion').html(localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME'));
            $('#cd-cobertura-index-span').html(localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME'));
            
        }
    }

    obtenerDireccionNavegador(pos) {
        var info;
        if (pos.coords.latitude == null && pos.coords.latitude == undefined && pos.coords.longitude == null && pos.coords.longitude == undefined) { } else {
            info = {
                latitude: pos.coords.latitude,
                longitud: pos.coords.longitude
            };
            localStorage.setItem("DEBUG.COORDENADA.BROWSER", JSON.stringify(info));
        }
        console.log('COORDENADAS DEL NAVEGADOR:', info);

        $.ajax({
            contentType: "application/json",

            url: '/assets/media/datosDireccion.json',

            success: function (respuesta) {
                localStorage.setItem("DEBUG.MAPS.PAYLOAD", JSON.stringify(respuesta.payload));

                console.log('RESPUESTA DE SERVICIO [obtener-direccion-coordenadas]', respuesta);

                var objDireccionSeleccion;
                $.each(respuesta.payload, function (index, objDireccion) {
                    $.each(objDireccion.types, function (key, tipo) {
                        if (tipo == 'street_address' || tipo == 'premise') {
                            objDireccionSeleccion = objDireccion;
                        }
                    });
                });

                if (objDireccionSeleccion == null || objDireccionSeleccion == undefined) {
                    objDireccionSeleccion = respuesta.payload[0];
                }

                var direccionAproximada;
                try {
                    direccionAproximada = objDireccionSeleccion.formatted_address;
                    var arrayDireccion = direccionAproximada.split(',');
                    var calleNumero = arrayDireccion[0];

                    $('#calleModal').val(calleNumero);
                    $('#calleSection').val(calleNumero);
                    $('#txtCalle').val(calleNumero);

                    var regExCP = /(\d{5})/;
                    var arrayResultadoCP = regExCP.exec(direccionAproximada);

                    $('#cpModal').val(arrayResultadoCP[0]);
                    $('#cpSection').val(arrayResultadoCP[0]);
                    $('#txtCodigoPostal').val(arrayResultadoCP[0]);

                    if ($('#cpSection').val().length == 5) {
                        $('#cpSection').trigger('buscaciudad');
                    }

                } catch (e) {
                    console.log('NO SE ENCONTRO EL KEY [formatted_address] DEL OJETO [objDireccionSeleccion]');
                }
            },
            error: function (err) {
                console.log('OCURRIO UN ERROR EN EL API [obtener-direccion-coordenadas]', err);
            }
        });
    }

    permisoDenegado(error) {
        console.log('PERMISO DE  GEOLOCALIZACION DENEGADO POR EL USUARIO [' + error.message + ']');
    }

    revisarcobertura() {
        console.group('ClaseCobertura.js FUNCION revisarcobertura()');
        var strDireccion_LS_TMP = '';
        try {
            strDireccion_LS_TMP = localStorage.getItem('TP_STR_DIRECCION');
            console.log("VALOR LOCALSTORAGE[TP_STR_DIRECCION]:", strDireccion_LS_TMP);

            if (strDireccion_LS_TMP !== null && strDireccion_LS_TMP !== '') {
                strDireccion_LS_TMP = JSON.parse(strDireccion_LS_TMP);
                var strDireccion_LS = strDireccion_LS_TMP.direccionFormulario.direccion;

                if (!this.validarCampoVacio(strDireccion_LS_TMP.direccionFormulario.codigoPostal)) {
                    $('#cpModal').val(strDireccion_LS_TMP.direccionFormulario.codigoPostal);
                    $('#cpSection').val(strDireccion_LS_TMP.direccionFormulario.codigoPostal);
                    $('#txtCodigoPostal').val(strDireccion_LS_TMP.direccionFormulario.codigoPostal);
                }

                if (!this.validarCampoVacio(strDireccion_LS_TMP.direccionFormulario.ciudad)) {
                    $('#ciudadModal').val(strDireccion_LS_TMP.direccionFormulario.ciudad);
                    $('#ciudadSection').val(strDireccion_LS_TMP.direccionFormulario.ciudad);
                    $('#txtCiudad').val(strDireccion_LS_TMP.direccionFormulario.ciudad);
                } else {
                    $('#ciudadModal').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
                    $('#ciudadSection').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
                    $('#txtCiudad').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
                }

                let calleNumero = '';
                let calleNumeroTmp = strDireccion_LS.split(',');
                if (!this.validarCampoVacio(calleNumeroTmp[0])) {
                    calleNumero = calleNumeroTmp[0];

                    $('#calleModal').val(calleNumero);
                    $('#calleSection').val(calleNumero);
                    $('#txtCalle').val(calleNumero);
                    $("#validaCoberturaHeader").html(calleNumero);
                    $('#direccionPaquete').html(calleNumero);
                }
            } else {
                console.log("LOCALSTORAGE ESTA VACIO O ES NULL:", strDireccion_LS_TMP);
            }
        } catch (err) {
            console.log("OCURRIO UN ERROR EN LA FUNCION revisarcobertura():", err);
        }
        console.groupEnd();
    }

    setListeners() {
        let apuntador = this;
        var pathname = window.location.pathname;

        if (pathname !== '/contratacion.html' || pathname !== '/finaliza.html') {
            if (window.matchMedia("(max-width: 780px)").matches) {
                $(".txtdngcober").css("margin-top", "5px");
            }
        }

        $("#validaCoberturaHeader").on("click", function () {
            $("#barraServicios").css("display", "none");
            apuntador.mostrarModalCobertura();
        });

        $("#btnCoberturaSeccionPaquete").on("click", function () {
            apuntador.mostrarModalCobertura();
        });

        $("#closeModal").on("click", function () {
            $("#modalMenu").css("display", "none");
            $("body").removeAttr("style");
            $("#barraServicios").css("display", "flex");
            $("body").css({ "overflow-y": "scroll" });
        });

        $("#btnConfirmMsgCorreo").on("click", function () {
            $("#modalMenu").css("display", "none");
            $("body").removeAttr("style");
        });

        $("#btnCoberturaText").on("click", function () {
            $("#modalMenu").css("display", "block");
            //$("#modalContentForm").css("top", "0");
            $("body").css({ "overflow-y": "scroll" });
            $("#step0").css("display", "flex");
            $("#step1").css("display", "none");
            $("#step2").css("display", "none");
            $("#btnCoberturaText").css("display", "none");
            $('#botonValidarCobertura').attr('disabled', '');
            $('#botonValidarCobertura').addClass('btnDeshabilitado');
            $('#botonValidarCobertura').addClass('textWhite');
        });

        $("#iconEnviar").on("click", function (e) {
            e.preventDefault();
            var correo = $.trim($('#headerCorreo2').val());
            var procesa = true;
            if (apuntador.esVacio(correo)) {
                $("#errorCorreo2").css("display", "block");
                $("#errorCorreo2").html("*Campo obligatorio");
                procesa = false;
            } else {
                if (!apuntador.validaEmail(correo)) {
                    $("#errorCorreo2").css("display", "block");
                    $("#errorCorreo2").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            var pathname = window.location.pathname;

            if (procesa) {
                if (pathname.includes("contratacion")) {
                    $('#iconEnviar').hide();
                    $('#iconoEnviando').show();
                } else {
                    $("#correoCargador").css("display", "flex");
                    $("#cargadorCorreo").css("display", "flex");
                    $("#formCorreo").css("display", "none");
                    $("#btnCoberturaText").css("display", "none");
                }
                apuntador.sinFactibilidad(correo);
            }

        });

        $("#botonValidarCobertura").on("click", function (e) {
            e.stopImmediatePropagation();
            var calle = $.trim($('#calleModal').val());
            var ciudad = $.trim($('#ciudadModal').val());
            var codigoPostal = $.trim($('#cpModal').val());
            var procesa = apuntador.validarFormulario(calle, codigoPostal, 'errorCalleH','errorCodigoH');
            console.log("procesa = "+procesa);
            if (procesa) {

                var objetoDireccionFormulario = {
                    "direccionFormulario":{
                        "codigoPostal":$('#cpModal').val(),
                        "ciudad":$('#cd-cobertura-index').html(),
                        "direccion":$('#calleModal').val()
                    }
                };
                localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(objetoDireccionFormulario));

                $("#modalMenu").css("display", "block");
                $("#step0").css("display", "none");
                $("#step1").css("display", "flex");
                $("#confirmCorreo").css("display", "none");
                $("#btnCoberturaText").css("display", "none");

                var direccion = calle;

                if (localStorage.getItem('SUGERENCIA_SELECCIONADA') == undefined
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == null
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == ''
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == 0
                ) {
                    direccion = calle + ' ' + codigoPostal + ' ' + ciudad;
                }
                
                $("#botonValidarCobertura").html('Validando <i class="fas fa-circle-notch fa-spin" style="color: white;"></i>');
                apuntador.buscarDireccion(direccion);
            }
        });

        $('#btnCoberturaSeccion').on('click', function (e) {
            //e.preventDefault();
            e.e.stopImmediatePropagation();
            var calle = $.trim($('#calleSection').val());
            var ciudad = $.trim($('#ciudadSection').val());
            var codigoPostal = $.trim($('#cpSection').val());
            var procesa = apuntador.validarFormulario(calle, codigoPostal, 'errorCalle', 'errorcp');
            if (procesa) {

                var objetoDireccionFormulario = {
                    "direccionFormulario": {
                        "codigoPostal": $('#cpSection').val(),
                        "ciudad": $('#ciudadSection').val(),
                        "direccion": $('#calleSection').val()
                    }
                };
                localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(objetoDireccionFormulario));

                $("#modalMenu").css("display", "block");
                $("body").css({ "overflow-y": "hidden" });
                $("#step0").css("display", "none");
                $("#step1").css("display", "flex");
                $("#confirmCorreo").css("display", "none");
                $("#btnCoberturaText").css("display", "none");

                var direccion = calle;

                if (localStorage.getItem('SUGERENCIA_SELECCIONADA') == undefined
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == null
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == ''
                    || localStorage.getItem('SUGERENCIA_SELECCIONADA') == 0
                ) {
                    direccion = calle + ' ' + codigoPostal + ' ' + ciudad;
                }

                apuntador.buscarDireccion(direccion);
            }
        });

        /***KEYUP INPUTS INDEX***/
        $('#calleModal').on("keyup", function () {
            $("#errorCalleH").css("display", "none");
            /***EVENTO TOMADO DE COBERTURASUGERENCIA.JS***/
            var calleNumero = $(this).val(); 
            var codigoPostal = $('#cpModal').val(); 
            apuntador.iniciarAutocompletadoModal(calleNumero, codigoPostal);
        });

        $('#noExtModal').on("keyup", function () {
            $("#errorNumH").css("display", "none");
        });

        $('#cpModal').on("keyup", function (e) {
            e.stopImmediatePropagation();
            $("#errorCodigoH").css("display", "none");
            /***EVENTO TOMADO DE COBERTURASUGERENCIA.JS***/
            var codigoPostal = $('#cpModal').val();
            if(codigoPostal.length == 5){
                apuntador.buscarCiudad(codigoPostal, 'calleModal');
            }
        });

        $('#headerCorreo2').on("keyup", function () {
            $("#errorCorreo2").css("display", "none");
        });
        /***KEYUP INPUTS INDEX***/

        /***KEYPRESS INDEX***/
        $('.letras').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú";
            var especiales = [8, 37, 39];
            var especialesNO = [39];

            var tecla_especial = false
            for (var i in especiales) {
                if (key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if (key == especialesNO[i]) {
                    tecla_especial = false;
                    break;
                }
            }

            if (letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        });

        $('.direccion').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú1234567890";
            var especiales = [8, 37, 39];
            var especialesNO = [39];

            var tecla_especial = false
            for (var i in especiales) {
                if (key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if (key == especialesNO[i]) {
                    tecla_especial = false;
                    break;
                }
            }

            if (letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        });

        $('.solo-numeros').keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        /***KEYPRESS INDEX***/


        /***EVENTOS COBERTURASUGERENCIA**/
        $('#cpSection').bind('buscaciudad', function () {
            var codigoPostal = $('#cpSection').val();
            apuntador.buscarCiudad(codigoPostal, 'calleModal');
        });

        $("body").on('keyup', '#calleSection', function () {
            var calleNumero = $(this).val();
            var codigoPostal = $('#cpSection').val();
            apuntador.iniciarAutocompletadoSeccion(calleNumero, codigoPostal);
        });

        $("body").on('keyup', '#txtCalle', function () {
            var calleNumero = $(this).val();
            var codigoPostal = $('#txtCodigoPostal').val();
            apuntador.iniciarAutocompletadoContrata(calleNumero, codigoPostal);
        });

        $("body").on('click', '.pac-item', function () {
            var direccion = $(this).attr('data-dir-text');
            try {
                $('#calleModal').val(direccion);
                $('#calleSection').val(direccion);
                $('#txtCalle').val(direccion);

                $('#listDireccionesModal').hide();
                $('#listDireccionesSeccion').hide();
                $('#listDirecciones').hide();

                $("#botonValidarCobertura").removeClass('btnDeshabilitado');
                $("#botonValidarCobertura").removeClass('textWhite');
                $("#botonValidarCobertura").removeAttr('disabled');

                $("#btnCoberturaSeccion").removeClass('btnDeshabilitado');
                $("#btnCoberturaSeccion").removeClass('textWhite');
                $("#btnCoberturaSeccion").removeAttr('disabled');

                $("#btnContinuar").removeClass('btnDeshabilitado');
                $("#btnContinuar").removeClass('textWhite');
                $("#btnContinuar").removeAttr('disabled');

                localStorage.setItem('SUGERENCIA_SELECCIONADA', 1);

            } catch (error) {
                console.err('OCURRIO ALGO INESPERADO EN CLICK DE SUGERENCIAS DIRECCION:', error);
            }
        });

        $('#cpSection').on("keyup", function () {
            var codigoPostal = $('#cpSection').val();
            if (codigoPostal.length == 5) {
                $('#ciudadSection').val('');
                $('#calleSection').val('');
                apuntador.buscarCiudad(codigoPostal, 'calleSection');
            }
        });
        /***EVENTOS COBERTURASUGERENCIA**/
    }

    mostrarModalCobertura() {
        $("#modalMenu").css("display", "block");
        $("body").css({ "overflow-y": "hidden" });
        //$("#modalContentForm").css("top", "0");
        $("#calleModal").focus();
        $("#step0").css("display", "flex");
        $("#step1").css("display", "none");
        $("#step2").css("display", "none");
        $("#btnCoberturaText").css("display", "none");
    }

    sinFactibilidad(correo) {
        var url = Constantes.endpoints.guardarSinFactibilidad;
        console.log(url);
        var parametros = { "correo": correo };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(parametros),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {
            console.log(respuesta);
            var pathname = window.location.pathname;

            if (pathname.includes("contratacion")) {
                $('#iconoEnviando').hide();
                $('#iconEnviar').show();

                $('#ventanaGracias').css('display', 'flex');
                $('#capaVentanaGracias').css('opacity', '1');
                $('#contenidoVentanaGracias').css('opacity', '1');
                $('#formVentanaGracias').css('display', 'block');
                $('#mensajeVentanaGracias').css('display', 'flex');

            } else {
                $("#correoCargador").css("display", "none");
                $("#cargadorCorreo").css("display", "none");
                $("#btnConfirmMsgCorreo").addClass("btn__outline__blue");
                $("#btnConfirmMsgCorreo").html("Ok, gracias");

                $("#titleFormMessage22").html("Nos pondremos en contacto contigo cuándo tengamos cobertura en tu hogar.");
                $("#confirmCorreo").css("display", "flex");
                $("#titleFormStep2").css("display", "none");
                $("#subtitleFormStep2").css("display", "none");
                $("#formCorreo").css("display", "none");
                $("#iconoMsgCoreo").addClass("blue-symbol");
            }
            if (respuesta.codigo != 0) { }

        }).catch(err => {
            console.log("error" + err);
        });
    }

    buscarDireccion(direccion) {
        let apuntador = this;
        console.log('CONSULTANDO LA DIRECCION [' + direccion + '] CON REVERSE CODE');

        apuntador.consultarCoordenada(direccion).then(function (infoCoordenas) {
            //buscar consultarCoordenada en log anterior del sourcetree
            console.log('EL SERVICIO REVERSE CODE RESPONDE:', infoCoordenas);
            if (infoCoordenas != undefined && infoCoordenas != null && infoCoordenas != '') {
                console.log("voy a validarFactibilidad");
                apuntador.validarFactibilidad({
                    latitud: infoCoordenas.geometry.location.lat,
                    longitud: infoCoordenas.geometry.location.lng,
                    codigoPostal: infoCoordenas.codigoPostal,
                    ciudad: "",
                    colonia: infoCoordenas.colonia
                }, direccion);
            } else {
                $("#step1").css("display", "none");
                $("#step2").css("display", "flex");
                $("#btnCoberturaText").css("display", "flex");
                $("body").css({ "overflow-y": "hidden" });
                $("#titleFormStep2").html("Totalplay a&uacute;n no est&aacute; disponible en " + direccion);
                $("#titleFormStep2").css("display", "flex");

                /* CONTRATACION */
                $('#tituloCobertura').hide();
                $('#cargador').hide();
                $("#step2").css("display", "flex");
                $("#btnCoberturaText").css("display", "flex");
                $("#confirmCorreo").css("display", "none");
                $("#cargadorCorreo2").css("display", "none");
                $("#titleFormStep2").html("Totalplay a&uacute;n no est&aacute; disponible en " + direccion);
                $("#titleFormStep2").css("display", "flex");
                $("#subtitleFormStep2").css("display", "none");
                $("#botonValidarCobertura").html('Quiero que me llamen');

                apuntador.limpiarDatos();
                apuntador.removerCoordenadas();
                $("#validaCoberturaHeader").html("VALIDAR COBERTURA");
            }
        });
    }

    async consultarCoordenada(direccion) {
        let referenciaClase = this;
        var url = Constantes.endpoints.consultarCoordenadas;
        var data = JSON.stringify({ "direccion": direccion });

        let response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {
            localStorage.setItem("DEBUG.MAPS.PAYLOAD", JSON.stringify(respuesta.payload));
            console.log('RESPUESTA DE SERVICIO [obtener-direccion-coordenadas]', respuesta);
            var objDir;
            var objCoordenadas;
            var objDireccionSeleccion;
            var direccionAproximada = direccion;

            $.each(respuesta.payload, function (index, objDireccion) {
                objDir = {
                    'coordenadas': objDireccion.geometry.location,
                    'direccion': objDireccion.formatted_address,
                };
                objCoordenadas = {
                    latitud: objDireccion.geometry.location.lat,
                    longitud: objDireccion.geometry.location.lng
                };
                objDireccionSeleccion = objDireccion;
                objDir = objDireccion;

                direccionAproximada = objDireccion.formatted_address;
            });

            var estado = "";
            var colonia = "";
            var codigoPostal = "";
            var numeroDireccion = "S/N";
            var nombreCalle = "";
            var delegacionMunicipio = '';
            var localidad = '';
            Object.keys(objDireccionSeleccion.address_components).forEach(key => {
                var componenteDireccion = objDireccionSeleccion.address_components[key];
                if (componenteDireccion.types[0] == "administrative_area_level_1") {
                    estado = componenteDireccion.long_name;
                }
                if (componenteDireccion.types[0] == "political" && componenteDireccion.types[1] == "sublocality" && componenteDireccion.types[2] == "sublocality_level_1") {
                    colonia = componenteDireccion.short_name;
                }
                if (componenteDireccion.types[0] == "postal_code") {
                    codigoPostal = componenteDireccion.short_name;
                }
                if (componenteDireccion.types[0] == "street_number") {
                    numeroDireccion = componenteDireccion.short_name;
                }
                if (componenteDireccion.types[0] == "administrative_area_level_2") {
                    localidad = componenteDireccion.short_name;
                }
                if (componenteDireccion.types[0] == "route") {
                    nombreCalle = componenteDireccion.short_name;
                }
                if (componenteDireccion.types[0] == 'locality' && componenteDireccion.types[1] == 'political') {
                    delegacionMunicipio = componenteDireccion.short_name;
                }
            });
            if (localidad == '' || colonia == '') {
                if (localidad == '') {
                    Object.keys(objDireccionSeleccion.address_components).forEach(key => {
                        var componenteDireccion = objDireccionSeleccion.address_components[key];
                        if (componenteDireccion.types[0] == 'locality' && componenteDireccion.types[1] == 'political') {
                            localidad = componenteDireccion.short_name;
                        }
                    });
                }
                if (colonia == '') {
                    Object.keys(objDireccionSeleccion.address_components).forEach(key => {
                        var componenteDireccion = objDireccionSeleccion.address_components[key];
                        if (componenteDireccion.types[0] == 'neighborhood' && componenteDireccion.types[1] == 'political') {
                            colonia = componenteDireccion.short_name;
                        }
                    });
                }
            }

            if (estado == 'Ciudad de México' || estado == 'CDMX' || estado == 'México D.F.') {
                delegacionMunicipio = $('#ciudadModal').val();
            }

            var infoDireccion = {
                "direccionAproximada": direccionAproximada,
                "estado": estado,
                "colonia": colonia,
                "codigoPostal": codigoPostal,
                "numeroDireccion": numeroDireccion,
                "nombreCalle": nombreCalle,
                "localidad": localidad,
                "delegacionMunicipio": delegacionMunicipio,
            };

            objDir.codigoPostal = codigoPostal;
            objDir.colonia = colonia;

            let objeto = { "coordenadas": objCoordenadas, "infoDireccion": infoDireccion }
            referenciaClase.actualizarObjetoDireccion('DIR_CALCULADA', objeto);
            return objDir;
        }).catch(function (err) {
            console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [consultarCoordenada] ERROR', err);
            return null;
        });
        return response;
    }

    validarFactibilidad(informacion, direccion) {
        //console.log('INFORMACION PARA FACTIBILIDAD');
        //console.log(JSON.stringify(informacion));
        let apuntador = this;
        let urlFac = Constantes.endpoints.validarFactibilidad;
        var datos = JSON.stringify({"secdata": otpyrc2(JSON.stringify(informacion))});

        fetch(urlFac, {
            method: 'POST',
            body: datos,
            headers: { 'Content-Type': 'application/json' }
        }).then(data => {
            if (data.ok) {
                return data.json();
            } else {
                throw "Error en la llamada Ajax load sin parametros";
            }
        }).then(respuesta => {
            //console.log('RESPUESTA FACTIBILIDAD COBERTURA.JS');
            //console.log(respuesta);
            
            if (respuesta.status == 0) {
                let objeto = { "factibilidad": respuesta.bean }
                apuntador.actualizarObjetoDireccion('DIR_FACTIBILIDAD', objeto);

                var strDireccion_LS = localStorage.getItem('TP_OF_STR_DIRECCION');
                $('#txtDireccion').html(strDireccion_LS);
                $('#txtDireccionObtenida').html(strDireccion_LS);


                if (respuesta.bean.factibilidad == '1') {

                    localStorage.setItem('TP_ESTIMULO_CIUDAD', respuesta.bean.estimulofiscal);

                    apuntador.pintarDireccionHeader();
                } else {
                    $("#step1").css("display", "none");
                    $("#step2").css("display", "flex");
                    $("#btnCoberturaText").css("display", "flex");
                    $("body").css({ "overflow-y": "hidden" });

                    $("#titleFormStep2").html("Totalplay a&uacute;n no est&aacute; disponible en " + direccion);
                    $("#subtitleFormStep2").html("¡Pero pronto estaremos cerca! Ingresa tu correo para mantenerte informado.");

                    $("#titleFormStep2").css("display", "flex");
                    $("#subtitleFormStep2").css("display", "flex");

                    $("#formCorreo").css("display", "flex");

                    apuntador.limpiarDatos();
                    apuntador.removerCoordenadas();
                    $("#validaCoberturaHeader").html("VALIDAR COBERTURA");
                    $("#botonValidarCobertura").html('Quiero que me llamen');
                }
            } else {
                console.log('WR', 'RESPUESTA DE FACTIBILIDAD: STATUS[' + respuesta.status + '] DESCRIPCION[' + respuesta.descripcion + ']');
                //$("#modalMenu").css("display", "none");
                //apuntador.mostrarModalCobertura();
                $("#botonValidarCobertura").html('Quiero que me llamen');
            }

        }).catch(err => {
            console.log("error" + err);
            //$("#modalMenu").css("display", "none");
            //apuntador.mostrarModalCobertura();
            $("#botonValidarCobertura").html('Quiero que me llamen');
        });
    }

    limpiarDatos() {
        $("#calleSection").val("");
        $("#numeroSection").val("");
        $("#cpSection").val("");
        $('#errorCalle').val("");
        $('#errorNum').val("");
        $('#errorcp').val("");
        $('#headerCorreo2').val("");
        $('#errorCorreo2').val("");
        $("#calleModal").val("");
        $("#noExtModal").val("");
        $("#cpModal").val("");
        $('#errorCalleH').val("");
        $('#errorNumH').val("");
        $('#errorcpH').val("");
        $('#ciudadModal').val("");
        $('#ciudadSection').val("");

        $("#txtCalle").val("");
        $("#txtNoExterior").val("");
        $("#txtCodigoPostal").val("");
        $('#errortxtCalle').val("");
        $('#errorNoExterior').val("");
        $('#errorCodigoPostal').val("");
        $('#headerCorreo2').val("");
        $('#errorCorreo2').val("");
        $('#txtCiudad').val('');
    }

    removerCoordenadas() {
        let obetoDireccion;
        let cadenaDireccion = localStorage.getItem('TP_STR_DIRECCION');
        let objetoMemoria;
        try {
            objetoMemoria = JSON.parse(cadenaDireccion);
        } catch (error) { }

        obetoDireccion = {
            "direccionFormulario": objetoMemoria.direccionFormulario
        }

        localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
    }

    actualizarObjetoDireccion(tipo, objeto) {

        let obetoDireccion;
        let cadenaDireccion = localStorage.getItem('TP_STR_DIRECCION');
        let objetoMemoria;
        try {
            objetoMemoria = JSON.parse(cadenaDireccion);
        } catch (error) { }

        if (tipo == 'DIR_CALCULADA') {
            obetoDireccion = {
                "direccionFormulario": objetoMemoria.direccionFormulario,
                "direccionCalculada": objeto.infoDireccion,
                "coordenadas": objeto.coordenadas
            }

            localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
        }

        if (tipo == 'DIR_FACTIBILIDAD') {
            obetoDireccion = {
                "direccionFormulario": objetoMemoria.direccionFormulario,
                "direccionCalculada": objetoMemoria.direccionCalculada,
                "coordenadas": objetoMemoria.coordenadas,
                "factibilidad": objeto.factibilidad
            }

            localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
        }
    }

    pintarDireccionHeader() {

        //$("#modalMenu").css("display", "none");
        //$("#step1").css("display", "none");
        window.location = 'detallePaquete.html';
    }

    resize() {
        var pathname = window.location.pathname;

        if (pathname !== '/contratacion.html' || pathname !== '/finaliza.html') {
            window.addEventListener('resize', () => {
                if (window.matchMedia("(max-width: 780px)").matches) {
                    $(".txtdngcober").css("margin-top", "5px");
                } else {
                    $(".txtdngcober").css("margin-top", "-25px");
                }
            });
        }
    }

    eventoOcultarRecomendaciones() {

        $("#modalContentForm").on("click", function () {
            $("#listDireccionesModal").css("display", "none");
        });

        $("#cobertura").on("click", function () {
            $("#listDireccionesSeccion").css("display", "none");
        });
    }

    buscarCiudad(codigoPostal, idCampoFocus){
        
        
        $.ajax({
            url: Constantes.endpoints.buscarCiudad,
            data: JSON.stringify({"codigoPostal": codigoPostal}),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            try {
                $.each(respuesta.datos.informacion.ArrColonias, function (key, infoColonias) {
                    if (infoColonias.DelegacionMunicipio != null && infoColonias.DelegacionMunicipio != '') {
                        let nombreCiudad = infoColonias.DelegacionMunicipio;
                        $('#ciudadModal').val(nombreCiudad);
                        
                    }
                });
            } catch (error) {
                
            }
        }).fail(function(jqXHR, textStatus) {
            console.log('ER', 'OCURRIO UN ERROR EN EL API [buscar-ciudad-cp]', jqXHR);
        });
    }

    iniciarAutocompletadoSeccion(calleNumero, codigoPostal) {
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: calleNumero + " " + codigoPostal + " Mexico" },
            referenciaClase.buscarSugerenciasSeccion
        );
    }

    iniciarAutocompletadoModal(calleNumero, codigoPostal) {
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: calleNumero + " " + codigoPostal + " Mexico" },
            referenciaClase.buscarSugerenciasModal
        );
    }

    iniciarAutocompletadoContrata(calleNumero, codigoPostal) {
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: calleNumero + " " + codigoPostal + " Mexico" },
            referenciaClase.buscarSugerenciasContrata
        );
    }

    buscarSugerenciasSeccion(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        var htmlLista = '';
        predictions.forEach(function (prediction) {
            var infoDireccion = JSON.stringify(prediction.terms);
            htmlLista += `<div class="pac-item" data-dir-text="${prediction.description}" data-dir='${infoDireccion}''>
                <span class="pac-item-query">
                    <span class="pac-matched">${prediction.description}</span>
                </span>
            </div>`;
        });

        $('#listDireccionesSeccion').html(htmlLista);
        $('#listDireccionesSeccion').show();
    }

    buscarSugerenciasModal(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        var htmlLista = '';

        predictions.forEach(function (prediction) {
            var infoDireccion = JSON.stringify(prediction.terms);
            htmlLista += `<div class="pac-item" data-dir-text="${prediction.description}" data-dir='${infoDireccion}''>
                <span class="pac-item-query">
                    <span class="pac-matched">${prediction.description}</span>
                </span>
            </div>`;
        });

        $('#listDireccionesModal').html(htmlLista);
        $('#listDireccionesModal').show();
    }

    buscarSugerenciasContrata(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        var htmlLista = '';
        predictions.forEach(function (prediction) {
            var infoDireccion = JSON.stringify(prediction.terms);
            htmlLista += `<div class="pac-item" data-dir-text="${prediction.description}" data-dir='${infoDireccion}''>
                <span class="pac-item-query">
                    <span class="pac-matched">${prediction.description}</span>
                </span>
            </div>`;
        });

        $('#listDirecciones').html(htmlLista);
        $('#listDirecciones').show();
    }

    /***INICIO VALIDACIONES***/
    validarCampoVacio(valor) {
        let bandera = false;
        if (valor == undefined || valor == null || valor == '' || valor == 'null' || valor == 'undefined') {
            bandera = true;
        }
        return bandera;
    }

    esVacio(valor) {
        try {
            if (valor != 'undefined' && valor != null) {
                var value = $.trim(valor);
                if (value === null || value.length === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } catch (e) {
            return true;
        }
    }

    validacp(cp) {
        var response = false;
        var reCP = /^\d{5}$/;

        if (cp.length > 0) {
            if (cp.match(reCP)) {
                response = true;
            }
        }
        return response;
    }

    validaEmail(email) {
        var response = false;
        var reEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email.length > 0) {
            if (email.match(reEmail)) {
                response = true;
            }
        }
        return response;
    }

    validarFormulario(calle, cp, errorCalle, errorCP) {
        console.group('FUNCION validarFormulario()');
        var procesa = true;
        let apuntador = this;
        if (apuntador.esVacio(calle)) {
            console.log('VALOR DE CALLES ES VACIO');
            $('#' + errorCalle).css("display", "block");
            $('#' + errorCalle).html("*Campo obligatorio");
            procesa = false;
        }

        if (apuntador.esVacio(cp)) {
            console.log('VALOR DE CP ES VACIO');
            $('#' + errorCP).css("display", "block");
            $('#' + errorCP).html("*Campo obligatorio");
            procesa = false;
        } else {
            if (!apuntador.validacp(cp)) {
                console.log('VALOR DE CP NO ES DE 5 DIGITOS');
                $('#' + errorCP).css("display", "block");
                $('#' + errorCP).html("*Campo no v&aacute;lido");
                procesa = false;
            }
        }
        console.log('RESULTADO PROCESA[' + procesa + ']');
        console.groupEnd();
        return procesa;
    }
    /***FIN VALIDACIONES***/

    checkEstimulo(ciudad,opt){
        
        var bandera = false;
        var arregloFronterizo = ['Ciudad Juárez','Ensenada','Mexicali','Rosarito','Tijuana'];
        
        $.each(arregloFronterizo,function(index,item){
            
            if(item == ciudad){
            //if(item == "Tijuana"){
                console.log("si item "+item);
                bandera = true;
                //localStorage.setItem("TP_ESTIMULO_FISCAL","true");
            }else{
                //localStorage.setItem('TP_ESTIMULO_FISCAL','false');
            }            
        })

        if(bandera){
            localStorage.setItem("TP_ESTIMULO_FISCAL","true");
        }else{
            localStorage.setItem("TP_ESTIMULO_FISCAL","false");
        }
        const paq = new Paquetes();
        paq.cargarPaquetes(opt);
    }
}