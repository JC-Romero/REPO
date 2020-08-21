import * as Constantes from "../../utils/Constantes";
export class Cobertura {
    constructor() {
        this.init();
    }
    init() {
        this.validarPermisosUbicacion();
        this.revisarcobertura();
        this.setListeners();
        this.setKeyupInput();
        this.validaciones();
        var pathname = window.location.pathname;

        if (window.matchMedia("(max-width: 780px)").matches) {
            $(".txtdngcober").css("margin-top", "5px");
        }
        this.resize();
        this.eventoOcultarRecomendaciones();
    }

    validarCampoVacio(valor){
        let bandera = false;
        if(valor == undefined || valor == null || valor == ''|| valor == 'null'|| valor == 'undefined'){
            bandera = true;
        }
        return bandera;
    }

    setListeners() {
        let apuntador = this;
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

        $("#closeModal2").on("click", function () {
            $("#modalMenu2").css("display", "none");
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
            var calle = $.trim($('#calleModal').val());
            var ciudad = $.trim($('#ciudadModal').val());
            var codigoPostal = $.trim($('#cpModal').val());
            var procesa = apuntador.validarFormulario(calle, codigoPostal, 'errorCalleH','errorCodigoH');
            if (procesa) {

                var objetoDireccionFormulario = {
                    "direccionFormulario":{
                        "codigoPostal":$('#cpModal').val(),
                        "ciudad":$('#ciudadModal').val(),
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

                if( localStorage.getItem('SUGERENCIA_SELECCIONADA') == undefined 
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == null 
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == ''
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == 0
                ){
                    direccion = calle + ' '+ codigoPostal + ' '+ ciudad;
                }
                
                apuntador.buscarDireccion(direccion);
            }
        });

        $('#btnCoberturaSeccion').on('click', function (e) {
            e.preventDefault();
            var calle = $.trim($('#calleSection').val());
            var ciudad = $.trim($('#ciudadSection').val());
            var codigoPostal = $.trim($('#cpSection').val());
            var procesa = apuntador.validarFormulario(calle,  codigoPostal, 'errorCalle', 'errorcp');
            if (procesa) {

                var objetoDireccionFormulario = {
                    "direccionFormulario":{
                        "codigoPostal":$('#cpSection').val(),
                        "ciudad":$('#ciudadSection').val(),
                        "direccion":$('#calleSection').val()
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

                if( localStorage.getItem('SUGERENCIA_SELECCIONADA') == undefined 
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == null 
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == ''
                || localStorage.getItem('SUGERENCIA_SELECCIONADA') == 0
                ){
                    direccion = calle + ' '+ codigoPostal + ' '+ ciudad;
                }

                apuntador.buscarDireccion(direccion);
            }
        });
    }

    buscarDireccion(direccion) {
        let apuntador = this;
        //console.log('CONSULTANDO LA DIRECCION ['+direccion+'] CON REVERSE CODE');

        apuntador.consultarCoordenada(direccion).then(function (infoCoordenas) {
            //console.log('EL SERVICIO REVERSE CODE RESPONDE:', infoCoordenas);
            if (infoCoordenas != undefined && infoCoordenas != null && infoCoordenas != '') {

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

                apuntador.limpiarDatos();
                apuntador.removerCoordenadas();
                $("#validaCoberturaHeader").html("VALIDAR COBERTURA");
            }
        });
    }

    async consultarCoordenada(direccion) {
        let referenciaClase = this;
        var url=  '/assets/media/datosDireccion.json';
        var data = JSON.stringify({ "direccion": direccion });

        let response = await fetch(url, {
            
        }).then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {
            localStorage.setItem("DEBUG.MAPS.PAYLOAD", JSON.stringify(respuesta.payload));
            //console.log('RESPUESTA DE SERVICIO [obtener-direccion-coordenadas]', respuesta);
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

            let objeto = {"coordenadas": objCoordenadas, "infoDireccion":infoDireccion}
            referenciaClase.actualizarObjetoDireccion('DIR_CALCULADA', objeto);

            return objDir;
        }).catch(function (err) {
            //console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [consultarCoordenada] ERROR', err);
            return null;
        });
        return response;
    }

    validarFactibilidad(informacion, direccion) {
        //console.log('INFORMACION PARA FACTIBILIDAD');
        //console.log(JSON.stringify(informacion));
        let apuntador = this;
        let urlFac = '/assets/media/factibilidad.json';
        var datos = JSON.stringify({"secdata": otpyrc2(JSON.stringify(informacion))});

        fetch(urlFac, {
            
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
                let objeto = {"factibilidad": respuesta.bean}
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
                }
            } else {
                //console.log('WR', 'RESPUESTA DE FACTIBILIDAD: STATUS[' + respuesta.status + '] DESCRIPCION[' + respuesta.descripcion + ']');
                $("#modalMenu").css("display", "none");
                apuntador.mostrarModalCobertura();
            }

        }).catch(err => {
            //console.log("error" + err);
            $("#modalMenu").css("display", "none");
            apuntador.mostrarModalCobertura();
        });
    }

    sinFactibilidad(correo) {
        var url = Constantes.endpoints.guardarSinFactibilidad;
        //console.log(url);
        var parametros = { "correo": correo };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(parametros),
            headers: {'Content-Type': 'application/json'}
        }).then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {
            //console.log(respuesta);
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
            //console.log("error" + err);
        });
    }

    pintarDireccionHeader() {
        $("#modalMenu").css("display", "none");
        $("#step1").css("display", "none");
        window.location = 'paquetes.html';
    }

    revisarcobertura() {
        if(!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_CP'))){
            $('#cpModal').val(localStorage.getItem('TP_OF_STR_CP'));
            $('#cpSection').val(localStorage.getItem('TP_OF_STR_CP'));
        }

        /*if(!this.validarCampoVacio(localStorage.getItem('TP_CIUDAD_CONSULTA'))){
            $('#ciudadModal').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
            $('#ciudadSection').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
        }*/
        if(!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_DELEGACION_MUNICIPIO'))){
            $('#ciudadModal').val(localStorage.getItem('TP_OF_STR_DELEGACION_MUNICIPIO'));
            $('#ciudadSection').val(localStorage.getItem('TP_OF_STR_DELEGACION_MUNICIPIO'));
        }else{
            $('#ciudadModal').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
            $('#ciudadSection').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
        }

        let calleNumero = '';
        if(!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_CALLE'))){
            calleNumero = localStorage.getItem('TP_OF_STR_CALLE');

            if(!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_NUMERO_DIR'))){
                calleNumero = localStorage.getItem('TP_OF_STR_CALLE') + ' '+ localStorage.getItem('TP_OF_STR_NUMERO_DIR');
            }

            $('#calleModal').val(calleNumero);
            $('#calleSection').val(calleNumero);
            $("#validaCoberturaHeader").html(calleNumero);
            $('#direccionPaquete').html(calleNumero);
        }
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

    validarFormulario(calle, cp, errorCalle, errorCP) {
        var procesa = true;
        let apuntador = this;
        if (apuntador.esVacio(calle)) {
            //console.log('VALOR DE CALLES ES VACIO');
            $('#' + errorCalle).css("display", "block");
            $('#' + errorCalle).html("*Campo obligatorio");
            procesa = false;
        }

        if (apuntador.esVacio(cp)) {
            //console.log('VALOR DE CP ES VACIO');
            $('#' + errorCP).css("display", "block");
            $('#' + errorCP).html("*Campo obligatorio");
            procesa = false;
        } else {
            if (!apuntador.validacp(cp)) {
                //console.log('VALOR DE CP NO ES DE 5 DIGITOS');
                $('#' + errorCP).css("display", "block");
                $('#' + errorCP).html("*Campo no v&aacute;lido");
                procesa = false;
            }
        }
        
        return procesa;
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
    }

    setKeyupInput() {
        $('#calleModal').on("keyup", function () {
            $("#errorCalleH").css("display", "none");
        });

        $('#noExtModal').on("keyup", function () {
            $("#errorNumH").css("display", "none");
        });

        $('#cpModal').on("keyup", function () {
            $("#errorCodigoH").css("display", "none");
        });

        $('#headerCorreo2').on("keyup", function () {
            $("#errorCorreo2").css("display", "none");
        });
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

    validaciones() {
        var apuntador = this;

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
    }

    resize() {
        window.addEventListener('resize', () => {
            if (window.matchMedia("(max-width: 780px)").matches) {
                $(".txtdngcober").css("margin-top", "5px");
            } else {
                $(".txtdngcober").css("margin-top", "-25px");
            }
        });
    }

    removerCoordenadas() {
        let obetoDireccion;
        let cadenaDireccion = localStorage.getItem('TP_STR_DIRECCION');
        let objetoMemoria;
        try {
            objetoMemoria = JSON.parse(cadenaDireccion);
        } catch (error) {}

        obetoDireccion = {
            "direccionFormulario":objetoMemoria.direccionFormulario
        }

        localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
    }

    eventoOcultarRecomendaciones(){

        $("#modalContentForm").on("click", function () {
            $("#listDireccionesModal").css("display", "none");
        });

        $("#cobertura").on("click", function () {
            $("#listDireccionesSeccion").css("display", "none");
        });
    }


    validarPermisosUbicacion() {
        if(localStorage.getItem('TP_CIUDAD_CONSULTA')==null || localStorage.getItem('TP_OF_STR_DIRECCION')==null){
            //console.log("PERMITIR UBICACION***************");
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(this.obtenerDireccionNavegador, this.permisoDenegado, {
                    enableHighAccuracy: true,
                    timeout: Infinity,
                    maximumAge: 0
                });
            } else {
                //console.error('NAVEGADOR NO SOPORTA GEOLOCALIZACION');
            }
        }else{
            //console.error('YA TIENE UNA UBICACION PREDETERMINADA');
        }
    }

    obtenerDireccionNavegador(pos) {
        var info;
        if (pos.coords.latitude == null && pos.coords.latitude == undefined && pos.coords.longitude == null && pos.coords.longitude == undefined) {} else {
            info = {
                latitude: pos.coords.latitude,
                longitud: pos.coords.longitude
            };
            localStorage.setItem("DEBUG.COORDENADA.BROWSER", JSON.stringify(info));
        }
        //console.log('COORDENADAS DEL NAVEGADOR:', info);

        $.ajax({
            contentType: "application/json",
            url:'/assets/media/datosDireccion.json',
            
            success: function(respuesta) {
                localStorage.setItem("DEBUG.MAPS.PAYLOAD", JSON.stringify(respuesta.payload));

                var objDireccionSeleccion;
                $.each(respuesta.payload, function( index, objDireccion ) {
                    $.each( objDireccion.types , function( key, tipo ) {
                        if(tipo == 'street_address' || tipo == 'premise'){
                            //console.log('OBJETO STREET ADDRESS ENCONTRADO EN', objDireccion.formatted_address);
                            objDireccionSeleccion = objDireccion;
                        }
                    });
                });

                if(objDireccionSeleccion == null || objDireccionSeleccion == undefined){
                    objDireccionSeleccion = respuesta.payload[0];
                }

                //console.log('***************VALOR ACTUAL DE [objDireccionSeleccion]', objDireccionSeleccion);

                var direccionAproximada;
                try{
                    direccionAproximada = objDireccionSeleccion.formatted_address;
                    var arrayDireccion = direccionAproximada.split(',');
                    var calleNumero = arrayDireccion[0];
                    
                    $('#calleModal').val(calleNumero);
                    $('#calleSection').val(calleNumero);
                     
                    var regExCP = /(\d{5})/;
                    var arrayResultadoCP = regExCP.exec(direccionAproximada);
                    
                    $('#cpModal').val(arrayResultadoCP[0]);
                    $('#cpSection').val(arrayResultadoCP[0]);
                    
                    if($('#cpSection').val().length == 5){
                        //$('#cpSection').trigger('keyup');
                        $('#cpSection').trigger('buscaciudad');
                    }

                }catch(e){
                    //console.log( 'NO SE ENCONTRO EL KEY [formatted_address] DEL OJETO [objDireccionSeleccion]');
                }
            },
            error: function(err) {
                //console.log( 'OCURRIO UN ERROR EN EL API [obtener-direccion-coordenadas]', err);
            }
        });
    }

    permisoDenegado(error) {
        //console.log('PERMISO DE  GEOLOCALIZACION DENEGADO POR EL USUARIO [' + error.message+ ']');
    }

    actualizarObjetoDireccion(tipo, objeto){

        let obetoDireccion;
        let cadenaDireccion = localStorage.getItem('TP_STR_DIRECCION');
        let objetoMemoria;
        try {
            objetoMemoria = JSON.parse(cadenaDireccion);
        } catch (error) {}

        if(tipo == 'DIR_CALCULADA'){
            obetoDireccion = {
                "direccionFormulario":objetoMemoria.direccionFormulario,
                "direccionCalculada":objeto.infoDireccion,
                "coordenadas": objeto.coordenadas
            }

            localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
        }

        if(tipo == 'DIR_FACTIBILIDAD'){
            obetoDireccion = {
                "direccionFormulario":objetoMemoria.direccionFormulario,
                "direccionCalculada":objetoMemoria.direccionCalculada,
                "coordenadas": objetoMemoria.coordenadas,
                "factibilidad": objeto.factibilidad
            }

            localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(obetoDireccion));
        }
    }
}