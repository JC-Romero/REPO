import * as Constantes from "../../utils/Constantes";

export class Soporte {
	constructor(){
		this.props = {
			nombre : '',
			nocta : '',
			correo : '',
			celular : '',
			motivo : '',
			descripcion : ''
		}
		this.init();
	}

	init(){
		console.log("Estoy en soporte js");
		this.setListeners();
		this.setKeyupInput();
	}

	setListeners(){
		let apuntador = this;
        $('#botonBuzonRegresar').on('click',function(e){
            $("#botonEnviarBuzon").css("display","flex");
            $("#buzonDirector").css("display","flex");
            $("#buzonDirectorRespuesta").css("display","none");
            $("#formBuzon").css("display","flex");     

        });

		$('#botonEnviarBuzon').on('click',function(e){
			e.preventDefault();
			var procesa = true;
			apuntador.props.nombre = $.trim($('#nombreAyuda').val());
			apuntador.props.nocta = $.trim($('#noCuentaAyuda').val());
			apuntador.props.correo = $.trim($('#correoAyuda').val());
			apuntador.props.celular = $.trim($('#movilAyuda').val());
			apuntador.props.motivo = $.trim($('#motivoAyuda').val());
			apuntador.props.descripcion = $.trim($('#comentarioAyuda').val());

			console.log(apuntador.props.nombre );
			console.log(apuntador.props.nocta  );
			console.log(apuntador.props.correo );
			console.log(apuntador.props.celular);
			console.log(apuntador.props.motivo );
			console.log(apuntador.props.descripcion);

			if(apuntador.esVacio(apuntador.props.nombre)){
                $("#errorNombreAyuda").css("display","block");
                $("#errorNombreAyuda").html("*Campo obligatorio");
                procesa = false;
            }else{
                if(!apuntador.validaLetras(apuntador.props.descripcion)){
                    $("#errorNombreAyuda").css("display","block");
                    $("#errorNombreAyuda").html("*Campo no v&aacute;lido.");
                    procesa = false;
                }
            }

            if(apuntador.esVacio(apuntador.props.nocta)){
                $("#errorNocuenta").css("display","block");
                $("#errorNocuenta").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaCuenta(apuntador.props.nocta) && !apuntador.validaTel(apuntador.props.nocta)){
                    $("#errorNocuenta").css("display","block");
                    $("#errorNocuenta").html("*Cuenta no v&aacute;lido");
                    procesa = false;
                }
            }

            if(apuntador.esVacio(apuntador.props.correo)){
                $("#errorCorreoAyuda").css("display","block");
                $("#errorCorreoAyuda").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaEmail(apuntador.props.correo)){
                    $("#errorCorreoAyuda").css("display","block");
                    $("#errorCorreoAyuda").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(apuntador.esVacio(apuntador.props.celular)){
                $("#errorMovilAyuda").css("display","block");
                $("#errorMovilAyuda").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaTel(apuntador.props.celular)){
                    $("#errorMovilAyuda").css("display","block");
                    $("#errorMovilAyuda").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(apuntador.props.motivo === "0"){
                $("#errorMotivoAyuda").css("display","block");
                $("#errorMotivoAyuda").html("*Selecciona un motivo de contacto");
                procesa = false;
            }

            if(apuntador.esVacio(apuntador.props.descripcion)){
                $("#errorComentarioAyuda").css("display","block");
                $("#errorComentarioAyuda").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaLetras(apuntador.props.descripcion)){
                    $("#errorComentarioAyuda").css("display","block");
                    $("#errorComentarioAyuda").html("*Campo no v&aacute;lido.");
                    procesa = false;
                }
            }

            if(procesa){     
            	//$("#buzonDirector").css("display","none"); 
                $("#cargadorLead").css("display","block");     
                $("#formBuzon").css("display","none");     
                $("#botonEnviarBuzon").css("display","none");     
            	var params = {"nombre":apuntador.props.nombre,"nocta":apuntador.props.nocta,
				"correo":apuntador.props.correo,"celular":apuntador.props.celular,
				"motivo":apuntador.props.motivo,"descripcion":apuntador.props.descripcion};
				var payload = JSON.stringify(params);
				console.log("payload "+payload);
				apuntador.insertaBuzon(payload);
            }
		});

		$("#chatAC").on("click", function() {
            window.open(
                "https://www.totalplay.online/totalplayatencion/chatbeacon/content/windows/chat.html?accountid=1&siteid=1&queueid=1&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $("#chatST").on("click", function() {
            window.open(
                "https://www.totalplay.online/totalplaysoporte/chatbeacon/content/windows/chat.html?accountid=2&siteid=2&queueid=2&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $('.letras').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú";
            var especiales = [8, 37, 39, 44, 46]; //RETROCESO, <-, ->
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
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú1234567890,.";
            var especiales = [8, 37, 39, 188, 190]; //RETROCESO, <-, ->
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

		/*Implementacion de IPTV*/
		$('.manuals-item-list').on('click',function(e){
			let item = ( e.target.localName === 'DIV' ) ? e.target : e.target.parentNode.classList.contains('manual-item') ? e.target.parentNode : e.target.parentNode.parentNode; 
            let manualsListContainer = document.querySelector('.manuals-item-list');
            let manualListItems = [...document.querySelectorAll('.manuals-item-list')];

            if( item.classList.contains('manual-item') ){
                let widthContainer = window.innerWidth;
                let widthListContainer = manualsListContainer.getBoundingClientRect().width;
                let widthItem = item.offsetWidth;
                let itemLeft = item.getBoundingClientRect().left;
                let itemRight = item.getBoundingClientRect().right;
                let itemPosition = manualListItems.indexOf(item);
                // console.log('widthContainer: ', widthContainer);
                // console.log('widthListContainer: ', widthListContainer);
                // console.log('widthItem: ', itemLeft);

                if( itemRight > widthContainer ){
                    let moveX = widthListContainer-widthContainer;
                    manualsListContainer.style.cssText = `left: -${moveX+103}px;`;
                }
                if( itemLeft < 0 ){
                    let moveX = widthListContainer-widthContainer;
                    manualsListContainer.style.cssText = 'left: 0px';//`left: ${moveX}px;`;
                }

            }
		});
	}

	insertaBuzon(params){
		var apuntador = this;
		console.log('Empieza loader');
		console.log(Constantes.endpoints.enviaBuzon);
		fetch(Constantes.endpoints.enviaBuzon, {
			method: "POST",
			body: params
		}).then(data => {
			if (data.ok) {
				return data.json();
			} else {
				throw "Error en la llamada Ajax";
			}
		}).then(respuesta => {
			try {
				if (respuesta.status == 0) {
					console.log("Se guardó la info");
                    $("#buzonDirector").css("display","none"); 
                    $("#buzonDirectorRespuesta").css("display","flex");
                    $("#formBuzon").css("display","none");                        

				} else {
					console.log("Poner mensaje de error");
                    $("#buzonDirectorRespuesta").html("Hubo un error, por favor intentar m&aacute;s tarde.");
					throw "no data avaliable";
				}
			} catch (e) {
				console.error(e);
                $("#buzonDirectorRespuesta").html("Hubo un error, por favor intentar m&aacute;s tarde.");
				throw "Error al traer la informacion";
			}
			apuntador.limpiarDatos();
		}).catch(err => {
			console.log("Error");
			console.log("Poner mensaje de error");
            $("#buzonDirectorRespuesta").html("Hubo un error, por favor intentar m&aacute;s tarde.");
		}).finally(()=>{
	    	console.log('oculta loader');
            $("#botonEnviarBuzon").css("display","inline-block");
            $("#cargadorLead").css("display","none");      
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

	validaCuenta(cuenta) {
		var response = false;
		var reCuenta = /^\d{1}[.]\d{7}$/; //regular expression defining a 5 digit number

		if (cuenta.length > 0) {
			if (cuenta.match(reCuenta)) {
				//console.log("Valido por cuenta");
				response = true;
			}
		}
		return response;
	}

	validaEmail(email) {
		var response = false;
		var reEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // regular expression defining email address
		if (email.length > 0) {
			if (email.match(reEmail)) {
				console.log("Valido por Email");
				response = true;
			}
		}

		return response;
	}

	validaTel(telefono) {
		var response = false;
		var reTelefono = /^\d{9,10}$/; //regular expression defining a 10 digit number

		if (telefono.length > 0) {
			if (telefono.match(reTelefono)) {
				//console.log("Valido por Telefono o NumCuenta");
				response = true;
			}
		}

		return response;
	}

	validaLetras(texto) {
		var response = false;
		var reTexto = /^[A-Za-záéíóú0-9,.\s]+$/g; //regular expression defining letras y numeros

		if (texto.length > 0) {
			if (texto.match(reTexto)) {
				//console.log("Valido por Telefono o NumCuenta");
				response = true;
			}
		}

		return response;
	}

	setKeyupInput(){
        $('#nombreAyuda').on("keyup", function() {
            $("#errorNombreAyuda").css("display","none");
        });

        $('#noCuentaAyuda').on("keyup", function() {
            $("#errorNocuenta").css("display","none");
        });
        
        $('#correoAyuda').on("keyup", function() {
            $("#errorCorreoAyuda").css("display","none");
        });

        $('#movilAyuda').on("keyup", function() {
            $("#errorMovilAyuda").css("display","none");
        });

        $('#motivoAyuda').on('change', function() {
		    $("#errorMotivoAyuda").css("display","none");
		});

        $('#comentarioAyuda').on("keyup", function() {
            $("#errorComentarioAyuda").css("display","none");
        });
    }

    limpiarDatos(){
        $("#nombreAyuda").val("");
        $("#noCuentaAyuda").val("");
        $("#correoAyuda").val("");
        $("#movilAyuda").val("");
        $('#motivoAyuda').val("0");
        $('#comentarioAyuda').val("");

        $("#errorNombreAyuda").val("");;
        $("#errorNocuenta").val("");;
        $("#errorCorreoAyuda").val("");;
        $("#errorMovilAyuda").val("");;
        $("#errorMotivoAyuda").val("");;
        $("#errorComentarioAyuda").val("");;

    }

}