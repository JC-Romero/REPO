import * as Constantes from "../../utils/Constantes";
import {ClaseCobertura} from '../generales/ClaseCobertura';

export class CargaCiudades{
	constructor(){
		this.props = {
			tags : '',
			cdSeleccionada : ''
		}
		this.init();
	}

	init(){
		this.props.tags = [];
		this.cdSeleccionada = "";
		this.cargaCiudades();
	}

	cargaCiudades(){
		console.log("Hola, ciudades!");
		var apuntador = this;
		var url = Constantes.endpoints.obtenerCiudades;
        var html = "";

        fetch(url)
        .then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {

            var jsonCiudades = respuesta.result.states;
            
            $.each(jsonCiudades,function(index,ciudades){
            	apuntador.props.tags.push(ciudades.state);

            	html += '<div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 cityListItem">'+
                    '<p><a class="cambiaCiudad">'+ciudades.state+'</a></p>'+
                '</div>';
            });

            $("#cityList").html(html);

            apuntador.setListeners();

        }).catch(err => {
            console.log("error" + err);
        });
	}

	setListeners(){
		var apuntador = this;
		$('#cityPicker').on('hidden.bs.modal', function () {
			$('body').css({
				'overflow': 'auto'
			});
		});

		$('#citySearch').on('keyup',function(){
			console.log("AUTOCOMPLETADO MODAL CIUDADES");
			var x = document.getElementById('cityAutocomplete');
			if ($(this).val() == "") {
				x.style.display = 'none';
			} else {
				x.style.display = 'block';
			}

			apuntador.autocompletado(this.value);
		});

		apuntador.eventoCambiaCiudad();

		$('#btnConfirmaCambioCiudad').on('click',function(){
			try{
				var ciudadActual = localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME');
				if((ciudadActual !== "" || ciudadActual !== undefined) && (apuntador.props.cdSeleccionada !== "")){
					$('#cd-cobertura-index').html(apuntador.props.cdSeleccionada);
            		$('#cd-cobertura-index-seccion').html(apuntador.props.cdSeleccionada);
            		$('#cd-cobertura-index-span').html(apuntador.props.cdSeleccionada);
            		localStorage.setItem('TP_STR_DIRECCION_CIUDAD_HOME',apuntador.props.cdSeleccionada);
            		$('#confirmaCambioCiudad').modal('hide');
            		$('#cityPicker').modal('hide');
				}
			}catch(err){
				console.log("error => "+err)
			}
		})
	}

	autocompletado(value) {
		//console.log(this.props.tags);
		//referencia https://www.geeksforgeeks.org/javascript-auto-complete-suggestion-feature/
		var apuntador = this;
		var htmlAutocompletado = "";

		var n= apuntador.props.tags.length; //length of datalist tags 

		//setting datalist empty at the start of function 
		//if we skip this step, same name will be repeated 

		var l = value.length; 
		//input query length 
		for (var i = 0; i<n; i++) { 
			var str = apuntador.props.tags[i].toLowerCase();
			str = apuntador.removeAccents(str);
			

			//if(((apuntador.props.tags[i].toLowerCase()).indexOf(value.toLowerCase()))>-1)
			if(((str).indexOf(value.toLowerCase()))>-1)
			{ 
			//comparing if input string is existing in tags[i] string 
			
			htmlAutocompletado += '<li class="col-12"><a class="cambiaCiudad">'+apuntador.props.tags[i]+'</a></li>';

			} 
		}
		$("#cityAutocompleteList").html(htmlAutocompletado);
		apuntador.eventoCambiaCiudad(); 
	}

	removeAccents(str){
	  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");   
	}

	eventoCambiaCiudad(){
		var apuntador = this;

		$('.cambiaCiudad').on('click',function(event){
			//$('#confirmaCambioCiudad').modal('show');
			apuntador.props.cdSeleccionada = event.target.innerText;

			try{
				var ciudadActual = localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME');
				if((ciudadActual !== "" || ciudadActual !== undefined) && (apuntador.props.cdSeleccionada !== "")){
					$('#cd-cobertura-index').html(apuntador.props.cdSeleccionada);
            		$('#cd-cobertura-index-seccion').html(apuntador.props.cdSeleccionada);
            		$('#cd-cobertura-index-span').html(apuntador.props.cdSeleccionada);
            		localStorage.setItem('TP_STR_DIRECCION_CIUDAD_HOME',apuntador.props.cdSeleccionada);
            		$('#cityPicker').modal('hide');
            		
            		const estimulo = new ClaseCobertura();
            		var path = window.location.pathname;
            		if(path == "/"){
            			path = "home";
            		}else{
	            		path = path.replace("/","");
	            		if(path.includes(".html")){
	            			path = path.replace(".html","");
	            		}
	            	}

          			estimulo.checkEstimulo(apuntador.props.cdSeleccionada,path);
				}
			}catch(err){
				console.log("error => "+err)
			}
		})
	}

}