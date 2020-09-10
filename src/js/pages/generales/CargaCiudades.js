import * as Constantes from "../../utils/Constantes";

export class CargaCiudades{
	constructor(){
		this.props = {
			tags : ''
		}
		this.init();
	}

	init(){
		this.props.tags = [];
		this.cargaCiudades();
	}

	cargaCiudades(){
		console.log("Hola, ciudades!");
		var apuntador = this;
		var url = Constantes.endpoints.obtenerCiudades;
        var html = "";
        //var htmlAutocompletado = "";

        fetch(url)
        .then(function (respuestaServicio) {
            return respuestaServicio.json();
        }).then(function (respuesta) {

            var jsonCiudades = respuesta.result.states;
            
            $.each(jsonCiudades,function(index,ciudades){
            	apuntador.props.tags.push(ciudades.state);

            	//htmlAutocompletado += '<li class="col-12"><a>'+ciudades.state+'</a></li>';

            	html += '<div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 cityListItem">'+
                    '<p><a>'+ciudades.state+'</a></p>'+
                '</div>';
            });

            $("#cityList").html(html);
            //$("#cityAutocompleteList").html(htmlAutocompletado);

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
			
			htmlAutocompletado += '<li class="col-12"><a>'+apuntador.props.tags[i]+'</a></li>';

			} 
		}
		$("#cityAutocompleteList").html(htmlAutocompletado); 
	}
}