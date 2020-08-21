import * as Constantes from "../../utils/Constantes";

export class FinalizaContratacion {
    constructor() {
        this.props = {
            indicator: 0,
            mainBody: document.getElementsByTagName('body'),
            btnEditTitular: document.getElementById('editTitularData'),
            btnEditInstallation: document.getElementById('editInstallationData'),
            btnEditPayment: document.getElementById('editPaymentData'),
            botonTitularContinuar: document.getElementById('botonTitularContinuar'),
            btnInstallationData: document.getElementById('btnInstallationData'),
            btnPaymentData: document.getElementById('btnPaymentData'),
            botonFinaliza: document.getElementById('botonFinaliza'),
            formTitularData: document.getElementById('formTitularData'),
            formInstallationData: document.getElementById('formInstallationData'),
            resumePayments: document.getElementById('resumePayment'),
            formPayCardData: document.getElementById('caseCardPayment'),
            formPayCashData: document.getElementById('caseCashPayment'),
            resumeTitularData: document.getElementById('resumeTitularData'),
            formMapData: document.getElementById('formMapData'),
            resumeInstallationData: document.getElementById('resumeInstallationData'),
            casePayments: document.getElementById('casePayments'),
            calendarResume: document.getElementById('calendarResume'),
            btnPaymentCard: document.getElementById('btnPaymentCard'),
            btnPaymentCash: document.getElementById('btnPaymentCash'),
            btnPayHome: document.querySelector('.btn__outline__blue_square'),
            btnDirectionCopy: document.getElementById('btnDirectionCopy'),
            valuesInstallDirectionCard: document.getElementById('valuesInstallDirectionCard'),
            valuesInstallDirectionCash: document.getElementById('valuesInstallDirectionCash'),
            inputsInstallDirection: document.getElementById('inputsInstallDirection'),
            panels: [...document.querySelectorAll('.main-summary__invoice-data--info')],
            folioContent: document.getElementById('folio-content'),
            maincontainer: document.querySelector('.section-contratacion'),
            containerSteps: document.querySelector('.container-steps--contratacion'),
            progressBar: document.querySelector('.contratacion--top-bar__steps'),
            stepItem: [...document.querySelectorAll('.container-steps--contratacion__step')],
            window: window.innerWidth,
            contStep: 2,
            currentStep: 2,
            userData: null,
            lsgStorage: window.localStorage,
            scheduleInstall: 'de 10 a 14 hrs',
            topNextPanel: 0,
            intentos :0,
            aceptaDomiciliacion : false,
            infoFechas: [],
            jsonparams : {},
            banderaINE : true,
            banderaComprobante : true,
            banderaRFC : true,
            extensionINE : '',
            extensionCOMPROBANTE : '',
            extensionRFC : '',
            banderaGuardoArchivos : false, 
            tipoCliente: 0,
            aniobisiesto : false
        }
        this.init();
    }

    init() {
        this.props.jsonparams = {};
        let referenciaClase = this;
        window.scrollTo(0, 0);
        this.props.btnEditTitular.classList.add('inactive');
        this.props.btnEditPayment.classList.add('inactive');
        this.props.resumeTitularData.style.cssText = 'display: none;';
        this.props.resumePayments.style.cssText = 'display: none;';
        this.props.formPayCashData.style.cssText = 'display: none;';
        this.props.valuesInstallDirectionCard.style.cssText = 'display: none;';
        for (let x = 1; x < this.props.panels.length; x++) {
            this.props.panels[x].style.cssText = 'display: none;';
        }
        this.checkPayment();
        this.eventosBotones();
        this.eventoSeleccionHorario();
        this.eventoTarjetaBIN();

        let objDireccion = this.obtenerObjetoDireccion();
        $('#etiquetaDireccion').html(objDireccion.direccionCalculada.direccionAproximada);

        //https://bootstrap-datepicker.readthedocs.io/en/latest/
        $.fn.datepicker.dates['es'] = {
            days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            daysMin: ["D", "L", "M", "M", "J", "V", "S"],
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            today: "Hoy",
            clear: "Limpiar",
            format: "dd/mm/yyyy",
            titleFormat: "MM yyyy",
            weekStart: 0,
        };
        this.querys();
        this.pintarAnio();
        this.pintarAnioTarjeta();
        //this.querysPersonas();
    } 

    querys() {
        let clase = this;
        var x = window.matchMedia("(max-width: 500px)");
        this.funcionQuery(x);
        x.addListener(this.funcionQuery);
    }

    funcionQuery(x) {     
        if (x.matches) { // If media query matches
            $('#btnDatosFisica').html('P. F&Iacute;SICA');
            $('#btnDatosMoral').html('P. MORAL'); 
        } else {
            $('#btnDatosFisica').html('PERSONA F&Iacute;SICA');
            $('#btnDatosMoral').html('PERSONA MORAL');
        }
    }

    querysPersonas() {
        let clase = this;
        var x = window.matchMedia("(max-width: 767px)");
        this.funcionQueryPersonas(x);
        x.addListener(this.funcionQuery);
    }

    funcionQueryPersonas(x) {     
        console.log("**** ",x.matches)
        if (x.matches) { // If media query matches
            $("#divRFCmoral").css("cssText", "width:100% !important");
            console.log("**** macheo")
        } else {
            $("#divRFCmoral").css("cssText", "width:40% !important");
            console.log("**** no macheo")
        }
    }    
    
    setInitValues() {
        let emailUser = document.getElementById('titularEmail');
        let mobileUser = document.getElementById('titularCellPhone');
        let lsgUserInfo = JSON.parse(this.props.lsgStorage.getItem('lsgUserData'));
        this.props.userData = {
            email: lsgUserInfo.email,
            mobile: lsgUserInfo.mobile
        }
        emailUser.value = this.props.userData.email;
        mobileUser.value = this.props.userData.mobile
    }

    obtenerFechaFormato(fecha){
        const mesesArreglo = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const diasArreglo = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        
        let fechaActual = fecha.valueOf();
        let fechaSeleccionada = new Date(fechaActual);
        let fechaFormato = fechaSeleccionada.getDate() + " de " + mesesArreglo[fechaSeleccionada.getMonth()] + " del " + fechaSeleccionada.getFullYear();
        
        var nombreDia = diasArreglo[fechaSeleccionada.getDay()];

        return nombreDia + ' ' + fechaFormato;
    }

    getInstallDirection() {
        let instalacionCP = document.getElementById('instalacionCP');
        let instalacionMunicipio = document.getElementById('instalacionMunicipio');
        let instalacionColonia = document.getElementById('instalacionColonia');
        let instalacionCalle = document.getElementById('instalacionCalle');
        let instalacionNoExt = document.getElementById('instalacionNoExt');
        let instalacionNoInt = document.getElementById('instalacionNoInt');
        this.props.userData = {
            cp: instalacionCP.value,
            municipio: instalacionMunicipio.value,
            colonia: instalacionColonia.value,
            calle: instalacionCalle.value,
            noExt: instalacionNoExt.value,
            noInt: instalacionNoInt.value
        }
    }

    actualizarDatosDireccion() {
        let referenciaClase = this;

        $('#direccionFacturacionCalle').html($('#facturacionCalle').val());
        $('#direccionFacturacionNumero').html($('#facturacionNumero').val());
        $('#direccionFacturacionColonia').html($('#facturacionColonia').val());
        $('#direccionFacturacionMunicipio').html($('#facturacionMunicipio').val());
        $('#direccionFacturacionCP').html($('#facturacionCP').val());
        $('#direccionFacturacionEstado').html($('#facturacionEstado').val());

        let objetoDireccion = referenciaClase.obtenerObjetoDireccion();

        $('#direccionFacturacionCalleEfectivo').html(objetoDireccion.direccionCalculada.nombreCalle);
        $('#direccionFacturacionNumeroEfectivo').html(objetoDireccion.direccionCalculada.numeroDireccion);
        $('#direccionFacturacionColoniaEfectivo').html(objetoDireccion.direccionCalculada.colonia);
        $('#direccionFacturacionMunicipioEfectivo').html(objetoDireccion.direccionFormulario.ciudad);
        $('#direccionFacturacionCPEfectivo').html(objetoDireccion.direccionFormulario.codigoPostal);
        $('#direccionFacturacionEstadoEfectivo').html(objetoDireccion.direccionCalculada.estado);
    }

    checkPayment() {
        let btnCheckList = [...document.querySelectorAll('.pay-check')];
        btnCheckList.forEach(element => {
            element.addEventListener('click', () => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                } else {
                    element.classList.add('active');
                }
            });
        });
    }

    eventosBotones() {
        let referenciaClase = this;

        let tooltip = document.querySelector('#tooltip-index');
        let tooltipE = document.querySelector('#tooltip-indexE');

        document.querySelector('.ico-question').addEventListener('click',()=> {
            if(tooltip.classList.contains('visible')){
                    tooltip.classList.remove('visible');
            }else{
                tooltip.classList.add('visible');
            }
        });

        document.querySelector('.ico-questionE').addEventListener('click',()=> {
            if(tooltipE.classList.contains('visible')){
                    tooltipE.classList.remove('visible');
            }else{
                tooltipE.classList.add('visible');
            }
        });

        $("#titularNombre, #titularApellidoPaterno, #titularApellidoMaterno, #nombreTarjeta, #facturacionColonia, #facturacionMunicipio, #facturacionEstado").keypress(function(e){
            let letraCapturada = String.fromCharCode(e.which);
            var regex = /[a-zA-ZÑñ\sáéíóúÁÉÍÓÚ]/;
            var result = regex.test(letraCapturada);
            return result;
        });
        
        $("#titularTelefono, #titularCelular, #facturacionCP").keypress(function(e){
            //console.log('LETRA:', String.fromCharCode(e.which));
            let letraCapturada = String.fromCharCode(e.which);
            var regex = /[0-9]/;
            var result = regex.test(letraCapturada);
            //console.log('result:', result);
            return result;
        });
        
        $("#titularRFC").keypress(function(e){
            //console.log('LETRA:', String.fromCharCode(e.which));
            let letraCapturada = String.fromCharCode(e.which);
            var regex = /[a-zA-ZÑñ0-9]/;
            var result = regex.test(letraCapturada);
            //console.log('result:', result);
            return result;
        });

        $('input[type=radio][name=documento]').change(function() {
            switch (this.value) {
                case '1':
                    $('#titularIdentificacionTarjeta').html('INE/IFE');
                    break;
                case '2':
                    $('#titularIdentificacionTarjeta').html('Pasaporte');
                    break;
                case '3':
                    $('#titularIdentificacionTarjeta').html('C&eacute;dula profesional');
                    break;
                default:{
                    $('#titularIdentificacionTarjeta').html('');
                }
            } 
        });

        this.props.botonTitularContinuar.addEventListener('click', () => {
            if(referenciaClase.validarCamposTitular()){
                if($('#btnDatosFisica').hasClass('botonSeleccionado')){
                    let titularNombre = $('#titularNombre').val().trim();
                    let titularApellidoPaterno = $('#titularApellidoPaterno').val().trim();
                    let titularApellidoMaterno = $('#titularApellidoMaterno').val().trim();
                    let titularRFC = $('#titularRFC').val().trim();
                    let titularTelefono = $('#titularTelefono').val().trim();
                    let titularCelular = $('#titularCelular').val().trim();

                    $('#titularNombreTarjeta').html(titularNombre + ' ' +titularApellidoPaterno+ ' ' +titularApellidoMaterno);
                    $('#titularRFCTarjeta').html(titularRFC);
                    $('#titularCorreoTarjeta').html($('#email').val());
                    
                    $('#titularTelefonoTarjeta').html(titularTelefono);
                    $('#titularCelularTarjeta').html(titularCelular);
                    $('#titularIdentificacionTarjeta').html('INE/IFE y Comprobante de domicilio');

                    let objetoTitular = {
                        "nombreCompleto": titularNombre + ' ' +titularApellidoPaterno+ ' ' +titularApellidoMaterno,
                        "nombre": titularNombre,
                        "apellidoPaterno": titularApellidoPaterno,
                        "apellidoMaterno": titularApellidoMaterno,
                        "celular": titularCelular,
                        "telefono": titularTelefono,
                        "rfc": titularRFC,
                        "tipo": "fisica"
                    };
                    referenciaClase.actualizarClienteTitular(objetoTitular);
                    referenciaClase.props.tipoCliente = 1;
                }else{
                    let razonSocial = $('#razonSocial').val().trim();
                    let diaMoral = $('#diaMoral').val().trim();
                    let mesMoral = $('#mesMoral').val().trim();
                    let anioMoral = $('#anioMoral').val().trim();
                    let rfcMoral = $('#rfcMoral').val().trim();
                    let nombreMoral = $('#nombreMoral').val().trim();
                    let apellidosMoral = $('#apellidosMoral').val().trim();
                    let titularCelular = $('#titularCelular').val().trim();

                    $('#titularNombreTarjeta').html(nombreMoral + ' ' +apellidosMoral);
                    $('#titularRFCTarjeta').html(rfcMoral);
                    $('#titularCorreoTarjeta').html($('#email').val());
                    $('#titularIdentificacionTarjeta').html('INE/IFE, Comprobante de domicilio y Constancia de Situaci&oacute;n Fiscal');
                    
                    $('#titularTelefonoTarjeta').html(titularCelular);
                    $('#titularCelularTarjeta').html(titularCelular);

                    let objetoTitular = {
                        "nombreCompleto": nombreMoral + ' ' +apellidosMoral,
                        "nombre": nombreMoral,
                        "apellidos": apellidosMoral,
                        "rfc": rfcMoral,
                        "razonSocial": razonSocial,
                        "constitucionDia":diaMoral,
                        "constitucionMes":mesMoral,
                        "constitucionAnio":anioMoral,
                        "tipo": "moral"
                    };
                    referenciaClase.actualizarClienteTitular(objetoTitular);
                    referenciaClase.props.tipoCliente = 2;
                }

                this.props.formTitularData.style.cssText = 'display: none;';
                this.props.resumeTitularData.style.cssText = 'display: flex;';
                this.props.btnEditTitular.style.cssText = 'display: flex;';
                this.props.panels[1].style.cssText = 'display: flex; padding: 0;';

                setTimeout(function() {
                    $('html,body').animate({scrollTop: $("#formaPago" ).offset().top - 90}, 'slow');
                }, 100);
            }
        });

        this.props.btnPaymentData.addEventListener('click', () => {
            
            if($('#btnPaymentCard').hasClass("botonSeleccionado") && referenciaClase.validarCamposTarjeta()){
                console.log('PAGO CON TARJETA');
                $('.contenedorTarjetaResumen').show();

                let titularTarjeta = $('#nombreTarjeta').val();
                let digitosTarjeta = $('#numeroTarjetaCaptura').val().substr($('#numeroTarjetaCaptura').val().length - 4);;
                
                $('#nombreTarjetaResumen').html(titularTarjeta);
                $('#numeroTarjetaResumen').html('**** - **** - **** - ' + digitosTarjeta);
                $('#vigenciaTarjetaResumen').html($('#mesTarjetaCaptura').val() + ' / ' + $('#anioTarjetaCaptura').val());
                $('#tipoPago').html('DOMICILIADO');

                let direccionCalle = $('#facturacionCalle').val().trim();
                let direccionNumero = $('#facturacionNumero').val().trim();
                let direccionColonia = $('#facturacionColonia').val().trim();
                let direccionMunicipio = $('#facturacionMunicipio').val().trim();
                let direccionCP = $('#facturacionCP').val().trim();
                let direccionEstado = $('#facturacionEstado').val().trim();

                let objetoFormaPago = {
                    "tipoPago" : "tarjeta",
                    "calleNombre": direccionCalle,
                    "calleNumero": direccionNumero,
                    "colonia": direccionColonia,
                    "municipio": direccionMunicipio,
                    "codigoPostal": direccionCP,
                    "estado": direccionEstado
                }

                referenciaClase.actualizarClienteFormaPago(objetoFormaPago);

                $('#direccionResumen').html(direccionCalle + ' ' +direccionNumero+ ', ' +direccionColonia+ ', ' +direccionMunicipio+ ', ' +direccionCP+ ', ' +direccionEstado);
                $('#btnPaymentData').attr('disabled', '');
                $('#btnPaymentData').addClass('btnDeshabilitado');
                $('.iconoPrevencion').show();
                console.log('SETEANDO VALOR TRUE PARA GUARDADO DE TARJETAS');
                
                $('#ventanaFinaliza').css('display','flex');
                $('#capaFinaliza').css('opacity','1');
                $('#contenidoFinaliza').css('opacity','1');

                referenciaClase.simularVenta(referenciaClase);
            } 

            if($('#btnPaymentCash').hasClass("botonSeleccionado") ) {
                console.log('PAGO CON EFECTIVO');
                let objetoDireccion = referenciaClase.obtenerObjetoDireccion();

                let objetoFormaPago = {
                    "tipoPago" : "efectivo",
                    "calleNombre":objetoDireccion.direccionCalculada.nombreCalle,
                    "calleNumero":objetoDireccion.direccionCalculada.numeroDireccion,
                    "colonia":objetoDireccion.direccionCalculada.colonia,
                    "municipio":objetoDireccion.direccionFormulario.ciudad,
                    "codigoPostal":objetoDireccion.direccionFormulario.codigoPostal,
                    "estado":objetoDireccion.direccionCalculada.estado,
                }

                referenciaClase.actualizarClienteFormaPago(objetoFormaPago);

                $('.contenedorTarjetaResumen').hide();
                $('#tipoPago').html('EN EFECTIVO');
                $('#direccionResumen').html(objetoDireccion.direccionCalculada.direccionAproximada);

                $('#btnPaymentData').attr('disabled', '');
                $('#btnPaymentData').addClass('btnDeshabilitado');
                $('.iconoPrevencion').show();
                
                $('#ventanaFinaliza').css('display','flex');
                $('#capaFinaliza').css('opacity','1');
                $('#contenidoFinaliza').css('opacity','1');

                referenciaClase.simularVenta(referenciaClase);
            }
        });

        this.props.botonFinaliza.addEventListener('click', () => {
            $('#botonFinaliza').attr('disabled', '');
            $('#botonFinaliza').addClass('btnDeshabilitado');
            $('.iconoFinalizar').show();

            if($('#datepicker').datepicker("getDate") != null){
                var fechaInfo = referenciaClase.obtenerFechaFormato($('#datepicker').datepicker("getDate"));

                let turno = '';
                let horaInstalacion = 0;
                if($('#botonHorarioMatutino').hasClass('btnInstalacionActivo')){
                    turno = 'matutino';
                    horaInstalacion = 11;
                }
                if($('#botonHorarioVespertino').hasClass('btnInstalacionActivo')){
                    turno = 'verpertino';
                    horaInstalacion = 4;
                }

                localStorage.setItem('TP_CLIENTE_FECHA_INSTALACION', 'Viernes 28 de Agosto del 2020');
                window.location = 'finaliza.html';
            }                
        });
        
        this.props.btnPaymentCard.addEventListener('click', () => {
            this.props.formPayCashData.style.cssText = 'display: none;';
            this.props.formPayCardData.style.cssText = 'display: inline;';
            this.props.btnPaymentCard.classList.add('botonSeleccionado');
            this.props.btnPaymentCash.classList.remove('botonSeleccionado');
        });

        this.props.btnPaymentCash.addEventListener('click', () => {
            this.props.formPayCardData.style.cssText = 'display: none;';
            this.props.formPayCashData.style.cssText = 'display: inline;';
            this.props.btnPaymentCash.classList.add('botonSeleccionado');
            this.props.btnPaymentCard.classList.remove('botonSeleccionado');
            
            this.actualizarDatosDireccion();
        });
        
        this.props.btnEditTitular.addEventListener('click', () => {
            this.props.resumeTitularData.style.cssText = 'display: none;';
            this.props.formTitularData.style.cssText = 'display: block;';
            this.props.btnEditTitular.style.cssText = 'display: none;';
        });

        this.props.btnEditPayment.addEventListener('click', () => {
            this.props.btnEditPayment.style.cssText = 'display: none;';
            this.props.casePayments.style.cssText = 'display: ;';
            this.props.resumePayments.style.cssText = 'display: none;';

            $('.main-summary__invoice-data--info').css('padding-top','0px');
            $('.main-summary__invoice-data--info').css('padding-bottom','0px');
        });
        
        this.props.btnDirectionCopy.addEventListener('click', () => {

            let objetoDireccion = referenciaClase.obtenerObjetoDireccion();

            $('#facturacionCalle').val(objetoDireccion.direccionCalculada.nombreCalle);
            $('#facturacionNumero').val(objetoDireccion.direccionCalculada.numeroDireccion);
            $('#facturacionColonia').val(objetoDireccion.direccionCalculada.colonia);
            $('#facturacionMunicipio').val(objetoDireccion.direccionFormulario.ciudad);
            $('#facturacionCP').val(objetoDireccion.direccionFormulario.codigoPostal,);
            $('#facturacionEstado').val(objetoDireccion.direccionCalculada.estado,);
        });

        $('#btnDatosFisica').on('click',function(){
            $('#btnDatosFisica').addClass('botonSeleccionado');
            $('#btnDatosMoral').removeClass('botonSeleccionado');
            $('#divPersonaMoral').css('display','none');
            $('#divPersonaFisica').css('display','flex');

            $('#tituloConstanciaRFC').css('display','none');
            $('#subtituloConstanciaRFC').css('display','none');
            $('#contenedorSubeArchivoRFC').css('display','none');
        });

        $('#btnDatosMoral').on('click',function(){
            $('#btnDatosMoral').addClass('botonSeleccionado');
            $('#btnDatosFisica').removeClass('botonSeleccionado');
            $('#divPersonaFisica').css('display','none');
            $('#divPersonaMoral').css('display','flex');

            $('#tituloConstanciaRFC').css('display','flex');
            $('#subtituloConstanciaRFC').css('display','flex');
            $('#contenedorSubeArchivoRFC').css('display','flex');
        });

        $("#contenedorSubeArchivoINE").click(function () {
            if(referenciaClase.props.banderaINE){
                $("#inputFileINE").click();
                referenciaClase.props.banderaINE = true;
            }
        });

        $("#contenedorSubeArchivoComprobante").click(function () {
            if(referenciaClase.props.banderaComprobante){
                $("#inputFileComprobante").click();
                referenciaClase.props.banderaComprobante = true;
            }
        });

        $("#contenedorSubeArchivoRFC").click(function () {
            if(referenciaClase.props.banderaRFC){
                $("#inputFileRFC").click();
                referenciaClase.props.banderaRFC = true;
            }
        });

        $("#inputFileINE").change(function (){
            $('#errorArchivoINE').css('display','none');
            $('#contenedorSubeArchivoINE').css('border', '1px dashed #1A76D2');
            var propiedadesArchivo = $('#inputFileINE').prop('files');
            var archivo = $('#inputFileINE').val();
            if(referenciaClase.validaExtensionFile(archivo,1)){
                //Archivo válido
                $('#iconoSubeINE').css('display','none');
                $("#divArchivoIdentificacion").html('<i class="far fa-file-alt"></i>&nbsp;&nbsp;<span>'+propiedadesArchivo[0].name+'</span>');
                $('#eliminarIdentificacion').show();

                var filIdeOfi = document.getElementById("inputFileINE")!=null ? document.getElementById("inputFileINE").files[0]:"";
                var arrayPromesas = [];
                arrayPromesas.push(referenciaClase.getFileB64(filIdeOfi,"filIdeOfi"));

                Promise.all(arrayPromesas).then(function(result){
                        console.log("extension ... "+referenciaClase.props.extensionINE);
                        referenciaClase.props.jsonparams.fileINE = result[0].b64;
                        referenciaClase.props.jsonparams.extINE = referenciaClase.props.extensionINE;

                        //console.log("JSON PARAMS "+JSON.stringify(referenciaClase.props.jsonparams));
                }).catch(err=>{
                    console.error("Error en promesa base64:" + err);
                });

            }else{
                $('#errorArchivoINE').css('display','block')
            }
            
        });

        $('#eliminarIdentificacion').on('click',function(event){
            referenciaClase.props.banderaINE = false;
            event.preventDefault();
            setTimeout(function(){
                referenciaClase.props.banderaINE = true;
            },100);
            console.log("bandera click basura "+referenciaClase.props.banderaINE);
            $("#inputFileINE").val(null);
            $('#iconoSubeINE').css('display','block');
            $("#divArchivoIdentificacion").html('Agrega tu documento adicional pdf o jpg. Máx. 5Mb.');
            $('#eliminarIdentificacion').hide();
        });

        $("#inputFileComprobante").change(function (){
            $('#errorArchivoComprobante').css('display','none');
            $('#contenedorSubeArchivoComprobante').css('border', '1px dashed #1A76D2');
            var propiedadesArchivo = $('#inputFileComprobante').prop('files');
            var archivo = $('#inputFileComprobante').val();

            if(referenciaClase.validaExtensionFile(archivo,2)){
                $('#iconoSubeComprobante').css('display','none');
                $("#divArchivoComprobante").html('<i class="far fa-file-alt"></i>&nbsp;&nbsp;<span>'+propiedadesArchivo[0].name+'</span>');
                $('#eliminarComprobante').show();

                var filIdeOfi = document.getElementById("inputFileComprobante")!=null ? document.getElementById("inputFileComprobante").files[0]:"";
                var arrayPromesas = [];
                arrayPromesas.push(referenciaClase.getFileB64(filIdeOfi,"filIdeOfi"));

                Promise.all(arrayPromesas).then(function(result){
                        referenciaClase.props.jsonparams.fileComprobante = result[0].b64;
                        referenciaClase.props.jsonparams.extCOMPROBANTE = referenciaClase.props.extensionCOMPROBANTE;

                        //console.log("JSON PARAMS "+JSON.stringify(referenciaClase.props.jsonparams));
                }).catch(err=>{
                    console.error("Error en promesa base64:" + err);
                });
            }else{
                $('#errorArchivoComprobante').css('display','block')
            }
            
        });

        $('#eliminarComprobante').on('click',function(event){
            referenciaClase.props.banderaComprobante = false;
            event.preventDefault();
            setTimeout(function(){
                referenciaClase.props.banderaComprobante = true;
            },100);
            $("#inputFileComprobante").val(null);
            $('#iconoSubeComprobante').css('display','block');
            $("#divArchivoComprobante").html('Agrega tu documento adicional pdf o jpg. Máx. 5Mb.');
            $('#eliminarComprobante').hide();
        });

        $("#inputFileRFC").change(function (){
            $('#errorArchivoRFC').css('display','none');
            $('#contenedorSubeArchivoRFC').css('border', '1px dashed #1A76D2');
            var propiedadesArchivo = $('#inputFileRFC').prop('files');
            var archivo = $('#inputFileRFC').val();

            if(referenciaClase.validaExtensionFile(archivo,3)){
                $('#iconoSubeRFC').css('display','none');
                $("#divArchivoRFC").html('<i class="far fa-file-alt"></i>&nbsp;&nbsp;<span>'+propiedadesArchivo[0].name+'</span>');
                $('#eliminarConstancia').show();

                var filIdeOfi = document.getElementById("inputFileRFC")!=null ? document.getElementById("inputFileRFC").files[0]:"";
                var arrayPromesas = [];
                arrayPromesas.push(referenciaClase.getFileB64(filIdeOfi,"filIdeOfi"));

                Promise.all(arrayPromesas).then(function(result){
                        referenciaClase.props.jsonparams.fileRFC = result[0].b64;
                        referenciaClase.props.jsonparams.extRFC = referenciaClase.props.extensionRFC;

                        console.log("JSON PARAMS "+JSON.stringify(referenciaClase.props.jsonparams));
                }).catch(err=>{
                    console.error("Error en promesa base64:" + err);
                });

            }else{
                $('#errorArchivoRFC').css('display','block')
            }

        });

        $('#eliminarConstancia').on('click',function(event){
            referenciaClase.props.banderaRFC = false;
            event.preventDefault();
            setTimeout(function(){
                referenciaClase.props.banderaRFC = true;
            },100);
            $("#inputFileRFC").val(null);
            $('#iconoSubeRFC').css('display','block');
            $("#divArchivoRFC").html('Agrega tu documento adicional pdf o jpg. Máx. 5Mb.');
            $('#eliminarConstancia').hide();
        });

        $('#anioMoral').on('change',function(){
            var valor = $('#anioMoral').val();
            if(valor != 0){
                $('#mesMoral').css('pointer-events','all');
            }else{
                $('#mesMoral').css('pointer-events','none');
            }

            if ((valor % 4 == 0) && (( valor % 100 != 0) || (valor % 400 ==0))){
                referenciaClase.props.aniobisiesto = true;
            }else{
                referenciaClase.props.aniobisiesto = false;
            }
        });

        $('#mesMoral').on('change',function(){
            var valorMes = $('#mesMoral').val();
            console.log("¿año bisiesto? "+referenciaClase.props.aniobisiesto);
            if(valorMes != "0"){
                var tope = 0;
                if(valorMes == "02" && referenciaClase.props.aniobisiesto){
                    tope = 29;
                }else if(valorMes == "02"){
                    tope = 28;
                }else if((valorMes == "04") || (valorMes == "06") || (valorMes == "09") || (valorMes == "11")){
                    tope = 30;
                }else{
                    tope = 31;
                }
                if(tope != 0){
                    var html = "<option value='0'>DD</option>";
                    for(var i = 1; i <= tope; i++){
                        if(i < 10){
                            html += "<option value='0"+i+"'>0"+i+"</option>";
                        }else{
                            html += "<option value='"+i+"'>"+i+"</option>";
                        }

                    }
                    $('#diaMoral').html(html);
                }
                $('#diaMoral').css('pointer-events','all');
            }else{
                $('#diaMoral').css('pointer-events','none');
            }
        });
    }

    nextStep() {
        this.props.contStep++;
        this.props.movList = (100 * this.props.contStep) + (1.95 * this.props.contStep);
        this.props.containerSteps.style.cssText = `transform: translateX(-${(this.props.movList)}%); transition: all .3s ease-in;`;
        this.props.stepItem[3].removeAttribute('style');
        this.props.maincontainer.style.cssText = 'height: auto; overflow: auto;';
        this.props.progressBar.style.cssText = 'opacity: 0;';

        if (this.props.currentStep == 3) {
            setTimeout(() => {
                this.props.stepItem[0].style.cssText = 'height: 0; opacity: 0;';
                this.props.stepItem[1].style.cssText = 'height: 0; opacity: 0;';
                this.props.stepItem[2].style.cssText = 'height: 0; opacity: 0;';
            }, 200);
        }
    }

    resize() {
        window.addEventListener('resize', () => {});
    }

    //**********************************************************************
    validarCamposTitular(){
        console.log('EJECUTANDO VALIDACION DE CAMPOS DEL TITULAR');
        let validacion = true;
        let referenciaClase = this;

        if($('#btnDatosFisica').hasClass('botonSeleccionado')){
            console.log("persona fisica");
            referenciaClase.props.jsonparams.nodocts = 2;

            let titularNombre = $('#titularNombre').val().trim();
            let titularApellidoPaterno = $('#titularApellidoPaterno').val().trim();
            let titularApellidoMaterno = $('#titularApellidoMaterno').val().trim();
            let titularRFC = $('#titularRFC').val().trim();
            let titularTelefono = $('#titularTelefono').val().trim();
            let titularCelular = $('#titularCelular').val().trim();
            let inputINE = $("#inputFileINE").val();
            let inputComprobante = $("#inputFileComprobante").val();

            if(referenciaClase.esVacio(titularNombre)){
                $("#errorNombreContratacion").css("display","block");
                $("#errorNombreContratacion").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaName(titularNombre)){
                    $("#errorNombreContratacion").css("display","block");
                    $("#errorNombreContratacion").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorNombreContratacion").hide(); 
                }
            }

            if(referenciaClase.esVacio(titularApellidoPaterno)){
                $("#errorPaternoContratacion").css("display","block");
                $("#errorPaternoContratacion").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaName(titularApellidoPaterno)){
                    $("#errorPaternoContratacion").css("display","block");
                    $("#errorPaternoContratacion").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorPaternoContratacion").hide(); 
                }
            }

            if(referenciaClase.esVacio(titularRFC)){
                $("#errorRFCContratacion").css("display","block");
                $("#errorRFCContratacion").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaRFC(titularRFC)){
                    $("#errorRFCContratacion").css("display","block");
                    $("#errorRFCContratacion").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorRFCContratacion").hide(); 
                }
            }

            if(referenciaClase.esVacio(titularTelefono)){
                $("#errorTelContratacion").css("display","block");
                $("#errorTelContratacion").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaTelefono(titularTelefono)){
                    $("#errorTelContratacion").css("display","block");
                    $("#errorTelContratacion").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorTelContratacion").hide(); 
                }
            }

            if(referenciaClase.esVacio(titularCelular)){
                $("#errorMovilContratacion2").css("display","block");
                $("#errorMovilContratacion2").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaTelefono(titularCelular)){
                    $("#errorMovilContratacion2").css("display","block");
                    $("#errorMovilContratacion2").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorMovilContratacion2").hide(); 
                }
            }

            if(referenciaClase.esVacio(inputINE)){
                validacion = false;
                $('#contenedorSubeArchivoINE').css('border', '1px dashed red');
            }else{
                $('#contenedorSubeArchivoINE').css('border', '1px dashed #1A76D2');
            }

            if(referenciaClase.esVacio(inputComprobante)){
                validacion = false;
                $('#contenedorSubeArchivoComprobante').css('border', '1px dashed red');
            }else{
                $('#contenedorSubeArchivoComprobante').css('border', '1px dashed #1A76D2');
            }

        }else{
            console.log("persona moral");
            referenciaClase.props.jsonparams.nodocts = 3;
            
            let razonSocial = $('#razonSocial').val().trim();
            let diaMoral = $('#diaMoral').val().trim();
            let mesMoral = $('#mesMoral').val().trim();
            let anioMoral = $('#anioMoral').val().trim();
            let rfcMoral = $('#rfcMoral').val().trim();
            let nombreMoral = $('#nombreMoral').val().trim();
            let apellidosMoral = $('#apellidosMoral').val().trim();
            let inputINE = $("#inputFileINE").val();
            let inputComprobante = $("#inputFileComprobante").val();
            let inputRFC = $('#inputFileRFC').val();

            if(referenciaClase.esVacio(razonSocial)){
                $("#errorRazonSocial").css("display","block");
                $("#errorRazonSocial").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaCalle(razonSocial)){
                    $("#errorRazonSocial").css("display","block");
                    $("#errorRazonSocial").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorRazonSocial").hide(); 
                }
            }

            if(anioMoral == "0"){
                $("#errorAnioMoral").css("display","block");
                $("#errorAnioMoral").html("*Campo no v&aacute;lido");
                validacion = false;
            }else{
                $("#errorAnioMoral").hide();
            }

            if(mesMoral == "0"){
                $("#errorAnioMoral").css("display","block");
                $("#errorAnioMoral").html("*Campo no v&aacute;lido");
                validacion = false;
            }else{
                $("#errorAnioMoral").hide();
            }

            if(diaMoral == "0"){
                console.log("estoy en diaMoral "+diaMoral);
                $("#errorAnioMoral").css("display","block");
                $("#errorAnioMoral").html("*Campo no v&aacute;lido");
                validacion = false;
            }else{
                $("#errorAnioMoral").hide();
            }            

            if(referenciaClase.esVacio(rfcMoral)){
                $("#errorRfcMoral").css("display","block");
                $("#errorRfcMoral").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaRFC(rfcMoral)){
                    $("#errorRfcMoral").css("display","block");
                    $("#errorRfcMoral").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorRfcMoral").hide(); 
                }
            }

            if(referenciaClase.esVacio(nombreMoral)){
                $("#errorNombreMoral").css("display","block");
                $("#errorNombreMoral").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaName(nombreMoral)){
                    $("#errorNombreMoral").css("display","block");
                    $("#errorNombreMoral").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorNombreMoral").hide(); 
                }
            }

            if(referenciaClase.esVacio(apellidosMoral)){
                $("#errorApellidosMoral").css("display","block");
                $("#errorApellidosMoral").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaName(apellidosMoral)){
                    $("#errorApellidosMoral").css("display","block");
                    $("#errorApellidosMoral").html("*Campo no v&aacute;lido");
                    validacion = false;
                } else {
                   $("#errorApellidosMoral").hide(); 
                }
            }
        }        

        if(!referenciaClase.validaCheks("buro")){
            validacion = false;
            $('#contenedorCheckBuro').css('border', '1px solid red');
        } else {
           $("#contenedorCheckBuro").css('border', '1px solid #e0e0e0'); 
        }

        if(!referenciaClase.validaCheks("terminos")){
            validacion = false;
            $('#contenedorCheckTYC').css('border', '1px solid red');
        } else {
           $('#contenedorCheckTYC').css('border', '1px solid #e0e0e0');
        }

        console.log('RESULTADO DE VALIDACION ['+validacion+']');
        return validacion;
    }

    validarCamposTarjeta(){
        let referenciaClase = this;

        $("#errorNumeroTarjeta").html('');
        $("#errorMesTarjeta").html('');
        $("#errorAnioTarjeta").html('');
        $("#errorCVVTarjeta").html('');

        let validacion = true;

        let nombreTarjeta = $('#nombreTarjeta').val().trim();

        let dirCalleTarjeta = $('#facturacionCalle').val().trim();
        let dirNumeroTarjeta = $('#facturacionNumero').val().trim();
        let dirColoniaTarjeta = $('#facturacionColonia').val().trim();
        let dirMunicipioTarjeta = $('#facturacionMunicipio').val().trim();
        let dirCPTarjeta = $('#facturacionCP').val().trim();
        let dirEstadoTarjeta = $('#facturacionEstado').val().trim();

        var inputCampos = [
            'nombreTarjeta','numeroTarjetaCaptura', 'mesTarjetaCaptura', 
            'anioTarjetaCaptura', 'facturacionCalle',
            'facturacionNumero', 'facturacionColonia', 'facturacionMunicipio',
            'facturacionCP', 'facturacionEstado'
        ];

        var labelValidacion = [
            'errorNombreTarjeta','errorNumeroTarjeta', 'errorMesTarjeta', 
            'errorAnioTarjeta','errorCalleTarjeta',
            'errorNumeroDirTarjeta', 'errorColoniaTarjeta', 'errorMunicipioTarjeta',
            'errorCPTarjeta', 'errorEdoTarjeta'
        ];

        var camposChicos = ['errorMesTarjeta', 'errorAnioTarjeta'];

        $.each(inputCampos, function (i, idCampo) {
            var valor = $('#' + idCampo).val().trim();
            if (valor === '') {
                validacion = false;
                var texto = '*Campo obligatorio';
                if (camposChicos.indexOf(labelValidacion[i]) >= 0) {
                    texto = '* Requerido';
                }
                $('#' + labelValidacion[i]).html(texto);
                $('#' + labelValidacion[i]).css('display','block');
            } else {
                if (idCampo == 'numeroTarjetaCaptura') {
                    var digito = $('#numeroTarjetaCaptura').val().substring(0, 1);
                    if (digito == '3') {
                        if (valor.length != 15) {
                            $('#errorNumeroTarjeta').html('Debe ser de 15 digitos');
                            $('#errorNumeroTarjeta').css('display','block');
                            validacion = false;
                        }
                    } else {
                        if (valor.length != 16) {
                            $('#errorNumeroTarjeta').html('Debe ser de 16 digitos');
                            $('#errorNumeroTarjeta').css('display','block');
                            validacion = false;
                        }
                    }
                }

                if(idCampo == 'nombreTarjeta'){
                    if(!referenciaClase.validaName(nombreTarjeta)){
                        $("#errorNombreTarjeta").css("display","block");
                        $("#errorNombreTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorNombreTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionCalle'){
                    if(!referenciaClase.validaCalle(dirCalleTarjeta)){
                        $("#errorCalleTarjeta").css("display","block");
                        $("#errorCalleTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorCalleTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionNumero'){
                    if(!referenciaClase.validaNumero(dirNumeroTarjeta)){
                        $("#errorNumeroDirTarjeta").css("display","block");
                        $("#errorNumeroDirTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorNumeroDirTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionColonia'){
                    if(!referenciaClase.validaDir(dirColoniaTarjeta)){
                        $("#errorColoniaTarjeta").css("display","block");
                        $("#errorColoniaTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        console.log("colonia ok");
                        $("#errorColoniaTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionMunicipio'){
                    if(!referenciaClase.validaName(dirMunicipioTarjeta)){
                        $("#errorMunicipioTarjeta").css("display","block");
                        $("#errorMunicipioTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorMunicipioTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionCP'){
                    if(!referenciaClase.validacp(dirCPTarjeta)){
                        $("#errorCPTarjeta").css("display","block");
                        $("#errorCPTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorCPTarjeta").html('');
                    }
                }

                if(idCampo == 'facturacionEstado'){
                    if(!referenciaClase.validaName(dirEstadoTarjeta)){
                        $("#errorEdoTarjeta").css("display","block");
                        $("#errorEdoTarjeta").html("*Campo no v&aacute;lido");
                        validacion = false;
                    }else{
                        $("#errorEdoTarjeta").html('');
                    }
                }

            }
        });
        
        //var anioActual = parseInt(new Date().getFullYear().toString().substr(-2));
        var anioActual = parseInt(new Date().getFullYear());
        var mesActual = parseInt(new Date().getMonth());
        
        if(parseInt($('#anioTarjetaCaptura').val()) == parseInt(anioActual)){
            if(parseInt($('#mesTarjetaCaptura').val()) < parseInt(mesActual)){
                $('#errorMesTarjeta').html('Invalido');
                $('#errorMesTarjeta').show();
                validacion = false;
            }
        }

        console.log('referenciaClase.props.aceptaDomiciliacion '+!$('#checkPagoDomiciliado').hasClass( "active" ));
        if(referenciaClase.props.aceptaDomiciliacion && !$('#checkPagoDomiciliado').hasClass( "active" )){
            $('#contenedorPagoDomiciliado').css('border', '1px solid red');
            validacion = false;
        }else{
            $('#contenedorPagoDomiciliado').css('border', '1px solid #e0e0e0');
        }

        console.log('RESULTADO DE VALIDACION DE TARJETA['+validacion+']');
        return validacion;
    }

    esVacio(valor){
        try{
            if(valor!='undefined' && valor!=null){
                var value = $.trim(valor);
                if(value=== null || value.length===0){
                    return true;
                }else{
                    return false;
                }
            }else{
                return true;
            }            
        }catch(e){
            return true;
        }
    }

    validaEmail(email) {
        var response = false;
        var reEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email.length > 0) {
            if (email.match(reEmail)) {
                console.log("Valido por Email");
                response = true;
            }
        }
        return response;
    }

    validaTelefono(telefono){
        var response = false;
        var reTelefono = /^\d{10}$/;    
        if(telefono.length>0){
            if(telefono.match(reTelefono)){
                response = true;
            }
        }
        return response;
    }

    validaName(nombre) {
        var response = false;
        var reName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\-]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\-]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\-]+$/g;
        if (nombre.length > 0) {
            if (nombre.match(reName)) {
                response = true;
            }
        }
        return response;
    }

    validaCalle(calle) {
        var response = false;
        var reName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\-.]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\-.]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\-.]+$/g;
        if (calle.length > 0) {
            if (calle.match(reName)) {
                response = true;
            }
        }
        return response;
    }

    validaDir(calle) {
        var response = false;
        var reName = /^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\-.]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\-.]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\-.]+$/g;
        if (calle.length > 0) {
            if (calle.match(reName)) {
                response = true;
            }
        }
        return response;
    }

    validaRFC(rfc) {
        var response = false;
        var reName = /^([a-zA-Z]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([a-zA-Z\d]{3})?$/;
        if (rfc.length > 0) {
            if (rfc.match(reName)) {
                response = true;
            }
        }
        return response;
    }

    validaCheks(tipo){
        var response = false;

        switch(tipo){
            case 'documentos' :
                if($('input:radio[name="documento"]').is(':checked')){
                    response = true;
                }
                break;
            case 'buro' :
                if($('#checkBuroCredito').hasClass( "active" )){
                    response = true;
                }
                break;
            case 'terminos' :
                if($('#checkLegales').hasClass( "active" )){
                    response = true;
                }
                break;
            default :
                break;
        }
        return response;
    }

    validaNumero(numero){
        var response = false;
        var reNumber = /^[0-9]+$/; 
        if (numero.length > 0) {
            if (numero.match(reNumber)) {
                response = true;
            }
        }
        return response;
    }

    validacp(cp) {
        var response = false;
        var reCP = /^\d{5}$/;

        if (cp.length > 0 ) {
            if (cp.match(reCP)) {
                response = true;
            }
        }
        return response;
    }

    validaExtensionFile(fileName,tipo){
        let referenciaClase = this;
        let arrExtAccepted = ['jpg','jpeg','pdf'];

        try{
            if(fileName!=null && fileName.trim().length>0){
                var extFile;

                 //Validar extension
                 extFile = fileName.split('.').pop();
                 extFile = extFile.toLowerCase();
                 var a = arrExtAccepted.indexOf(extFile);
                 if(a != -1){
                    if(tipo == 1){ //IFE
                        console.log("INE extension ==> "+extFile);
                        referenciaClase.props.extensionINE = extFile;
                    }else if(tipo == 2){ //COMPROBANTE
                        console.log("COMPROBANTE extension ==> "+extFile);
                        referenciaClase.props.extensionCOMPROBANTE = extFile;
                    }else{ //RFC
                        console.log("RFC extension ==> "+extFile);
                        referenciaClase.props.extensionRFC = extFile;
                    }
                    return true;                     
                 }else{
                    return false;
                 }   
            }
        }catch(e){
            console.error("Error al validar extensión de archivo:" + e);
            return false;
        }
    }

    getFileB64(file,type) {
        return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            var result = reader.result;
            var xplode = result.split("base64,");

            var json = {"file":type,"b64":xplode[1]};
            resolve(json);
        }
        reader.onerror = error => reject(error);
        });
    }

    eventoTarjetaBIN(){
        var referenciaClase = this;

        $('#numeroTarjetaCaptura').on('keyup', function() {
            
            if (this.value.length == 8) {
                var bin = $('#numeroTarjetaCaptura').val().substring(0, 6);
                console.log("bin "+bin);
                referenciaClase.pintarIcn('VISA')
            }
        });
    }

    pintarIcn(icn){

        switch(icn){
            case 'VISA' :
                $('#visasvg').removeAttr('style');
                $('#mastersvg').attr('style','opacity:10%');
                $('#amexsvg').attr('style','opacity:10%');
                break;
            case 'MASTERCARD' :
                $('#mastersvg').removeAttr('style');
                $('#visasvg').attr('style','opacity:10%');
                $('#amexsvg').attr('style','opacity:10%');
                break;
            case 'AMEX' :
                $('#amexsvg').removeAttr('style');                
                $('#visasvg').attr('style','opacity:10%');
                $('#mastersvg').attr('style','opacity:10%');
                break;
            default :
                break;
        }
    }

    obtenerDisponibilidad(){
        console.group('FUNCION obtenerDisponibilidad()');
        let referenciaClase = this;

        $.ajax({
            url: '/assets/media/disponibilidad.json',
            dataType: "json",
            
        }).done(function(respuesta) {
            console.log('RESPUESTA DE DISPONIBILIDAD',respuesta);

            var fechaActual = new Date().toLocaleDateString();
            var arregloFecha = fechaActual.split('/');

            var arregloFechaPrimera = respuesta.datos[0].fecha.split('-');
            var diasAgregar = 0;
            if(parseInt(arregloFechaPrimera[2]) == parseInt(arregloFecha[0])){
                diasAgregar = 1;
            }

            var fechaInicial = new Date(respuesta.datos[0].fecha+'T00:00:00');
            fechaInicial.setDate(fechaInicial.getDate() + diasAgregar);

            var fechaFinal = respuesta.datos[respuesta.datos.length - 1].fecha+'T00:00:00';
            referenciaClase.props.infoFechas = respuesta.datos;

            $('#datepicker').datepicker({
                language: 'es', 
                startDate: fechaInicial, 
                endDate: new Date(fechaFinal), 
                daysOfWeekDisabled: [0,6]               
            }).on('changeDate', function(selected) {
                console.log('referenciaClase.props.infoFechas', referenciaClase.props.infoFechas);

                var fechaSeleccionada = new Date(selected.date);
                var fechaNormal = fechaSeleccionada.toISOString().slice(0,10);
                console.log('fechaNormal', fechaNormal);

                $('#botonFinaliza').attr('disabled', '');
                $('#botonFinaliza').addClass('btnDeshabilitado');
                var fechaInfo = referenciaClase.obtenerFechaFormato(fechaSeleccionada);
                $('#fechaInstalacionInfo').html(fechaInfo + '<strong id="horarioInstalacionInfo"> - </strong>');
                //$('#horarioInstalacionInfo').html(" - ");

                $('#botonHorarioMatutino').removeClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').removeClass('btnInstalacionActivo');

                $.each(referenciaClase.props.infoFechas, function (index, objDisponible) {
                    if(fechaNormal == objDisponible.fecha){
                        referenciaClase.validarSeleccionHorario(fechaSeleccionada, objDisponible);
                    }
                });
            });

        }).fail(function(jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE PREVENCION DE FRAUDES');
            console.log(jqXHR);
        });
        console.groupEnd();
    }

    validarSeleccionHorario(fechaSeleccionada, disponibilidad){
        let clase = this;
        console.log("disponibilidad=>", disponibilidad);
        $('#seleccionHorarioCombo').html('<option>VALIDANDO...</option>');

        let textoHora = {
            '9':' de 09-10 AM',
            '10':'de 10-11 AM',
            '11':'de 11-12 AM',
            '12':'de 12-1 PM',
            '13':'de 1-2 PM',
            '14':'de 2-3 PM',
            '15':'de 3-4 PM',
            '16':'de 4-5 PM',
            '17':'de 5-6 PM',
            '18':'de 6-7 PM'
        };
        let fechaActual = new Date();
        let diferenciaMilisegundos = Math.abs(fechaSeleccionada - fechaActual);
        let diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24)); 
        let horaInicio = 9;
        let horaFin = 19;
        let minimaDisponibilidad = 0;
        let banderaDiaSD = false;

        if(diferenciaDias == 1){
            let horaActual = new Date().toLocaleTimeString();
            console.log('horaActual=>', horaActual);
            let arregloHora = horaActual.split(':');
            horaInicio = parseInt(arregloHora[0]) + 1;
            if(horaInicio>19){
                horaInicio = 9;
            }

            if(horaInicio<12){
                if(! disponibilidad.disponibleMatutina > minimaDisponibilidad){
                    horaInicio = 12;
                }
            }
            if(!disponibilidad.disponibleVespertino > minimaDisponibilidad){
                horaFin = 12;
            }

            if(disponibilidad.disponibleMatutina == minimaDisponibilidad && disponibilidad.disponibleVespertino == minimaDisponibilidad){
                banderaDiaSD = true;
            }
        }else{
            if(!disponibilidad.disponibleMatutina > minimaDisponibilidad){
                horaInicio = 12;
            }
            if(!disponibilidad.disponibleVespertino > minimaDisponibilidad){
                horaFin = 12;
            }
            if(disponibilidad.disponibleMatutina == minimaDisponibilidad && disponibilidad.disponibleVespertino == minimaDisponibilidad){
                banderaDiaSD = true;
            }
        }

        console.log('horaInicio=>', horaInicio);
        console.log('horaFin=>', horaFin);
        if(banderaDiaSD){
            $('#seleccionHorarioCombo').html('<option>SIN DISPONIBILIDAD</option>');
            
        } else{
            if(parseInt(disponibilidad.disponibleMatutina) > 0){
                console.log('si es mayor a 0');
                $('#botonHorarioMatutino').removeAttr('disabled');
                $('#botonHorarioMatutino').removeClass('btnDeshabilitado');
                $('#botonHorarioMatutino').css('color','#1a76d2');
                $('#botonHorarioMatutino').css('border','1.1px solid rgba(26,118,210,.5)');
                $('#botonHorarioMatutino').css('background-color','#fafafa');
            }

            if(parseInt(disponibilidad.disponibleVespertino) > 0){
                console.log('si es mayor a 0');
                $('#botonHorarioVespertino').removeAttr('disabled');
                $('#botonHorarioVespertino').removeClass('btnDeshabilitado');
                $('#botonHorarioVespertino').css('color','#1a76d2');
                $('#botonHorarioVespertino').css('border','1.1px solid rgba(26,118,210,.5)');
                $('#botonHorarioVespertino').css('background-color','#fafafa');
            }
            clase.eventoSeleccionHorario();
        }
    }

    eventoSeleccionHorario(){
        console.log("entre a eventoSeleccionHorario");
        let referenciaClase = this;
        let textoHora = "";
        $('#botonHorarioMatutino').on('click',function(){
            console.log("btn matutino");
            textoHora = $('#botonHorarioMatutino').text().trim();
            var fechaSeleccionada = $('#datepicker').datepicker("getDate");
            if(fechaSeleccionada != null){
                var fechaInfo = referenciaClase.obtenerFechaFormato(fechaSeleccionada);
                $('#fechaInstalacionInfo').html(fechaInfo + '&nbsp;<strong id="horarioInstalacionInfo">y horario</strong>');
                $('#horarioInstalacionInfo').html(textoHora);

                $('#botonFinaliza').removeAttr('disabled');
                $('#botonFinaliza').removeClass('btnDeshabilitado');

                $('#botonHorarioVespertino').removeClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').css('border','1.1px solid rgba(26, 118, 210, 0.5)');
                $('#botonHorarioMatutino').addClass('btnInstalacionActivo');
                $('#botonHorarioMatutino').css('border','none');
            } else {
                $('#fechaInstalacionInfo').html('Selecciona fecha&nbsp;<strong id="horarioInstalacionInfo">y horario</strong>');
                $('#botonFinaliza').attr('disabled', '');
                $('#botonFinaliza').addClass('btnDeshabilitado');
                $('#botonHorarioMatutino').removeClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').removeClass('btnInstalacionActivo');
            }
        });

        $('#botonHorarioVespertino').on('click',function(){
            console.log("btn vespertino")
            textoHora = $('#botonHorarioVespertino').text().trim();
            var fechaSeleccionada = $('#datepicker').datepicker("getDate");
            if(fechaSeleccionada != null){
                var fechaInfo = referenciaClase.obtenerFechaFormato(fechaSeleccionada);
                $('#fechaInstalacionInfo').html(fechaInfo + '&nbsp;<strong id="horarioInstalacionInfo">y horario</strong>');
                $('#horarioInstalacionInfo').html(textoHora);

                $('#botonFinaliza').removeAttr('disabled');
                $('#botonFinaliza').removeClass('btnDeshabilitado');

                $('#botonHorarioMatutino').removeClass('btnInstalacionActivo');
                $('#botonHorarioMatutino').css('border','1.1px solid rgba(26, 118, 210, 0.5)');
                $('#botonHorarioVespertino').addClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').css('border','none');
            } else {
                $('#fechaInstalacionInfo').html('Selecciona fecha&nbsp;<strong id="horarioInstalacionInfo">y horario</strong>');
                $('#botonFinaliza').attr('disabled', '');
                $('#botonFinaliza').addClass('btnDeshabilitado');
                $('#botonHorarioMatutino').removeClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').removeClass('btnInstalacionActivo');
            }
        });
    }

    simularVenta(referenciaClase){
        $('#nombreProceso').html('Validando informacion');
        
        setTimeout(function() {
            referenciaClase.forDummy();
            $('#nombreProceso').html('Preparando la experiencia');
            
            setTimeout(function() {
                $('#nombreProceso').html('Agregando Adicionales');

                setTimeout(function() {
                    $('#nombreProceso').html('Finalizando proceso');

                    setTimeout(function() {
                        console.log('referenciaClase.props.tipoCliente=>', referenciaClase.props.tipoCliente);
                        referenciaClase.props.jsonparams.carpeta = '0101_DUMMY_PORTALES';

                        $('.botonEditar').remove();
                        $('#ventanaFinaliza').css('display','none');
                        $('#capaFinaliza').css('opacity','0');
                        $('#contenidoFinaliza').css('opacity','0');

                        referenciaClase.props.panels[2].style.cssText = 'display: block;';
                        referenciaClase.props.casePayments.style.cssText = 'display: none;';
                        referenciaClase.props.resumePayments.style.cssText = 'display: flex;';
                        referenciaClase.props.btnEditPayment.style.cssText = 'display: flex;';

                        $('.main-summary__invoice-data--info').css('padding-top','30px');
                        $('.main-summary__invoice-data--info').css('padding-bottom','30px');

                        $('html,body').animate({scrollTop: $("#fechaInstalacion" ).offset().top - 80}, 'slow');
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 3000);
    }

    forDummy(){
        let referenciaClase = this;
        referenciaClase.obtenerDisponibilidad();
        referenciaClase.props.panels[2].style.cssText = 'display: block;';
        referenciaClase.props.casePayments.style.cssText = 'display: none;';
        referenciaClase.props.resumePayments.style.cssText = 'display: flex;';
        referenciaClase.props.btnEditPayment.style.cssText = 'display: flex;';
    }

    pintarAnio(){
        $('#mesMoral').css('pointer-events','none');
        $('#diaMoral').css('pointer-events','none');
        var d = new Date();
        var n = d.getFullYear();
        var limite = n - 100;
        var html ="<option value='0'>AAAA</option>";
        for(var i = n; i>=limite; i--) {
            html += "<option value='"+i+"'>"+i+"</option>";
        }
        $("#anioMoral").html(html);
    }

    pintarAnioTarjeta(){
        var d = new Date();
        var n = d.getFullYear();
        var limite = n + 10;
        var html ="";
        for(var i = n; i<=limite; i++) {
            html += "<option value='"+i+"'>"+i+"</option>";
        }
        $("#anioTarjetaCaptura").html(html);
    }

    /* ------------------------------------------------ */
    obtenerObjetoPaquete(){
        console.group('FUNCION obtenerObjetoPaquete()');
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        
        try {
            let objetoPaquete = JSON.parse(cadenaPaquete);
            console.groupEnd();
            return objetoPaquete;
        } catch (error) {
            console.log('ERROR AL OBTENER EL OBJETO PAQUETE POR:', error);
            console.groupEnd();
            return null;
        }
    }

    obtenerObjetoDireccion(){
        console.group('FUNCION obtenerObjetoDireccion()');
        let cadenaDireccion = localStorage.getItem('TP_STR_DIRECCION');
        
        try {
            let objetoDireccion = JSON.parse(cadenaDireccion);
            console.groupEnd();
            return objetoDireccion;
        } catch (error) {
            console.log('ERROR AL OBTENER EL OBJETO DIRECCION POR:', error);
            console.groupEnd();
            return null;
        }
    }

    obtenerObjetoCliente(){
        console.group('FUNCION obtenerObjetoCliente()');
        let cadenaCliente= localStorage.getItem('TP_STR_CLIENTE');
        
        try {
            let objetoCliente = JSON.parse(cadenaCliente);
            console.groupEnd();
            return objetoCliente;
        } catch (error) {
            console.log('ERROR AL OBTENER EL OBJETO CLIENTE POR:', error);
            console.groupEnd();
            return null;
        }
    }

    actualizarClienteTitular(objetoTitular){
        console.group('FUNCION actualizarClienteTitular()');
        let cadenaCliente= localStorage.getItem('TP_STR_CLIENTE');
        
        try {
            let objetoCliente = JSON.parse(cadenaCliente);
            objetoCliente.titular = objetoTitular;
            localStorage.setItem('TP_STR_CLIENTE', JSON.stringify(objetoCliente));
            console.log('OBJETO CLIENTE ACTUALIZADO');
        } catch (error) {
            console.log('ERROR AL ACTUALIAR EL OBJETO CLIENTE CON TITULAR POR:', error);
        }

        console.groupEnd();
    }

    actualizarClienteFormaPago(objetoFormaPago){
        console.group('FUNCION actualizarClienteFormaPago()');
        let cadenaCliente= localStorage.getItem('TP_STR_CLIENTE');
        
        try {
            let objetoCliente = JSON.parse(cadenaCliente);
            objetoCliente.pago = objetoFormaPago;
            localStorage.setItem('TP_STR_CLIENTE', JSON.stringify(objetoCliente));
            console.log('OBJETO CLIENTE ACTUALIZADO');
        } catch (error) {
            console.log('ERROR AL ACTUALIAR EL OBJETO CLIENTE CON FORMA DE PAGO POR:', error);
        }

        console.groupEnd();
    }

    buscarProductos(){
        // PARRILLAS / CANALES PREMIUM
        console.group('FUNCION buscarProductos()');
        var arregloProductos = new Array();
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        
        try {
            let objPaquete = JSON.parse(cadenaPaquete);

            $.each(objPaquete.adicionales, function(key, objetoAdicionales) {    
                if(objetoAdicionales.parrilla != undefined){
                    if(objetoAdicionales.parrilla.precio != undefined){
                        var objProducto = {
                            'id': objetoAdicionales.parrilla.Id,
                            'nombre': 'PARRILLA',
                            'tipo': 'PRODUCTOS'
                        }
                        arregloProductos.push(objProducto);
                    }
                }
            
                if(objetoAdicionales.canales != undefined){
                    if(objetoAdicionales.canales.precio != undefined){
                        var objProducto = {
                            'id': objetoAdicionales.canales.Id,
                            'nombre': 'CANAL PREMIUM',
                            'tipo': 'PRODUCTOS'
                        }
                        arregloProductos.push(objProducto);
                    }
                }
            });
            console.groupEnd();
            return arregloProductos;
        } catch (error) {
            console.log('ERROR AL BUSCAR LA LISTA DE PRODUCTOS POR:', error);
            console.groupEnd();
            return [];
        }
    }

    buscarServicios(){
        // EQUIPO ADCIONAL / LINEAS ADICIONALES
        console.group('FUNCION buscarServicios()');
        var arregloServicios = new Array();
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        
        try {
            let objPaquete = JSON.parse(cadenaPaquete);

            $.each(objPaquete.adicionales, function(key, objetoAdicionales) {    
                if(objetoAdicionales.equipo != undefined){
                    $.each(objetoAdicionales.equipo, function(i, objEquipo) {
                        console.log('objEquipo=>', objEquipo);
                        if(parseInt(objEquipo.cantidad) > 0){
                            var objServicio = {
                                'id': objEquipo.id,
                                'cantidad': parseInt(objEquipo.cantidad),
                                'nombre': 'EQUIPO ADICIONAL',
                                'tipo': 'SERVICIOS'
                            }
                            arregloServicios.push(objServicio);
                        }
                    });
                }

                if(objetoAdicionales.telefonia != undefined){
                    if(objetoAdicionales.telefonia.precio != undefined){
                        var objServicio = {
                            'id': objetoAdicionales.telefonia.Id,
                            'cantidad': 1,
                            'nombre': 'LINEAS ADICIONALES',
                            'tipo': 'SERVICIOS'
                        }
                        arregloServicios.push(objServicio);
                    }
                }
            });
            console.groupEnd();
            return arregloServicios;
        } catch (error) {
            console.log('ERROR AL BUSCAR LA LISTA DE SERVICIOS POR:', error);
            console.groupEnd();
            return [];
        }
    }

    buscarPromociones(){
        // PROMOS DEFAULT / PROMO PREMIUM
        console.group('FUNCION buscarPromociones()');
        var objPromocionNuevo = new Array();
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            $.each(objPaquete.promocionesDefautl, function(key, objPromocion) {    
                var obj = {
                    'id':objPromocion.Id,
                    'nombre':objPromocion.nombre,
                    'montoDescuento':objPromocion.montoDescuento,
                    'esAutomatica':objPromocion.esAutomatica
                }
                objPromocionNuevo.push(obj);
            });
            console.groupEnd();
            return objPromocionNuevo;
        } catch (error) {
            console.log('ERROR AL BUSCAR LA LISTA DE SERVICIOS POR:', error);
            console.groupEnd();
            return [];
        }
    }
}

$(window).keydown(function(event) {
    if(event.ctrlKey && event.keyCode == 65) {
        console.log("CTRL+A");

        $('#nombreTarjeta').val('ALBERTO RAMIREZ SANCHEZ');
        $('#numeroTarjetaCaptura').val('5573935405813257');
        $('#mesTarjetaCaptura').val('06');
        $('#anioTarjetaCaptura').val('21');
        $('#cvvTarjetaCaptura').val('123');

        $('#checkPagoDomiciliado').addClass('active');

        $('#facturacionCalle').val('SAN RICARDO');
        $('#facturacionNumero').val('1008');
        $('#facturacionColonia').val('EL PINO');
        $('#facturacionMunicipio').val('TLAQUEPAQUE');
        $('#facturacionCP').val('68000');
         $('#facturacionEstado').val('JALISCO');

        event.preventDefault(); 
    }
    if(event.ctrlKey && event.keyCode == 90) {
        
        console.log("CTRL+Z");
        $('#titularNombre').val('ROBERTO');
        $('#titularApellidoPaterno').val('SANCHEZ');
        $('#titularApellidoMaterno').val('MARTINEZ');
        $('#titularRFC').val('SAMR010101AAA');
        $('#titularTelefono').val('5512345678');
        $('#titularCelular').val('5587654321');

        $('input:radio[name="documento"]').filter('[value="1"]').attr('checked', true);

        $('#checkBuroCredito').addClass('active');
        $('#checkLegales').addClass('active');

        event.preventDefault(); 
    }
});