export class CarritoCompras {
	constructor(){
		this.inicializar();
	}

	inicializar(){
        console.group('CarritoCompras.js FUNCION inicializar()');
        console.log('INICIANDO CLASE CARRITO');
        this.validarMemoria();
        this.eventoCarrito();
        this.validarContratacionPaso();
		console.groupEnd();
    }

    validarMemoria(){
        console.group('CarritoCompras.js FUNCION validarMemoria()');
        console.log('VALIDANDO SI EXISTE ITEM');
        let strInfoPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        try {
            let objtPaquete = JSON.parse(strInfoPaqueteSeleccionado);

            if(objtPaquete.hasOwnProperty('proceso')){
                $('.count-car').show();
            }
        } catch (error) {
            console.log('INFO PAQUETE NO ECONTRADO');
        }
		console.groupEnd();
    }

    validarContratacionPaso(){
        console.group('CarritoCompras.js FUNCION validarContratacionPaso()');
        let strInfoPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        const path = window.location.pathname;
        try {
            let objtPaquete = JSON.parse(strInfoPaqueteSeleccionado);
            console.log('path=>',path);

            if(path == '/contratacion.html'){

                if(objtPaquete.proceso.accion == 'VALIDAR_COBERTURA'){
                    setTimeout(function() {
                        $('#btnContinuar').trigger('click');
                    }, 2000);
                }                
            }
            
        } catch (error) {
            console.log('SIN INFORMACION PARA VALIDAR');
        }
        console.groupEnd();
    }

    validarContratacionPromo(){
        console.group('CarritoCompras.js FUNCION validarContratacionPromo()');
        let objeto = {}
        let strInfoPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        const path = window.location.pathname;
        try {
            let objtPaquete = JSON.parse(strInfoPaqueteSeleccionado);
            console.log('path=>',path);
            if(objtPaquete.proceso.accion == 'PROMOCION_SELECCIONADA'){
                let tipoPromo = objtPaquete.promocionPremium.tipo;
                objeto = {
                    "tipoPromo":tipoPromo,
                }
            }
        } catch (error) {
            objeto = {}
            console.log('SIN INFORMACION PARA VALIDAR');
        }
        
        console.log('objeto=>', objeto);
        console.groupEnd();
        return objeto;
    }

    eventoCarrito(){
        $("body").on('click', '.carritoCompras', function() {
            console.group('CarritoCompras.js FUNCION .carritoCompras');
            let strInfoPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
            try {
                let objtPaquete = JSON.parse(strInfoPaqueteSeleccionado);

                if(objtPaquete.hasOwnProperty('proceso')){
                    window.location = objtPaquete.proceso.url;
                }
            } catch (error) {
                console.log('SIN INFORMACION PARA VALIDAR');
            }
            console.groupEnd();
        });
    }

    obtenerObjetoPasos(){
        console.group('CarritoCompras.js FUNCION obtenerObjetoPasos()');
        let objeto = {}
        let strInfoPaqueteSeleccionado = localStorage.getItem('TP_STR_PAQUETE_SELECCION');
        const path = window.location.pathname;
        try {
            let objtPaquete = JSON.parse(strInfoPaqueteSeleccionado);
            objeto = objtPaquete.proceso;
            
        } catch (error) {
            objeto = {}
            console.log('SIN INFORMACION DEL OBJETO');
        }
        
        console.log('objeto=>', objeto);
        console.groupEnd();
        return objeto;

    }
}