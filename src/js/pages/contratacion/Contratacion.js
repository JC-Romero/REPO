import { TimelineMax, TweenMax } from "gsap";
import { ModalContrata } from './ModalContrata';
import * as Constantes from "../../utils/Constantes";
//import { FinalizaContratacion } from './FinalizaContratacion';
import { Canales } from '../detallePaquete/Canales';
import { ClaseCobertura } from "../generales/ClaseCobertura";

export class Contratacion {
    constructor(carrito) {

        const claseCobertura = new ClaseCobertura();

        let strPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        let strComplementos = localStorage.getItem('TP_STR_COMPLEMENTOS');

        let objPaquete;
        let objComplementos;
        try {
            objPaquete = JSON.parse(strPaqueteSeleccionado);
            objComplementos = JSON.parse(strComplementos);
        } catch (error) {
            //console.log("Error en:", error);
        }

        this.verificarNumeroPasos();

        this.props = {
            maincontainer: document.querySelector('.section-contratacion'),
            mainHeader: document.querySelector('.main-header'),
            termsConditions: document.querySelector('.terms_conditions'),
            mainFooter: document.getElementById('footer'),
            containerSteps: document.querySelector('.container-steps--contratacion'),
            stepItem: [...document.querySelectorAll('.container-steps--contratacion__step')],
            listItemsPackages: document.getElementById('contentContListItems'),
            itemsPackage: [...document.querySelectorAll('.card-contratacion__packages')],
            textAddPromo: [...document.querySelectorAll('.card-contratacion__packages__description-content__add')],
            btnAddAddon: document.querySelector('.addon--content-barAdd__text'),
            buttonNext: document.querySelector('.contratacion-bar-costs--content-button-next__text'),
            buttonPrev: document.querySelector('.contratacion-bar-costs--content-button-prev__text'),
            targetPackage: [...document.querySelectorAll('.card-contratacion__packages__description-content')],
            mainPrice: document.querySelector('.main-summary__invoice-amount-price'),
            backStepContratacion: document.getElementById('backStepContratacion'),
            closeContratacion: document.getElementById('closeContratacion'),
            contratacionBarCosts: document.getElementById('contratacionBarCosts'),
            shoppingCartContratacion: document.getElementById('shoppingCartContratacion'),
            barContratacion: document.getElementById('barContratacion'),
            tentContratacion: [...document.querySelectorAll('.content-contratacion')],
            mainSections: document.querySelector('.content-main-summary--main-sections'),
            contentContratacion: [...document.querySelectorAll('.content-contratacion')],
            contentInvoice: document.querySelector('.content-main-summary-sections-column-1'),
            editTv: document.getElementById('MejorarTv'),
            containerEditAddon: document.querySelector('.container-edit--addon'),
            contentEditLayer: document.querySelector('.container-edit--addon__layer'),
            contentEditAddon: document.querySelector('.container-edit--addon__content'),
            contentDescriptionAddon: document.querySelector('.addon--content-description'),
            dinamicContent: document.querySelector('.addon--content-dinamic'),
            barAdd: document.querySelector('.addon--content-barAdd'),
            closeModal: document.querySelector('.addon--content-close'),
            contentBlocks: document.querySelector('.main-summary-tv__invoice-data-block-content'),
            listEditBlocks: [...document.querySelectorAll('.main-summary-tv__invoice-data--edit')],
            invoiceListApps: document.querySelector('.main-summary-tv__invoice-data-block-content_apps'),
            itemsNamesSteps: [...document.querySelectorAll('.contratacion--top-bar__steps__list-names__item')],
            listPointsStepItems: document.querySelectorAll('.contratacion--top-bar__steps--content-items__item'),
            lastSelectedchild: 0,
            currentStep: 0,
            lastScrollTop: 0,
            movList: 0,
            direction: '',
            indexList: 0,
            packages: [
                {
                    name: 'HBO',
                    add: false,
                    labelName: 'HBO',
                    description: 'Canales + OnDemand',
                    promo: 'Sin costo x 2 meses',
                    poster: 'assets/img/pages/contratacion/Canales_1.png',
                    logo: 'assets/img/pages/contratacion/hbo-holding.png'
                }, {
                    name: 'FOX',
                    add: false,
                    labelName: 'Fox Premium',
                    description: 'Canales + OnDemand',
                    promo: 'Sin costo x 2 meses',
                    poter: 'assets/img/pages/contratacion/Canales_2.png',
                    logo: 'assets/img/pages/contratacion/LogoFox.png'
                }
            ],
            tempPriceStep2: 0,
            tempTextsStb: [],
            options: {
                step: 0,
                namePackage: '',
                pricePackage: 1459,
                basePrice: 1459,
                tempDevices: '',
                amountDevicesTemp: '',
                amountAddonsTemp: '',
                selectedPackage: '',
                steps: [],
                equipos: [],
                addons: []
            },
            appsSelected: [],
            setopboxSelected: [
                {
                    id: '',
                    show: false,
                    name: '',
                    amount: '',
                    total: '',
                    price: 0,
                    cantidad: 0,
                    tipo:''
                }, {
                    id: '',
                    show: false,
                    name: '',
                    amount: '',
                    total: '',
                    price: 0,
                    cantidad: 0,
                    tipo:''
                }
            ],
            addonsDeleted: [],
            tl: new TimelineMax(),
            section: '',
            confirmAddons: false,
            showCombo: false,
            showBarConfirm: false,
            modalcupon: document.querySelector('.modal--cupon'),
            layerModal: document.querySelector('.modal--cupon__layer'),
            contentForm: document.querySelector('.modal--cupon__content-form'),
            importeDescuentoCupon: 0,
            totalProntoPago: 0,
            totalCanalesPremium: 0,
            arregloAdicionales: [],
            modalContrata: null,
            mainBody: document.getElementsByTagName('body'),
            windowW: window.innerWidth,
            infoPaquete: objPaquete,
            infoComplementos: objComplementos,
            infoCupon: {},
            refCobertura: claseCobertura,
            refCarrito: carrito,
        }
        this.init();
        this.resizeCards();
    }

    init() {
        window.scrollTo(0, 0);
        const heightItem = this.getHeightItem();

        this.actualizarInfoBarra();
        this.reiniciarInfoObjeto();
        this.validacionExistePaquete();
        this.validarExistenciaAdicionales();
        this.validarMemoriaDireccion();
        this.iniciarEventos();
        this.step_1();
        this.eventosModal();
        this.showStep();
        //this.iniciarMapa();
        this.iniciarIdPromocion();
        this.eventoEliminarCanalPremium();
        this.habilitarBotonDireccion();
        this.eventoEnviarDatosSinFactibilidad();
        this.eventoAbrirVentanaCupon();
        this.eventoCerrarVentanaCupon();
        this.eventoValidarCupon();
        this.actualizarInformacionResumen();
        this.actualizarParrillas();
        this.actualizarEquipos();
        this.eventoAplicarCupon();
        this.restaurarVistas();
        this.setKeyupInput();
        this.actualizarPrecioTotal();
        this.seListenersBoton();
        this.eventoModificarLineaAdicional();
        this.eventoQuitarParrilla();
        this.eventoBuscarCP();
        this.eventoQuitarEquipo();//*/

        //this.eventoCanales();
        this.actualizarInfoComplementos();

        setTimeout(function () { window.scrollTo(0, 0); }, 1000);

        //this.simularPasosCompra()
        this.props.mainBody[0].style.cssText = 'overflow-Y: scroll;';
    }

    actualizarInfoBarra(){
        //nombrePaquetePromocion
        //precioPromocion
        //nombrePaqueteComplemento
        //precioComplemento
        var strPaqueteSeleccion = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            var objetoPaqueteSeleccion = JSON.parse(strPaqueteSeleccion);
            $('#nombrePaquetePromocion').html(objetoPaqueteSeleccion.detallePaquete.detalle.nombrePaquete);
            $('#nombrePaqueteComplemento').html(objetoPaqueteSeleccion.detallePaquete.detalle.nombrePaquete);

            $('#precioPromocion').html(objetoPaqueteSeleccion.detallePaquete.detalle.precioLista);
            $('#precioComplemento').html(objetoPaqueteSeleccion.detallePaquete.detalle.precioLista);
        } catch (error) {
            console.log('ERROR EN LA FUNCION DE ACTUALIZACION DE LA BARRA:', error)
        }
    }

    simularPasosCompra(){
        let apuntador = this;
        setTimeout(function () {
            apuntador.nextStep();
        }, 1000);
        setTimeout(function () {
            //apuntador.nextStep();
        }, 2000);
        setTimeout(function () {
            /*apuntador.nextStep();
            $.each($('.container-steps--contratacion__step'), function(key, objHtml) {
                if(key == 3){
                    $(objHtml).removeAttr('style');
                }
            });
            const finalizaContratacion = new FinalizaContratacion();//*/
        }, 3000);
    }

    verificarNumeroPasos() {
        console.group('FUNCIONverificarNumeroPasos()');
        let listaPasos = '<li class="contratacion--top-bar__steps__list-names__item active" style="display:flex">Promocion</li>' +
            '<li class="contratacion--top-bar__steps__list-names__item" >Complementos</li>' +
            '<li class="contratacion--top-bar__steps__list-names__item" >Resumen</li>' +
            '<li class="contratacion--top-bar__steps__list-names__item">Contrata</li>';

        let iconoPasos = `<li class="contratacion--top-bar__steps--content-items__item">
                    <div class="point-item" style="background-color: rgb(26, 118, 210); height: 7px; width: 7px;">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>
                <li class="contratacion--top-bar__steps--content-items__item">
                    <div class="point-item">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>
                <li class="contratacion--top-bar__steps--content-items__item">
                    <div class="point-item">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>
                <li class="contratacion--top-bar__steps--content-items__item" style="width: 12px;">
                    <div class="point-item">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>`;

        let strPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        let strComplementos = localStorage.getItem('TP_STR_COMPLEMENTOS');
        let megasPaquete = 0;
        let objPaquete;
        let objComplementos;
        try {
            objPaquete = JSON.parse(strPaqueteSeleccionado);
            objComplementos = JSON.parse(strComplementos);
            let megasTexto = objPaquete.detallePaquete.detalle.megas;
            let regexMB = /(\d{1,3})/;
            let resultado = regexMB.exec(megasTexto);
            megasPaquete = parseInt(resultado[0]);
        } catch (error) {
            console.log("Error en:", error);
        }

        console.log('MEGAS PAQUETE:', megasPaquete);

        if (megasPaquete < 150) {

            listaPasos = '<li class="contratacion--top-bar__steps__list-names__item active" style="display:flex">Complemento</li>' +
                '<li class="contratacion--top-bar__steps__list-names__item" >Resumen</li>' +
                '<li class="contratacion--top-bar__steps__list-names__item">Contrata</li>';

            iconoPasos = `<li class="contratacion--top-bar__steps--content-items__item">
                    <div class="point-item" style="background-color: rgb(26, 118, 210); height: 7px; width: 7px;">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>
                
                <li class="contratacion--top-bar__steps--content-items__item">
                    <div class="point-item">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>
                <li class="contratacion--top-bar__steps--content-items__item" style="width: 12px;">
                    <div class="point-item">
                    </div>
                    <div class="progress-item">
                        <div class="progress-item-done">
                        </div>
                    </div>
                </li>`;

            $(".container-steps--contratacion li:nth-child(2)").remove();
            $('#txtCobertura').html(' Paso 1 de 3');
            $('#txtCobertura3').html(' Paso 2 de 3');

            $('.main-summary-tv').hide();
        }

        $('.contratacion--top-bar__steps__list-names').html(listaPasos);
        $('.contratacion--top-bar__steps--content-items').html(iconoPasos);

        console.groupEnd();
    }

    validacionExistePaquete() {
        console.group('validacionExistePaquete()');
        let referenciaClase = this;
        let objetoPaquete;
        let paqueteCadena = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            objetoPaquete = JSON.parse(paqueteCadena);
            let validarId = objetoPaquete.idPaquete;

            if (validarId == undefined || validarId == null || validarId == '') {
                console.log('ID DE PAQUETE SIN VALOR VALIDO');
                $('#textoMensaje').html('Para contratar un paquete Totalplay, selecciona alguna de nuestras ofertas');
                $('#ventanaCambioCiudad').css('display', 'flex');
                $('#capaVentanaCambioCiudad').css('opacity', '1');
                $('#contenidoVentanaCambioCiudad').css('opacity', '1');
                $('#formVentanaCambioCiudad').css('display', 'block');
                $('#mensajeVentanaCambioCiudad').css('display', 'flex');
            } else {
                console.log('ID DE PAQUETE ENCONTRADO[' + validarId + ']');
            }
        } catch (error) {
            console.log('ERROR validacionExistePaquete=>', error);
            $('#textoMensaje').html('Para contratar un paquete Totalplay, selecciona alguna de nuestras ofertas');
            $('#ventanaCambioCiudad').css('display', 'flex');
            $('#capaVentanaCambioCiudad').css('opacity', '1');
            $('#contenidoVentanaCambioCiudad').css('opacity', '1');
            $('#formVentanaCambioCiudad').css('display', 'block');
            $('#mensajeVentanaCambioCiudad').css('display', 'flex');
        }

        console.groupEnd();
    }

    validarExistenciaAdicionales() {
        console.group('validarExistenciaAdicionales()');
        /*  [MejorarTv]     [agregarEquipos]    [seleccionCanalPremium]     [agregarLineaAdicional]*/
        let referenciaClase = this;
        let objetoTelevisionMemoria = referenciaClase.props.infoComplementos.television;
        console.log('objetoTelevisionMemoria=>', objetoTelevisionMemoria);

        let banderaTVParrilla = false;
        $.each(objetoTelevisionMemoria, function (key, objTelevision) {
            console.log('objTelevision.Agrupacion=>', objTelevision.Agrupacion);
            console.log('objTelevision.adicional.length=>', objTelevision.adicional.length);

            if (objTelevision.Agrupacion == 'Parrillas' && objTelevision.adicional.length > 0) {
                banderaTVParrilla = true;
            }
        });

        /* ----------------- VALIDACION DE BANDERAS ----------------- */
        console.log('BANDERA TV PARRILLA [' + banderaTVParrilla + ']');
        if (banderaTVParrilla) {
            $('#MejorarTv').show();
        }

        $('#totalMegasBase').html(referenciaClase.props.infoPaquete.detallePaquete.detalle.megas);
        $('#totalMegasPromo').html(referenciaClase.props.infoPaquete.detallePaquete.detalle.promoMegas);

        var parsearPaquete = referenciaClase.props.infoPaquete.detallePaquete.detalle;
        var paqueteTipo = parsearPaquete.megas;
        var megas = paqueteTipo.split(' ');
        if (megas[0] >= 250) {
            $('#totalMegasPaqueteTexto').css('display', 'none');
        } else {
            $('#totalMegasPaqueteTexto').css('display', 'block');
            $('#totalMegasPaquete').html(referenciaClase.props.infoPaquete.detallePaquete.detalle.megas);
        }

        console.groupEnd();
    }

    iniciarEventos() {
        console.group('iniciarEventos()');
        let apuntador = this;

        $("#btnContinuar").click((e) => {

            e.preventDefault();
            var calle = $.trim($('#txtCalle').val());
            var codigoPostal = $.trim($('#txtCodigoPostal').val());
            var idPaquete = apuntador.props.infoPaquete.idPaquete;
            if (idPaquete == undefined || idPaquete == null || idPaquete == '') {
                $('#textoMensaje').html('Para contratar un paquete Totalplay, selecciona alguna de nuestras ofertas');
                $('#ventanaCambioCiudad').css('display', 'flex');
                $('#capaVentanaCambioCiudad').css('opacity', '1');
                $('#contenidoVentanaCambioCiudad').css('opacity', '1');
                $('#formVentanaCambioCiudad').css('display', 'block');
                $('#mensajeVentanaCambioCiudad').css('display', 'flex');
            } else {
                var procesa = apuntador.props.refCobertura.validarFormulario(calle, codigoPostal, 'errortxtCalle', 'errorCodigoPostal');
                if (procesa) {
                    $('#tituloCobertura').html('Validando cobertura ...');
                    $('#descripcionCobertura').hide();
                    $('#formularioCobertura').hide();
                    $('#btnContinuar').hide();
                    $('#cargador').show();
                    $("#step2").css("display", "none");

                    var objetoDireccionFormulario = {
                        "direccionFormulario": {
                            "codigoPostal": $('#txtCodigoPostal').val(),
                            "ciudad": $('#txtCiudad').val(),
                            "direccion": $('#txtCalle').val()
                        }
                    };
                    localStorage.setItem('TP_STR_DIRECCION', JSON.stringify(objetoDireccionFormulario));

                    var direccion = $('#txtCalle').val() + ' ' + $('#txtCodigoPostal').val() + ',' + $('#txtCiudad').val() + ', Mexico';
                    apuntador.buscarDireccion(direccion);
                }
            }
        });

        this.props.closeModal.addEventListener('click', () => {
            this.props.tl.to(this.props.contentEditAddon, 0.5, {
                opacity: 0,
                bottom: '-20%',
                ease: "power4.out"
            }).to(this.props.contentEditLayer, 0.5, {
                opacity: 0,
                ease: "power4.out",
                onComplete: this.closeModal.bind(this)
            })
            switch (this.props.section) {
                case 'apps':
                    this.clearApps();
                    break;
            }
            this.props.barAdd.removeAttribute('style');
        });

        $("body").on('click', '.content-contratacion__shopping-cart-top--car', function () {
            localStorage.setItem('TP_CONTADOR_CARRITO', '1');
        });

        $("body").on('click', '.content-contratacion__shopping-cart-top--shared', function () {
            let cadenaPaquete = localStorage.getItem('TP_OF_OBJ_PAQUETE_DETALLE');
            let objetoPaquete = JSON.parse(cadenaPaquete);
            let cadenaEncriptada = encriptar(JSON.stringify(objetoPaquete));
            let cadenaDesencriptada = desencriptar(cadenaEncriptada);
        });
        
        $("body").on('click', '.cntEquipo', function() {
            console.log('EVENTO SELECCION EQUIPO');
            let contenedorActual = $( this );
            let etiquetaPrecio = $( this ).find( ".price" );
            let etiquetaSeleccion = $( this ).find( ".addedItem" );
            let visiblidadActual = $(etiquetaSeleccion).css('display');

            let cantidad = 0;
            if(visiblidadActual == 'none'){
                $(etiquetaPrecio).hide();
                $(etiquetaSeleccion).css('display','contents');
                $( this ).addClass('activo');
                cantidad = 1;
            }else{
                $(etiquetaSeleccion).hide();
                $(etiquetaPrecio).css('display','block');
                $( this ).removeClass('activo');
                cantidad = 0;
            }

            let bandera = false;
            $.each( $('.cntEquipo') , function( key, obj ) {
                if( $(obj).hasClass('activo') ){
                    console.log('EXISTE ACTIVO');
                    bandera = true;
                }
            });
            if(bandera){
                $('#confirmBoxes').show();
            } else {
                $('#confirmBoxes').hide();
            }

            let _index = $(this).attr('data-index');
            apuntador.props.setopboxSelected[_index].id = $(this).attr('data-id');
            apuntador.props.setopboxSelected[_index].price = $(this).attr('data-precio');
            apuntador.props.setopboxSelected[_index].cantidad = cantidad;
            apuntador.props.setopboxSelected[_index].name = $(this).attr('data-name');
            apuntador.props.setopboxSelected[_index].tipo = $(this).attr('data-tipo');

            console.log('apuntador.props.setopboxSelected:', apuntador.props.setopboxSelected);
        });

        $('#confirmBoxes').on('click', function () {
            
            apuntador.agregarEquipoHTML()
        });

        $("body").on('click', '.cntCanales', function() {
            let contenedorActual = $( this );
            let etiquetaPrecio = $( this ).find( ".price" );
            let etiquetaSeleccion = $( this ).find( ".addedItem" );
            let visiblidadActual = $(etiquetaSeleccion).css('display');

            $('#confirmChannels').attr('data-id' , $(this).attr('data-id'));
            $('#confirmChannels').attr('data-precio' , $(this).attr('data-precio'));

            $.each( $('.cntCanales') , function( key, obj ) {
                let contenedor = $( obj );
                if(contenedorActual != contenedor){
                    $( obj ).find( ".price" ).css('display','block');
                    $( obj ).find( ".addedItem" ).hide();
                }
            });

            if(visiblidadActual == 'none'){
                console.log('ETIQUETA SELECCION ESTABA OCULTA');
                $(etiquetaPrecio).hide();
                $(etiquetaSeleccion).css('display','contents');

                $('#confirmChannels').show();
            }else{
                console.log('ETIQUETA SELECCION ESTABA VISIBLE');
                $(etiquetaSeleccion).hide();
                $(etiquetaPrecio).css('display','block');

                $('#confirmChannels').hide();
            }
        });

        $('#beforeComplementos').on('click', function () {            
            apuntador.afterStep();
        });

        $('#nextComplementos').on('click', function () {
            
            if (apuntador.props.currentStep === 1) {
                apuntador.nextStep();

                if($('#complementoWifi').hasClass('selected')){
                    let _index = $('#complementoWifi').attr('data-index');

                    apuntador.props.setopboxSelected[_index].id = $('#complementoWifi').attr('data-id');
                    apuntador.props.setopboxSelected[_index].price = $('#complementoWifi').attr('data-precio');
                    apuntador.props.setopboxSelected[_index].cantidad = 1;
                    apuntador.props.setopboxSelected[_index].name = $('#complementoWifi').attr('data-name');;
                    apuntador.props.setopboxSelected[_index].tipo = $('#complementoWifi').attr('data-tipo');;

                    
                    let etiquetaPrecio = $('#cntEquipoWifi').find( ".price" );
                    let etiquetaSeleccion = $('#cntEquipoWifi').find( ".addedItem" );
                    $(etiquetaPrecio).hide();
                    $(etiquetaSeleccion).css('display','contents');
                    $('#cntEquipoWifi').addClass('activo');
                    
                    $('#confirmBoxes').trigger('click');
                }

                if($('#complementoTVAdicional').hasClass('selected')){
                    let _index = $('#complementoTVAdicional').attr('data-index');

                    apuntador.props.setopboxSelected[_index].id = $('#complementoTVAdicional').attr('data-id');
                    apuntador.props.setopboxSelected[_index].price = $('#complementoTVAdicional').attr('data-precio');
                    apuntador.props.setopboxSelected[_index].cantidad = 1;
                    apuntador.props.setopboxSelected[_index].name = $('#complementoTVAdicional').attr('data-name');
                    apuntador.props.setopboxSelected[_index].tipo = $('#complementoTVAdicional').attr('data-tipo');

                    let etiquetaPrecio = $('#cntEquipoTV').find( ".price" );
                    let etiquetaSeleccion = $('#cntEquipoTV').find( ".addedItem" );
                    $(etiquetaPrecio).hide();
                    $(etiquetaSeleccion).css('display','contents');
                    $('#cntEquipoTV').addClass('activo');

                    $('#confirmBoxes').trigger('click');
                }
            }
        });

        $('#confirmChannels').on('click', function () {
            
            apuntador.agregarParrillaHTML($(this).attr('data-id'))
        });

        $('.ctnPromocion').on('click', function () {
            if(!$(this).hasClass("selected")){
                let id= $(this).attr('id');
                if(id == 'contenedorHBOCambio'){
                    $('#contenedorFOXCambio').removeClass('selected');
                    $('#confirmComplements').attr('data-id','HBO');
                }
                if(id == 'contenedorFOXCambio'){
                    $('#contenedorHBOCambio').removeClass('selected');
                    $('#confirmComplements').attr('data-id','FOX');
                }
                $(this).addClass('selected');
                $('#confirmComplements').show()
            }
        });

        $('#confirmComplements').on('click', function () {
            if($(this).attr('data-id') == 'HBO'){
                $('#contenedorHBO').trigger('click');

                $('#contenedorFoxApp').show();
                $('#contenedorHBOApp').hide();
            }
            if($(this).attr('data-id') == 'FOX'){
                $('#contenedorFOX').trigger('click');

                $('#contenedorHBOApp').show();
                $('#contenedorFoxApp').hide();
            }
            $('#contenedorHBOApp').removeClass('selected');
            $('#contenedorFoxApp').removeClass('selected');

            $('.invoice-data-block-content_apps__item--delete').trigger('click');
            apuntador.closeModal();
        });

        $('.cntAppAdicional').on('click', function () {

            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                $('#confirmPremium').attr('data-id' , '');
                $('#confirmPremium').hide();
            }else{
                $(this).addClass('selected');
                $('#confirmPremium').attr('data-id' , $(this).attr('data-id'));
                $('#confirmPremium').show();
            }
        });

        $('#confirmPremium').on('click', function () {
            apuntador.agregarCanalPremiun($(this).attr('data-id'))
        });

        $('.ctnComplemento').on('click', function () {
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                
            }else{
                $(this).addClass('selected');                
            }
        });

        console.groupEnd();
    }

    actualizarInfoComplementos(){
        console.group('actualizarInfoComplementos()');
        let referenciaClase = this;
        let strComplementos = localStorage.getItem('TP_STR_COMPLEMENTOS');
        try {
            let objComplementos = JSON.parse(strComplementos);
            /* ------------------ CANALES PREMIUM ------------------ */
            console.log('ACTUALIZANDO CANALES PREMIUM');
            let infoCanalesPremium = objComplementos.television[0].adicional;
            console.log('infoCanalesPremium=>', infoCanalesPremium);
            $.each(infoCanalesPremium, function (key, objCanalesPremium) {
                let precio = objCanalesPremium.precio.toFixed(0);
                if(objCanalesPremium.tipo == 'PROMO_HBO'){
                    $('#contenedorHBOApp').attr('data-id', objCanalesPremium.Id);
                    $('#appHBOPrecio').html('$ '+precio);
                }
                if(objCanalesPremium.tipo == 'PROMO_FOX'){
                    $('#contenedorFoxApp').attr('data-id', objCanalesPremium.Id);
                    $('#appFOXPrecio').html('$ '+precio);
                }
            });

        } catch (error) {
            console.log('CANALES PREMIUM ERROR:=>', error);
        }

        try {
            let objComplementos = JSON.parse(strComplementos);
            /* ------------------ PARRILLAS ------------------ */
            let jsonParrilla = objComplementos.television[1].adicional;
            jsonParrilla = referenciaClase.ordenarObjeto(jsonParrilla);
            let htmlParrilas = '';
            let objetoDescripcion = {
                'TV BASICA': '120 canales (80 HD)',
                'TV AVANZADA': '255 canales (130 HD)',
                'TV PREMIUM': '275 canales (160 HD)',
            }

            $.each(jsonParrilla, function (key, objetoParrila) {
                let precio = objetoParrila.precio.toFixed(0);
                htmlParrilas += ``+
                `<li class="item cntCanales" data-id="${objetoParrila.Id}" data-precio="${precio}">
                    <h1>${objetoParrila.nombre}</h1>
                    <p>${objetoDescripcion[objetoParrila.nombre]}</p>
                    <hr>
                    <p class="price">$ ${precio}</p>
                    <p class="addedItem">Seleccionado</p>
                </li>`;
                
            });
            $('#ctnParrillas').html(htmlParrilas);
        } catch (error) {
            console.log('PARRILLAS ERROR:=>', error);
        }

        try {
            let objComplementos = JSON.parse(strComplementos);
            /* ------------------ EQUIPO ADICIONAL ------------------ */
            let jsonAdicional = objComplementos.equipoAdicional;
            $.each(jsonAdicional, function (key, objetoAdicional) {
                if(objetoAdicional.tipo == 'ADDON_WIFI'){
                    $('#cntEquipoWifi').attr('data-id', objetoAdicional.Id);
                    $('#cntEquipoWifi').attr('data-precio', objetoAdicional.precio);
                    $('#cntEquipoWifi').attr('data-index', key);
                    $('#cntEquipoWifi').attr('data-name', 'Wifi Extender');
                    $('#cntEquipoWifi').attr('data-tipo', objetoAdicional.tipo);

                    $('#complementoWifi').attr('data-id', objetoAdicional.Id);
                    $('#complementoWifi').attr('data-precio', objetoAdicional.precio);
                    $('#complementoWifi').attr('data-index', key);
                    $('#complementoWifi').attr('data-name', 'Wifi Extender');
                    $('#complementoWifi').attr('data-tipo', objetoAdicional.tipo);

                    let precio = objetoAdicional.precio;
                    $('.cntWifiPrecio').html('$ '+ precio.toFixed(0));
                }
                if(objetoAdicional.tipo == 'ADDON_TV_ADCIONAL'){
                    $('#cntEquipoTV').attr('data-id', objetoAdicional.Id);
                    $('#cntEquipoTV').attr('data-precio', objetoAdicional.precio);
                    $('#cntEquipoTV').attr('data-index', key);
                    $('#cntEquipoTV').attr('data-name', 'Television Adicional');
                    $('#cntEquipoTV').attr('data-tipo', objetoAdicional.tipo);

                    $('#complementoTVAdicional').attr('data-id', objetoAdicional.Id);
                    $('#complementoTVAdicional').attr('data-precio', objetoAdicional.precio);
                    $('#complementoTVAdicional').attr('data-index', key);
                    $('#complementoTVAdicional').attr('data-name', 'Television Adicional');
                    $('#complementoTVAdicional').attr('data-tipo', objetoAdicional.tipo);

                    let precio = objetoAdicional.precio;
                    $('.cntTVPrecio').html('$ '+ precio.toFixed(0));
                }
            });
        } catch (error) {
            console.log('EQUIPO ERROR:=>', error);
        }
        console.groupEnd();
    }

    resizeCards() {
        addEventListener('resize', () => {
            this.props.cardPosition = [...document.getElementsByClassName('content-contratacion__addChannels')];

            this.props.cardPositionPromo = [...document.getElementsByClassName('content-contratacion__packages')];

            this.props.windowW = window.innerWidth;
            if (this.props.windowW < 769) {
                if (this.props.cardPosition != null) {
                    if (this.props.cardPosition[0] != undefined) {
                        this.props.cardPosition[0].style = `justify-content: flex-start !important;`;
                    }
                }
                if (this.props.cardPositionPromo != null) {
                    if (this.props.cardPositionPromo[1] != undefined) this.props.cardPositionPromo[1].style = `justify-content: center !important;`;
                }
            } else {
                if (this.props.cardPosition != null) {
                    if (this.props.cardPosition[0] != undefined) this.props.cardPosition[0].style = `justify-content: space-around !important;`;
                }
                if (this.props.cardPositionPromo != null) {
                    if (this.props.cardPositionPromo[1] != undefined) this.props.cardPositionPromo[1].style = `justify-content: center !important;`;
                }
            }
        });
    }

    verificarParametro() {
        let referenciaClase = this;
        try {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            let cadenaEncriptada = urlParams.get('paquete')
            //console.log(cadenaEncriptada);
            let cadenaDesencriptada = desencriptar(cadenaEncriptada);
            //console.log(cadenaDesencriptada);
            let objetoDetalle = JSON.parse(cadenaDesencriptada);
            localStorage.setItem('TP_OF_OBJ_PAQUETE_DETALLE', cadenaDesencriptada);
            //console.log('EXISTE PARAMETRO DE COMPARTIR');
            //referenciaClase.obtenerOferta(objetoDetalle)
        } catch (e) {
            //console.log('SIN PARAMETRO DE COMPARTIR');
        }
    }

    actulizarPrecios() {
        try {
            var idSeleccionado = localStorage.getItem('TP_ID_PAQUETE_SELECCION');
            var cadenaOfertaActual = localStorage.getItem('TP_INFO_PAQUETES');
            var jsonOferta = JSON.parse(cadenaOfertaActual);
            $.each(jsonOferta, function (familiaPaquete, arrayOferta) {
                $.each(arrayOferta, function (key, objPaquete) {
                    if (idSeleccionado == objPaquete.id) {
                        if (objPaquete.tipoOferta == '2P') {
                            $('#ligaTelevision').hide();
                            $('#tarjetaTelevision').hide();
                            $('#tarjetaEquipoTV').hide();
                            $('#tarjetaRegresaTiempo').hide();
                            $('#tarjetaPeliculas').hide();
                        }
                        $('#paqueteNombre').html(objPaquete.nombre);
                        $('#nombrePaqueteGeneral').html(objPaquete.nombre);
                        $('#paqueteNombreBarra').html(objPaquete.nombre);
                        $('#paqueteIncluye').html(objPaquete.incluye);
                        $('#paqueteTotalPago').html(objPaquete.detalle.desc6ProntoPago);
                        $('#paquetePrecioLista').html(objPaquete.detalle.precioLista);
                        $('#paquetePrecioProntoPago').html(objPaquete.detalle.precioProntoPago);
                        $('#paqueteMes6PrecioLista').html(objPaquete.detalle.desc6PrecioLista);
                        $('#paqueteMes6PrecioProntoPago').html(objPaquete.detalle.desc6ProntoPago);
                        $('#paqueteDescuentoVida').html(objPaquete.detalle.descuento);
                        $('#paquetePrecioBarra').html(objPaquete.detalle.desc6ProntoPago + ' al mes');
                        $('#paqueteTotalMegas').html(objPaquete.detalle.megas);
                        $('#paqueteTotalMegasSeccion').html(objPaquete.detalle.megas);
                        $('#paqueteCanales').html(objPaquete.detalle.canales);
                        $('#paqueteLineas').html(objPaquete.detalle.telefono);
                        $('#paqueteTelefonoSeccion').html(objPaquete.detalle.telefono);
                    }
                });
            });
        } catch (e) {
            console.err('ERROR EN LA FUNCION [actulizarPrecios] POR EL SIGUIENTE MOTIVO:', e);
        }
    }

    restaurarVistas() {
        $('#seccionPromocion').show();
        $('#seccionResumen').show();
        $('#finalizaContratacion').show();
    }

    iniciarMapa() {
        let apuntador = this;
        let latitud = 0;
        let longitud = 0;

        var strDireccion_LS_TMP = '';
        strDireccion_LS_TMP = localStorage.getItem('TP_STR_DIRECCION');
        if (strDireccion_LS_TMP !== '' || strDireccion_LS_TMP !== null) {
            strDireccion_LS_TMP = JSON.parse(strDireccion_LS_TMP);

            try {
                latitud = strDireccion_LS_TMP.coordenadas.latitud;
                longitud = strDireccion_LS_TMP.coordenadas.longitud;

                if (!this.validarCampoVacio(strDireccion_LS_TMP.direccionFormulario.codigoPostal)) {
                    $('#txtCodigoPostal').val(strDireccion_LS_TMP.direccionFormulario.codigoPostal);
                }

                if (!this.validarCampoVacio(strDireccion_LS_TMP.direccionFormulario.ciudad)) {
                    $('#txtCiudad').val(strDireccion_LS_TMP.direccionFormulario.ciudad);
                } else {
                    if (!this.validarCampoVacio(localStorage.getItem('TP_CIUDAD_CONSULTA'))) {
                        $('#txtCiudad').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
                    }
                }

                let calleNumero = '';
                var strDireccion_LS = strDireccion_LS_TMP.direccionFormulario.direccion;
                let calleNumeroTmp = strDireccion_LS.split(',');
                if (!this.validarCampoVacio(calleNumeroTmp[0])) {
                    calleNumero = calleNumeroTmp[0];
                    $('#txtCalle').val(calleNumero);
                }
            } catch (e) {
                latitud = 19.429287;
                longitud = -99.133438;
            }


        }

        setTimeout(() => {
            var mapaUbicacion = new google.maps.Map(document.getElementById('mapaDir'), {
                streetViewControl: false,
                mapTypeControl: false,
                center: {
                    lat: latitud,
                    lng: longitud
                },
                zoom: 15
            });
            var image = '/assets/img/marcador_tp_min.png';
            var marcadorSitio = new google.maps.Marker({
                position: {
                    lat: latitud,
                    lng: longitud
                },
                map: mapaUbicacion,
                icon: image,
                draggable: true,
            });
            google.maps.event.addListener(marcadorSitio, 'dragend', function (evt) {
                $('#iconoMovimientoMarcador').show();
                apuntador.buscarCoordenadas(evt.latLng.lat().toFixed(5), evt.latLng.lng().toFixed(5));
            });
        }, 1500);
    }

    validarMemoriaDireccion() {
        console.group('validarMemoriaDireccion()');
        if (!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_CP'))) {
            $('#txtCodigoPostal').val(localStorage.getItem('TP_OF_STR_CP'));
        }

        if (!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_DELEGACION_MUNICIPIO'))) {
            $('#txtCiudad').val(localStorage.getItem('TP_OF_STR_DELEGACION_MUNICIPIO'));
        } else {
            if (!this.validarCampoVacio(localStorage.getItem('TP_CIUDAD_CONSULTA'))) {
                $('#txtCiudad').val(localStorage.getItem('TP_CIUDAD_CONSULTA'));
            }
        }

        let calleNumero = '';
        if (!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_CALLE'))) {
            calleNumero = localStorage.getItem('TP_OF_STR_CALLE');

            if (!this.validarCampoVacio(localStorage.getItem('TP_OF_STR_NUMERO_DIR'))) {
                calleNumero = localStorage.getItem('TP_OF_STR_CALLE') + ' ' + localStorage.getItem('TP_OF_STR_NUMERO_DIR');
            }

            $('#txtCalle').val(calleNumero);
        }
        console.groupEnd();
    }

    buscarCoordenadas(latitud, longitud) {
        let apuntador = this;
        var objeto = {
            "latitud": latitud,
            "longitud": longitud
        };
        apuntador.consultarCoordenada(objeto, 'COORDENADAS').then(function (infoCoordenas) {
            //console.log('', 'DATOS DEL PARAMETRO [infoCoordenas]', infoCoordenas);
            if (infoCoordenas != undefined && infoCoordenas != null && infoCoordenas != '') {

                let obj = {
                    latitud: infoCoordenas.coordenadas.lat,
                    longitud: infoCoordenas.coordenadas.lng
                };

                $('#iconoMovimientoMarcador').hide();
                $('#txtCalle').val(infoCoordenas.direccionDatos.nombreCalle + ' ' + infoCoordenas.direccionDatos.numeroDireccion)
                //$("#txtNoExterior").val(infoCoordenas.direccionDatos.numeroDireccion);
                $('#txtCodigoPostal').val(infoCoordenas.direccionDatos.codigoPostal);
            } else {
                //console.log("no encontro coordenadas");
            }
        });
    }

    buscarDireccion(direccion) {
        console.group('buscarDireccion()');
        let apuntador = this;
        console.log('CONSULTANDO LA DIRECCION [' + direccion + '] CON REVERSE CODE');
        var objeto = { "direccion": direccion };

        apuntador.consultarCoordenada(objeto, 'DIRECCION').then(function (infoCoordenas) {

            if (infoCoordenas != undefined && infoCoordenas != null && infoCoordenas != '') {
                apuntador.validarFactibilidad({
                    latitud: infoCoordenas.geometry.location.lat,
                    longitud: infoCoordenas.geometry.location.lng,
                    codigoPostal: infoCoordenas.codigoPostal,
                    ciudad: "",
                    colonia: infoCoordenas.colonia
                }, direccion);
            } else {

                $('#tituloCobertura').hide();
                $('#cargador').hide();
                $("#step2").css("display", "flex");
                $("#btnCoberturaText").css("display", "flex");
                $("#confirmCorreo").css("display", "none");
                $("#cargadorCorreo2").css("display", "none");
                $("#titleFormStep2").html("Totalplay a&uacute;n no est&aacute; disponible en " + direccion);
                $("#titleFormStep2").css("display", "flex");
                $("#subtitleFormStep2").css("display", "none");
                apuntador.limpiarDatos();
                apuntador.removerCoordenadas();
            }
        });
        console.log('TERMINADO');
        console.groupEnd();
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

    async consultarCoordenada(parametro, tipo) {
        console.group('consultarCoordenada()');
        let referenciaClase = this;
        var url = '/assets/media/datosDireccion.json';
        var data;
        if (tipo == 'DIRECCION') {
            data = JSON.stringify({
                "direccion": parametro.direccion + ',MX'
            });
        }
        if (tipo == 'COORDENADAS') {
            data = JSON.stringify({
                "latitude": parametro.latitud,
                "longitud": parametro.longitud
            });
        }
        let response = await fetch(url, {

        }).then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {
            localStorage.setItem("DEBUG.MAPS.PAYLOAD", JSON.stringify(respuesta.payload));
            var objDir;
            var objCoordenadas;
            var objDireccionSeleccion;

            $.each(respuesta.payload, function (index, objDireccion) {

                objCoordenadas = {
                    latitud: objDireccion.geometry.location.lat,
                    longitud: objDireccion.geometry.location.lng
                };
                objDireccionSeleccion = objDireccion;
                objDir = objDireccion;
            });
            if (objDireccionSeleccion == null || objDireccionSeleccion == undefined) {
                objDireccionSeleccion = respuesta.payload[0];
            }
            var direccionAproximada;
            try {
                direccionAproximada = objDireccionSeleccion.formatted_address;
            } catch (e) {
                console.error(e);
            }
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
                delegacionMunicipio = $('#txtCiudad').val();
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
            //console.log('WR', 'OCURRIO ALGO INESPERADO EN LA FUNCION [consultarCoordenada] ERROR[' + err + ']');
            return null;
        });
        console.log('RESPONSE:', response);
        console.groupEnd();
        return response;
    }

    validarFactibilidad(informacion, direccion) {
        console.group('validarFactibilidad()');
        let apuntador = this;
        $.ajax({
            url: '/assets/media/factibilidad.json',

            dataType: "json",

        }).done(function (respuesta) {
            console.log('RESPUESTA DE SERVICIO [obtener-factibilidad]', respuesta.bean);
            if (respuesta.status == 0) {

                let objeto = { "factibilidad": respuesta.bean }
                apuntador.actualizarObjetoDireccion('DIR_FACTIBILIDAD', objeto);

                if (respuesta.bean.factibilidad == '1') {
                    /*  SE DETECTA EL CAMBIO DE FACTIBILIDA */
                    if (respuesta.bean.estimulofiscal != localStorage.getItem('TP_ESTIMULO_CIUDAD')) {
                        localStorage.setItem('TP_ESTIMULO_CIUDAD', respuesta.bean.estimulofiscal);
                        $('#modalPaso1').hide();

                        $('#textoMensaje').html('Tenemos el paquete perfecto para ti, has click en la siguiente liga');
                        $('#ventanaCambioCiudad').css('display', 'flex');
                        $('#capaVentanaCambioCiudad').css('opacity', '1');
                        $('#contenidoVentanaCambioCiudad').css('opacity', '1');
                        $('#formVentanaCambioCiudad').css('display', 'block');
                        $('#mensajeVentanaCambioCiudad').css('display', 'flex');
                    } else {
                        localStorage.setItem('TP_ESTIMULO_CIUDAD', respuesta.bean.estimulofiscal);

                        $('#descripcionCobertura').html('Valida tu cobertura.');
                        $('#mapaDir').css('height', ' 0');
                        $('#modalPaso1').hide();

                        let objetoProcesoActual = apuntador.props.refCarrito.obtenerObjetoPasos();

                        if (objetoProcesoActual.numeroPaso < 2) {
                            let objProceso = {
                                "numeroPaso": 2,
                                "url": "contratacion.html",
                                "accion": "VALIDAR_COBERTURA"
                            };
                            apuntador.actualizarMemoriaCarrito(objProceso);
                        }

                        apuntador.nextStep();
                    }
                } else {
                    //console.log("-------------- NO HAY FACTIBILIDAD ------------------");
                    $('#cargador').hide();
                    $('.contenedorValidarCobertura').hide();
                    $('#tituloCobertura').hide();
                    $('#descripcionCobertura').hide();
                    $('#step2').css("display", "flex");
                    $("#titleFormStep2").html("Totalplay a&uacute;n no est&aacute; disponible en " + direccion);
                    $("#subtitleFormStep2").html("¡Pero pronto estaremos cerca! Ingresa tu correo para mantenerte informado.");
                    $("#titleFormStep2").css("display", "flex");
                    $("#subtitleFormStep2").css("display", "flex");
                    $("#formCorreo").css("display", "flex");
                    $('#btnCoberturaText').css("display", "flex");
                    $("#formCorreo").css("display", "flex");
                    apuntador.limpiarDatos();
                    apuntador.removerCoordenadas();
                }
            } else {
                $('#descripcionCobertura').html('Valida tu cobertura.');
                $('#cargador').hide();
                $('#descripcionCobertura').show();
                $('#formularioCobertura').show();
                $('#btnContinuar').show();
            }
        }).fail(function (jqXHR, textStatus) {
            console.log('ER', 'OCURRIO UN ERROR EN EL API [obtener-factibilidad]', jqXHR);
            $('#descripcionCobertura').html('Valida tu cobertura.');
            $('#cargador').hide();
            $('#descripcionCobertura').show();
            $('#formularioCobertura').show();
            $('#btnContinuar').show();
        });
        console.groupEnd();
    }

    eventoEnviarDatosSinFactibilidad() {
        $("#botonEnvio").on('click', function () {
            $(this).html('<i class="fas fa-spinner fa-pulse"></i>');
            var parametros = {
                "correo": $('#txtCorreo').val(),
            };
            $.ajax({
                url: Constantes.endpoints.guardarSinFactibilidad,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(parametros),
                dataType: "json",
                type: 'POST'
            }).done(function (respuesta) {

                $("#botonEnvio").html('<i class="fas fa-arrow-alt-circle-right" style="color: #1A76D2;"></i>');
                $('#headerCobertura').css('display', 'flex');
            }).fail(function (jqXHR, textStatus) {
                console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE ENVIO DE DATOS');
                console.log(jqXHR);
            });
        });
    }

    iniciarIdPromocion() {
        let referenciaClase = this;

        $.each(referenciaClase.props.infoComplementos.promocion, function (key, objPromocion) {
            if (objPromocion.tipo == 'PROMO_HBO') {
                $('#contenedorHBO').attr('data-id', objPromocion.Id);
            }
            if (objPromocion.tipo == 'PROMO_FOX') {
                $('#contenedorFOX').attr('data-id', objPromocion.Id);
            }
        });
    }

    seListenersBoton() {
        $("#btnConfirmMsgCorreo2").on("click", function () {
            $('#tituloCobertura').html('Valida tu cobertura.');
            $('#tituloCobertura').show();
            $('#descripcionCobertura').html('Usa el mapa para ubicar tu domicilio y/o ajusta la información en los campos correspondientes.');
            $('#cargador').hide();
            $('#btnCoberturaText').hide();
            $('#descripcionCobertura').show();
            $('#formularioCobertura').show();
            $('#btnContinuar').show();
            $('#step0').css("display", "block");
            $('#confirmCorreo').css("display", "none");
        });
    }

    habilitarBotonDireccion() {
        $("body").on('click', '#btnCoberturaText', function () {
            $('#tituloCobertura').html('Valida tu cobertura.');
            $('#tituloCobertura').show();
            $('#descripcionCobertura').html('Usa el mapa para ubicar tu domicilio y/o ajusta la información en los campos correspondientes.');
            $('#cargador').hide();
            $('#btnCoberturaText').hide();
            $('#descripcionCobertura').show();
            $('#formularioCobertura').show();
            $('#btnContinuar').show();
            $('#step0').css("display", "block");
        });
    }

    step_1() {
        let referenciaClase = this;
        if (this.props.currentStep === 0) {
            this.props.stepItem[1].style.cssText = 'display: none';
            this.props.stepItem[2].style.cssText = 'display: none';
            try {
                this.props.stepItem[3].style.cssText = 'display: none';
            } catch (error) {
                console.log('OCURRIO UN ERROR EN LA VALIDACION CURRENT STEP:', error);
            }
        }

        try {
            this.props.listItemsPackages.addEventListener('click', (e) => {
                console.group('EVENTO PROMOCION PREMIUM CLICK');
                var idPromocionCanalPremium = $(e.target).attr('data-id');
                var idHTML = $(e.target).attr('id');

                console.log('PROMOCION SELECCIONADA=>', idPromocionCanalPremium);
                let classParent = 'card-contratacion__packages__description-content';
                if ((e.target.classList.contains(classParent) || e.target.offsetParent.classList.contains(classParent)) && !$(e.target).hasClass('tarjeta-promo-seleccion')) {

                    referenciaClase.agregarPromocionSeleccionada(idPromocionCanalPremium);

                    let objProceso = {
                        "numeroPaso": 3,
                        "url": "contratacion.html",
                        "accion": "PROMOCION_SELECCIONADA"
                    };
                    referenciaClase.actualizarMemoriaCarrito(objProceso);


                    let indexHover = this.props.itemsPackage.indexOf(e.target.parentNode);
                    this.props.textAddPromo.map(item => item.textContent = '');
                    this.props.packages.map(item => item.add = false);
                    this.props.textAddPromo[indexHover].textContent = 'Agregado';
                    this.props.packages[indexHover].add = true;
                    this.props.options.namePackage = this.props.packages[indexHover];
                    this.props.promocionSeleccionada = this.props.packages[indexHover].name;
                    var agregado = this.props.textAddPromo[indexHover].innerHTML;
                    $(e.target).addClass('tarjeta-promo-seleccion');

                    console.log('idHTML[' + idHTML + ']');
                    if (idHTML == 'contenedorHBO') {
                        $('#contenedorFOX').removeClass('tarjeta-promo-seleccion');
                        $('#contenedorHBOCambio').addClass('selected');
                        $('#contenedorFOXCambio').removeClass('selected');

                        $('#contenedorFoxApp').show();
                        $('#contenedorHBOApp').hide();
                    }

                    if (idHTML == 'contenedorFOX') {
                        $('#contenedorHBO').removeClass('tarjeta-promo-seleccion');
                        $('#contenedorFOXCambio').addClass('selected');
                        $('#contenedorHBOCambio').removeClass('selected');
                        $('#contenedorHBOApp').show();
                        $('#contenedorFoxApp').hide();
                    }

                    if (agregado == 'Agregado') {
                        this.props.cardPositionPromo = [...document.getElementsByClassName('content-contratacion__packages')];
                        this.props.windowW = window.innerWidth;
                        if (this.props.windowW < 769) {
                            if (this.props.packages[indexHover].name === 'FOX') {
                                this.props.cardPositionPromo[0].style = `justify-content: flex-end !important;`;
                                $('#contenedorFOX').parent(".card-contratacion__packages").addClass('active');
                                $('#contenedorHBO').parent(".card-contratacion__packages").removeClass('active');
                            }
                            if (this.props.packages[indexHover].name === 'HBO') {
                                this.props.cardPositionPromo[0].style = `justify-content: flex-start !important;`;
                                $('#contenedorHBO').parent(".card-contratacion__packages").addClass('active');
                                $('#contenedorFOX').parent(".card-contratacion__packages").removeClass('active');
                            }
                        } else {
                            this.props.cardPositionPromo[0].style = `justify-content: center !important;`;
                        }
                    }

                    if (this.props.currentStep === 0) {
                        this.nextStep();
                    }
                    this.invoice();
                    $('.addon--content-close').trigger('click');
                }

                console.groupEnd();
            });

        } catch (error) {
            console.log('OCURRIO UN ERROR EN EL EVENTO PROMOCION PREMIUM CLICK:', error);
        }
    }

    step_2() {
        let referenciaClase = this;
        const amount = document.body.querySelectorAll('.card-contratacion__channel--price');

        this.props.listAddchannels.addEventListener('click', (e) => {
            console.group('EVENTO listAddchannels()');
            let target = (e.target.parentElement.localName === 'li') ? e.target.parentNode : e.target;
            if (e.target.nodeName === 'LI' || e.target.parentNode.nodeName === 'LI') {
                let indexHover = this.props.itemschannels.indexOf(target);
                try {
                    let objetoParrila = referenciaClase.buscarObjetoParrilla();
                    objetoParrila = referenciaClase.ordenarObjeto(objetoParrila);
                    $.each(objetoParrila, function (key, objetoParrila) {
                        if (indexHover == key) {
                            $('.addon--content-barAdd__text').attr('data-id', objetoParrila.Id);
                            referenciaClase.props.section = 'parrilla'
                        }
                    });
                } catch (e) {
                    console.log('ERROR AL VALIDAR LA SECCION DE LA PARRILLA:', e);
                }

                this.props.packCards = [...document.getElementsByClassName('card-contratacion__channel')];
                this.props.cardPosition = [...document.getElementsByClassName('content-contratacion__addChannels')];

                this.props.windowW = window.innerWidth;
                if (this.props.windowW < 769) {
                    if (target == this.props.packCards[0]) {
                        this.props.cardPosition[0].style = `justify-content: start !important;`;
                        this.props.packCards[0].classList.add('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                    } else if (target == this.props.packCards[2]) {
                        this.props.cardPosition[0].style = `justify-content: flex-end !important;`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.add('active');
                    } else {
                        this.props.cardPosition[0].style = `justify-content: center !important;`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.packCards[1].classList.add('active');
                    }
                } else {
                    this.props.cardPosition[0].style = `justify-content: space-around !important;`;
                }

                if (!this.props.options.television[indexHover].add) {
                    for (let i = 0; i < this.props.options.television.length; i++) {
                        if (this.props.options.television[i].add) {
                            this.props.options.television[i].add = false;
                            amount[i].innerHTML = '';
                            amount[i].innerText = this.props.options.television[i].labelPrice;
                            amount[i].style.color = '#3b4559';
                        }
                    }
                    this.props.options.television[indexHover].add = true;
                    amount[indexHover].innerText = `Seleccionado`;
                    amount[indexHover].style.color = "#1a76d2";
                    this.props.options.pricePackage = this.props.options.pricePackage + this.props.options.television[indexHover].price;
                    //$('.addon--content-barAdd').attr('style', 'bottom:0;');
                } else {
                    this.props.options.television[indexHover].add = false;
                    amount[indexHover].innerHTML = '';
                    amount[indexHover].innerText = this.props.options.television[indexHover].labelPrice;
                    amount[indexHover].style.color = '#3b4559';
                    this.props.options.pricePackage = this.props.options.pricePackage - this.props.options.television[indexHover].price;
                }
            }
            console.log('EVENTO TERMINADO');
            e.stopPropagation();
            console.groupEnd();
        });
    }

    step_3() {

        let referenciaClase = this;

        //this.props.listSetTopBox.unbind('click');

        this.props.listSetTopBox.addEventListener('click', (e) => {

            let target = (e.target.parentElement.localName === 'li') ? e.target.parentNode : e.target;
            if (e.target.nodeName === 'LI' || e.target.parentNode.nodeName === 'LI') {

                let idEquipo = $(target).attr('data-id');
                localStorage.setItem('TP_ID_EQUIPO', idEquipo);

                let indexHover = this.props.itemsListSetTopBox.indexOf(target);
                if (!this.props.el) this.assignSetTopBox(indexHover);
            }
        });
    }

    step_4() {
        let referenciaClase = this;
        const el = [...document.querySelectorAll('.card-contratacion__packages__addons__description-content__price')];
        this.props.listItemsPackagesAddons.addEventListener('click', (e) => {
            console.group('EVENTO listItemsPackagesAddons');
            let classParent = 'card-contratacion__packages__addons__description-content';
            if (e.target.classList.contains(classParent) || e.target.offsetParent.classList.contains(classParent)) {
                var idCanalPremiumSeleccion = $(e.target).attr('data-id');
                console.log('idCanalPremiumSeleccion=>', idCanalPremiumSeleccion);

                //$('.addon--content-barAdd').attr('style', 'bottom:0;');
                $('.addon--content-barAdd__text').attr('data-id', idCanalPremiumSeleccion);
            }
            console.groupEnd();
        });
    }

    actualizarInformacionResumen() {
        var referenciaClase = this;

        try {
            var objetoDetallePaquete = referenciaClase.props.infoPaquete.detallePaquete.detalle;
            var cadenaTotal = objetoDetallePaquete.precioProntoPago;
            cadenaTotal = cadenaTotal.replace("$", "");
            cadenaTotal = cadenaTotal.replace(" ", "");
            cadenaTotal = cadenaTotal.replace(",", "");
            var totalNumero = parseFloat(cadenaTotal);
            referenciaClase.props.totalProntoPago = totalNumero;
            $('#textoNombrePaquete').html(objetoDetallePaquete.nombrePaquete);
            $('#precioLista').html(objetoDetallePaquete.precioLista);
            $('#precioProntoPago1').html(objetoDetallePaquete.precioProntoPago);
            $('#precioProntoPago2').html(objetoDetallePaquete.precioProntoPago);
            $('#totalDescuentoPorVida').html(" -" + objetoDetallePaquete.descuento);
            $('#totalMegasBase').html(objetoDetallePaquete.megas);
            $('#totalMegasSecundario').html(objetoDetallePaquete.megas);
            $('#informacionTelevision').html(objetoDetallePaquete.canales);
            $('#totalLineas').html(objetoDetallePaquete.telefono);

            if (objetoDetallePaquete.tipo == "2P" || objetoDetallePaquete.tipo == "M2P") {
                $('#mejorarTelevision').hide();
                $('#contenedorParrilla').hide();
                $('#seleccionCanalPremium').hide();
            } else {
                let megasPaquete = 0;
                let objPaquete = referenciaClase.props.infoPaquete.detallePaquete.detalle;
                let megasTexto = objPaquete.megas;
                let regex = /(\d{1,3})/;
                let resultado = regex.exec(megasTexto);
                megasPaquete = parseInt(resultado[0]);

                if (megasPaquete < 150) {
                    $('.main-summary-tv').show();
                    $('#seleccionPromocion').hide();
                    $('#seleccionCanalPremium').hide();
                }
                $('#txtPromoSeleccionada').show();
            }
        } catch (e) {
            console.log('ERROR EN LA FUNCION actualizarInformacionResumen():' + e);
        }
    }

    actualizarParrillas() {
        let objetoDescripcion = {
            'TV BASICA': '120 canales (80 HD)',
            'TV AVANZADA': '255 canales (130 HD)',
            'TV PREMIUM': '275 canales (160 HD)',
        }
        let referenciaClase = this;
        let arregloParrilla = new Array();
        try {
            let jsonParrilla = referenciaClase.props.infoComplementos.television[1].adicional;
            jsonParrilla = referenciaClase.ordenarObjeto(jsonParrilla);
            $.each(jsonParrilla, function (key, objetoParrila) {
                var objeto = {
                    name: objetoParrila.nombre,
                    label: objetoParrila.nombre,
                    labelPrice: '$ ' + objetoParrila.precio.toFixed(0),
                    description: objetoDescripcion[objetoParrila.nombre],
                    price: objetoParrila.precio.toFixed(0),
                    add: false,
                    classAdd: ''
                };
                arregloParrilla.push(objeto);
            });
            referenciaClase.props.options.television = arregloParrilla;
        } catch (e) {
            referenciaClase.props.options.television = [];
        }
    }

    actualizarEquipos() {
        console.group('FUNCION actualizarEquipos()');
        let referenciaClase = this;
        let arregloEquipo = new Array();

        let objetoWIfiExtender;
        let objetoTVAdicional;

        $.each(referenciaClase.props.infoComplementos.equipoAdicional, function (key, objetoAdicional) {
            if (objetoAdicional.tipo == 'ADDON_WIFI') {
                objetoWIfiExtender = objetoAdicional;
            }

            if (objetoAdicional.tipo == 'ADDON_TV_ADCIONAL') {
                objetoTVAdicional = objetoAdicional;
            }
        });

        try {
            let objetoEquipo = objetoWIfiExtender;
            let precio = parseFloat(objetoEquipo.precio);
            precio = precio.toFixed(0);
            var objeto = {
                decodificador4k: '',
                id: objetoEquipo.Id,
                price: objetoEquipo.precio,
                amount: objetoEquipo.maximoAgregar,
                label: objetoEquipo.nombre,
                labelPrice: '+ $' + precio + ' al mes',
                add: false,
                totalPrice: objetoEquipo.precio,
                img: '/assets/img/pages/contratacion/extender@2x.png',
                description: 'Disfruta tu conexi\u00F3n en cada espacio de tu hogar',
                idProducto: objetoEquipo.Id,
                tipo: 'WIFI'
            };
            arregloEquipo.push(objeto);

        } catch (e) {
            referenciaClase.props.options.equipos = [];
        }

        if (arregloEquipo.length > 0) {
            referenciaClase.props.options.equipos = arregloEquipo;
        }

        try {
            let objetoAdicional = objetoTVAdicional;
            let precio = parseFloat(objetoAdicional.precio);
            precio = precio.toFixed(0);
            var objeto = {
                decodificador4k: '',
                id: objetoAdicional.Id,
                price: objetoAdicional.precio,
                amount: objetoAdicional.maximoAgregar,
                label: objetoAdicional.nombre,
                labelPrice: '+ $' + precio + ' al mes',
                add: false,
                totalPrice: objetoAdicional.precio,
                img: 'https://www.totalplay.com.mx/newsletter/imagenes-nuevo-cotizador/adicionales-tv-adicional.png',
                description: 'Disfruta de los mejores canales donde mas desees',
                idProducto: objetoAdicional.Id,
                tipo: 'TV'
            };
            arregloEquipo.push(objeto);

        } catch (e) {
            referenciaClase.props.options.equipos = [];
        }

        referenciaClase.props.options.equipos = arregloEquipo;
        console.log('referenciaClase.props.options.equipos:', referenciaClase.props.options.equipos);
        console.groupEnd();
    }

    eventoEliminarCanalPremium() {
        let referenciaClase = this;
        $("body").on('click', '.invoice-data-block-content_apps__item--delete', function () {
            var idEliminar = $(this).attr('data-id');

            referenciaClase.eliminarCanalPremiumSeleccion(idEliminar);
            //referenciaClase.actulizarCostoTotal();
            //referenciaClase.actualizarPrecioTotal();
        });
    }

    removeChildUl(_index) {
        this.props.contentAppsInvoice.removeChild(this.props.itemsInvoiceApps[_index]);
        this.removeItemFromArr(_index);
    }

    removeItemFromArr(index) {
        if (index !== -1) {
            this.props.appsSelectedTemp.splice(index, 1);
        }
        this.props.appsSelected = [];
        this.props.appsSelected = this.props.appsSelectedTemp;
    }

    onkeypressDevicesInvoice() {
        this.props.contentDevicesInvoice.addEventListener('click', (e) => {
            let classParent = 'main-summary-device__invoice-data-block-content_devices__item';
            let target = null;
            if (e.target.offsetParent.classList.contains('main-summary-device__invoice-data-block-content_devices__item')) {
                target = e.target.offsetParent;
            }
            if (target.classList.contains(classParent)) {
                let insideTarget = e.target.parentNode;
                this.props.indexCombo = this.props.devicesInvoice.indexOf(insideTarget);
                this.props.comboDevices = document.querySelector(`.combo-device-${this.props.indexCombo}`);
                this.props.comboDevicesLI = [...document.querySelectorAll(`ul.combo-device-${this.props.indexCombo} > li`)];
                if (!this.props.showCombo) {
                    this.props.showCombo = true;
                    if (this.props.comboDevices) this.props.comboDevices.style.display = 'flex';
                } else {
                    this.props.showCombo = false;
                    if (this.props.comboDevices) this.props.comboDevices.style.display = 'none';
                }
                e.stopPropagation();
                this.clickCombo();
            }
        });
    }

    clickCombo() {
        this.props.comboDevices.addEventListener('click', (e) => {
            let classParent = 'invoice-data-block-content_devices__item--addNew__item';
            let target = null;
            if (e.target.classList.contains(classParent)) target = e.target;
            if (target.classList.contains(classParent)) {
                let index = this.props.comboDevicesLI.indexOf(target);
                this.props.elementAmount[this.props.indexCombo].textContent = index;
            }
            e.stopPropagation();
        });
    }

    afterStep(){
        this.props.currentStep--;
        
        this.props.options.step = this.props.currentStep;
        this.props.containerSteps.style.cssText = `transform: translateX(-0%); transition: all .3s ease-in;`;
        this.props.stepItem[1].style.display = "none";

        $('.contratacion--top-bar__steps__list-names__item').removeClass('active');
        $('.contratacion--top-bar__steps__list-names__item').removeAttr('style');

        $('.point-item').removeAttr('style');

        $.each($('.contratacion--top-bar__steps__list-names__item'), function (key, objStep) {
            if(key == 0){
                $(objStep).addClass('active');
            }
        });
        $.each($('.point-item'), function (key, objPoint) {
            if(key == 0){
                $(objPoint).attr('style', 'background-color: rgb(26, 118, 210); height: 7px; width: 7px;');
            }
        });

        $('.progress-item-done').removeAttr('style');
    }

    nextStep() {
        this.props.currentStep++;
        if (this.props.currentStep === 1) this.props.stepItem[1].removeAttribute('style');
        if (this.props.currentStep === 2) this.props.stepItem[2].removeAttribute('style');
        this.props.direction = 'right';
        
        this.props.options.step = this.props.currentStep;
        this.props.movList = (100 * this.props.currentStep) + (1.95 * this.props.currentStep);
        this.props.containerSteps.style.cssText = `
            transform: translateX(-${(this.props.movList)}%); 
            transition: all .3s ease-in;
            `;
        this.changeStep(this.props.currentStep);
    }

    changeStep(_index) {
        console.group('Contratacion.js FUNCION changeStep()');
        if (window.innerWidth > 500 && window.innerWidth < 768) {
            console.log("window.innerWidth 500-768");
            try {
                this.props.containerName.innerText = this.props.options.steps[_index].name;
            } catch (error) {
                console.log("OCURRIO ALGO INESPERADO:", error);
            }
        }

        var cuanto = this.props.itemsNamesSteps.length;
        if (window.innerWidth > 260 && window.innerWidth < 768) {
            console.log("window.innerWidth 260-768");
            for (var a = 0; a < cuanto; a++) {
                this.props.itemsNamesSteps[a].style.display = "none";
            }
            this.props.itemsNamesSteps[_index].style.display = "flex";
        }
        
        //CAMBIO DE NUMERO DE PASO
        this.props.itemsNamesSteps.map(item => item.classList.remove('active'));
        this.props.itemsNamesSteps[_index].classList.add('active');

        if (this.props.direction === 'right') {
            if (_index > 0) {
                this.props.listPointsStepItems[_index - 1].children[1].children[0].style.cssText = `left:0; transition: all .4s`;
            }
            setTimeout(() => {
                this.props.listPointsStepItems[_index - 1].children[0].style.cssText = `background-color: #1a76d2;`;
                this.props.listPointsStepItems[_index].children[0].style.cssText = `background-color: #1a76d2; transition: all .1s; height:7px; width:7px;`;
            }, 300);
            //CAMBIO DE COLOR DEL # PASO
            this.props.itemsNamesSteps[_index - 1].style.color = '#1a76d2';
            this.props.itemsNamesSteps[_index].style.color = '#1a76d2';
        } else {
            this.props.itemsNamesSteps[(_index < 0) ? _index = 0 : (_index + 1)].style.color = '#75787b';
            this.props.listPointsStepItems[_index + 1].children[0].style.cssText = `heght: 5px; background-color: #bdc0c3; transition: all .1s; width: 5px;`;
            this.props.listPointsStepItems[_index].children[1].children[0].style.cssText = `left: -101%; transition: all .4s; color: #75787b;`;
            this.props.listPointsStepItems[_index].children[0].style.cssText = 'background-color: #1a76d2; height:7px; width:7px;';
        }
        console.groupEnd();
    }

    showStep() {
        this.props.stepItem.map(item => item.style.display = 'none');
        this.props.stepItem[this.props.currentStep].style.display = 'flex';
    }

    getHeightItem() {
        let mr = parseInt(window.getComputedStyle(this.props.stepItem[this.props.currentStep], null).getPropertyValue('padding-top'));
        let height = this.props.stepItem[this.props.currentStep].getBoundingClientRect().height + 90;
        return height;
    }

    getHeightItemStep() {
        let heightItem = this.getHeightItem();
        this.props.containerSteps.style.cssText = `
            transform: translateX(-${(this.props.movList)}%); 
            transition: all .3s ease-in;`;
    }

    eventosModal() {
        /* BOTON MOSTAR MODAL */
        this.props.contentBlocks.addEventListener('click', (e) => {
            if (e.target.localName === 'span') {
                let index = this.props.listEditBlocks.indexOf(e.target);
                this.openModalAddon(index);
            }
        });
        /* BOTON CERRAR MODAL */
        this.props.closeModal.addEventListener('click', () => {
            this.props.tl.to(this.props.contentEditAddon, 0.5, {
                opacity: 0,
                bottom: '-20%',
                ease: "power4.out"
            }).to(this.props.contentEditLayer, 0.5, {
                opacity: 0,
                ease: "power4.out",
                onComplete: this.closeModal.bind(this)
            })
            switch (this.props.section) {
                case 'apps':
                    this.clearApps();
                    break;
            }
        });
        /* BOTON CONFIRMAR ADICIONALES */
        this.props.btnAddAddon.addEventListener('click', (e) => {
            console.group('EVENTO btnAddAddon()');

            let idProducto = $(e.target).attr('data-id');
            console.log('ID_PRODUCTO[' + idProducto + ']');
            console.log('SECCION:', this.props.section);

            switch (this.props.section) {
                case 'parrilla':
                    this.agregarParrillaHTML(idProducto);
                    break;
                case 'apps':
                    //this.agregarCanalPremiun(idProducto);
                    break;
                case 'devices':
                    //this.agregarEquipoHTML(idProducto);
                    break;
                default: {
                    this.endAnimation();
                }
            }
            this.props.confirmAddons = true;
            //this.props.barAdd.removeAttribute('style');
            console.groupEnd();
        });

        document.querySelector('.main-summary-tv__more-channels__btn').addEventListener('click', (e) => {

            this.openModalAddon(2);
        })

        document.querySelector('#botonAgregarEquipo').addEventListener('click', (e) => {
            if (this.props.options.equipos.length > 0) {
                this.openModalAddon(3);
            }
        })

        document.querySelector('.content-contratacion__shopping-cart-top--button-buy').addEventListener('click', (e) => {
            var tpp = $('#precioProntoPago2').html().trim();
            if (tpp !== null) {
                tpp = tpp.split("$");
                if (parseInt(tpp[1]) > 0) {
                    this.endContract();
                } else {
                    location.reload();
                }
            } else {
                location.reload();
            }
            //this.endContract();
        });

        document.querySelector('.content-contratacion__shopping-cart--button-buy').addEventListener('click', (e) => {

            this.endContract();
        });
    }

    agregarParrillaHTML(idProducto) {
        console.group('agregarParrillaHTML()');
        let referenciaClase = this;

        try {
            let objetoDescripcion = {
                'TV BASICA': '120 canales (80 HD)',
                'TV AVANZADA': '255 canales (130 HD)',
                'TV PREMIUM': '275 canales (160 HD)',
            }

            let objetoNombreHTML = {
                'TV BASICA': ' TV B&aacute;sica',
                'TV AVANZADA': 'TV Avanzada',
                'TV PREMIUM': 'TV Premium',
            }

            let objetoParrila = referenciaClase.buscarObjetoParrilla();
            console.log('ACTUALIZANDO PARRILLA');
            $.each(objetoParrila, function (key, objParrila) {
                if (objParrila.Id == idProducto) {
                    referenciaClase.agregarParrilaSeleccionada(objParrila);

                    $('#eliminarParrilla').attr('data-id', objParrila.Id);
                    $('#parrillaNombre').html(objetoNombreHTML[objParrila.nombre] + ' $ ' + parseFloat(objParrila.precio).toFixed(0));
                    $('#parrillaDetalle').html(objetoDescripcion[objParrila.nombre]);
                    $('#contenedorParrilla').show();
                }
            });
            //referenciaClase.actualizarPrecioTotal();
            this.closeModal();
        } catch (e) {
            console.log('OCURRIO UN ERROR EN LA FUNCION agregarParrillaHTML():', e);
        }
        console.groupEnd();
    }

    agregarCanalPremiun(idProducto) {
        console.group('FUNCION agregarCanalPremiun()');
        console.log('ID PRODUCTO=>', idProducto);
        this.props.contentAppsInvoice = document.querySelector('.main-summary-tv__invoice-data-block-content_apps');
        this.props.itemsInvoiceApps = [...document.querySelectorAll('.main-summary-tv__invoice-data-block-content_apps__item')];
        this.props.appsInvoice = [...document.querySelectorAll('.invoice-data-block-content_apps__item--delete')];
        this.getHeightItemStep();
        this.endAnimation();
        this.actualizaSeccionCanalesPremiun(idProducto);
        //this.actulizarCostoTotal();
        //this.actualizarPrecioTotal();
        console.groupEnd();
    }

    actualizaSeccionCanalesPremiun(idProducto) {
        console.group('FUNCION actualizaSeccionCanalesPremiun()');

        let referenciaClase = this;

        let arregloCanales = referenciaClase.buscarCanalesPremium();
        let htmlCanales = '';
        $.each(arregloCanales, function (key, objetoCanal) {
            if (objetoCanal.Id == idProducto) {
                let precio = objetoCanal.precio.toFixed(2);
                htmlCanales =
                    '<li class="main-summary-tv__invoice-data-block-content_apps__item" id="CanalPremium' + objetoCanal.Id + '">' +
                    '<div class="invoice-data-block-content_apps__item--info">' +
                    '<span class="content_apps__item--info--title">' + objetoCanal.nombre + ' $' + precio + '</span>' +
                    '<span class="content_apps__item--info--description">Adicional a tu paquete</span>' +
                    '</div>' + '<span class="invoice-data-block-content_apps__item--delete" data-id="' + objetoCanal.Id + '">Quitar</span>' +
                    '</li>';

                referenciaClase.agregarCanalPremiumSeleccion(objetoCanal);
            }
        });
        $('.main-summary-tv__invoice-data-block-content_apps').html(htmlCanales);
        referenciaClase.closeModal();
        console.groupEnd();
    }

    agregarEquipoHTML() {
        let referenciaClase = this;
        this.props.devicesSelected = this.props.options.equipos.filter(device => {
            if (device.add) {
                return device;
            }
        });
        this.props.contentDevicesInvoice = document.querySelector('.main-summary-device__invoice-data-block-content_devices');

        var items = '';
        console.log('this.props.setopboxSelected=>', this.props.setopboxSelected);
        this.props.setopboxSelected.forEach((item, index) => {
            if (parseInt(item.cantidad) > 0) {
                let precioTotal = parseInt(item.cantidad) * item.price;
                precioTotal = precioTotal.toFixed(0);
                items += `
                <li class="main-summary-device__invoice-data-block-content_devices__item" id="contenedorEquipo_${item.id}">
                    <div class="invoice-data-block-content_apps__devices--info">
                        <span class="content_apps__item--info--title">${item.cantidad} ${item.name} $ ${precioTotal}</span>
                        <span class="content_apps__item--info--description">Adicional a tu paquete</span>
                    </div>
                    <label class="eliminarEquipo" data-id="${item.id}">Quitar</label>
                </li>
                `;
            }
        });

        referenciaClase.agregarEquipoAdicional(this.props.setopboxSelected)

        this.props.contentDevicesInvoice.innerHTML = items;
        this.props.elementAmount = [...document.querySelectorAll('.invoice-data-block-content_devices__item--amount')];
        this.props.devicesInvoice = [...document.querySelectorAll('.main-summary-device__invoice-data-block-content_devices__item')];
        this.getHeightItemStep();
        this.endAnimation();
        
    }

    endContract() {
        ////console.log('MODAL-CONTRATA', this.props.modalContrata);
        //this.props.modalContrata = new ModalContrata();
        ////console.log('MODAL-CONTRATA', this.props.modalContrata);
        //const modalContract = new ModalContrata();
        //this.nextStep();
        //new FinalizaContratacion(true);
        if(this.props.modalContrata == null){
            this.props.modalContrata = new ModalContrata(null);
            this.props.modalContrata.continuar();
            ////console.log('modalContract', this.props.modalContrata.props.modalContract);
        } else {
            //console.log('EJECUTANDO MOSTRAR VENTANA');
            ////console.log('modalContract', this.props.modalContrata.props.modalContract);
            //this.props.modalContrata.continuar();
        }
    }

    openModalAddon(_index) {
        console.group('FUNCION openModalAddon(' + _index + ')');
        this.props.containerEditAddon.style.cssText = `display: flex`;
        this.props.containerEditAddon.id = `contenedorAdicionales`;

        this.props.tl.to(this.props.contentEditLayer, 0.5, {
            opacity: 1,
            ease: "power4.out"
        }).to(this.props.contentEditAddon, 0.5, {
            opacity: 1,
            bottom: 0,
            ease: "power4.out"
        });

        switch (_index) {
            case 0:
                //this.addChannels();
                $('#confirmChannels').hide();
                $("#channelsSelection").show();
                $("#complementsSelection").hide();
                $("#boxesSelection").hide();
                $("#premiumSelection").hide();
                break;
            case 1:
                //this.addPromotion();
                $('#confirmComplements').hide();
                $("#channelsSelection").hide();
                $("#complementsSelection").show();
                $("#boxesSelection").hide();
                $("#premiumSelection").hide();
                break;
            case 2:
                //this.addApps();
                $('#confirmPremium').hide();
                $("#channelsSelection").hide();
                $("#complementsSelection").hide();
                $("#boxesSelection").hide();
                $("#premiumSelection").show();
                break;
            case 3:
                //this.addDevices();
                $('#confirmBoxes').hide();
                $("#channelsSelection").hide();
                $("#complementsSelection").hide();
                $("#boxesSelection").show();
                $("#premiumSelection").hide();
                break;
        }
        console.groupEnd();
    }

    endAnimation() {
        this.props.tl.to(this.props.contentEditAddon, 0.5, {
            opacity: 0,
            bottom: '-20%',
            ease: "power4.out"
        }).to(this.props.contentEditLayer, 0.5, {
            opacity: 0,
            ease: "power4.out",
            onComplete: this.closeModal.bind(this)
        });
    }

    closeModal() {
        this.props.dinamicContent.innerHTML = '';
        this.props.contentDescriptionAddon.innerHTML = '';
        this.props.containerEditAddon.style.cssText = 'display: none';
        document.documentElement.removeAttribute('style');
    }

    addChannels() {
        this.props.section = 'channels';
        this.createDescriptionModal('Agrega un paquete de canales', 'Este paquete ya incluye 80 canales, 21 en HD');
        this.props.contentEditAddon.style.height = '520px';
        var items = '';
        const contentAddChannels = document.createElement('ul');
        contentAddChannels.classList.add('content-contratacion__addChannels');
        //console.log('cambios en telvision ? ', this.props.options.television);
        let agregadoC = [];

        this.props.options.television.forEach(item => {
            let isAdd = (item.add) ? 'Agregado' : item.labelPrice;
            agregadoC += item.add;
            if (item.label == 'TV BASICA') {
                item.label = 'TV BÁSICA';
            }
            let color = (item.classAdd === 'include-pack') ? `color: rgb(26, 118, 210); background:url(/assets/img/iconos/check_circle_24px@4x.png) no-repeat;
             background-size: contain; background-position-x: right;background-position: 130px;` : '';
            let promotion = (item.promotion) ? `<div class="card-contratacion__channel--promotion">${item.promotion}</div>` : `<div class="card-contratacion__channel--separator"></div>`;
            items += `
            <li class="card-contratacion__channel ${item.classAdd}">
                <div class="card-contratacion__channel--name">${item.label}</div>
                <div class="card-contratacion__channel--description">${item.description}</div>
                ${promotion}
                <div class="card-contratacion__channel--price" style="${color}">${isAdd}</div>
            </li>
            `;
        });

        contentAddChannels.innerHTML = items;
        const btnMoreChannels = document.createElement('div');
        btnMoreChannels.classList.add('card-contratacion__moreChannels');
        btnMoreChannels.id = 'openChannels';
        btnMoreChannels.textContent = 'Ver canales por paquete';

        //this.props.dinamicContent.appendChild(contentAddChannels);
        this.props.dinamicContent.id = 'addon--content-dinamic';
        //this.props.dinamicContent.appendChild(btnMoreChannels);

        //const modalChannelsContrata  = new Canales('modalChannels', 'openChannels', false);
        //const modalChannelsContrata  = new Canales('modalChannels', 'openChannels', true);
        //console.log('agregadoC ? ', agregadoC);
        this.props.listAddchannels = document.querySelector('.content-contratacion__addChannels');
        this.props.itemschannels = [...document.querySelectorAll('.card-contratacion__channel')];
        this.props.windowW = window.innerWidth;
        if (this.props.windowW < 769) {
            if (this.props.itemschannels[0].innerHTML.includes('BASICA')) {
                this.props.listAddchannels.classList.add('cardStart');
                this.props.itemschannels[0].classList.add('active');
                this.props.itemschannels[1].classList.remove('active');
                this.props.itemschannels[2].classList.remove('active');
            }
            else if (this.props.itemschannels[1].innerHTML.includes('AVANZADA')) {
                this.props.listAddchannels.classList.add('cardCenter');
                this.props.itemschannels[1].classList.add('active');
                this.props.itemschannels[0].classList.remove('active');
                this.props.itemschannels[2].classList.remove('active');
            }
            else if (this.props.itemschannels[2].innerHTML.includes('PREMIUM')) {
                this.props.listAddchannels.classList.add('cardEnd');
                this.props.itemschannels[2].classList.add('active');
                this.props.itemschannels[0].classList.remove('active');
                this.props.itemschannels[1].classList.remove('active');
            }
        } else {
            this.props.listAddchannels.classList.add('cardGrande');
        }

        this.step_2();
    }

    addPromotion() {
        this.props.section = 'promotion';
        this.createDescriptionModal('Elige tu beneficio por promoción', 'Elige una experiencia premium de entretenimiento sin costo x 3 meses.');
        this.props.dinamicContent.appendChild(this.props.listItemsPackages);
        this.props.windowW = window.innerWidth;
        //console.log("windowW ********* " , this.props.windowW)
        if (this.props.windowW < 600) {
            this.props.contentEditAddon.style.height = '592px';
        }

        this.props.dinamicContent.style.cssText = 'padding: 20px 0;';
    }

    addApps() {
        console.group('FUNCION addApps');
        let referenciaClase = this;
        this.props.section = 'apps';
        this.createDescriptionModal('Canales premium', 'Agrega canales adicionales con cargo a tu estado de cuenta.');
        var items = '';
        this.props.contentItemsApps = document.createElement('ul');
        this.props.contentItemsApps.classList.add('content-contratacion__packages__addons');
        this.props.contentItemsApps.id = 'contentContListItemsAddons';
        this.props.contentEditAddon.style.height = '562px';

        try {
            let promocionPremiumSeleccion = referenciaClase.props.infoPaquete.promocionPremium.tipo;
            // PROMO_HBO | PROMO_FOX
            console.log('promocionPremiumSeleccion=>', promocionPremiumSeleccion);

            let objCanal;
            let poster = '';
            let iconoCanal = '';
            let vistaPrecio = 'block';
            let vistaEtiqueta = 'none';
            let banderaSeleccion = false;

            let listaCanales = referenciaClase.buscarCanalesPremium();

            $.each(listaCanales, function (key, objetoCanal) {
                if (promocionPremiumSeleccion == 'PROMO_HBO' && objetoCanal.nombre.toLocaleLowerCase().includes("fox")) {
                    objCanal = objetoCanal;
                    poster = '/assets/img/pages/contratacion/Canales_2.png';
                    iconoCanal = '/assets/img/pages/contratacion/LogoFox.png';
                }
                if (promocionPremiumSeleccion == 'PROMO_FOX' && objetoCanal.nombre.toLocaleLowerCase().includes("hbo")) {
                    objCanal = objetoCanal;
                    poster = '/assets/img/pages/contratacion/Canales_1.png';
                    iconoCanal = '/assets/img/pages/contratacion/hbo-holding.png'
                }
            });

            let precio = objCanal.precio.toFixed(2);

            items += `
                    <li class="card-contratacion__packages__addons">
                        <div class="card-contratacion__packages__addons__description-poster">
                            <div class="card-contratacion__packages__addons__description-poster__img">
                                <img src="${poster}">
                            </div>
                        </div>
                        <div class="card-contratacion__packages__addons__description-content" data-id="${objCanal.Id}" data-seleccion="${banderaSeleccion}">
                            <div class="card-contratacion__packages__addons__description-content__logo">
                                <img src="${iconoCanal}">
                            </div>
                            <div class="card-contratacion__packages__addons__description-content__name">${objCanal.nombre}</div>
                            <div class="card-contratacion__packages__addons__description-content__description">Canal Premium</div>
                            <div class="card-contratacion__packages__addons__description-content__separator"></div>
                            <div class="card-contratacion__packages__addons__description-content__price">
                                <p class="price-addon" data-id="${objCanal.Id}" style="display: ${vistaPrecio};">+ $ ${precio} al mes</p>        
                                <p class="add-addon" data-id="${objCanal.Id}" style="display: ${vistaEtiqueta};">Agregado <span class="icon-add"></span> </p>
                            </div>
                        </div>
                    </li>`;

        } catch (e) {
            console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [addApps]', e);
        }

        this.props.contentItemsApps.innerHTML = items;
        let tipoPaquete = referenciaClase.props.infoPaquete.detallePaquete.tipoOferta;

        if (tipoPaquete == '3P' || tipoPaquete == 'M3P') {
            this.props.dinamicContent.appendChild(this.props.contentItemsApps);
        } else {
            var texto = '';
            texto += `
            <li class="card-contratacion__packages__addons">
                <div class="" style="font-family: Montserrat-Regular;font-size: 20px;color: #75787b;
                height: 19px;margin-bottom: 0; display: flex; flex-wrap: nowrap; flex-direction: row; justify-content: center; align-items: center;
                margin-top: 40px;  text-align: center;">   
              El paquete no cuenta con canales adicionales
            </li>`;
            this.props.contentItemsApps.innerHTML = texto;
            this.props.dinamicContent.appendChild(this.props.contentItemsApps);
        }

        this.props.listItemsPackagesAddons = document.getElementById('contentContListItemsAddons');
        this.props.itemsPackageAddon = [...document.querySelectorAll('.card-contratacion__packages__addons')];
        this.step_4();
        console.groupEnd();
    }

    buscarCanalesPremium() {
        console.group('FUNCION buscarCanalPremium');
        let referenciaClase = this;
        let arregloTelevision = referenciaClase.props.infoComplementos.television;
        let arregloTelevisionRespuesta;

        $.each(arregloTelevision, function (key, objeto) {
            if (objeto.Agrupacion == 'Canales') {
                arregloTelevisionRespuesta = objeto.adicional;
            }
        });
        console.log('arregloTelevisionRespuesta=>', arregloTelevisionRespuesta);
        console.groupEnd();
        return arregloTelevisionRespuesta;
    }

    addDevices() {
        this.props.section = 'devices';
        this.createDescriptionModal('Agrega un equipo', '¿TV adicional o Internet? ¡Que tal ambos! en un solo dispositivo adicional.');
        var items = '';
        this.props.listSetTopBox = document.createElement('ul');
        this.props.listSetTopBox.classList.add('content-contratacion__settopbox');
        this.props.contentEditAddon.style.height = '562px';
        this.props.barAdd.removeAttribute('style');

        this.props.options.equipos.forEach(item => {
            let amount = `<div class="card-contratacion__settopbox--price">${item.labelPrice}</div>`
            items += `
                <li class="card-contratacion__settopbox" data-id="${item.id}">
                    <img src="${item.img}" alt="" class="card-contratacion__settopbox--img" >
                    <div class="card-contratacion__settopbox--name">${item.label}</div>
                    <div class="card-contratacion__settopbox--description">${item.description}</div>
                    
                    ${amount}
                </li>
            `;
        });
        this.props.listSetTopBox.innerHTML = items;
        this.props.dinamicContent.appendChild(this.props.listSetTopBox);
        this.props.itemsListSetTopBox = [...document.querySelectorAll('.card-contratacion__settopbox')];
        this.step_3();
    }

    assignSetTopBox(_index) {
        let referenciaClase = this;

        let totalMemoria = localStorage.getItem('TP_CANTIDAD_EQUIPO');
        if (totalMemoria == null || totalMemoria == undefined || totalMemoria == '') {
            totalMemoria = 0;
        }
        let idProducto = this.props.options.equipos[_index].idProducto;
        this.props.number = this.props.options.equipos[_index].amount;
        let content = `
            <div>Elige la cantidad:</div>
            <ul>
                <li id="removeSettopBox"></li>
                <li id="numberSetopBox">${totalMemoria}</li>
                <li id="addSetopBox" max-data="${this.props.options.equipos[_index].amount}"></li>
            </ul>
            <button class="btn-addst" type="button">Aceptar</button>`;

        this.props.itemsListSetTopBox[_index].append(document.createElement('div'));
        this.props.el = this.props.itemsListSetTopBox[_index].lastChild;
        this.props.el.classList.add('selected-settopbox');
        this.props.el.innerHTML = content;

        let numberSetopBox = document.getElementById('numberSetopBox');
        const addBox = document.getElementById('addSetopBox');
        const rmvBox = document.getElementById('removeSettopBox');
        const btnAceptarEquipo = document.querySelector('.btn-addst');
        const amount = document.body.querySelectorAll('.card-contratacion__settopbox--price');

        addBox.addEventListener('click', (e) => {
            let maximo = $('#addSetopBox').attr('max-data');
            //console.log('MAXIMO [' + maximo + ']');
            if (totalMemoria < maximo) {
                totalMemoria++;
                localStorage.setItem('TP_CANTIDAD_EQUIPO', totalMemoria);
                numberSetopBox.innerText = totalMemoria;
            }
            e.stopPropagation();
        });

        rmvBox.addEventListener('click', (e) => {
            if (totalMemoria == null || totalMemoria == undefined || totalMemoria == '') {
                totalMemoria = 0;
            }
            if (totalMemoria > 0) {
                totalMemoria--;
                localStorage.setItem('TP_CANTIDAD_EQUIPO', totalMemoria);
                numberSetopBox.innerText = totalMemoria;
            }
            e.stopPropagation();
        });

        btnAceptarEquipo.addEventListener('click', () => {
            console.group('EVENTO btnAceptarEquipo');

            this.props.itemsListSetTopBox[_index].removeChild(this.props.itemsListSetTopBox[_index].lastChild);
            this.props.el = '';
            this.props.options.equipos[_index].add = (this.props.number > 0) ? true : false;
            this.props.options.equipos[_index].amount = this.props.number;
            this.props.options.equipos[_index].id = localStorage.getItem('TP_ID_EQUIPO');
            this.props.setopboxSelected[_index].price = this.props.options.equipos[_index].price;
            this.props.options.equipos[_index].totalPrice = this.props.number * this.props.options.equipos[_index].price;
            let cantidadEquipo = localStorage.getItem('TP_CANTIDAD_EQUIPO');

            if (parseInt(cantidadEquipo) > 0) {
                amount[_index].innerText = '';
                amount[_index].innerText = `${cantidadEquipo} Agregado${(this.props.options.equipos[_index].amount > 1) ? 's' : ''}`;
                amount[_index].style.color = "#1a76d2";

                this.props.setopboxSelected[_index].id = localStorage.getItem('TP_ID_EQUIPO');
                this.props.setopboxSelected[_index].cantidad = localStorage.getItem('TP_CANTIDAD_EQUIPO');
                this.props.setopboxSelected[_index].show = true;
                this.props.setopboxSelected[_index].name = this.props.options.equipos[_index].label;
                this.props.setopboxSelected[_index].amount = this.props.number;
                this.props.setopboxSelected[_index].price = this.props.options.equipos[_index].price;
                this.props.setopboxSelected[_index].total = this.props.setopboxSelected[_index].price * this.props.number;

                this.props.barAdd.style.bottom = 0;
            } else {
                amount[_index].innerText = this.props.options.equipos[_index].labelPrice;
                amount[_index].style.color = '#3b4559';
                this.props.setopboxSelected[_index].id = localStorage.getItem('TP_ID_EQUIPO');
                this.props.setopboxSelected[_index].cantidad = 0;

                this.props.barAdd.removeAttribute('style');
            }

            console.log('this.props.setopboxSelected=>', this.props.setopboxSelected);

            localStorage.setItem('TP_EQUIPO_ADICIONAL', JSON.stringify(this.props.setopboxSelected));

            console.log('this.props.setopboxSelected=>', this.props.setopboxSelected);

            $.each(this.props.setopboxSelected, function (key, objEquipo) {
                if (parseInt(objEquipo.cantidad) > 0) {
                    var objAdicional = {
                        id: objEquipo.id,
                        precio: objEquipo.price,
                        cantidad: parseInt(objEquipo.cantidad),
                        tipo: 'EQUIPO',
                        nombre: objEquipo.name,
                        descripcion: 'Adicional a tu paquete'
                    }

                    referenciaClase.props.arregloAdicionales.push(objAdicional);
                }
            });

            let amountDevices = this.props.options.equipos.reduce((total, addon) => {
                if (addon.add) {
                    return total += addon.totalPrice;
                } else {
                    return total;
                }
            }, 0);

            if (this.props.options.amountDevicesTemp) {
                this.props.options.pricePackage = this.props.options.pricePackage - this.props.options.amountDevicesTemp;
                this.props.options.pricePackage = this.props.options.pricePackage + amountDevices;
                this.props.options.amountDevicesTemp = amountDevices;
            } else {
                this.props.options.amountDevicesTemp = amountDevices;
                this.props.options.pricePackage = this.props.options.pricePackage + amountDevices;
            }

            $('.addon--content-barAdd__text').attr('data-id', idProducto);
            console.groupEnd();
        });
    }

    createDescriptionModal(_title, _desc) {
        const elTitle = document.createElement('h1'),
            elDesc = document.createElement('p');
        elTitle.classList.add('addon--content__title');
        elDesc.classList.add('addon--content__description');
        elTitle.textContent = _title;
        elDesc.textContent = _desc;
        this.props.contentDescriptionAddon.appendChild(elTitle);
        this.props.contentDescriptionAddon.appendChild(elDesc);
    }

    invoice() {

        $('#txtPromoSeleccionada').html('Elegiste:' + this.props.options.namePackage.name);
    }

    clearApps() {
        if (!this.props.confirmAddons) {
            this.props.options.addons.map(item => item.add = false);
            this.props.barAdd.removeAttribute('style');
        }
    }

    resize() {
        window.addEventListener('resize', () => {
            let heightItem = this.getHeightItem();
            let movX = (100 * this.props.currentStep) + (1.95 * this.props.currentStep);
            if (this.props.currentStep > 0) {
                this.props.containerSteps.style.cssText = `
                    transition: all .3s ease-in;
                    transform: translateX(-${(movX)}%);`;
            }
        });
    }

    abrirVentanaCupon() {
        this.props.modalcupon.style.display = 'flex';
        this.props.tl.to(this.props.layerModal, 0.5, {
            opacity: 1
        }).to(this.props.contentForm, 0.5, {
            opacity: 1
        })
        this.props.Cx = window.cX;
    }

    cerrarVentanaCupon() {
        this.props.modalcupon.style.display = 'none';
    }

    eventoAbrirVentanaCupon() {
        let referenciaClase = this;
        $("body").on('click', '.shopingCartCuponT', function () {
            referenciaClase.abrirVentanaCupon()
        });
    }

    eventoCerrarVentanaCupon() {
        let referenciaClase = this;
        $("body").on('click', '#btncloseModalC', function () {
            referenciaClase.cerrarVentanaCupon();
        });
    }

    eventoValidarCupon() {
        let referenciaClase = this;
        $("body").on('click', '#botonValidarCupon', function () {
            if ($('#cuponNum').val().trim() != '') {
                $('#mensajeCuponInvalido').hide();
                $('#idbotonAplicarCupon').hide();
                $('#idContenedorTablaCupon').hide();
                $('#idNumeroCuponAceptado').html("");
                $('#idDescripcionCuponAceptado').html("");
                $('#cargadorCupon').show();
                referenciaClase.validarCupon($('#cuponNum').val())
            }
        });
    }

    validarCupon(idCupon) {
        let referenciaClase = this;

        $.ajax({
            url: '/assets/media/infoCupon.json',

            dataType: "json",

        }).done(function (respuesta) {

            if (respuesta.codigo == 0) {
                $('#cargadorCupon').hide();
                $('#idbotonAplicarCupon').show();
                $('#idContenedorTablaCupon').show();
                $('#idNumeroCuponAceptado').html("<p>" + $('#cuponNum').val() + "</p><p> Vence el " + respuesta.fechaVencimiento + "</p>");
                $('#idDescripcionCuponAceptado').html(respuesta.descripcion);
                referenciaClase.props.importeDescuentoCupon = respuesta.descuento;

                referenciaClase.props.infoCupon = respuesta;
            } else {
                $('#cargadorCupon').hide();
                $('#mensajeCuponInvalido').show();
            }
        }).fail(function (jqXHR, textStatus) {
            $('#cargadorCupon').hide();
            //console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE VALIDACION DE CUPON');
            //console.log(jqXHR);
        });
    }

    eventoAplicarCupon() {
        let referenciaClase = this;
        $("body").on('click', '#idbotonAplicarCupon', function () {
            $('#shopingCartCuponT').html($('#cuponNum').val());
            $('.shopingCartCuponT').html($('#cuponNum').val());
            $('#totalDescuento').html('$ - ' + referenciaClase.props.importeDescuentoCupon);
            //referenciaClase.actualizarPrecioTotal();
            referenciaClase.agregarCupon(referenciaClase.props.infoCupon);
            referenciaClase.cerrarVentanaCupon();
        });
    }

    obtenerIdSesion() {
    }

    enviarPaqueteSesion(objetoPaquete) {
        //GENERAR
    }

    ordenarObjeto(objetoInicial) {
        var objetoOrdenado = objetoInicial.slice(0);
        objetoOrdenado.sort(function (a, b) {
            return a.precio - b.precio; //MENOR A MAYOR
            //return b.precioLista - a.precioLista; //MAYOR A MENOR
        });
        return objetoOrdenado;
    }

    obtenerInformacionCodigoPostal(codigoPostal) {
        //console.log('', 'INVOCANDO SERVICIO [obtener-info-cp-venta]');
        var codigoPostal = localStorage.getItem('TP_OF_STR_CP');
        $.ajax({
            url: Constantes.endpoints.obtenerCodigoVenta,
            data: JSON.stringify({
                "codigoPostal": codigoPostal
            }),
            dataType: "json",
            type: 'POST'
        }).done(function (respuesta) {
            localStorage.setItem("DEBUG.SALESFORCE.CP", JSON.stringify(respuesta));
            if (respuesta.datos.informacion.ArrColonias != undefined) {
                var arrayColoniaServicio = respuesta.datos.informacion.ArrColonias;
                if (arrayColoniaServicio.length == 1) {
                    localStorage.setItem('TP_OF_STR_ID_CP', arrayColoniaServicio[0]['Id']);
                    localStorage.setItem('TP_OF_OBJ_CP', JSON.stringify(arrayColoniaServicio[0]));
                } else {
                    var clusterStorage = localStorage.getItem('TP_OF_STR_CLUSTER_FACTIBLE');
                    var clusterEncontrado = false;
                    var ojbCP;
                    $.each(respuesta.datos.informacion.ArrColonias, function (key, objCodigoPostal) {
                        if (objCodigoPostal.Cluster == clusterStorage) {
                            clusterEncontrado = true;
                            localStorage.setItem('TP_OF_STR_ID_CP', objCodigoPostal['Id']);
                            ojbCP = objCodigoPostal
                        }
                    });
                    if (clusterEncontrado) {
                        //console.log('OK', 'CLUSTER ENCONTRADO[' + clusterStorage + ']');
                        localStorage.setItem('TP_OF_OBJ_CP', JSON.stringify(ojbCP));
                    } else {
                        //console.log('WR', 'CLUSTER NO ENCONTRADO[' + clusterStorage + '] TOMANDO EL PRIMERO');
                        localStorage.setItem('TP_OF_STR_ID_CP', arrayColoniaServicio[0]['Id']);
                        localStorage.setItem('TP_OF_OBJ_CP', JSON.stringify(arrayColoniaServicio[0]));
                    }
                }
            } else {
                //DEFINIR QUE HACER 
            }
        }).fail(function (jqXHR, textStatus) {
            //console.log('ER', 'OCURRIO UN ERROR EN EL API [obtener-info-cp-venta]', jqXHR);
        });
    }

    actulizarCostoTotal() {
        let referenciaClase = this;
        var strCanalesPremium = localStorage.getItem('TP_CANALES_PREMIUM');
        var strCanalesSeleccionados = localStorage.getItem('TP_CANALES_PREMIUM_SELECCION');
        var arrayCanalesPremium;
        var arrayCanalesSeleccionados;
        try {
            arrayCanalesPremium = JSON.parse(strCanalesPremium);
            arrayCanalesSeleccionados = JSON.parse(strCanalesSeleccionados);
            var sumaTotalCanales = 0;
            $.each(arrayCanalesPremium, function (key, objCanales) {
                $.each(arrayCanalesSeleccionados, function (index, idCanales) {
                    if (objCanales.Id == idCanales) {
                        //console.log('SUMANDO=>' + objCanales.precio);
                        var precio = parseFloat(objCanales.precio).toFixed(2);
                        sumaTotalCanales += parseFloat(precio);
                    }
                });
            });
            referenciaClase.props.totalCanalesPremium = sumaTotalCanales
            $('#totalAdicionales').html('$ ' + parseFloat(sumaTotalCanales).toFixed(2));
            //$('#precioComplemento').html('$ ' + parseFloat(sumaTotalCanales).toFixed(2));
        } catch (e) {
            //console.log('CATCH ACTUALIZAR COSTO TOTAL', e);
        }
    }

    setKeyupInput() {
        $('#txtCalle').on("keyup", function () {
            $("#errortxtCalle").css("display", "none");
        });
        $('#txtNoExterior').on("keyup", function () {
            $("#errorNoExterior").css("display", "none");
        });
        $('#txtCodigoPostal').on("keyup", function () {
            $("#errorCodigoPostal").css("display", "none");
        });
        $('#headerCorreo2').on("keyup", function () {
            $("#errorCorreo2").css("display", "none");
        });
    }

    limpiarDatos() {
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

    actualizarPrecioTotal() {
        console.group('FUNCION actualizarPrecioTotal()');
        let referenciaClase = this;
        let totalProntPago = referenciaClase.props.infoPaquete.detallePaquete.precioProntoPago;
        let totalInstalacion = 0;
        let sumaAdicionales = 0;
        let totalCupon = 0;

        let paqueteTipo = referenciaClase.props.infoPaquete.detallePaquete.tipoOferta;
        let costoInstalacion = referenciaClase.obtenerCostoInstalacion();

        if(costoInstalacion <= 0){
            if (paqueteTipo == '3P' || paqueteTipo == 'M3P') {
                costoInstalacion = 450;
            } else {
                costoInstalacion = 350;
            }
        }

        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            let objPaquete = JSON.parse(cadenaPaquete);

            $.each(objPaquete.adicionales, function (key, objetoAdicionales) {

                if (objetoAdicionales != null) {
                    if (objetoAdicionales.parrilla != undefined) {
                        if (objetoAdicionales.parrilla.precio != undefined) {
                            console.log('SUMANDO[PARRILLA]', objetoAdicionales.parrilla.precio);
                            sumaAdicionales += objetoAdicionales.parrilla.precio;
                        }
                    }

                    if (objetoAdicionales.canales != undefined) {
                        if (objetoAdicionales.canales.precio != undefined) {
                            console.log('SUMANDO[CANALES]', objetoAdicionales.canales.precio);
                            sumaAdicionales += objetoAdicionales.canales.precio;
                        }
                    }

                    console.log('objetoAdicionales.equipo=>', objetoAdicionales.equipo);
                    if (objetoAdicionales.equipo != undefined) {
                        $.each(objetoAdicionales.equipo, function (i, objEquipo) {
                            console.log('objEquipo=>', objEquipo);
                            if (parseInt(objEquipo.cantidad) > 0) {
                                console.log('SUMANDO[EQUIPOS]', objEquipo.price);
                                sumaAdicionales += objEquipo.price * parseInt(objEquipo.cantidad);
                            }
                        });
                    }

                    if (objetoAdicionales.telefonia != undefined) {
                        if (objetoAdicionales.telefonia.precio != undefined) {
                            console.log('SUMANDO[TELEFONIA]', objetoAdicionales.telefonia.precio);
                            sumaAdicionales += objetoAdicionales.telefonia.precio;
                        }
                    }
                }
            });

            if (objPaquete.infoCupon != undefined) {
                if (objPaquete.infoCupon.descuento != undefined) {
                    console.log('CUPON AGREGADO=>', objPaquete.infoCupon.descuento);
                    totalCupon = objPaquete.infoCupon.descuento;
                }
            }
        } catch (error) {
            console.log('ERROR EN LA FUNCION ACTUALIZAR PRECIO:', error);
        }

        console.log('totalProntPago=>', totalProntPago);
        console.log('sumaAdicionales=>', sumaAdicionales);
        console.log('totalCupon=>', totalCupon);
        console.log('totalConCostoInstalacion=>', costoInstalacion);
        console.log('totalConCostoInstalacionTipo=>', paqueteTipo);

        let total = (totalProntPago + sumaAdicionales) - totalCupon;
        totalInstalacion = total + costoInstalacion;

        $('#totalAdicionales').html('$ ' + sumaAdicionales.toFixed(0));
        $('#precioProntoPago2').html('$ ' + total.toFixed(0));
        $('.toolPrecioPP').html('$ ' + total.toFixed(0));
        $('.toolPrecioInstalacion').html('$ ' + costoInstalacion.toFixed(0));
        $('.toolPrecioTotal').html('$ ' + totalInstalacion.toFixed(0));
        $('.txtMontoTotal').html('$ ' + totalInstalacion.toFixed(0));
        $('#cargoInstalacion').html('$ ' + costoInstalacion.toFixed(0));

        $('#precioComplemento').html('$ ' + total.toFixed(0));

        console.groupEnd();
    }

    obtenerCostoInstalacion(){
        let costoInstalacion = 0;
        let cadenaComplementos= localStorage.getItem('TP_STR_COMPLEMENTOS');
        try {
            let objComplemento = JSON.parse(cadenaComplementos);

            costoInstalacion = parseInt(objComplemento.costoinstalacion);
            return costoInstalacion;
        } catch (error) {
            console.log('ERROR AL BUSCAR COSTO DE INSTALACION:', error);
            return costoInstalacion;
        }
    }

    revisarExistencia() {
        //let referenciaClase = this;
        let strAdicionalesMemoria = localStorage.getItem('TP_ADICIONALES');
        let htmlEquipos = '';
        //console.log('');
        try {
            let arregloAdicionalMemoria = JSON.parse(strAdicionalesMemoria);
            $.each(arregloAdicionalMemoria, function (key, objAdicionalMemoria) {
                if (objAdicionalMemoria.tipo == 'PARRILLA') {
                    $('#eliminarParrilla').attr('data-id', objAdicionalMemoria.id);
                    $('#parrillaNombre').html(objAdicionalMemoria.nombre + ' $ ' + parseFloat(objAdicionalMemoria.precio).toFixed(0));
                    $('#parrillaDetalle').html(objAdicionalMemoria.descripcion);
                    $('#contenedorParrilla').show();
                }

                if (objAdicionalMemoria.tipo == 'EQUIPO' && objAdicionalMemoria.cantidad > 0) {
                    //console.log('AGREGANDO:', objAdicionalMemoria.nombre);
                    htmlEquipos += '<li class="main-summary-device__invoice-data-block-content_devices__item">' +
                        '<div class="invoice-data-block-content_apps__devices--info">' +
                        '<span class="content_apps__item--info--title">' + objAdicionalMemoria.nombre + ' $ ' + parseFloat(objAdicionalMemoria.precio).toFixed(0) + '</span>' +
                        '<span class="content_apps__item--info--description">Adicional a tu paquete</span>' +
                        '</div>' +
                        '<div class="invoice-data-block-content_devices__item--amount">' +
                        //'<ul class="invoice-data-block-content_devices__item--addNew combo-device-0">'+
                        objAdicionalMemoria.cantidad +
                        //'</ul>'+
                        '</div>' +
                        '</li>';
                }
            });

            $('.main-summary-device__invoice-data-block-content_devices').html(htmlEquipos);
        } catch (error) {
            //console.log('OCURRIO UN ERROR EN:', error);
        }
    }

    eventoModificarLineaAdicional() {
        let referenciaClase = this;

        $("body").on('click', '#botonAgregarLinea', function () {
            console.group('EVENTO botonAgregarLinea');

            let cadenaLinea = localStorage.getItem('TP_STR_COMPLEMENTOS');
            try {
                let objComplemetos = JSON.parse(cadenaLinea);
                let objLinea = objComplemetos.telefonia[0];
                var sumaPrecio = 1 * parseFloat(objLinea.precio);
                let precioFormat = Number.parseFloat(sumaPrecio).toFixed(0);

                let htmlLineaAdicional = `<div class="invoice-data-block-content_apps__item--info" id="contenedorLA">
                                <div class="invoice-data--addon__description">1 Linea $ ${precioFormat}</div>
                                <div class="invoice-data--addon__promo" style="color: #75787b;">
                                    Adicional a tu paquete
                                </div>
                            </div>
                            <label class="eliminarLineaAdicional" id="eliminarLineaAdicional" data-id="${objLinea.Id}">Quitar</label>`;

                referenciaClase.agregarLineaAdicional(objLinea);

                $('#contenedorLineaAdicional').html(htmlLineaAdicional);
                $('#agregarLineaAdicional').hide();
            } catch (error) {
                console.log('ERROR EN EL EVENTO DE AGREGAR LINEA', error);
            }
            console.groupEnd();
        });

        $("body").on('click', '#eliminarLineaAdicional', function () {
            console.group('EVENTO eliminarLineaAdicional');
            referenciaClase.eliminarLineaAdicional();
            console.groupEnd();
        });
    }

    eventoQuitarParrilla() {
        let referenciaClase = this;

        $("body").on('click', '#eliminarParrilla', function () {
            console.group('EVENTO eliminarParrilla');
            referenciaClase.eliminarParrilaSeleccionada();
            console.groupEnd();
        });
    }

    eventoQuitarEquipo() {
        let referenciaClase = this;

        $("body").on('click', '.eliminarEquipo', function () {
            console.group('EVENTO eliminarEquipo');
            let idEliminar = $(this).attr('data-id');
            referenciaClase.eliminarEquipoSeleccionado(idEliminar);
            console.groupEnd();
        });
    }

    eventoBuscarCP() {
        let referenciaClase = this;

        $('#txtCodigoPostal').on("keyup", function () {
            var codigoPostal = $('#txtCodigoPostal').val();
            if (codigoPostal.length == 5) {
                $('#txtCiudad').val('');
                $("#txtCalle").val('');
                referenciaClase.buscarCiudadCP(codigoPostal);
            }
        });
    }

    buscarCiudadCP(codigoPostal) {
        $('#labelBusqueda').html('Buscando...<i class="fas fa-circle-notch fa-spin"></i>');

        $.ajax({
            url: '/assets/media/infoCiudad.json',

            dataType: "json",

        }).done(function (respuesta) {
            //console.log(respuesta);
            try {
                $.each(respuesta.datos.informacion.ArrColonias, function (key, infoColonias) {
                    if (infoColonias.DelegacionMunicipio != null && infoColonias.DelegacionMunicipio != '') {
                        let nombreCiudad = infoColonias.DelegacionMunicipio;
                        $('#txtCiudad').val(nombreCiudad);

                    }
                });

                $('#labelBusqueda').html('Ciudad');
                $('#txtCalle').focus();
            } catch (error) {
                $('#txtCiudad').val('');
            }
        }).fail(function (jqXHR, textStatus) {
            //console.log('ER', 'OCURRIO UN ERROR EN EL API [obtener-info-cp-venta]', jqXHR);
            $('#txtCiudad').val('');
            $('#labelBusqueda').html('Ciudad');
        });
    }

    secData() {
        let obj = {
            "cuenta": "0101200375",
            "cctype": "123",
            "numeroTarjeta": "4152313212345678",
            "expiracionMes": "06",
            "expiracionAnio": "21",
            "primerNombre": "Fernando",
            "apellidos": " Hernandez",
            "direccion": "Nezahualpilla 85, Adolfo Ruiz Cortinez",
            "codigoPostal": "04630",
            "estado": "Ciudad de Mexico",
            "ciudad": "Ciudad de Mexico",
            "segundoNombre": ""
        };

        let parametros = {
            "secdata": otpyrc2(JSON.stringify(obj))
        }

        //console.log(otpyrc2(JSON.stringify(obj)));
    }

    validarCampoVacio(valor) {
        let bandera = false;
        if (valor == undefined || valor == null || valor == '' || valor == 'null' || valor == 'undefined') {
            bandera = true;
        }
        return bandera;
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

    agregarPromocionSeleccionada(idPromocion) {
        console.group('agregarPromocionSeleccionada()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        let cadenaComplementos = localStorage.getItem('TP_STR_COMPLEMENTOS');
        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            let objComplementos = JSON.parse(cadenaComplementos);

            let objetoPromoSeleccion;
            $.each(objComplementos.promocion, function (key, objPromocion) {
                if (objPromocion.Id == idPromocion) {
                    objetoPromoSeleccion = objPromocion;
                    referenciaClase.props.infoPaquete.promocionPremium = objPromocion;
                }
            });

            objPaquete.promocionPremium = objetoPromoSeleccion;

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR LA PROMOCION PREMIUM POR:', error);
        }
        console.groupEnd();
    }

    buscarObjetoParrilla() {
        let referenciaClase = this;
        let objetoTelevisionMemoria = referenciaClase.props.infoComplementos.television;
        let objetoParrilla;
        $.each(objetoTelevisionMemoria, function (key, objTelevision) {
            if (objTelevision.Agrupacion == 'Parrillas' && objTelevision.adicional.length > 0) {
                objetoParrilla = objTelevision.adicional;
            }
        });
        return objetoParrilla;
    }

    reiniciarInfoObjeto() {
        console.group('FUNCION iniciarCupon()');
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            if (objPaquete.adicionales != undefined) {
                objPaquete.adicionales = {}
            }

            if (objPaquete.infoCupon != undefined) {
                objPaquete.infoCupon = {}
            }

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
        } catch (error) {
            console.log('NO SE PUEDO REINICIAR EL CUPON POR:', error);
        }
        console.groupEnd();
    }

    agregarParrilaSeleccionada(objetoParrilla) {
        console.group('FUNCION agregarParrilaSeleccionada()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            let nuevoObjeto = { 'parrilla': objetoParrilla };
            if (objPaquete.adicionales == undefined) {
                let arregloInfo = new Array();
                arregloInfo[0] = nuevoObjeto
                objPaquete.adicionales = arregloInfo
            } else {
                objPaquete.adicionales[0] = nuevoObjeto
            }

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');

            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR LA PARRILLA POR:', error);
        }
        console.groupEnd();
    }

    eliminarParrilaSeleccionada() {
        console.group('FUNCION eliminarParrilaSeleccionada()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            objPaquete.adicionales[0].parrilla = {};
            $('#contenedorParrilla').remove();
            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO ELIMINAR LA PARRILLA POR:', error);
        }
        console.groupEnd();
    }

    agregarCanalPremiumSeleccion(objetoCanal) {
        console.group('FUNCION agregarCanalPremiumSeleccion()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            let nuevoObjeto = { 'canales': objetoCanal };
            if (objPaquete.adicionales == undefined) {
                let arregloInfo = new Array();
                arregloInfo[1] = nuevoObjeto
                objPaquete.adicionales = arregloInfo
            } else {
                objPaquete.adicionales[1] = nuevoObjeto
            }

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR EL CANAL PREMIUM POR:', error);
        }
        console.groupEnd();
    }

    eliminarCanalPremiumSeleccion(idCanal) {
        console.group('FUNCION eliminarCanalPremiumSeleccion()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            objPaquete.adicionales[1].canales = {};
            $('#CanalPremium' + idCanal).remove();
            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');

            $('.cntAppAdicional').removeClass('selected');
            $('#confirmPremium').attr('data-id' , '');

            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO ELIMINAR EL CANAL PREMIUM POR:', error);
        }
        console.groupEnd();
    }

    agregarLineaAdicional(objetoLinea) {
        console.group('FUNCION agregarLineaAdicional()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            let nuevoObjeto = { 'telefonia': objetoLinea };

            if (objPaquete.adicionales == undefined) {
                let arregloInfo = new Array();
                arregloInfo[3] = nuevoObjeto;
                objPaquete.adicionales = arregloInfo;
            } else {
                objPaquete.adicionales[3] = nuevoObjeto;
            }

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR LA LINEA ADICIONAL POR:', error);
        }
        console.groupEnd();
    }

    eliminarLineaAdicional() {
        console.group('FUNCION eliminarLineaAdicional()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            objPaquete.adicionales[3].telefonia = {};
            $('#contenedorLineaAdicional').html('');
            $('#agregarLineaAdicional').show();
            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR LA PARRILLA POR:', error);
        }
        console.groupEnd();
    }

    agregarEquipoAdicional(objetoEquipo) {
        console.group('FUNCION agregarEquipoAdicional()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            let nuevoObjeto = { 'equipo': objetoEquipo };

            if (objPaquete.adicionales == undefined) {
                let arregloInfo = new Array();
                arregloInfo[2] = nuevoObjeto;
                objPaquete.adicionales = arregloInfo;
            } else {
                objPaquete.adicionales[2] = nuevoObjeto;
            }

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR EL EQUIPO ADICIONAL POR:', error);
        }
        console.groupEnd();
    }

    eliminarEquipoSeleccionado(idEliminar) {
        console.group('FUNCION eliminarEquipoSeleccionado(' + idEliminar + ')');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        //let cadenaEquipos = localStorage.getItem('TP_EQUIPO_ADICIONAL');
        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            //let objEquipo = JSON.parse(cadenaEquipos);
            let indice = -1;
            $.each(objPaquete.adicionales[2].equipo, function (key, objeto) {
                console.log('objeto[' + key + ']=>', objeto);
                if (objeto.id == idEliminar) {
                    indice = key;
                }
            });

            //let indicador = ['cntEquipoWifi', 'cntEquipoTV'];
            $.each(referenciaClase.props.setopboxSelected, function (key, objeto) {
                console.log('setopboxSelected=>objeto[' + key + ']=>', objeto);

                if (objeto.id == idEliminar) {
                    referenciaClase.props.setopboxSelected[key] = {
                        id: '',
                        show: false,
                        name: '',
                        amount: '',
                        total: '',
                        price: 0,
                        cantidad: 0
                    }
                    let indicador = '';
                    if(objeto.tipo == 'ADDON_WIFI'){
                        indicador = 'cntEquipoWifi';
                    }
                    if(objeto.tipo == 'ADDON_TV_ADCIONAL'){
                        indicador = 'cntEquipoTV';
                    }

                    $('#'+ indicador).find( ".price" ).css('display','block');
                    $('#'+ indicador).find( ".addedItem" ).hide();
                }
            });

            if (indice >= 0) {

                objPaquete.adicionales[2].equipo.splice(indice, 1);
                $('#contenedorEquipo_' + idEliminar).remove();
                localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
                console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
                referenciaClase.actualizarPrecioTotal();
            }
        } catch (error) {
            console.log('NO SE PUEDO ELIMINAR EL EQUIPO ADICIONAL POR:', error);
        }
        console.groupEnd();
    }

    agregarCupon(objetoCupon) {
        console.group('FUNCION agregarCupon()');
        let referenciaClase = this;
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');

        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            objPaquete.infoCupon = objetoCupon;

            localStorage.setItem('TP_STR_PAQUETE_SELECCION', JSON.stringify(objPaquete));
            console.log('OBJETO PAQUETE SELECCION ACTUALIZADO');
            referenciaClase.actualizarPrecioTotal();
        } catch (error) {
            console.log('NO SE PUEDO AGREGAR EL CUPON POR:', error);
        }
        console.groupEnd();
    }

    actualizarMemoriaCarrito(objProceso) {
        console.group('Contratacion.js FUNCION actualizarMemoriaCarrito()');
        let cadenaPaquete = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            let objPaquete = JSON.parse(cadenaPaquete);
            objPaquete.proceso = objProceso;

            localStorage.setItem("TP_STR_PAQUETE_SELECCION", JSON.stringify(objPaquete));
        } catch (error) {
            console.log("OCURRIO UN ERROR EN LA FUNCION actualizarMemoriaCarrito():", err);
        }
        console.groupEnd();
    }

    eventoCanales() {
        $("body").on('click', '.cntCanales', function () {
            console.log('EVENTO DE CAJAS DE CANALES');
        });
    }
}

function encriptar(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function desencriptar(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

$(window).keydown(function (event) {
    if (event.ctrlKey && event.keyCode == 65) {
        //console.log("CTRL+A");

        //$('#txtCalle').val('Panoramica del fortin');
        //$('#txtNoExterior').val('636');
        //$('#txtCodigoPostal').val('68030');

        /*$('#ventanaGracias').css('display','flex');
        $('#capaVentanaGracias').css('opacity','1');
        $('#contenidoVentanaGracias').css('opacity','1');
        $('#formVentanaGracias').css('display','block');
        $('#mensajeVentanaGracias').css('display','flex');
        $('#mensajeVentanaGracias').css('flex-direction','row');//*/
        event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode == 90) {
        //console.log("CTRL+Z");
        $('#email').val('mfhernandez@totalplay.com.mx');
        $('#mobile').val('5583073337');
        event.preventDefault(); 
    }
});
