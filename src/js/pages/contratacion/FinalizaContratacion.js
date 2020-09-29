import * as Constantes from "../../utils/Constantes";
import { ModalContrata } from './ModalContrata';

export class FinalizaContratacion {
    constructor(bandera) {

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
            aniobisiesto : false,
            archivosInfo : [],
            tipoArchivo : {"jpg":"image\/jpeg","pdf":"application\/pdf"},
            modalContrata : null,
        }
        if(bandera){    
            this.init();
        }
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
        $('#direccionFacturacionMunicipioEfectivo').html(objetoDireccion.direccionCalculada.delegacionMunicipio);
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
                    $('#contenedorSubeArchivoINER').show();
                    break;
                case '2':
                    $('#titularIdentificacionTarjeta').html('Pasaporte');
                    $('#contenedorSubeArchivoINER').hide();
                    break;
                case '3':
                    $('#titularIdentificacionTarjeta').html('C&eacute;dula profesional');
                    $('#contenedorSubeArchivoINER').hide();
                    break;
                default:{
                    $('#titularIdentificacionTarjeta').html('');
                    $('#contenedorSubeArchivoINER').hide();
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
                    //referenciaClase.props.tipoCliente = 1;
                    localStorage.setItem('TP_TIPO_CLIENTE', 1);
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
                    //referenciaClase.props.tipoCliente = 2;
                    localStorage.setItem('TP_TIPO_CLIENTE', 2);
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
                
                console.log('SETEANDO VALOR TRUE PARA GUARDADO DE TARJETAS');

                if(referenciaClase.props.modalContrata == null){
                    referenciaClase.props.modalContrata = new ModalContrata(referenciaClase.props);
                    referenciaClase.props.modalContrata.mostrarVentana();
                }else{
                    referenciaClase.props.modalContrata.mostrarVentana();
                }
            } 

            if($('#btnPaymentCash').hasClass("botonSeleccionado") ) {
                console.log('PAGO CON EFECTIVO');
                let objetoDireccion = referenciaClase.obtenerObjetoDireccion();

                let objetoFormaPago = {
                    "tipoPago" : "efectivo",
                    "calleNombre":objetoDireccion.direccionCalculada.nombreCalle,
                    "calleNumero":objetoDireccion.direccionCalculada.numeroDireccion,
                    "colonia":objetoDireccion.direccionCalculada.colonia,
                    "municipio":objetoDireccion.direccionCalculada.delegacionMunicipio,
                    "codigoPostal":objetoDireccion.direccionFormulario.codigoPostal,
                    "estado":objetoDireccion.direccionCalculada.estado,
                }

                referenciaClase.actualizarClienteFormaPago(objetoFormaPago);

                $('.contenedorTarjetaResumen').hide();
                $('#tipoPago').html('EN EFECTIVO');
                $('#direccionResumen').html(objetoDireccion.direccionCalculada.direccionAproximada);

                if(referenciaClase.props.modalContrata == null){
                    referenciaClase.props.modalContrata = new ModalContrata(referenciaClase.props);
                    referenciaClase.props.modalContrata.mostrarVentana();
                }else{
                    referenciaClase.props.modalContrata.mostrarVentana();
                }
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
                    turno = 'Matutino';
                    horaInstalacion = 11;
                }
                if($('#botonHorarioVespertino').hasClass('btnInstalacionActivo')){
                    turno = 'Vespertino';
                    horaInstalacion = 4;
                }                
                referenciaClase.generarAgendamiento(turno, horaInstalacion, $('#domicilioReferencia').val(), $('#domicilioEntreCalles').val());
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
            $('#facturacionMunicipio').val(objetoDireccion.direccionCalculada.delegacionMunicipio);
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

        $("#contenedorSubeArchivoINER").click(function () {
            $("#inputFileINER").click();
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
                        referenciaClase.props.jsonparams.fileINE = result[0].b64;
                        referenciaClase.props.jsonparams.extINE = referenciaClase.props.extensionINE;
                        console.log("TIPO ARCHIVO=>"+referenciaClase.props.tipoArchivo[referenciaClase.props.extensionINE]);

                        referenciaClase.props.archivosInfo[0] = {
                            "tipoDocumento": "Identificación",
                            "nombreArchivo": "identificacion",
                            "archivoB64": result[0].b64,
                            "tipoArchivo": referenciaClase.props.tipoArchivo[referenciaClase.props.extensionINE],
                        }
                        localStorage.setItem('TP_ARCHIVOS', JSON.stringify(referenciaClase.props.archivosInfo));

                        //console.log("JSON PARAMS "+JSON.stringify(referenciaClase.props.jsonparams));
                }).catch(err=>{
                    console.error("Error en promesa base64:" + err);
                });

            }else{
                $('#errorArchivoINE').css('display','block')
            }
        });

        $("#inputFileINER").change(function (){
            $('#errorArchivoINER').css('display','none');
            $('#contenedorSubeArchivoINER').css('border', '1px dashed #1A76D2');
            var propiedadesArchivo = $('#inputFileINER').prop('files');
            var archivo = $('#inputFileINER').val();
            if(referenciaClase.validaExtensionFile(archivo,1)){
                //Archivo válido
                $('#iconoSubeINER').css('display','none');
                $("#divArchivoIdentificacionR").html('<i class="far fa-file-alt"></i>&nbsp;&nbsp;<span>'+propiedadesArchivo[0].name+'</span>');
                $('#eliminarIdentificacionR').show();

                var filIdeOfi = document.getElementById("inputFileINER")!=null ? document.getElementById("inputFileINER").files[0]:"";
                var arrayPromesas = [];
                arrayPromesas.push(referenciaClase.getFileB64(filIdeOfi,"filIdeOfi"));

                Promise.all(arrayPromesas).then(function(result){
                        referenciaClase.props.jsonparams.fileINE = result[0].b64;
                        referenciaClase.props.jsonparams.extINE = referenciaClase.props.extensionINE;

                        referenciaClase.props.archivosInfo[3] = {
                            "tipoDocumento": "Identificación",
                            "nombreArchivo": "identificacion",
                            "archivoB64": result[0].b64,
                            "tipoArchivo": referenciaClase.props.tipoArchivo[referenciaClase.props.extensionINE],
                        }
                        localStorage.setItem('TP_ARCHIVOS', JSON.stringify(referenciaClase.props.archivosInfo));
                }).catch(err=>{
                    console.error("Error en promesa base64:" + err);
                });

            }else{
                $('#errorArchivoINER').css('display','block')
            }
        });

        $('#eliminarIdentificacionR').on('click',function(event){
            event.preventDefault();
            $("#inputFileINER").val(null);
            $('#iconoSubeINER').css('display','block');
            $("#divArchivoIdentificacionR").html('Agrega tu documento adicional pdf o jpg. Máx. 5Mb.');
            $('#eliminarIdentificacionR').hide();
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
                        console.log("TIPO ARCHIVO=>"+referenciaClase.props.tipoArchivo[referenciaClase.props.extensionCOMPROBANTE]);
                        referenciaClase.props.archivosInfo[1] = {
                            "tipoDocumento": "Comprobante de domicilio",
                            "nombreArchivo": "comprobante_domicilio",
                            "archivoB64": result[0].b64,
                            "tipoArchivo": referenciaClase.props.tipoArchivo[referenciaClase.props.extensionCOMPROBANTE],
                            
                        }
                        localStorage.setItem('TP_ARCHIVOS', JSON.stringify(referenciaClase.props.archivosInfo));

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
                        console.log("TIPO ARCHIVO=>"+referenciaClase.props.tipoArchivo[referenciaClase.props.extensionRFC]);

                        referenciaClase.props.archivosInfo[2] = {
                            "tipoDocumento": "Acta constitutiva",
                            "nombreArchivo": "acta_constitutiva",
                            "archivoB64": result[0].b64,
                            "tipoArchivo": referenciaClase.props.tipoArchivo[referenciaClase.props.extensionRFC]
                        }

                        localStorage.setItem('TP_ARCHIVOS', JSON.stringify(referenciaClase.props.archivosInfo));

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

            if(referenciaClase.esVacio(titularApellidoMaterno)){
                $("#errorMaternoContratacion").css("display","block");
                $("#errorMaternoContratacion").html("*Campo obligatorio");
                validacion = false;
            }else{
                if(!referenciaClase.validaName(titularApellidoMaterno)){
                    $("#errorMaternoContratacion").css("display","block");
                    $("#errorMaternoContratacion").html("*Campo no v&aacute;lido");
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
            }//*/

        }else{
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

        if(!referenciaClase.validaCheks("usoinformacion")){
            validacion = false;
            $('#contenedorCheckUsoInformacion').css('border', '1px solid red');
        } else {
           $('#contenedorCheckUsoInformacion').css('border', '1px solid #e0e0e0');
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
            case 'usoinformacion' :
                    if($('#checkUsoInformacion').hasClass( "active" )){
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
                //referenciaClase.pintarIcn('VISA')
                var objetoTarjeta = {
                    inicioTarjeta: bin
                };

                var informacionEncriptada = otpyrc2(JSON.stringify(objetoTarjeta));
                var informacion = {
                    "informacionEncriptada": informacionEncriptada
                };

                referenciaClase.loadGetServicioBin(Constantes.endpoints.getserviciobin,informacion,1);
            }
        });
    }

    loadGetServicioBin(URL2LOAD, params,contador){
        let apuntador = this;
        
        if(contador == 1){            
            var cabeceraMC = new Headers();
            cabeceraMC.append("Content-type", "application/json;charset=utf-8");

            fetch(URL2LOAD, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: cabeceraMC
            }).then((data) => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw "Error en la llamada Ajax fetch con parametros "+URL2LOAD;
                }
            }).then((texto) => {

                try {
                    let respuesta = texto;
                    if (parseInt(respuesta.status) === 0) {
                        apuntador.props.aceptaDomiciliacion = true;
                        var existeDato = false;
                        try{
                            var idBanco = respuesta.bean.bin.idBanco;
                            if(idBanco !=''){
                                existeDato = true;
                            }
                        }catch(Exception){
                            $("#errorNumeroTarjeta").html('');
                            $("#errorNumeroTarjeta").html('*Tarjeta no válida');
                            $("#numeroTarjetaCaptura").html('');
                            console.error(Exception);
                        }

                        var validacionServicio = parseInt(respuesta.bean.response.code);
                        if (validacionServicio == 0 && existeDato) {
                            apuntador.pintarIcn(respuesta.bean.bin.nombreMarca);
                            if(respuesta.bean.bin.cargosAutomaticos == "SI"){
                                //apuntador.props.aceptaDomiciliacion = true;
                            }
                            
                        } else {
                            $("#errorNumeroTarjeta").html('');
                            $("#errorNumeroTarjeta").html('*Tarjeta no válida');
                            $("#numeroTarjetaCaptura").html('');
                            throw "Fallo tarjeta 1"
                        }
                    } else {
                        $("#errorNumeroTarjeta").html('');
                        $("#errorNumeroTarjeta").html('*Tarjeta no válida');
                        $("#numeroTarjetaCaptura").html('');
                        throw "Fallo tarjeta 2"
                    }
                    
                } catch (e) {
                    console.log("c a t c h");
                    $("#errorNumeroTarjeta").html('');
                    $("#errorNumeroTarjeta").html('*Tarjeta no válida');
                    $("#numeroTarjetaCaptura").html('');
                    throw "Error al traer la informacion "+e;
                }
            
            }).
            catch((err) => {
                $("#errorNumeroTarjeta").html('');
                $("#errorNumeroTarjeta").html('*Tarjeta no válida');
                $("#numeroTarjetaCaptura").html('');
                console.log("err=>"+err);
                
            });
        }
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
        let objetoDireccion = referenciaClase.obtenerObjetoDireccion();
        var parametros = {
            "cluster": objetoDireccion.factibilidad.nombre_cluster,
        };

        $.ajax({
            url: Constantes.endpoints.obtenerDisponibilidad,
            //contentType: "application/json; charset=utf-8",
            data: JSON.stringify(parametros),
            dataType: "json",
            type: 'POST'
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

                $('#botonHorarioMatutino').removeClass('btnInstalacionActivo');
                $('#botonHorarioVespertino').removeClass('btnInstalacionActivo');

                $.each(referenciaClase.props.infoFechas, function (index, objDisponible) {
                    if(fechaNormal == objDisponible.fecha){
                        referenciaClase.validarSeleccionHorario(fechaSeleccionada, objDisponible);
                    }
                });
            });

            referenciaClase.eventoSeleccionHorario();

        }).fail(function(jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE PREVENCION DE FRAUDES');
            console.log(jqXHR);
        });
        console.groupEnd();
    }

    validarSeleccionHorario(fechaSeleccionada, disponibilidad){
        let clase = this;
        console.log("disponibilidad=>", disponibilidad);
        
        let fechaActual = new Date();
        let diferenciaMilisegundos = Math.abs(fechaSeleccionada - fechaActual);
        let diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24)); 
        let horaInicio = 9;
        let horaFin = 19;
        let minimaDisponibilidad = 0;
        let banderaDiaSD = false;
        console.log('fechaActual:', fechaActual);
        console.log('fechaSeleccionada:', fechaSeleccionada);
        console.log('DIFERENCIA EN DIAS:', diferenciaDias);
        if (diferenciaDias > 1) {
            if(parseInt(disponibilidad.disponibleMatutina) > 0){
                console.log('HAY DISPONIBLIDAD MATUTINA');
                $('#botonHorarioMatutino').removeAttr('disabled');
                $('#botonHorarioMatutino').removeClass('btnDeshabilitado');
                $('#botonHorarioMatutino').css('color','#1a76d2');
                $('#botonHorarioMatutino').css('border','1.1px solid rgba(26,118,210,.5)');
                $('#botonHorarioMatutino').css('background-color','#fafafa');
            } else {
                $('#botonHorarioMatutino').attr('disabled', 'disabled');
                $('#botonHorarioMatutino').addClass('btnDeshabilitado');
                $('#botonHorarioMatutino').removeAttr('style');
            }

            if(parseInt(disponibilidad.disponibleVespertino) > 0){
                console.log('HAY DISPONIBLIDAD VESPERTINA');
                $('#botonHorarioVespertino').removeAttr('disabled');
                $('#botonHorarioVespertino').removeClass('btnDeshabilitado');
                $('#botonHorarioVespertino').css('color','#1a76d2');
                $('#botonHorarioVespertino').css('border','1.1px solid rgba(26,118,210,.5)');
                $('#botonHorarioVespertino').css('background-color','#fafafa');
            } else {
                $('#botonHorarioVespertino').attr('disabled', 'disabled');
                $('#botonHorarioVespertino').addClass('btnDeshabilitado');
                $('#botonHorarioVespertino').removeAttr('style');
            }
        } else {

            if(diferenciaDias == 1){
                let horaActual = new Date().toLocaleTimeString();
                //console.log('horaActual=>', horaActual);
                let arregloHora = horaActual.split(':');
                horaInicio = parseInt(arregloHora[0]);
                //console.log("horaInicio=>",horaInicio);

                if(horaInicio<14){

                    $('#botonHorarioMatutino').attr('disabled', 'disabled');
                    $('#botonHorarioMatutino').addClass('btnDeshabilitado');
                    $('#botonHorarioMatutino').removeAttr('style');

                    if(parseInt(disponibilidad.disponibleVespertino) > 0){
                        console.log('HAY DISPONIBLIDAD VESPERTINA');
                        $('#botonHorarioVespertino').removeAttr('disabled');
                        $('#botonHorarioVespertino').removeClass('btnDeshabilitado');
                        $('#botonHorarioVespertino').css('color','#1a76d2');
                        $('#botonHorarioVespertino').css('border','1.1px solid rgba(26,118,210,.5)');
                        $('#botonHorarioVespertino').css('background-color','#fafafa');
                    } else {
                        $('#botonHorarioVespertino').attr('disabled', 'disabled');
                        $('#botonHorarioVespertino').addClass('btnDeshabilitado');
                        $('#botonHorarioVespertino').removeAttr('style');
                    }
                } else {
                    $('#botonHorarioMatutino').attr('disabled', 'disabled');
                    $('#botonHorarioMatutino').addClass('btnDeshabilitado');
                    $('#botonHorarioMatutino').removeAttr('style');

                    $('#botonHorarioVespertino').attr('disabled', 'disabled');
                    $('#botonHorarioVespertino').addClass('btnDeshabilitado');
                    $('#botonHorarioVespertino').removeAttr('style');
                }
            } else {
                $('#botonHorarioMatutino').attr('disabled', 'disabled');
                $('#botonHorarioMatutino').addClass('btnDeshabilitado');
                $('#botonHorarioMatutino').removeAttr('style');

                $('#botonHorarioVespertino').attr('disabled', 'disabled');
                $('#botonHorarioVespertino').addClass('btnDeshabilitado');
                $('#botonHorarioVespertino').removeAttr('style');
            }   
        }
    }

    eventoSeleccionHorario(){
        console.log("entre a eventoSeleccionHorario");
        let referenciaClase = this;
        let textoHora = "";
        $('#botonHorarioMatutino').on('click',function(){
            
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
    ejecutarEnvioLead(){
        console.group('FinalizaContratacion.js ejecutarEnvioLead()');
        let referenciaClase = this;
        let esPagoTarjeta = $('#btnPaymentCard').hasClass("botonSeleccionado");
        console.log('ES PAGO CON TARJETA: ', esPagoTarjeta);
        referenciaClase.prepararParametrosVenta(esPagoTarjeta);
        //referenciaClase.simularVenta(referenciaClase);

        referenciaClase.obtenerDisponibilidad();
        
        $('#ventanaFinaliza').css('display','flex');
        $('#capaFinaliza').css('opacity','1');
        $('#contenidoFinaliza').css('opacity','1');
        console.groupEnd();
    }

    prepararParametrosVenta(esPagoTarjeta){
        console.group('FUNCION prepararParametrosVenta('+esPagoTarjeta+')');
        let referenciaClase = this;
    
        var strDireccion = localStorage.getItem('TP_STR_DIRECCION');
        var objDireccion = null;
        var objFactibilidad = null;
        var objCoordenadas = null;
        try{
            objDireccion = JSON.parse(strDireccion);
            objFactibilidad = objDireccion.factibilidad;
            objCoordenadas = objDireccion.coordenadas;
        }catch(e){}

        let tipoIdentificacion = '';
        switch ($('input[name="documento"]:checked').val()) {
            case '1':
                tipoIdentificacion = 'INE';
                break;
            case '2':
                tipoIdentificacion = 'Pasaporte';
                break;
            case '3':
                tipoIdentificacion = 'Cedula Profesional';
                break;
            default:{
                tipoIdentificacion = '';
            }
        }
        console.log("tipoIdentificacion["+tipoIdentificacion+"]");

        /* ---------------------------- PRODUCTOS ---------------------------- */
        var arregloProductos = referenciaClase.buscarProductos()
        console.log('arregloProductos=>', arregloProductos);
        /* ---------------------------- SERVICIOS ---------------------------- */
        var arregloServicios= referenciaClase.buscarServicios();
        console.log('arregloServicios=>', arregloServicios);
        //* ---------------------------- PROMOCIONES ---------------------------- */
        var objPromocionNuevo = referenciaClase.buscarPromociones();
        console.log('objPromocionNuevo=>', objPromocionNuevo);
        
        /*************************************************************************************/
        var IDENTIFICADOR =  Math.floor(Math.random() * (500000 - 100000) + 100000);
        var strLocalStorage = JSON.stringify(Object.entries(localStorage));

        let nombreCliente = '';
        let apellidoPaternoCliente = '';
        let apellidoMaternoCliente = '';
        let rfcCliente = '';
        let tipoPersona = '';
        let compania = '';
        let numeroCelular = '';
        let numeroTelefono = '';
        let fechaNacimiento = '1980-01-01';
        let objetoCliente = referenciaClase.obtenerObjetoCliente();
        let tipoCliente = parseInt(localStorage.getItem('TP_TIPO_CLIENTE'));

        if(tipoCliente == 1){
            console.log('OBTENIENDO DATOS PERSONA FISICA');
            tipoPersona = 'Física';
            nombreCliente = objetoCliente.titular.nombre;
            apellidoPaternoCliente = objetoCliente.titular.apellidoPaterno;
            apellidoMaternoCliente = objetoCliente.titular.apellidoMaterno;
            rfcCliente = objetoCliente.titular.rfc;
            compania = '';
            numeroCelular = objetoCliente.titular.celular;
            numeroTelefono = objetoCliente.titular.telefono;

            var reName = /^([a-zA-Z]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([a-zA-Z\d]{3})?$/;
            var infoRegEx = $('#titularRFC').val().match(reName);
            if(parseInt(infoRegEx[2])>40){
                fechaNacimiento = '19' + infoRegEx[2] + '-' + infoRegEx[3] + '-' + infoRegEx[4];
            }else{
                fechaNacimiento = '20' + infoRegEx[2] + '-' + infoRegEx[3] + '-' + infoRegEx[4];
            }            
        }

        if(tipoCliente == 2){
            console.log('OBTENIENDO DATOS PERSONA MORAL');
            tipoPersona = 'Moral';
            nombreCliente = objetoCliente.titular.nombre;
            apellidoPaternoCliente = '';
            apellidoMaternoCliente = objetoCliente.titular.apellidos;
            rfcCliente = objetoCliente.titular.rfc;
            compania = objetoCliente.titular.razonSocial;
            numeroCelular = objetoCliente.numeroTelefonico;
            numeroTelefono = objetoCliente.numeroTelefonico;
            fechaNacimiento = objetoCliente.titular.constitucionAnio + "-"+ objetoCliente.titular.constitucionMes + "-"+ objetoCliente.titular.constitucionDia;
        }

        var arrelgoMatch = {
            "a0UQ0000006IgCEMA0" : "a0UQ0000006WfxfMAC",
            "a0UQ0000006IgCGMA0" : "a0UQ0000006WfxQMAS",
            "a0UQ0000006IgC6MAK" : "a0UQ0000006WfxRMAS",
            "a0UQ0000006IgC1MAK" : "a0UQ0000006WfxKMAS",
            "a0UQ0000006IgC4MAK" : "a0UQ0000006WfxLMAS",
            "a0UQ0000006IgC8MAK" : "a0UQ0000006WfxXMAS",

            "a0UQ0000006UwF7MAK" : "a0UQ0000006WfRLMA0",
            "a0UQ0000006UwF3MAK" : "a0UQ0000006WfRJMA0",
            "a0UQ0000006WfRHMA0" : "a0UQ0000006WfRHMA0",
            "a0UQ0000006UwEzMAK" : "a0UQ0000006WfRFMA0",
            "a0UQ0000006UwEvMAK" : "a0UQ0000006WfRDMA0"
        };

        var objetoPaquete = referenciaClase.obtenerObjetoPaquete();
        var idPaquete = objetoPaquete.idPaquete;

        $.each(arrelgoMatch, function (idAnterior, idNuevo) {
            if(idAnterior == idPaquete){
                console.log('ID ANTERIOR ENCONTRADO ['+idAnterior+'], CAMBIANDO AL NUEVO ['+idNuevo+']');
                idPaquete = idNuevo;
            }
        });
        
        var informacion = {
            //"strLocalStorage":strLocalStorage,
            "proceso":"Creacion",
            "IDENTIFICADOR":IDENTIFICADOR,

            "idPlan" : idPaquete,
            "idCodigoPostal": objFactibilidad.idCodigoPostal,
            //"idCodigoPostal": '',

            "nombre": nombreCliente,
            "apellidoPaterno": apellidoPaternoCliente,
            "apellidoMaterno": apellidoMaternoCliente,
            "rfc": rfcCliente,
            "tipoPersona": tipoPersona, 
            "compania":compania,
            "fechaNacimiento": fechaNacimiento,
            "referenciaUrbana": '',

            "correoElectronico": objetoCliente.correoElectronico,
            "numeroTelefono": numeroTelefono,
            "numeroCeluar": numeroCelular,
            
            "direccionCalle": objDireccion.direccionCalculada.nombreCalle,
            "direccionNumero": objDireccion.direccionCalculada.numeroDireccion,
            "direccionNumeroInterior": '',
            "colonia": objDireccion.direccionCalculada.colonia,
            "direccionCiudad": objDireccion.direccionCalculada.localidad,
            "direccionCodigoPostal": objDireccion.direccionCalculada.codigoPostal,
            "direccionDM": objDireccion.direccionCalculada.delegacionMunicipio,
            "direccionEstado": objDireccion.direccionCalculada.estado,

            "sitioCategoryService": objFactibilidad.CategoryService,
            "sitioCluster": objFactibilidad.nombre_cluster,
            "sitioDistrito": objFactibilidad.distrito,
            "sitioFactibilidad": objFactibilidad.factibilidad,
            "sitioLatitud": objCoordenadas.latitud,
            "sitioLongitud": objCoordenadas.longitud,
            "sitioPlaza": objFactibilidad.Cuidad,
            "sitioRegion": objFactibilidad.Region,
            "sitioRegionId": objFactibilidad.IdRegion,
            "sitioZona": "SIN ZONA",

            "productos": arregloProductos,
            "servicios":arregloServicios,
            "promociones":objPromocionNuevo,

            "tipoIdentificacion":tipoIdentificacion,
            "documentos": "",
            "numeroCuenta":"",
            "idOportunidad":""
        };

        console.log('INFORMACION DEL OBJETO DE VENTA');
        console.log(informacion);
        console.groupEnd();
        referenciaClase.generarLeadVenta( informacion, esPagoTarjeta);
    }

    generarLeadVenta( informacion, esPagoTarjeta) {
        let referenciaClase = this;
        console.log('generarLeadVenta.esPagoTarjeta=>', esPagoTarjeta);
        var objMensaje = {
            'Creacion':'Validando Informaci&oacute;n',
            'Modelado':'Preparando la experiencia',
            'Adicionales':'Agregando adicionales',
            'Documento':'Enviando Documentos',
            'Firma':'Finalizando proceso',
        };
        $('#nombreProceso').html(objMensaje[informacion.proceso]);

        if(informacion.proceso == 'Documento'){
            let strDocumentos = localStorage.getItem('TP_ARCHIVOS');
            //informacion.documentos = referenciaClase.props.archivosInfo;
            informacion.documentos = JSON.parse(strDocumentos);
        } else {
            informacion.documentos = [];
        }
        
        $.ajax({
            url: Constantes.endpoints.generarVenta,
            data: JSON.stringify(informacion),
            dataType: "json",
            type: 'POST'
        }).done(function (respuesta) {
            console.log('RESPUESTA SERVICIO [generar-venta]', respuesta);
            console.table(respuesta);

            if(respuesta.datos.result == '0'){
                if(informacion.proceso=='Creacion'){
                    localStorage.setItem('TP_VENTA', JSON.stringify({"numeroCuenta": respuesta.datos.info.numeroCuenta, "idOportunidad" : respuesta.datos.info.IdOportunidad}));
                    informacion.proceso = 'Modelado';
                    informacion.numeroCuenta = respuesta.datos.info.numeroCuenta;
                    informacion.idOportunidad = respuesta.datos.info.IdOportunidad;

                    if(esPagoTarjeta){
                        console.log('ENVIANDO A GUARDAR LAS TARJETAS');
                        referenciaClase.guardarTarjeta(respuesta.datos.info.numeroCuenta)
                    } else {
                        console.log('PAGO EN EFECTIVO- NO REGISTRAR TARJETA');
                    }

                    referenciaClase.generarLeadVenta(informacion, false);
                    
                }else{
                    if(informacion.proceso=='Modelado'){
                        console.log('ENVIANDO ADICIONALES');
                        informacion.proceso = 'Adicionales';
                        referenciaClase.generarLeadVenta(informacion, false);
                    } else {
                        if(informacion.proceso=='Adicionales'){
                            console.log('ENVIANDO FIRMA');
                            informacion.proceso = 'Documento'; 
                            //informacion.proceso = 'Firma';
                            referenciaClase.generarLeadVenta(informacion, false);
                        } else {
                            /*if(informacion.proceso=='Firma'){
                                console.log('PROCESO DE VENTA TERMINADO');
                                console.log('informacion.numeroCuenta=>', informacion.numeroCuenta);
                                referenciaClase.props.jsonparams.carpeta = informacion.numeroCuenta;
                                referenciaClase.loadGuardaArchivos(Constantes.endpoints.guardaArchivosEcommerce,referenciaClase.props.jsonparams,referenciaClase.props.tipoCliente);
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
                            }//*/
                            //-----------------------------------------
                            if(informacion.proceso == 'Documento'){
                                informacion.proceso = 'Firma';
                                referenciaClase.generarLeadVenta(informacion, false);
                            }else{
                                if(informacion.proceso=='Firma'){
                                    console.log('PROCESO DE VENTA TERMINADO');
                                    console.log('informacion.numeroCuenta=>', informacion.numeroCuenta);
                                    referenciaClase.props.jsonparams.carpeta = informacion.numeroCuenta;
                                    referenciaClase.loadGuardaArchivos(Constantes.endpoints.guardaArchivosEcommerce,referenciaClase.props.jsonparams,referenciaClase.props.tipoCliente);
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
                                }
                            }//*/
                            
                        }
                    }
                }
            } else {
                referenciaClase.enviarCompraNoExitosa();
            }
        }).fail(function (jqXHR, textStatus) {
            console.log( 'OCURRIO UN ERROR EN EL SERVICIO [generar-venta] PROCESO ['+informacion.proceso+']', informacion);

            if(referenciaClase.props.intentos < 2){
                referenciaClase.generarLeadVenta(informacion);
                referenciaClase.props.intentos = 2;
            } else {
                referenciaClase.enviarCompraNoExitosa();
            }
        });
    }

    guardarTarjeta(cuenta){
        let direccionCalle = $('#facturacionCalle').val().trim();
        let direccionNumero = $('#facturacionNumero').val().trim();
        let direccionColonia = $('#facturacionColonia').val().trim();
        let direccionMunicipio = $('#facturacionMunicipio').val().trim();
        let direccionCP = $('#facturacionCP').val().trim();
        let direccionEstado = $('#facturacionEstado').val().trim();

        let nombreTarjeta = $('#nombreTarjeta').val().trim();
        let numeroTarjeta = $('#numeroTarjetaCaptura').val().trim();
        
        let mesTarjeta = $('#mesTarjetaCaptura').val().trim();
        let anioTarjeta = $('#anioTarjetaCaptura').val().trim();
        //let cvvTarjeta = $('#cvvTarjetaCaptura').val().trim();
        let cvvTarjeta = "";

        let pagoDomiciliado = '0';
        if($('#checkPagoDomiciliado').hasClass('active')){
            pagoDomiciliado = '1';
        }

        let informacion = {
            "cuenta": cuenta,
            "cctype": cvvTarjeta,
            "numeroTarjeta": numeroTarjeta,
            "expiracionMes": mesTarjeta,
            "expiracionAnio": anioTarjeta,
            "primerNombre": nombreTarjeta,
            "apellidos": "",
            "direccion": direccionCalle + " " + direccionNumero + ", " + direccionColonia,
            "codigoPostal": direccionCP,
            "estado": direccionEstado,
            "ciudad": direccionMunicipio,
            "segundoNombre": "",
            "esPagoDomiciliado": pagoDomiciliado
        };

        console.log('PARAMETROS DE TARJETA:', informacion);

        $.ajax({
            url: Constantes.endpoints.guardarTarjeta,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "secdata": otpyrc2(JSON.stringify(informacion))
            }),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            console.log('RESPUESTA GUARDAR TARJETA:', respuesta);

            if(respuesta.codigo != 0){
                var formato = 'background: #FE6A1B; color:white;border-radius:5px; padding:5px;font-style: italic;'
                console.log('%c' + '[' + new Date().toLocaleTimeString() + ']=> ' + 'LA TARJETA NO SE PUEDO GUARDAR', formato);
            }

        }).fail(function(jqXHR, textStatus) {
            console.log('ER', 'OCURRIO UN ERROR EN EL API [guardar-tarjeta]', jqXHR);
            var formato = 'background: red; color:white;border-radius:5px; padding:5px;font-style: italic;'
            console.log('%c' + '[' + new Date().toLocaleTimeString() + ']=> ' + 'ERROR DE API DE GUARDADO DE TARJETA', formato);
            
        });
    }

    enviarCompraNoExitosa(){
        //https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/enviar-compra-noexitosa
        var strLocalStorage = JSON.stringify(Object.entries(localStorage));
        var IDENTIFICADOR =  Math.floor(Math.random() * (500000 - 100000) + 100000);
        var informacion = {
            "strLocalStorage":strLocalStorage,
            "proceso":"VENTA-NO EXITOSA",
            "IDENTIFICADOR":IDENTIFICADOR
        }

        $.ajax({
            url: Constantes.endpoints.noCompra,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(informacion),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            console.log(respuesta);
            window.location = 'revision.html';
        }).fail(function(jqXHR, textStatus) {
            console.log('ER', 'OCURRIO UN ERROR EN EL API [enviar-correo-confirmacion]', jqXHR);
            window.location = 'revision.html';
        });
    }

    loadGuardaArchivos(URL2LOAD, params,tipo){
        let apuntador = this;
        $('#botonTitularContinuar').addClass('btnDeshabilitado');
        $('#botonTitularContinuar').css('pointer-events','none');
        var cabeceraMC = new Headers();
        cabeceraMC.append("Content-type", "application/json;charset=utf-8");

        fetch(URL2LOAD, {
            method: 'POST',
            body: JSON.stringify({"data":params}),
            headers: cabeceraMC
        }).then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                throw "Error en la llamada Ajax fetch con parametros "+URL2LOAD;
            }
        }).then((texto) => {
            try {
                var respuesta = texto;
                if(respuesta.status == 0){
                    if(respuesta.respuestaPayload !== null || respuesta.respuestaPayload !== ""){
                        if(tipo == 1){
                            //FISICA
                            localStorage.setItem('TP_OF_STR_TITULAR_FILE_INE','IFE_'+respuesta.respuestaPayload.uuid);
                            localStorage.setItem('TP_OF_STR_TITULAR_FILE_COMPROBANTE','COMPROBANTE_'+respuesta.respuestaPayload.uuid);
                        }else{
                            //MORAL
                            localStorage.setItem('TP_OF_STR_TITULAR_FILE_INE','IFE_'+respuesta.respuestaPayload.uuid);
                            localStorage.setItem('TP_OF_STR_TITULAR_FILE_COMPROBANTE','COMPROBANTE_'+respuesta.respuestaPayload.uuid);
                            localStorage.setItem('TP_OF_STR_TITULAR_FILE_RFC','RFC'+respuesta.respuestaPayload.uuid);
                        }
                        apuntador.props.banderaGuardoArchivos = true;
                    }
                }
            } catch (e) {
                console.log("ERROR EN GUARDADO DE ARCHIVOS:", e);
                apuntador.props.banderaGuardoArchivos =  false;
            }
        }).catch((err) => {
            console.log("err=>",err);
            apuntador.props.banderaGuardoArchivos = false;
            
        }).finally(() =>{
            $('#botonTitularContinuar').removeClass('btnDeshabilitado');
            $('#botonTitularContinuar').css('pointer-events','all');
        });
    }

    generarAgendamiento(turno, horaInstalacion, referenciaInstalacion, entreCalles){
        let referenciaClase = this;
        var fechaInstalacion= $('#datepicker').datepicker("getDate");

        var horaInstalacionEnvio = '09:00';
        if(horaInstalacion == 11) horaInstalacionEnvio = '11:00';
        if(horaInstalacion == 4) horaInstalacionEnvio = '16:00';

        var strDireccion = localStorage.getItem('TP_STR_DIRECCION');
        var objDireccion = null;
        var objFactibilidad = null;
        var objCoordenadas = null;

        var strVenta = localStorage.getItem('TP_VENTA');
        var objVenta = null;
        var numeroCuenta = '';
        var idOportunidad = '';

        var straPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        var objPaquete = null;
        var nombrePaquete = '';
        

        try{
            objDireccion = JSON.parse(strDireccion);
            objFactibilidad = objDireccion.factibilidad;
            objCoordenadas = objDireccion.coordenadas;

            objVenta = JSON.parse(strVenta);

            numeroCuenta = objVenta.numeroCuenta;
            idOportunidad = objVenta.idOportunidad;

            objPaquete = JSON.parse(straPaquete);
            nombrePaquete = objPaquete.detallePaquete.nombre;
        }catch(e){}

        let objCliente = referenciaClase.obtenerObjetoCliente();

        var parametros = {
            "idCuenta": numeroCuenta,
            "numeroCuenta": numeroCuenta,
            "idOportunidad": idOportunidad,
            "cliente": objCliente.titular.nombreCompleto,
            "calleInstalacion": objDireccion.direccionCalculada.nombreCalle,
            "numeroInteriorInstalacion": '',
            "numeroExteriorInstalacion": objDireccion.direccionCalculada.numeroDireccion,
            "coloniaInstalacion": objDireccion.direccionCalculada.colonia,
            "cpInstalacion": objDireccion.direccionCalculada.codigoPostal,
            "telefonoPrincipal": objCliente.numeroTelefonico,
            "telefonoCelular": objCliente.numeroTelefonico,
            "ciudadInstalacion": objDireccion.direccionCalculada.localidad,
            "delegacionInstalacion": objDireccion.direccionCalculada.delegacionMunicipio,
            "estadoInstalacion": objDireccion.direccionCalculada.estado,
            "latitud": objCoordenadas.latitud,
            "longitud":  objCoordenadas.longitud,
            "referenciaInstalacion": referenciaInstalacion,
            "entreCalles": entreCalles,
            "plaza": objFactibilidad.Cuidad,
            "distritoInstalacion": objFactibilidad.distrito,
            "regionInstalacion": objFactibilidad.Region,
            "zonaInstalacion": "SIN ZONA",
            "clusterInstalacion": objFactibilidad.nombre_cluster,
            "turno": turno,
            "fechaInstalacion": new Date(fechaInstalacion).toISOString().slice(0,10),
            "horaInstalacion": horaInstalacionEnvio,
            "paquete": nombrePaquete
        };

        let direccionInstalacionFull = objDireccion.direccionCalculada.nombreCalle + " "
        + objDireccion.direccionCalculada.numeroDireccion + " ,"
        + objDireccion.direccionCalculada.colonia + " ,"
        + objDireccion.direccionCalculada.delegacionMunicipio + " ,"
        + objDireccion.direccionCalculada.estado + " ,"
        + objDireccion.direccionCalculada.codigoPostal;

        console.log('PARAMETROS AGENDAMIENTOS ENVIADOS:', parametros);

        $.ajax({
            url: Constantes.endpoints.generarAgendamiento,
            //contentType: "application/json; charset=utf-8",
            data: JSON.stringify(parametros),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            console.log('RESPUESTA DEL SERVICIO DE AGENDAMIENTO');
            console.log(respuesta);

            var fechaInfo = referenciaClase.obtenerFechaFormato($('#datepicker').datepicker("getDate"));
            localStorage.setItem('TP_CLIENTE_FECHA_INSTALACION', fechaInfo);
            localStorage.setItem('TP_CLIENTE_DIR_INSTALACION', direccionInstalacionFull);
            localStorage.setItem('TP_CLIENTE_PAQUETE', nombrePaquete);
            window.location = 'finaliza.html';

            if(respuesta.codigo == 0){
                var nombreCliente = objCliente.titular.nombreCompleto;
                var numeroCuenta = '';//TODO:PENDIENTE
                var correoElectronico = objCliente.correoElectronico;

                //referenciaClase.enviarCorreoConfirmacion(nombreCliente, numeroCuenta, correoElectronico)
            } else {
                //TODO:PROCESO PENDIENTE
            }

        }).fail(function(jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE AGENDAMIENTO');
            console.log(jqXHR);
            var fechaInfo = referenciaClase.obtenerFechaFormato($('#datepicker').datepicker("getDate"));
            localStorage.setItem('TP_CLIENTE_FECHA_INSTALACION', fechaInfo);
            window.location = 'finaliza.html';
        });
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
        //console.group('FUNCION obtenerObjetoCliente()');
        let cadenaCliente= localStorage.getItem('TP_STR_CLIENTE');
        
        try {
            let objetoCliente = JSON.parse(cadenaCliente);
            //console.groupEnd();
            return objetoCliente;
        } catch (error) {
            console.log('ERROR AL OBTENER EL OBJETO CLIENTE POR:', error);
            //console.groupEnd();
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
            let objetoCliente = {
                "titular":objetoTitular
            }
            localStorage.setItem('TP_STR_CLIENTE', JSON.stringify(objetoCliente));
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
                if(objetoAdicionales!=null && objetoAdicionales.parrilla  !=null && objetoAdicionales.parrilla != undefined){
                    if(objetoAdicionales.parrilla  !=null && objetoAdicionales.parrilla.precio != undefined){
                        var objProducto = {
                            'id': objetoAdicionales.parrilla.Id,
                            'nombre': 'PARRILLA',
                            'tipo': 'PRODUCTOS'
                        }
                        arregloProductos.push(objProducto);
                    }
                }
            
                if(objetoAdicionales!=null && objetoAdicionales.canales !=null && objetoAdicionales.canales != undefined){
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
                if(objetoAdicionales!=null && objetoAdicionales.equipo !=null && objetoAdicionales.equipo != undefined){
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

                if(objetoAdicionales!=null && objetoAdicionales.telefonia !=null &&  objetoAdicionales.telefonia != undefined){
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
            //$.each(objPaquete.promocionPremium, function(key, objPromocion) {    
                var obj = {
                    'id':objPaquete.promocionPremium.Id,
                    'nombre':objPaquete.promocionPremium.nombre,
                    'montoDescuento':objPaquete.promocionPremium.montoDescuento,
                    'esAutomatica':objPaquete.promocionPremium.esAutomatica
                }
                objPromocionNuevo.push(obj);
            //});
            console.groupEnd();
            return objPromocionNuevo;
        } catch (error) {
            console.log('ERROR AL BUSCAR LA LISTA DE SERVICIOS POR:', error);
            console.groupEnd();
            return [];
        }
    }

    actualizaObjetoArchivos(){
        let referenciaClase = this;
        let strArchivos = localStorage.getItem('TP_ARCHIVOS');
        try {
            let objetoArchivos = JSON.parse(strArchivos);
            localStorage.setItem('TP_ARCHIVOS', referenciaClase.props.archivosInfo);
            
        } catch (error) {
            
        }
    }
}

$(window).keydown(function(event) {
    if(event.ctrlKey && event.keyCode == 65) {
        console.log("CTRL+A");

        $('#nombreTarjeta').val('ALBERTO RAMIREZ SANCHEZ');
        $('#numeroTarjetaCaptura').val('4931720012345678');
        $('#mesTarjetaCaptura').val('06');
        $('#anioTarjetaCaptura').val('2021');

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
        $('#titularNombre').val('SOLEDAD');
        $('#titularApellidoPaterno').val('PEREZ');
        $('#titularApellidoMaterno').focus();
        $('#titularRFC').val('PEAS010101AAA');
        $('#titularTelefono').val('5512345678');
        $('#titularCelular').val('5587654321');

        $('#razonSocial').val('COMERCIALIZADORA DEL SUR S.A.');
        $('#anioMoral').val('1995');

        setTimeout(function(){
            $('#mesMoral').val('01'); 
            setTimeout(function(){
                $('#diaMoral').val('02');
            }, 2000);
        }, 2000);
        
        $('#rfcMoral').val('COS950102');
        $('#nombreMoral').val('ROBERTO');
        $('#apellidosMoral').val('MARTINEZ');

        $('input:radio[name="documento"]').filter('[value="1"]').attr('checked', true);

        $('#checkBuroCredito').addClass('active');
        $('#checkLegales').addClass('active');

        event.preventDefault(); 
    }
});