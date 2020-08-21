import * as Constantes from "../../utils/Constantes";
export class CoberturaSugerencias {
    
    constructor() {
        this.init();
    }

    init() {
        console.log('SCRIPT DE COBERTURAS DE SUGERENCIAS CARGADO OK');
        let referenciaClase = this;

        $('#cpSection').bind('buscaciudad',function(){
            var codigoPostal = $('#cpSection').val();
            referenciaClase.buscarCiudad(codigoPostal, 'calleModal');          
        });

        $("body").on('keyup', '#calleModal', function() {
            var calleNumero = $(this).val(); 
            var codigoPostal = $('#cpModal').val(); 
            referenciaClase.iniciarAutocompletadoModal(calleNumero, codigoPostal);
        });

        $("body").on('keyup', '#calleSection', function() {
            var calleNumero = $(this).val(); 
            var codigoPostal = $('#cpSection').val(); 
            referenciaClase.iniciarAutocompletadoSeccion(calleNumero, codigoPostal);
        });

        $("body").on('keyup', '#txtCalle', function() {
            var calleNumero = $(this).val(); 
            var codigoPostal = $('#txtCodigoPostal').val(); 
            referenciaClase.iniciarAutocompletadoContrata(calleNumero, codigoPostal);
        });

        $("body").on('click', '.pac-item', function() {
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

        $('#cpModal').on("keyup", function() {
            var codigoPostal = $('#cpModal').val();
            if(codigoPostal.length == 5){
                $('#ciudadModal').val('');
                $('#calleModal').val('');
                referenciaClase.buscarCiudad(codigoPostal, 'calleModal');
            }
        });

        $('#cpSection').on("keyup", function() {
            var codigoPostal = $('#cpSection').val();
            if(codigoPostal.length == 5){
                $('#ciudadSection').val('');
                $('#calleSection').val('');
                referenciaClase.buscarCiudad(codigoPostal, 'calleSection');
            }
        });
    }

    iniciarAutocompletadoModal(calleNumero, codigoPostal){
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({input: calleNumero + " " + codigoPostal + " Mexico"},
            referenciaClase.buscarSugerenciasModal
        );
    }

    buscarSugerenciasModal(predictions, status){        
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        var htmlLista = '';

        predictions.forEach(function (prediction) {
            //console.log('prediction=>', prediction);
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

    iniciarAutocompletadoSeccion(calleNumero, codigoPostal){
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({input: calleNumero + " " + codigoPostal + " Mexico"},
            referenciaClase.buscarSugerenciasSeccion
        );
    }

    buscarSugerenciasSeccion(predictions, status){        
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

    iniciarAutocompletadoContrata(calleNumero, codigoPostal){
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        let referenciaClase = this;
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({input: calleNumero + " " + codigoPostal + " Mexico"},
            referenciaClase.buscarSugerenciasContrata
        );
    }

    buscarSugerenciasContrata(predictions, status){        
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

    buscarCiudad(codigoPostal, idCampoFocus){
        if(idCampoFocus == 'calleSection'){
            $('.labelBusqueda').html('Buscando...<i class="fas fa-circle-notch fa-spin" style="color:white;"></i>');
        }else{
            $('.labelBusqueda').html('Buscando...<i class="fas fa-circle-notch fa-spin"></i>');
        }
        
        $.ajax({
            url: '/assets/media/infoCiudad.json',
            dataType: "json",
        }).done(function(respuesta) {
            console.log(respuesta);
            try {
                $.each(respuesta.datos.informacion.ArrColonias, function (key, infoColonias) {
                    if(infoColonias.DelegacionMunicipio != null && infoColonias.DelegacionMunicipio != ''){
                        let nombreCiudad = infoColonias.DelegacionMunicipio;
                        $('#ciudadModal').val(nombreCiudad);
                        $('#ciudadSection').val(nombreCiudad);
                        localStorage.setItem('TP_OF_STR_CP', codigoPostal);
                        localStorage.setItem('TP_CIUDAD_CONSULTA', nombreCiudad);
                    }
                });

                $('.labelBusqueda').html('Ciudad');
                //$('#'+idCampoFocus).focus();
            } catch (error) {
                $('#ciudadModal').val('');
                //$('#ciudadSection').val('');
            }
        }).fail(function(jqXHR, textStatus) {
            console.log('ER', 'OCURRIO UN ERROR EN EL API [obtener-info-cp-venta]', jqXHR);
            $('#ciudadModal').val('');
            $('#ciudadSection').val('');
            $('.labelBusqueda').html('Ciudad');
        });
    }
}