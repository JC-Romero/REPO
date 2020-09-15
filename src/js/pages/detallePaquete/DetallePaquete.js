import {cargaapps} from '../generales/cargaApps';
import * as Constantes from "../../utils/Constantes";
var cms;

export class DetallePaquete {
    constructor(_element1, _element2) {
        cms = Constantes.cms;
        this.props = {
            container: document.getElementById('cardPackageDetail'),
            barDetail: document.getElementById('packageBarDetail'),
            header: document.getElementById('mainHeader').getBoundingClientRect().height,
            menu: document.getElementById('menuPackages'),
            topElement: document.getElementById('ticketResume'),
            bottomBarElement: document.getElementById('promotionCards'),
            mainBody: document.getElementsByTagName('body'),
            windowW: window.innerWidth,
            userAgent: window.navigator.vendor,
            focus: 0,
            lastScrollTop: 0,
            cont: 0,
            cont2: 10,
            fracc: 0,
            ticInfo: document.querySelector('.content_pack_resume'),
            clickTic: false,
            paqSelected : '',

            infoPaquete:{}
        }
        this.init();
        this.resize();
    }

    init() {
        this.props.changeBarSection = document.getElementById('ticketResume');
        this.props.packCards = [...document.getElementsByClassName('card-package-item')];
        this.props.indicators = [...document.getElementById('detailPackageIndicators').children];
        this.clickCards();
        this.props.packCards[1].classList.add('active');
        this.props.indicators[1].classList.add('active');
        this.props.fracc = (this.props.topElement.getBoundingClientRect().top / 10);
        this.scroll();
        this.iniciarObjetoPaquete();
        this.pintarPaquetesRecomendados();
        cargaapps(2);
    }

    iniciarObjetoPaquete(){
        let referenciaClase = this;
        let objetoPaquete;
        let paqueteCadena = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            objetoPaquete = JSON.parse(paqueteCadena);
            let validarId = objetoPaquete.id;

            referenciaClase.props.infoPaquete = objetoPaquete;

            this.pintarDetallePaquete();
            this.obtenerComplementos();
        } catch (error) {
            console.log('ERROR:', error);
            //window.location = "paquetes.html";
        }
    }

    resize() {
        addEventListener('resize', () => {
            this.props.windowW = window.innerWidth;
            this.props.cont = 0;
            this.props.cont2 = 10;
            this.props.container.style.left = '0px';
            if (this.props.windowW < 1100)
                this.clickCards();
        });
    }

    closeSection() {
        this.props.windowW = window.innerWidth;
        let ticClose = document.querySelector(".content_pack_resume");
        let buttonLink = document.querySelector(".btn_transparentLinkDetailPaq");
        if (this.props.windowW < 768) {
            ticClose.classList.add("open");
            buttonLink.classList.add("closed");
            this.props.ticInfo.addEventListener('click', (e) => {
                if (!this.props.clickTic) {
                    this.props.clickTic = true;
                    ticClose.classList.remove("open");
                    this.props.ticInfo.style.cssText = "min-height: 394px; transition: 0.3s ease-out;";
                    buttonLink.classList.remove("closed");
                } else {
                    ticClose.classList.add("open");
                    this.props.clickTic = false;
                    this.props.ticInfo.style.cssText = " height: 314px;  transition: 0.3s ease-in;";
                    buttonLink.classList.add("closed");
                }
            });
        }
    }

    scroll() {
        let initBarPosition = this.props.barDetail.getBoundingClientRect().top,
                bottomElement = this.props.mainBody[0].clientHeight - (this.props.bottomBarElement.getBoundingClientRect().top + 70),
                cont = 0;
        document.addEventListener('scroll', () => {
            let st = window.pageYOffset,
                    direction = (st > this.props.lastScrollTop) ? true : false;
            this.props.lastScrollTop = st;
            let frac = this.props.fracc * this.props.cont;
            if (direction) { //SCROLL DOWN
                if (st > frac && this.props.cont <= 10) {
                    if (this.props.cont < 10)
                        this.props.cont++;
                    if (this.props.cont2 > 0)
                        this.props.cont2--;
                }
                //Lógica para la barra flotante de paquete
                this.props.barDetail.classList.remove('to-up');
                if (this.props.topElement.getBoundingClientRect().bottom <= 0) {
                    this.props.barDetail.classList.add('active');
                    initBarPosition <= 10 ? initBarPosition = initBarPosition + 5 : initBarPosition;
                    this.props.barDetail.style.cssText = `top: ${initBarPosition}px`;
                    this.props.barDetail.classList.remove('ingrow');
                }
                if (this.props.topElement.getBoundingClientRect().bottom <= -60) {
                    this.props.barDetail.classList.add('grow');
                }
                if (this.props.topElement.getBoundingClientRect().bottom <= -80) {
                    this.props.barDetail.children[0].classList.add('active');
                    this.props.barDetail.children[1].classList.add('active');
                }
                if (this.props.topElement.getBoundingClientRect().bottom <= -100) {
                    cont < 10 ? cont++ : cont;
                    this.props.barDetail.children[0].style.cssText = `opacity: ${0.1 * cont}`;
                    this.props.barDetail.children[1].style.cssText = `opacity: ${0.1 * cont}`;
                }
                if (this.props.changeBarSection.getBoundingClientRect().bottom <= -140) {
                    this.props.barDetail.classList.add('toWhite');
                    this.props.barDetail.children[0].classList.add('normalColor');
                    this.props.barDetail.children[0].children[1].classList.add('pink');
                    this.props.barDetail.children[1].classList.add('normalColor');
                    this.props.barDetail.children[0].style.cssText = 'opacity: 1;';
                    this.props.barDetail.children[1].style.cssText = 'opacity: 1;';
                }
                if (this.props.bottomBarElement.getBoundingClientRect().top - 70 <= 0) {
                    //this.props.barDetail.classList.add('fixed-bar');
                    this.props.barDetail.style.cssText = `bottom: ${bottomElement + 72}px;`;
                    this.props.mainBody[0].style.cssText = 'overflow-Y: auto;';
                }
                //Termina logica de barra flotante
            } else { // SCROLL UP
                this.props.barDetail.classList.add('to-up');
                if (this.props.topElement.getBoundingClientRect().bottom > 0) {
                    initBarPosition >= 0 ? initBarPosition = initBarPosition - 5 : initBarPosition;
                    this.props.barDetail.style.cssText = `top: ${initBarPosition}px`;
                    this.props.barDetail.classList.remove('to-up');
                    this.props.barDetail.classList.remove('active');
                    this.props.barDetail.classList.remove('grow');
                }
                if (this.props.topElement.getBoundingClientRect().bottom > -100) {
                    cont > 0 ? cont-- : cont;
                    this.props.barDetail.children[0].style.cssText = `opacity: ${0.1 * cont}`;
                    this.props.barDetail.children[1].style.cssText = `opacity: ${0.1 * cont}`;
                }
                if (this.props.topElement.getBoundingClientRect().bottom > -80) {
                    this.props.barDetail.children[0].style.cssText = 'display: none;';
                    this.props.barDetail.children[1].style.cssText = 'display: none;';
                }
                if (this.props.topElement.getBoundingClientRect().bottom > -40) {
                    this.props.barDetail.children[0].classList.remove('active');
                    this.props.barDetail.children[1].classList.remove('active');
                }
                if (this.props.topElement.getBoundingClientRect().bottom > -30) {
                    this.props.barDetail.classList.add('ingrow');
                }
                if (this.props.changeBarSection.getBoundingClientRect().bottom > -140) { //
                    this.props.barDetail.classList.remove('toWhite');
                    this.props.barDetail.children[0].classList.remove('normalColor');
                    this.props.barDetail.children[0].children[1].classList.remove('pink');
                    this.props.barDetail.children[1].classList.remove('normalColor');
                }
                if (this.props.bottomBarElement.getBoundingClientRect().top - 70 > 0) {
                    //this.props.barDetail.classList.remove('fixed-bar');
                    this.props.barDetail.style.cssText = `bottom: ${bottomElement}px;`;
                    this.props.mainBody[0].style.cssText = 'overflow-Y: auto;';
                    this.props.barDetail.removeAttribute('style');
                }
            }
        });
    }

    clickCards() {
        var referenciaClase = this;
        this.props.windowW = window.innerWidth;
        if (this.props.windowW < 1100) {
            for (let _card of this.props.packCards) {
                _card.addEventListener('click', (e) => {
                    console.log("click card");
                    //if(this.props.windowW < 1100) return;
                    let item = e.target,
                            moveX = this.getSizeItem(item);
                    if (item == this.props.packCards[0]) {
                        this.props.container.style.left = `${moveX}px`;
                        this.props.packCards[0].classList.add('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.indicators[0].classList.add('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                    } else if (item == this.props.packCards[2]) {
                        this.props.container.style.left = `-${moveX}px`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.add('active');
                    } else {
                        this.props.container.style.left = '0px';
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.packCards[1].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                        this.props.indicators[1].classList.add('active');
                    }
                });
            }
            for (let _indicator of this.props.indicators) {
                _indicator.addEventListener('click', (e) => {
                    //if(this.props.windowW < 1100) return;
                    let item = e.target,
                            moveX;
                    if (item == this.props.indicators[0]) {
                        moveX = this.getSizeItem(this.props.packCards[0]);
                        this.props.container.style.left = `${moveX}px`;
                        this.props.packCards[0].classList.add('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.indicators[0].classList.add('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                    } else if (item == this.props.indicators[2]) {
                        moveX = this.getSizeItem(this.props.packCards[2]);
                        this.props.container.style.left = `-${moveX}px`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.add('active');
                    } else {
                        this.props.container.style.left = '0px';
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.packCards[1].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                        this.props.indicators[1].classList.add('active');
                    }
                });
            }
        }

        $("body").on('click', '.list-cards__item--more-info', function () {
            var titulo = $(this).attr('data-title');
            var descripcion = $(this).attr('data-description');
            $('.modal-detail-promotion__content__title').html('SORPRESA PLAYSTATION');
            $('.modal-detail-promotion__content__text').html('PROMOCIÓN VÁLIDA DEL 15 DE JULIO AL 31 DE JULIO DEL 2020. AL CONTRATAR EL PAQUETE VIA ECOMMERCE DURANTE LOS DOS PRIMEROS MESES DE LA CONTRATACIÓN. AL TERMINAR EL PERIODO DE PROMOCIÓN APLICARÁ EL PRECIO DE LISTA DEL PAQUETE DE $169 MXN AL MES. PROMOCIÓN DISPONIBLE PARA CLIENTES CON SERVICIO DE TELEVISIÓN DE TOTALPLAY QUE CONTRATEN EL PAQUETE HBO MAX. ');
            referenciaClase.openModal( true );
        });

        $("body").on('click', '.modal-detail-promotion__content--close', function () {
            referenciaClase.openModal( false );
        });
    }

    getSizeItem(_element) {
        let style = _element.currentStyle || window.getComputedStyle(_element),
                widthItem = _element.clientWidth,
                marginLeft = parseInt(style.marginLeft),
                marginRight = parseInt(style.marginRight);
        return widthItem + marginLeft + marginRight;
    }

    pintarDetallePaquete() {
        let referenciaClase = this;
        try {
            //let apuntador = this;

            let objPaquete = referenciaClase.props.infoPaquete.detallePaquete;

            //var idSeleccionado = localStorage.getItem('TP_ID_PAQUETE_SELECCION');
            //var cadenaOfertaActual = localStorage.getItem('TP_INFO_PAQUETES');
            //var jsonOferta = JSON.parse(cadenaOfertaActual);
            var idPaqueteElegido, megas, lineaTel = "";

            //$.each(jsonOferta, function (familiaPaquete, arrayOferta) {
                //$.each(arrayOferta, function (key, objPaquete) {
                    //if (idSeleccionado == objPaquete.id) {
                        idPaqueteElegido = referenciaClase.props.infoPaquete.idPaquete;

                        if (objPaquete.tipoOferta == '2P') {
                            $('#ligaTelevision').hide();
                            $('#tarjetaTelevision').hide();
                            $('#tarjetaEquipoTV').hide();
                            $('#tarjetaRegresaTiempo').hide();
                            $('#tarjetaPeliculas').hide();
                        }

                        /*if (objPaquete.familiaPaquete.indexOf("NETFLIX") >= 0) {
                            $('#ligaTelevision').show();
                            if (objPaquete.tipoOferta == '2P') {
                                $('#paqueteCanalesAuxiliar').remove();
                            }
                        }*/

                        $('#paqueteNombre').html(objPaquete.nombre);
                        $('#nombrePaqueteGeneral').html(objPaquete.nombre);
                        $('#paqueteNombreBarra').html(objPaquete.nombre);
                        $('#mensajeMegas').html(objPaquete.detalle.promoMegasDetalle);
                        //localStorage.setItem('TP_PROMO_MEGAS', objPaquete.detalle.promoMegasDetalle);

                        $('#paqueteCanalesAuxiliar').html(objPaquete.detalle.promoCanalesDetalle);

                        $('#paqueteIncluye').html(objPaquete.incluye);

                        $('#paqueteTotalPago').html(objPaquete.detalle.desc6ProntoPago);
                        $('#paquetePrecioLista').html(objPaquete.detalle.precioLista);
                        $('#paquetePrecioProntoPago').html(objPaquete.detalle.precioProntoPago);

                        $('#paqueteMes6PrecioLista').html(objPaquete.detalle.desc6PrecioLista);
                        $('#paqueteMes6PrecioProntoPago').html(objPaquete.detalle.desc6ProntoPago);

                        $('#paqueteDescuentoVida').html(objPaquete.detalle.descuento);
                        $('#paquetePrecioBarra').html(objPaquete.detalle.desc6ProntoPago + ' al mes');

                        $('#paqueteTotalMegas').html(objPaquete.detalle.megas);
                        //localStorage.setItem('TP_MEGAS', objPaquete.detalle.megas);
                        $('#paqueteTotalMegasSeccion').html(objPaquete.detalle.megas);
                        megas = objPaquete.detalle.megas;

                        $('#paqueteCanales').html(objPaquete.detalle.canales);
                        $('#paqueteLineas').html(objPaquete.detalle.telefono);
                        $('#paqueteTelefonoSeccion').html(objPaquete.detalle.telefono);
                        lineaTel = objPaquete.detalle.telefono;
                    //}
                //});
            //});
            let listaTarjetas = referenciaClase.cmsGetAnunciosDetallePaquete(idPaqueteElegido, megas, lineaTel);
        
            

        } catch (e) {
            console.log('ERROR EN LA FUNCION [pintarDetallePaquete] POR EL SIGUIENTE MOTIVO:', e);
        }
    }

    cmsGetAnunciosDetallePaquete(idPaqueteElegido, megas, lineas) {
        return new Promise((done, reject) => {
            let statusReq = false;
            let urlCMS = '/assets/media/img-paquetes.json';
            fetch(urlCMS, {method: 'GET'}).then(data => {
                if (data.ok) {
                    statusReq = true;
                    return data.json();
                } else {
                    reject("error en la peticion");
                    throw "Error en la llamada Ajax";
                }
            }).then(function (respuesta) {
                if (!statusReq) {
                    reject("error en la peticion");
                    return false;
                }
                if (respuesta != undefined && respuesta.length > 0) {
                    let htmlTarjetas = "";
                    let tarjetaTelefonia = "";
                    let numTarjetas = 0;
                    respuesta.forEach((element, index) => {

                        if (element.id_paquete === idPaqueteElegido) {    
                            console.log('element=>', element);
                            var tarjeta = element.paquete_tarjetas;
                            tarjeta.forEach((element2, index) => {
                                if (element2.tarjetaactiva == true) {
                                    var htmlPromocion, htmlLinks, claseContenerdor, claseLink, claseSubtitulo, htmlapps = "";

                                    if (element2.claseContenedor == null || element2.claseContenedor == "") {
                                        claseContenerdor = "";
                                    } else {
                                        claseContenerdor = element2.claseContenedor
                                    }
                                    if (element2.claseLink === null || element2.claseContenerdor == "") {
                                        claseLink = "";
                                    } else {
                                        claseLink = element2.claseLink
                                    }
                                    if (element2.claseSubtitulo === null || element2.claseSubtitulo == "") {
                                        claseSubtitulo = "";
                                    } else {
                                        claseSubtitulo = element2.claseSubtitulo
                                    }
                                    if (element2.tienepromocion == false || element2.tienepromocion == null) {
                                        htmlPromocion = "";
                                    } else {
                                        htmlPromocion = "<div class='listAddons__item--content__option'>" + element2.promocion + "</div>";
                                    }
                                    if (element2.tienelinks == false || element2.tienelinks == null) {
                                        htmlLinks = "";
                                    } else {
                                        htmlLinks = "<div class='listAddons__item--content__link " + claseLink + "' id='" + element2.idLink + "'>" + element2.titulolink + "</div>";
                                    }


                                    if (element2.idTarjeta.includes("appsTotalplay")) {
                                        htmlapps +=
                                                " <div class=listAddons__item--content__apps'>" +
                                                "   <a class='' href='" + element2.linkImagenapp1 + "' target='_blank'>" +
                                                "       <img src='" + element2.imgenapp1.url + "' alt='' class='listAddons__item--content__apps__item'>" +
                                                "   </a>" +
                                                "   <a class='' href='" + element2.linkImagenapp2 + "' target='_blank'>" +
                                                "       <img src='" + element2.imgenapp2.url + "' alt='' class='listAddons__item--content__apps__item'>" +
                                                "   </a>" +
                                                " </div>"
                                                ;
                                    } else {
                                        htmlapps = "";
                                    }

                                    if (element2.idTarjeta == "tarjetaMegas") {
                                        element2.titulo = megas;
                                    }
                                    if (element2.idTarjeta == "tarjetaTelefonia") {
                                        element2.titulo = lineas;
                                    }

                                    let imagenHTML = '';
                                    try {
                                        imagenHTML = "<img src='" + element2.imagenprincipal.url + "' alt='' >"
                                    } catch (error) {
                                        console.log('ERROR TARJETAS X PAQUETES', error);
                                    }

                                    
                                    
                                    if (element2.idTarjeta.includes("tarjetaTelefonia")) {
                                        tarjetaTelefonia =
                                            "<li class='addons-package--listAddons__item " + element2.claseTarjeta + "' id=" + element2.idTarjeta + ">" +
                                            "   <div class='listAddons__item--content " + claseContenerdor + "'>" +
                                            "       <div class='listAddons__item--content__title1' id=" + element2.idTitulo + ">" + element2.titulo + "</div>" +
                                            "       <div class='listAddons__item--content__description " + claseSubtitulo + "' >" + element2.subtitulo + "</div>" +
                                            htmlLinks +
                                            htmlPromocion +
                                            htmlapps +
                                            "   </div>" +
                                            "   <div class='listAddons__item--content__image'>" +
                                            imagenHTML +
                                            "   </div>" +
                                            "</li>"
                                        ;
                                    } else {
                                        htmlTarjetas +=
                                            "<li class='addons-package--listAddons__item " + element2.claseTarjeta + "' id=" + element2.idTarjeta + ">" +
                                            "   <div class='listAddons__item--content " + claseContenerdor + "'>" +
                                            "       <div class='listAddons__item--content__title1' id=" + element2.idTitulo + ">" + element2.titulo + "</div>" +
                                            "       <div class='listAddons__item--content__description " + claseSubtitulo + "' >" + element2.subtitulo + "</div>" +
                                            htmlLinks +
                                            htmlPromocion +
                                            htmlapps +
                                            "   </div>" +
                                            "   <div class='listAddons__item--content__image'>" +
                                            imagenHTML +
                                            "   </div>" +
                                            "</li>"
                                        ;
                                    }

                                    
                                } else {
                                    console.log("tarjeta no activa")
                                }
                            });
                        } else {
                            //console.log("NO COINCCIDE ["+element.id_paquete+"]["+idPaqueteElegido+"]")
                        }
                    });
                    //$("#listaTarjetas").html(htmlTarjetas + tarjetaTelefonia);

                } else {
                    reject("no se encontro ninguna tarjeta para el paquete");
                }
            });
        });
    }

    obtenerComplementos() {
        var referenciaClase = this;

        var parametros = {
            "idPlan": referenciaClase.props.infoPaquete.idPaquete,
            "plaza": "CIUDAD DE MEXICO",
            "estimuloFiscal": false
        };
        console.log('', 'INVOCANDO EL SERVICIO [obtener-complementos]');

        $('#btn_transparentLinkDetailPaq').html('<i class="fas fa-circle-notch fa-spin" style="color: #1a76d2;"></i>');

        $.ajax({
            url: Constantes.endpoints.obtenerComplementos,
            data: JSON.stringify(parametros),
            dataType: "json",
            type: 'POST'
        }).done(function (respuesta) {
            console.log('RESPUESTA DE COMPLEMENTOS');
            console.log(respuesta);

            let arregloPromociones = respuesta.datos.infoAddons.promocionesAdd.promociones;
            let arregloProductos = respuesta.datos.infoAddons.productosAdd.productos;
            let arregloServicios = respuesta.datos.infoAddons.serviciosAdd.servicios;

            referenciaClase.buscarInfoComplementos(arregloPromociones,arregloProductos,arregloServicios);

            referenciaClase.pintarPromociones(respuesta.datos.infoAddons.promocionesAdd.promociones)

        }).fail(function (jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE COMPLEMENTOS');
            console.log(jqXHR);
        });
    }

    pintarPromociones(arregloPromocion) {
        var referenciaClase = this;

        console.log('arregloPromocion=>', arregloPromocion);
        //localStorage.setItem('TP_PROMOCIONES_MEMORIA', JSON.stringify(arregloPromocion));

        var referenciaClase = this;
        var htmlPromociones = '';
        var arregloHistorial = []

        var limite = 3;
        var inicial = 0;
        $.each(arregloPromocion, function (key, objetoPromocion) {

            if (inicial < limite && parseInt(objetoPromocion.montoDescuento) == 0) {
                console.log('DEFAULT PROMO=>', objetoPromocion);
                inicial++;
                arregloHistorial.push(objetoPromocion);
                htmlPromociones += `<li class="promotions-list-cards__item mask" style="width: 180px;">
                    <div class="list-cards__item--image" style="background: url('assets/img/pages/detallePaquete/img-publicidad-1.png') no-repeat; background-size: cover; background-position: center; "></div>
                    <div class="list-cards__item--content">
                        <div class="list-cards__item--title" style="text-align: left;">Sopresas Playstation</div>
                        <div class="list-cards__item--description" style="text-align: left;">Solo tienes que domiciliar tu tarjeta de crédito.</div>
                        <div class="list-cards__item--more-info" style="text-align: left;">Más información</div>
                    </div>
                </li>`;
            }
        });

        referenciaClase.props.infoPaquete.promocionesDefautl = arregloHistorial;
        localStorage.setItem("TP_STR_PAQUETE_SELECCION", JSON.stringify(referenciaClase.props.infoPaquete));

        //localStorage.setItem('TP_PROMOCIONES_DEFAULT', JSON.stringify(arregloHistorial))
        //$('.promotions-list-cards').html(htmlPromociones);
       
    }

    eventoPromocionSeleccionada() {
        let referenciaClase = this;

        $(".card-promotion").on('click', function () {
            let idPromocionSeleccion = $(this).attr('data-id');
            let banderaEnvio = true; // TEMA DE LA LIBERIA SLICK

            let promocionRevisada = $(this).find(".fas").hasClass("fa-check-circle");

            if (!promocionRevisada) {
                $.each($('.capaBloqueo'), function (key, objHTML) {
                    if ($(objHTML).attr('data-id') == idPromocionSeleccion) {
                        $(objHTML).show();

                        if (banderaEnvio) {
                            banderaEnvio = false;
                            referenciaClase.validarConvivencia(idPromocionSeleccion);
                        }
                    }
                });
            } else {
                $.each($('.capaBloqueo'), function (key, objHTML) {
                    if ($(objHTML).attr('data-id') == idPromocionSeleccion) {
                        $(objHTML).hide();
                    }
                });

                let arregloHistorial = JSON.parse(localStorage.getItem('TP_ARREGLO_PROMOCION_HISTORIA'));
                let arregloHistorialActualizado = new Array();

                $.each(arregloHistorial, function (key, idPromocion) {
                    if (idPromocionSeleccion != idPromocion) {
                        arregloHistorialActualizado.push(idPromocion);
                    }
                });
                localStorage.setItem('TP_ARREGLO_PROMOCION_HISTORIA', JSON.stringify(arregloHistorialActualizado))

            }
        });
    }

    validarConvivencia(idPromocionSeleccion) {
        let referenciaClase = this;
        let arregloHistorial;
        let arregloNuevo = new Array();
        let idPaquete = localStorage.getItem('TP_ID_PAQUETE_SELECCION');

        try {
            if (localStorage.getItem('TP_ARREGLO_PROMOCION_HISTORIA') == null) {
                arregloHistorial = new Array();
            } else {
                arregloHistorial = JSON.parse(localStorage.getItem('TP_ARREGLO_PROMOCION_HISTORIA'));
            }

            arregloNuevo.push(idPromocionSeleccion);

            var objpromos = {
                idPlan: idPaquete,
                nuevaspromociones: arregloNuevo,
                antpromociones: arregloHistorial
            };

            var informacionEncriptada = otpyrc2(JSON.stringify(objpromos));
            var parametros = {"secdata": informacionEncriptada};
            var url = Constantes.endpoints.validarConvivencia;
            $.ajax({
                url: url,
                data: JSON.stringify(parametros),
                dataType: "json",
                type: 'POST'
            }).done(function (respuesta) {
                console.log('RESPUESTA DE CONVIVENCIA');
                console.log(respuesta);

                if (respuesta.status == 0) {
                    arregloHistorial.push(idPromocionSeleccion);
                    localStorage.setItem('TP_ARREGLO_PROMOCION_HISTORIA', JSON.stringify(arregloHistorial))

                    $.each($('.etiquetaIcono'), function (keyIcn, objIconoHTML) {
                        if ($(objIconoHTML).attr('data-id') == idPromocionSeleccion) {
                            $(objIconoHTML).html('<i class="fas fa-check-circle fa-2x iconoBloqueo" style="color:green;"></i>');
                        }
                    });
                } else {
                    $.each($('.capaBloqueo'), function (key, objHTML) {
                        if ($(objHTML).attr('data-id') == idPromocionSeleccion) {
                            $(objHTML).hide();
                        }
                    });
                }

            }).fail(function (jqXHR, textStatus) {
                console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE VALIDAR CONVIVENCIA');
                console.log(jqXHR);
            });
        } catch (e) {

        }
    }

    buscarInfoComplementos(arregloPromociones, arregloProductos,arregloServicios){
        let objetoComplementos = {};
        let arregloPromocion = new Array();
        $.each(arregloPromociones, function (key, objetoPromociones) {
            if (objetoPromociones.adicionalProductoNombre == "FOX PREMIUM.") {
                objetoPromociones.tipo = 'PROMO_FOX';
                arregloPromocion.push(objetoPromociones);
            }

            if (objetoPromociones.adicionalProductoNombre == "HBO MAX TP") {
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
            }
        });
        objetoComplementos.television = arregloTelevision;

        let arregloEquipoAdicional = new Array();
        let arregloTelefonia = new Array();
        $.each(arregloServicios, function (key, objetoServicio) {
            if (objetoServicio.nombre == 'WIFI EXTENDER' || objetoServicio.nombre == 'Wifi Extender') {
                objetoServicio.tipo = 'ADDON_WIFI';
                arregloEquipoAdicional.push(objetoServicio);
            }
            if (objetoServicio.nombre == 'TV ADICIONAL.' || objetoServicio.nombre == 'Television Adicional.') {
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

        localStorage.setItem("TP_STR_COMPLEMENTOS", JSON.stringify(objetoComplementos));

        $('#btn_transparentLinkDetailPaq').hide();
        $('#linkPromociones').show();
        $('#botonQuiero').removeClass('btnDeshabilitado');
        $('#botonQuiero').removeAttr('disabled');
    }

    buscarCanalesParrila(arregloProductos) {
        $.each(arregloProductos, function (key, objetoProductos) {
            if (objetoProductos.Agrupacion == "Canales") {
                localStorage.setItem('TP_CANALES_PREMIUM', JSON.stringify(objetoProductos.adicional));
            }

            if (objetoProductos.Agrupacion == "Parrillas") {
                localStorage.setItem('TP_PARRILLA', JSON.stringify(objetoProductos.adicional));
            }

        });
    }

    buscarHBOFOX(arregloPromociones) {

        $.each(arregloPromociones, function (key, objetoPromociones) {
            if (objetoPromociones.adicionalProductoNombre == "FOX PREMIUM.") {
                localStorage.setItem('TP_ID_PROMOCION_FOX', objetoPromociones.Id);
            }

            if (objetoPromociones.adicionalProductoNombre == "HBO MAX TP") {
                localStorage.setItem('TP_ID_PROMOCION_HBO', objetoPromociones.Id);
            }
        });
    }

    buscarServicios(arregloServicios) {
        //let arregloBusquedaEquipo = ['a0TQ00000043eD4MAI'];
        //let arregloMemoriaEquipo = new Array();
        let equipoWifiExtender = false;
        let equipoTVAdicional = false;
        let equipoLineaAdicionale = false;
        localStorage.setItem('TP_LISTA_EQUIPO', '');
        localStorage.setItem('TP_TV_ADCIONAL', '');
        localStorage.setItem('TP_LINEA_ADICIONAL', '');

        $.each(arregloServicios, function (key, objetoServicio) {
            if (objetoServicio.nombre == 'WIFI EXTENDER' || objetoServicio.nombre == 'Wifi Extender') {
                localStorage.setItem('TP_LISTA_EQUIPO', JSON.stringify(objetoServicio));
                equipoWifiExtender = true;
            }
            if (objetoServicio.nombre == 'TV ADICIONAL.' || objetoServicio.nombre == 'Television Adicional.') {
                localStorage.setItem('TP_TV_ADCIONAL', JSON.stringify(objetoServicio));
                equipoTVAdicional = true;
            }
            if (objetoServicio.nombre == 'LINEA TELEFONICA ADICIONAL' || objetoServicio.nombre == 'Telefonia Adicional') {
                localStorage.setItem('TP_LINEA_ADICIONAL', JSON.stringify(objetoServicio));
                equipoLineaAdicionale = true;
            }
        });

        console.log('equipoWifiExtender['+equipoWifiExtender+']');
        console.log('equipoTVAdicional['+equipoTVAdicional+']');
        console.log('equipoLineaAdicionale['+equipoLineaAdicionale+']');
    }

    pintarPaquetesRecomendados() {
        let clase = this;
        try {
            var paquetesRecomendados = localStorage.getItem('TP_PAQUETES_RECOMENDACION');
            var objetoPaquetesRecomendados = JSON.parse(paquetesRecomendados);

            var plantillaHTML = '';
            $.each(objetoPaquetesRecomendados, function (key, objPaquete) {

                var regex = /\s(\d{1,3})\sMbps/;
                var result = regex.exec(objPaquete.detalleServicio);
                var color = objPaquete.color ;
                plantillaHTML       += '<div class="card-package-item ' +color + '-item" id="'+objPaquete.id+'">' 
                                         + '<div class="card-package-item__banner">' 
                                             + '<div class="gradient-image ' + color + '-package-gradient-img"></div>' 
                                             + '<img src="' + objPaquete.imagen + '" alt="">' 
                                        + '</div>' 
                                         + '<div class="card-package-item__title ' + color + '-package">' + objPaquete.nombre + '</div>' 
                                         + '<div class="card-package-item__speed ' + color + '-package-gradient"><span>' + result[1] + '</span></div>' 
                                         + '<div class="card-package-item__megas ' + color + '-package">Megas↓</div>' 
                                         + '<div class="card-package-item__include ' + color + '-package">' + objPaquete.incluye + '</div>' 
                                         + '<div class="card-package-item__promotion">INCLUYE 1 PROMOCIÓN</div>' 
                                         + '<div class="card-package-item__price"><span>Desde: <span>$ ' + clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") + ' al mes</span></span></div>' 
                                         + '<a href="#" class="card-package-item__button">Descubrir</a>' + '</div>';
             });
             $("#cardPackageDetail").html(plantillaHTML);
             this.props.packCards = [...document.getElementsByClassName('card-package-item')];
             this.props.packCards[1].classList.add('active');
             clase.clickCards();
             clase.eventoTarjetaRecomendado();
        }catch(e){
            console.log('ERROR AL PINTAR RECOMENDACIONES', e);
        }
    }

    eventoTarjetaRecomendado(){
        console.log("entre a eventoTarjetaRecomendado");
        $(".card-package-item").on('click', function () {
            console.log("click")
            localStorage.setItem('TP_ID_PAQUETE_SELECCION', $(this).attr('id'));
            setTimeout(function(){
                window.location = 'detallePaquete.html';
            },5000);
        });
    }

    formatoMonedad(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$0" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    openModal(isOpen) {
        const modal = document.querySelector('.modal-detail-promotion');
        modal.style.display = (isOpen) ? 'flex' : 'none';
    }
}