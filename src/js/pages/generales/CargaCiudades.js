import * as Constantes from "../../utils/Constantes";

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

		$('#citySearch').on('keyup',function(){
			console.log("keyup");
			apuntador.autocompletado(this.value);
		});

		apuntador.eventoCambiaCiudad();

		$('#btnConfirmaCambioCiudad').on('click',function(){
			try{
				var ciudadActual = localStorage.getItem('TP_STR_DIRECCION_CIUDAD_HOME');
				if((ciudadActual !== "" || ciudadActual !== undefined) && (apuntador.props.cdSeleccionada !== "")){
					$('#cd-cobertura-index').html(apuntador.props.cdSeleccionada);
            		$('#cd-cobertura-index-seccion').html(apuntador.props.cdSeleccionada);
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
			if(((apuntador.props.tags[i].toLowerCase()).indexOf(value.toLowerCase()))>-1) 
			{ 
			//comparing if input string is existing in tags[i] string 
			
			htmlAutocompletado += '<li class="col-12"><a class="cambiaCiudad">'+apuntador.props.tags[i]+'</a></li>';

			} 
		}
		$("#cityAutocompleteList").html(htmlAutocompletado);
		apuntador.eventoCambiaCiudad(); 
	}

	eventoCambiaCiudad(){
		var apuntador = this;

		$('.cambiaCiudad').on('click',function(event){
			$('#confirmaCambioCiudad').modal('show');
			apuntador.props.cdSeleccionada = event.target.innerText;
			//alert(event.target.innerText);
		})

		/*var items = document.getElementsByClassName('cambiaCiudad');
   
		for( var i = 0; i < items.length; i++){ 
			items[i].addEventListener( 'click', function(event){
				console.log( items[i].innerText );
			});
		}*/
	}

}