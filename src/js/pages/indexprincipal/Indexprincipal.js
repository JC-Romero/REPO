import * as Constantes from "../../utils/Constantes";
import {Chat} from './Chat';
import {cargaapps} from '../generales/cargaApps';
import {Paquetes} from '../paquetes/Paquetes';

var cms;
export class Indexprincipal {

    constructor() {
        this.props = {
            windowW: window.innerWidth,
            cont: 0,
            cont2: 10,
            container: document.getElementById('cardsPackage')
        }
        cms=Constantes.cms;
        this.init();
        this.resize();
        this.setKeyupInput();
       this.obtenerDireccion();
    }
    
    init(){
        console.log("++++++++++++++++++++++++");
        this.evento();
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        if(localStorage.getItem('TP_ESTIMULO_CIUDAD') == undefined || localStorage.getItem('TP_ESTIMULO_CIUDAD') == null || localStorage.getItem('TP_ESTIMULO_CIUDAD') == ''  ){
            localStorage.setItem('TP_ESTIMULO_CIUDAD','false');
        }
        
        this.setListeners();
        this.validaciones();
        cargaapps(1);
        const chat = new Chat('sectionChat');
        this.props.packCards = [...document.getElementsByClassName('card-package-item')];
        this.props.indicators = [...document.getElementById('detailPackageIndicatorsIndex').children];
        //this.validarPermisosUbicacion();
        
    }

    evento(){
        console.log("------------");
        $(".packagePrice").on("click",function(){
            var jsonoferta=
        {
           "id":1,
           "titulo":"Sorpréndete + 500",
           "id_paquete":"a0UQ0000006IgCEMA0",
           "color":"new-purple",
           "created_at":"2020-06-09T22:37:30.406Z",
           "updated_at":"2020-06-23T17:46:57.001Z",
           "imagen":{
              "id":67,
              "name":"img-paquete 500",
              "alternativeText":"",
              "caption":"",
              "width":312,
              "height":176,
              "formats":{
                 "thumbnail":{
                    "hash":"thumbnail_img_paquete_500_ef5a76fd0a",
                    "ext":".png",
                    "mime":"image/png",
                    "width":245,
                    "height":138,
                    "size":65.72,
                    "path":null,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_paquete_500_ef5a76fd0a.png"
                 }
              },
              "hash":"img_paquete_500_ef5a76fd0a",
              "ext":".png",
              "mime":"image/png",
              "size":33.75,
              "url":"https://cms-files-totalplay.s3.amazonaws.com/img_paquete_500_ef5a76fd0a.png",
              "previewUrl":null,
              "provider":"aws-s3",
              "provider_metadata":null,
              "created_at":"2020-07-08T22:03:23.506Z",
              "updated_at":"2020-07-08T22:03:23.506Z"
           },
           "paquete_tarjetas":[
              {
                 "id":2,
                 "titulo":"Televisión",
                 "subtitulo":"4 TVs con 80 canales 35 en HD",
                 "promocion":"Disfruta la mejor calidad de imagen y acceso a contenido 4K",
                 "tienepromocion":true,
                 "tieneapps":null,
                 "tienelinks":true,
                 "titulolink":"Ver canales",
                 "link":null,
                 "claseTarjeta":"addon-item-defaul",
                 "idTarjeta":"tarjetaTelevision",
                 "claseContenedor":null,
                 "idTitulo":null,
                 "claseSubtitulo":"mrgn-btm1",
                 "idLink":"openChannels",
                 "claseLink":"btn_transparentLinkTagTvBasic",
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-22T18:17:35.839Z",
                 "updated_at":"2020-07-10T06:33:45.184Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":69,
                    "name":"tv-paquete",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_tv_paquete_f8e2946856",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":32.96,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_tv_paquete_f8e2946856.png"
                       },
                       "small":{
                          "hash":"small_tv_paquete_f8e2946856",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":114.81,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_tv_paquete_f8e2946856.png"
                       }
                    },
                    "hash":"tv_paquete_f8e2946856",
                    "ext":".png",
                    "mime":"image/png",
                    "size":107.15,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/tv_paquete_f8e2946856.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:03:26.573Z",
                    "updated_at":"2020-07-08T22:03:26.573Z"
                 }
              },
              {
                 "id":1,
                 "titulo":"500 Megas↓",
                 "subtitulo":"Ideal para gamers y para que todos en casa se mantengan conectados.",
                 "promocion":"Disfruta de la máxima conectividad",
                 "tienepromocion":true,
                 "tieneapps":false,
                 "tienelinks":false,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-defaul",
                 "idTarjeta":"tarjetaMegas",
                 "claseContenedor":null,
                 "idTitulo":"paqueteTotalMegasSeccion",
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-22T17:10:41.192Z",
                 "updated_at":"2020-07-08T22:33:44.353Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":78,
                    "name":"img-feauture",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_c011333304",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":31.82,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_c011333304.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_c011333304",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":115.23,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_c011333304.png"
                       }
                    },
                    "hash":"img_feauture_c011333304",
                    "ext":".png",
                    "mime":"image/png",
                    "size":108.77,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_c011333304.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:19:21.889Z",
                    "updated_at":"2020-07-08T22:19:21.889Z"
                 }
              },
              {
                 "id":3,
                 "titulo":"Tecnología 4K ",
                 "subtitulo":"Con acceso a las apps más populares y en cada equipo un punto de acceso a internet para maximizar la cobertura wifi de tu hogar.",
                 "promocion":null,
                 "tienepromocion":null,
                 "tieneapps":null,
                 "tienelinks":null,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-black",
                 "idTarjeta":"tarjetaEquipoTV",
                 "claseContenedor":"skin-white",
                 "idTitulo":null,
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:02:57.325Z",
                 "updated_at":"2020-07-08T23:33:47.692Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":79,
                    "name":"img-feauture-3",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_3_b39c36b8ca",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":28.06,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_3_b39c36b8ca.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_3_b39c36b8ca",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":103.94,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_3_b39c36b8ca.png"
                       }
                    },
                    "hash":"img_feauture_3_b39c36b8ca",
                    "ext":".png",
                    "mime":"image/png",
                    "size":98.23,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_3_b39c36b8ca.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:19:21.959Z",
                    "updated_at":"2020-07-08T22:19:21.959Z"
                 }
              },
              {
                 "id":4,
                 "titulo":"Elige HBO o Fox",
                 "subtitulo":"Elige HBO o FOX Disfruta el mejor contenido cinematográfico",
                 "promocion":"Incluido en tu paquete durante 6 meses",
                 "tienepromocion":true,
                 "tieneapps":null,
                 "tienelinks":null,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-blue",
                 "idTarjeta":"tarjetaPromocion",
                 "claseContenedor":"skin-white",
                 "idTitulo":null,
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:07:17.776Z",
                 "updated_at":"2020-07-08T23:34:29.898Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":81,
                    "name":"img-feauture-4",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_4_5c02ef9aaa",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":61.3,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_4_5c02ef9aaa.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_4_5c02ef9aaa",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":223.75,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_4_5c02ef9aaa.png"
                       }
                    },
                    "hash":"img_feauture_4_5c02ef9aaa",
                    "ext":".png",
                    "mime":"image/png",
                    "size":213.31,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_4_5c02ef9aaa.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:19:23.238Z",
                    "updated_at":"2020-07-08T22:19:23.238Z"
                 }
              },
              {
                 "id":5,
                 "titulo":"Cuando Sea",
                 "subtitulo":"Regresa el tiempo por 7 días y disfruta tus programas una y otra vez.",
                 "promocion":"",
                 "tienepromocion":false,
                 "tieneapps":null,
                 "tienelinks":null,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-orange",
                 "idTarjeta":"tarjetaRegresaTiempo",
                 "claseContenedor":"skin-white",
                 "idTitulo":null,
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:11:20.084Z",
                 "updated_at":"2020-07-08T23:36:04.200Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":110,
                    "name":"img-feauture-3 ",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_3_2629cdd058",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":56.12,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_3_2629cdd058.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_3_2629cdd058",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":202.39,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_3_2629cdd058.png"
                       }
                    },
                    "hash":"img_feauture_3_2629cdd058",
                    "ext":".png",
                    "mime":"image/png",
                    "size":196.59,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_3_2629cdd058.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-09T16:51:33.864Z",
                    "updated_at":"2020-07-09T16:51:33.864Z"
                 }
              },
              {
                 "id":6,
                 "titulo":"OnDemand",
                 "subtitulo":"Renta películas, estrenos, conciertos y más. ¡Comienza la función!",
                 "promocion":null,
                 "tienepromocion":null,
                 "tieneapps":null,
                 "tienelinks":true,
                 "titulolink":"",
                 "link":"",
                 "claseTarjeta":"addon-item-purple",
                 "idTarjeta":"tarjetaPeliculas",
                 "claseContenedor":"skin-white",
                 "idTitulo":null,
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":"",
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:13:59.701Z",
                 "updated_at":"2020-07-08T23:36:58.559Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":80,
                    "name":"img-feauture-2",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_2_667124ed3c",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":40.04,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_2_667124ed3c.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_2_667124ed3c",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":133.07,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_2_667124ed3c.png"
                       }
                    },
                    "hash":"img_feauture_2_667124ed3c",
                    "ext":".png",
                    "mime":"image/png",
                    "size":116.51,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_2_667124ed3c.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:19:21.993Z",
                    "updated_at":"2020-07-08T22:19:21.993Z"
                 }
              },
              {
                 "id":7,
                 "titulo":"Telefonía incluida",
                 "subtitulo":"Lleva tu línea en tu móvil con llamadas incluidas a MEX/ E.U./ CAN.",
                 "promocion":null,
                 "tienepromocion":null,
                 "tieneapps":null,
                 "tienelinks":null,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-defaul",
                 "idTarjeta":"tarjetaTelefonia",
                 "claseContenedor":null,
                 "idTitulo":"paqueteTelefonoSeccion",
                 "claseSubtitulo":null,
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":null,
                 "linkImagenapp2":null,
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:17:48.163Z",
                 "updated_at":"2020-07-08T23:42:05.314Z",
                 "imgenapp1":null,
                 "imgenapp2":null,
                 "imagenprincipal":{
                    "id":68,
                    "name":"img-feauture-5",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_5_8f3bd71b63",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":26.56,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_5_8f3bd71b63.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_5_8f3bd71b63",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":86.55,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_5_8f3bd71b63.png"
                       }
                    },
                    "hash":"img_feauture_5_8f3bd71b63",
                    "ext":".png",
                    "mime":"image/png",
                    "size":80.35,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_5_8f3bd71b63.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:03:26.559Z",
                    "updated_at":"2020-07-08T22:03:26.559Z"
                 }
              },
              {
                 "id":8,
                 "titulo":"App Totalplay",
                 "subtitulo":"Descárgala y lleva Totalplay a Donde Sea en tus dispositivos móviles.",
                 "promocion":null,
                 "tienepromocion":null,
                 "tieneapps":true,
                 "tienelinks":null,
                 "titulolink":null,
                 "link":null,
                 "claseTarjeta":"addon-item-defaul",
                 "idTarjeta":"appsTotalplay",
                 "claseContenedor":null,
                 "idTitulo":"",
                 "claseSubtitulo":"mrgn-btm2",
                 "idLink":null,
                 "claseLink":null,
                 "linkImagenapp1":"https://play.google.com/store/apps/details?id=com.TotalPlay.totalplay&amp;hl=es_MX",
                 "linkImagenapp2":"https://itunes.apple.com/mx/app/totalplay/id847892109?mt=8",
                 "tarjetaactiva":true,
                 "created_at":"2020-06-23T18:17:48.200Z",
                 "updated_at":"2020-07-08T23:42:21.038Z",
                 "imgenapp1":{
                    "id":66,
                    "name":"Google",
                    "alternativeText":"",
                    "caption":"",
                    "width":113,
                    "height":34,
                    "formats":null,
                    "hash":"Google_5fc2163329",
                    "ext":".png",
                    "mime":"image/png",
                    "size":3.04,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/Google_5fc2163329.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:03:23.320Z",
                    "updated_at":"2020-07-08T22:03:23.320Z"
                 },
                 "imgenapp2":{
                    "id":64,
                    "name":"apple",
                    "alternativeText":"",
                    "caption":"",
                    "width":112,
                    "height":34,
                    "formats":null,
                    "hash":"apple_bf886d916a",
                    "ext":".png",
                    "mime":"image/png",
                    "size":2.34,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/apple_bf886d916a.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T15:28:41.366Z",
                    "updated_at":"2020-07-08T15:28:41.366Z"
                 },
                 "imagenprincipal":{
                    "id":68,
                    "name":"img-feauture-5",
                    "alternativeText":"",
                    "caption":"",
                    "width":512,
                    "height":288,
                    "formats":{
                       "thumbnail":{
                          "hash":"thumbnail_img_feauture_5_8f3bd71b63",
                          "ext":".png",
                          "mime":"image/png",
                          "width":245,
                          "height":138,
                          "size":26.56,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/thumbnail_img_feauture_5_8f3bd71b63.png"
                       },
                       "small":{
                          "hash":"small_img_feauture_5_8f3bd71b63",
                          "ext":".png",
                          "mime":"image/png",
                          "width":500,
                          "height":281,
                          "size":86.55,
                          "path":null,
                          "url":"https://cms-files-totalplay.s3.amazonaws.com/small_img_feauture_5_8f3bd71b63.png"
                       }
                    },
                    "hash":"img_feauture_5_8f3bd71b63",
                    "ext":".png",
                    "mime":"image/png",
                    "size":80.35,
                    "url":"https://cms-files-totalplay.s3.amazonaws.com/img_feauture_5_8f3bd71b63.png",
                    "previewUrl":null,
                    "provider":"aws-s3",
                    "provider_metadata":null,
                    "created_at":"2020-07-08T22:03:26.559Z",
                    "updated_at":"2020-07-08T22:03:26.559Z"
                 }
              }
           ]
        };
        
        console.log("==============");


        localStorage.setItem("TP_STR_PAQUETE_SELECCION", JSON.stringify(jsonoferta));
        window.location = "detallePaquete.html";

        });

    }

    resize() {
        addEventListener('resize', () => {
            this.props.windowW = window.innerWidth;
            this.props.cont = 0;
            this.props.cont2 = 10;
            this.props.container.style.left = '0px';
            if (this.props.windowW < 1100) this.clickCards();
        });
    }

    clickCards() {
        this.props.windowW = window.innerWidth;
        if (this.props.windowW < 1100) {
            for (let _card of this.props.packCards) {
                _card.addEventListener('click', (e) => {
                    console.log("click card");
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
    }

    getSizeItem(_element) {
        let style = _element.currentStyle || window.getComputedStyle(_element),
            widthItem = _element.clientWidth,
            marginLeft = parseInt(style.marginLeft),
            marginRight = parseInt(style.marginRight);
        return widthItem + marginLeft + marginRight;
    }

    cmsGetSplashInicio(){
        return new Promise((done,reject)=>{
            let statusReq=false;
            let urlCMS=cms.host+cms.getSplash;
            fetch(urlCMS, {method: 'GET'}).then(data=>{
                if (data.ok) { statusReq=true; return data.json();
                } else { reject("error en la peticion"); throw "Error en la llamada Ajax"; }  
            }).then(function(respuesta) {
                if(!statusReq){ reject("error en la peticion"); return false; }
                if(respuesta!=undefined && respuesta.length > 0){
                    let splash="";
                    let numSplash=0;
                    respuesta.forEach((element,index) => {
                        let titulo=element.titulo;
                        if(element.imagensplash != null){
                            numSplash++;
                            splash = element.imagensplash.url;
                        }
                    });
                    if(numSplash == 1){
                        $("#id_imagenSlash").attr('src', splash);
                        setTimeout(() => {
                            $("#id_boton_Splash").click();
                        }, 500);
                    }
                }else{
                    setTimeout(() => {
                        $("#id_boton_Splash").click();
                    }, 500);
                    reject("no se encontro ningun banner");
                }
            });
        });
    }

    setListeners(){
        let apuntador = this;
        $("#barBanner").on("click",function(){
            $("#headerCobertura").css("display", "flex");
            $(".main-index").css({"overflow-y":"hidden"});
            $('#headerNombre').focus();
        });

        $("#closeCoberturaLead").on("click",function(){
            $("#headerCobertura").css("display", "none");         
            $(".main-index").removeAttr("style");   
        });

        $("#btnConfirmCobertura").on("click",function(){
            $("#headerCobertura").css("display", "none");
            $(".main-index").removeAttr("style");  
            apuntador.regresarContenedorLead();
        });

        $("#portalEmpresarial").on("click",function(){
            window.open("https://totalplayempresarial.com.mx/");
        });

        $("#portalNegocio").on("click",function(){
             window.open("https://www.negociostotalplay.com.mx/");            
        });

        $("#btnCoberturaSeccionPaquete").on("click",function(){
            $("#modalMenu").css("display", "block");
            $("#modalContentForm").css("top","0");
            $("#step0").css("display","flex");            
        });

        $("#segu-Jus").on("click", function(){
            var oculto = document.getElementById('divJusticia').style.display;
            console.log(oculto);
            if(oculto == 'none'){
                $("#divJusticia").css('display','block');
            }else{
                $("#divJusticia").css('display','none');
            }
        });
    }

    validaciones(){
        var apuntador = this;

        $('.letras').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú";
            var especiales = [8, 37, 39]; //RETROCESO, <-, ->
            var especialesNO = [39]; //'
      
            var tecla_especial = false
            for(var i in especiales) {
                if(key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if(key == especialesNO[i]){
                    tecla_especial = false;
                    break;
                }
            }
      
            if(letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        } );

        $('.direccion').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú1234567890";
            var especiales = [8, 37, 39]; //RETROCESO, <-, ->
            var especialesNO = [39]; //'
      
            var tecla_especial = false
            for(var i in especiales) {
                if(key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if(key == especialesNO[i]){
                    tecla_especial = false;
                    break;
                }
            }
      
            if(letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        } );

        $('.solo-numeros').keydown(function(e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $('#btnCoberturaHeader').on('click',function(){
            var procesa = true;
            var nombre =  $.trim($('#headerNombre').val());
            var correo =  $.trim($('#headerCorreo').val());
            var telefono =  $.trim($('#headerTel').val());
            var codigoPostal =  $.trim($('#headerCP').val());

            console.log(nombre);
            console.log(correo);
            console.log(telefono);
            console.log(codigoPostal);


            if(apuntador.esVacio(nombre)){
                $("#errorNombre").css("display","block");
                $("#errorNombre").html("*Campo obligatorio");
                procesa = false;
            }
            
            if(apuntador.esVacio(correo)){
                $("#errorCorreo").css("display","block");
                $("#errorCorreo").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaEmail(correo)){
                    $("#errorCorreo").css("display","block");
                    $("#errorCorreo").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }
            
            if(apuntador.esVacio(telefono)){
                $("#errorTel").css("display","block");
                $("#errorTel").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaTelefono(telefono)){
                    $("#errorTel").css("display","block");
                    $("#errorTel").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(apuntador.esVacio(codigoPostal)){
                $("#errorCP").css("display","block");
                $("#errorCP").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validacp(codigoPostal)){
                    $("#errorCP").css("display","block");
                    $("#errorCP").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(procesa){
                $("#btnCoberturaHeader").html('Enviando datos...');
                $("#formPersonalDataHeader").css("display", "none");
                $("#cargadorLead").css("display", "block");
               
                var dataUser = {"correo":correo, "nombre":nombre, "telefono":telefono, 
                                "codioPostal": codigoPostal,"formulario": "FormularioHome"};
                apuntador.enviarLead(dataUser);                
            }
   
        });
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

    limpiarDatos(){
        $("#headerNombre").val("");
        $("#headerCorreo").val("");
        $("#headerTel").val("");
        $("#headerCP").val("");
        $('#errorNombre').val("");
        $('#errorCorreo').val("");
        $('#errorTel').val("");
        $('#errorCP').val("");
    }

    setKeyupInput(){
        $('#headerNombre').on("keyup", function() {
            $("#errorNombre").css("display","none");
        });

        $('#headerCorreo').on("keyup", function() {
            $("#errorCorreo").css("display","none");
        });
        
        $('#headerTel').on("keyup", function() {
            $("#errorTel").css("display","none");
        });

        $('#headerCP').on("keyup", function() {
            $("#errorCP").css("display","none");
        });

        $('#calleSection').on("keyup", function() {
            $("#errorCalle").css("display","none");
        });

        $('#numeroSection').on("keyup", function() {
            $("#errorNum").css("display","none");
        });

        $('#cpSection').on("keyup", function() {
            $("#errorcp").css("display","none");
        });
    }

    enviarLead(dataUser) {
        let apuntador = this;
        var endpoint = Constantes.endpoints.guardaLead;
        var cabeceraMC = new Headers();
        cabeceraMC.append("Content-type", "application/json;charset=utf-8");

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(dataUser),
            headers: cabeceraMC
        }).then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                throw "Error en la llamada Ajax Fetch " + url
            }
        }).then((respuesta) => {
            if(respuesta.status == 0){
                apuntador.confirmacionLead();
                $("#iconoMsg").addClass("ok-symbol");
                $("#mensaje").html("En breve recibirás una llamada de nuestros asesores,  <i class='text-bold'>gracias por elegir Totalplay.</i>");  
                $("#btnConfirmCobertura").addClass("btn__outline__green");              
                $("#btnConfirmCobertura").html("Ok, gracias");              
            }else{
                apuntador.confirmacionLead();
                $("#iconoMsg").addClass("err-symbol");
                $("#btnConfirmCobertura").addClass("btn__outline__blue");
                $("#btnConfirmCobertura").html("Ok, gracias");   
                $("#mensaje").html("Ocurrió un error al mandar tus datos,  <i class='text-bold'> por favor, intenta más tarde.</i>");
            }            
            apuntador.limpiarDatos();            
        }).catch((err) => {
            console.log("err");
            console.log(err);
        });
    }

    confirmacionLead(){
        var height = 0;
        if ( window.innerWidth < 768 ) height = 159;
        if ( window.innerWidth >= 768 ) height = 92;
        $("#btnCoberturaHeader").css("display", "none");
        $("#titleFormMessage1").css("display", "none");
        $("#closeCoberturaLead").css("display", "none");
        $(".separator-container").css("display", "none");
        $("#formPersonalDataHeader").css("display", "none");
        $("#cargadorLead").css("display", "none");
        $("#confirmCobertura").addClass("active");
        $("#coberturaContainer").css("height", height);
    }

    regresarContenedorLead(){
        $("#btnCoberturaHeader").removeAttr("style");
        $("#titleFormMessage1").removeAttr("style");
        $("#closeCoberturaLead").removeAttr("style");
        $(".separator-container").removeAttr("style");
        $("#formPersonalDataHeader").removeAttr("style");
         $("#cargadorLead").css("display", "none");
        $("#confirmCobertura").removeClass("active");
        $("#coberturaContainer").removeAttr("style");
        $("#btnCoberturaHeader").html('Quiero que me llamen');
    }

    ordenarObjeto(objetoInicial){
        var objetoOrdenado = objetoInicial.slice(0);
        objetoOrdenado.sort(function(a,b) {
            return b.precioLista - a.precioLista;
        });
        return objetoOrdenado;
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

    linkDetallePaquete(){
        $(".card-package-item").on('click', function () {
            localStorage.setItem('TP_ID_PAQUETE_SELECCION', $(this).attr('id'));
            setTimeout(function(){
                window.location = 'detallePaquete.html';
            },5000)
        });
    }

    obtenerDireccion(){
        let apuntador = this;
        var direccioncorta="";
        var strDireccion_LS_TMP = '';
        try{
            strDireccion_LS_TMP = localStorage.getItem('TP_STR_DIRECCION');
            if(strDireccion_LS_TMP !== '' || strDireccion_LS_TMP !== null){
                strDireccion_LS_TMP = JSON.parse(strDireccion_LS_TMP);
                var strDireccion_LS = strDireccion_LS_TMP.direccionFormulario.direccion;
                if (strDireccion_LS_TMP.direccionFormulario.codigoPostal == null || 
                    strDireccion_LS_TMP.direccionFormulario.codigoPostal == 'undefined') {     
                    $("#ciudadHome").html('Ciudad de México');
                }else {
                    
                    if(strDireccion_LS_TMP.direccionFormulario.ciudad !=null &&
                       strDireccion_LS_TMP.direccionFormulario.ciudad !='undefined'){
                       direccioncorta= strDireccion_LS_TMP.direccionFormulario.ciudad +", "+strDireccion_LS_TMP.direccionFormulario.codigoPostal;
                       $("#ciudadHome").html(direccioncorta);
                    }
                    if(strDireccion_LS_TMP.direccionFormulario.direccion !=null && 
                        strDireccion_LS_TMP.direccionFormulario.direccion != 'undefined'){
                        //direccioncorta = localStorage.getItem("TP_OF_STR_CALLE") + " #" + localStorage.getItem("TP_OF_STR_NUMERO_DIR");
                        let calleNumeroTmp = strDireccion_LS_TMP.direccionFormulario.direccion.split(',');
                        direccioncorta = calleNumeroTmp[0];
                       
                       
                    }
                }

                if(direccioncorta !== null && direccioncorta !== undefined && direccioncorta !=="" ){
                    $("#ciudadHome").html(direccioncorta);
                }else{
                    $("#ciudadHome").html('Ciudad de México');
                }
                const paq = new Paquetes();
                paq.cargarPaquetes("home");
            }
        }catch(error){
            $("#ciudadHome").html('Ciudad de México');
            console.log("NO PUDE TRAER LOCALSTORAGE")
        }
    }

}