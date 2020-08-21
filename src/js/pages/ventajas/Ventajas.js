import {VentajasEventos} from './VentajasEventos'
import {Comparativa} from './Comparativa'
import {cargaapps} from '../generales/cargaApps';

export  class Ventajas {
    constructor() {
        this.init();
    }
    init(){
        let  dataSliderCase1 = [
            {
                img: 'assets/img/packages/sliders/tvcuandoquieras.png',
                title: 'Regresa el tiempo',
                body: 'Disfruta tus programas favoritos cuando quieras, o vuelve al inicio de un programa en vivo.'
            },
            {
                img: 'assets/img/packages/sliders/4k.png',
                title: 'Definici\u00F3n 4K',
                body: 'Te sorprendemos con contenido en calidad cuatro veces superior al HD.'
            },
            {
                img: 'assets/img/packages/sliders/experienciaunica_17-05.png',
                title: 'Disfruta de una experiencia interactiva',
                body: 'Accede a todo el contenido de una forma f\u00E1cil e intuitiva.'
            }
        ];

        let dataSliderCase2 = [
            {
                img: 'assets/img/packages/sliders/netflix.png',
                title: 'El m\u00E1s r\u00E1pido para ver Netflix',
                body: 'Cumplimos tres años en el primer lugar del ranking de velocidad de Netflix.'
            },
            {
                img: 'assets/img/packages/sliders/500.png',
                title: 'Hasta 500 Megas de velocidad',
                body: 'Gracias a su red de fibra \u00F3ptica que llega hasta tu hogar.'
            },
            {
                img: 'assets/img/packages/sliders/intenetpordia.png',
                title: 'Internet OnDemand',
                body: 'Contrata la velocidad que quieras, por el tiempo que lo necesites.'
            }
        ];

        let dataSliderCase3 = [
            {
                img: 'assets/img/packages/sliders/anytime.png',
                title: 'TV en cualquier dispositivo',
                body: 'Disfruta tus programas favoritos y rentas OnDemand cuando quieras, donde quieras.'
            },
            {
                img: 'assets/img/packages/sliders/appedocta.png',
                title: 'Saldos y pagos',
                body: 'Consulta, descarga y paga tu estado de cuenta de manera f\u00E1cil y segura.'
            },
            {
                img: 'assets/img/packages/sliders/appwifi.png',
                title: 'Mi Red WiFi',
                body: 'Sincroniza equipos y configura tu red WiFi y contraseña.'
            }
        ];
        let  dataSliderCase4 = [
            {
                img: 'assets/img/packages/sliders/apptelefono_17-05.png',
                title: 'Llama desde cualquier lugar',
                body: 'Realiza y recibe llamadas desde cualquier parte del mundo con nuestra app m\u00F3vil.'
            },
            {
                img: 'assets/img/packages/sliders/llamadas.png',
                title: 'Telefon\u00EDa sin fronteras',
                body: 'Llamadas incluidas a fijos y celulares de M\u00E9xico, EEUU. y Canad\u00E1.'
            },
            {
                img: 'assets/img/packages/sliders/portabilidad.png',
                title: 'Conserva tu n\u00FAmero de siempre',
                body: 'Porta tu l\u00EDnea con nosotros y obt\u00E9n beneficios especiales.'
            }
        ];

        let apuntador=this;
        const firstSlider  = new VentajasEventos( 'tvSliderContainer', dataSliderCase1, 'left' );
        const secondSlider = new VentajasEventos( 'internetSliderContainer',dataSliderCase2 , 'right' );
        const thirdSlider  = new VentajasEventos( 'appSliderContainer', dataSliderCase3, 'left' );
        const fourthSlider = new VentajasEventos( 'phoneSliderContainer', dataSliderCase4, 'right' );

        const compara= new Comparativa();
        cargaapps(2);
        
        
    }

}