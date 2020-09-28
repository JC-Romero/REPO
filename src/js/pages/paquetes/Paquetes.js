import * as Constantes from "../../utils/Constantes";
export class Paquetes {
	constructor() {
		this.props = {
			windowW: window.innerWidth,
			cont: 0,
			cont2: 10,
			container: document.getElementById("cardsPackage"),
		};
	}

	init() {
		this.revisarDireccion();
		this.cargarPaquetes("home");
		//this.eventoTipoPaquete();
	}

	resize() {
		addEventListener("resize", () => {
			this.props.windowW = window.innerWidth;
			this.props.cont = 0;
			this.props.cont2 = 10;
			this.props.container.style.left = "0px";
			if (this.props.windowW < 1100) this.clickCards();
		});
	}

	clickCards() {
		this.props.windowW = window.innerWidth;
		if (this.props.windowW < 1100) {
			for (let _card of this.props.packCards) {
				_card.addEventListener("click", (e) => {
					console.log("click card");
					let item = e.target,
						moveX = this.getSizeItem(item);
					if (item == this.props.packCards[0]) {
						this.props.container.style.left = `${moveX}px`;
						this.props.packCards[0].classList.add("active");
						this.props.packCards[1].classList.remove("active");
						this.props.packCards[2].classList.remove("active");
						this.props.indicators[0].classList.add("active");
						this.props.indicators[1].classList.remove("active");
						this.props.indicators[2].classList.remove("active");
					} else if (item == this.props.packCards[2]) {
						this.props.container.style.left = `-${moveX}px`;
						this.props.packCards[0].classList.remove("active");
						this.props.packCards[1].classList.remove("active");
						this.props.packCards[2].classList.add("active");
						this.props.indicators[0].classList.remove("active");
						this.props.indicators[1].classList.remove("active");
						this.props.indicators[2].classList.add("active");
					} else {
						this.props.container.style.left = "0px";
						this.props.packCards[0].classList.remove("active");
						this.props.packCards[2].classList.remove("active");
						this.props.packCards[1].classList.add("active");
						this.props.indicators[0].classList.remove("active");
						this.props.indicators[2].classList.remove("active");
						this.props.indicators[1].classList.add("active");
					}
				});
			}
			for (let _indicator of this.props.indicators) {
				_indicator.addEventListener("click", (e) => {
					let item = e.target,
						moveX;
					if (item == this.props.indicators[0]) {
						moveX = this.getSizeItem(this.props.packCards[0]);
						this.props.container.style.left = `${moveX}px`;
						this.props.packCards[0].classList.add("active");
						this.props.packCards[1].classList.remove("active");
						this.props.packCards[2].classList.remove("active");
						this.props.indicators[0].classList.add("active");
						this.props.indicators[1].classList.remove("active");
						this.props.indicators[2].classList.remove("active");
					} else if (item == this.props.indicators[2]) {
						moveX = this.getSizeItem(this.props.packCards[2]);
						this.props.container.style.left = `-${moveX}px`;
						this.props.packCards[0].classList.remove("active");
						this.props.packCards[1].classList.remove("active");
						this.props.packCards[2].classList.add("active");
						this.props.indicators[0].classList.remove("active");
						this.props.indicators[1].classList.remove("active");
						this.props.indicators[2].classList.add("active");
					} else {
						this.props.container.style.left = "0px";
						this.props.packCards[0].classList.remove("active");
						this.props.packCards[2].classList.remove("active");
						this.props.packCards[1].classList.add("active");
						this.props.indicators[0].classList.remove("active");
						this.props.indicators[2].classList.remove("active");
						this.props.indicators[1].classList.add("active");
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

	revisarDireccion() {
		if (localStorage.getItem("TP_OF_STR_CP") != null && localStorage.getItem("TP_OF_STR_CP") != "undefined") {
			var direccioncorta = localStorage.getItem("TP_OF_STR_CALLE") + " #" + localStorage.getItem("TP_OF_STR_NUMERO_DIR");
			if (window.matchMedia("(min-width: 1024px)").matches) {
				$("#divMainTitleContent").css("display", "block");
				$("#tituloPaquetesDisponibles").css("margin-left", "0");
			}
			$("#btnCoberturaSeccionPaquete").html("Valida otra cobertura");
		}
	}

	cargarPaquetes(opt) {
		console.group('Paquetes.js FUNCION cargarPaquetes('+opt+')');
		let apuntador = this;
		var tipopaquetes = "totalplay_paquetes_2020_09_09.json?v=28SEP0001";
		if (localStorage.getItem("TP_OF_OBJ_FACTIBILIDAD") != null) {
			var datosfactibilidad = JSON.parse(localStorage.getItem("TP_OF_OBJ_FACTIBILIDAD"));
			if (datosfactibilidad.estimulofiscal == "true") {
				tipopaquetes = "totalplay_paquetes_fronterizo.json";
			}
		}else{
			if(localStorage.getItem("TP_ESTIMULO_FISCAL") != null && 
				localStorage.getItem("TP_ESTIMULO_FISCAL") == "true"){
				var estimulofiscal = localStorage.getItem("TP_ESTIMULO_FISCAL");
				tipopaquetes = "totalplay_paquetes_fronterizo.json";
			}
		}

		console.log(tipopaquetes);
		//var url = Constantes.endpoints.obtenerPaquetes + tipopaquetes;
		//var url = '/assets/media/totalplay_paquetes_2020_09_09.json';
		var url = '/assets/media/'+tipopaquetes;
		console.log('URL ARCHIVO:',url);
		fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		}).then((data) => {
			if (data.ok) {
				return data.json();
			} else {
				throw "Error en la llamada Ajax";
			}
		}).then(async function (respuesta) {
			let paqueteList = apuntador.cmsGetImagenPaqueteList();
			localStorage.setItem("TP_INFO_PAQUETES", JSON.stringify(respuesta));
			if (opt == "Todos") {

				apuntador.pintarPaquetes(respuesta["TriplePlay"], "paquetes_tripleplay", paqueteList);
				apuntador.pintarPaquetes(respuesta["TriplePlayNetFlix"], "ctnPaquetesTripleplay", paqueteList);
				apuntador.pintarPaquetes(respuesta["DoblePlay"], "paquetes_dobleplay", paqueteList);
				apuntador.pintarPaquetes(respuesta["DoblePlayNetFlix"], "ctnPaquetesDobleplay", paqueteList);//*/
			}else if( opt == "match" ){

				apuntador.pintarPaquetes(respuesta["TriplePlayNetFlix"], "ctnPaquetesTripleplay", paqueteList, opt);
				apuntador.pintarPaquetes(respuesta["DoblePlayNetFlix"], "ctnPaquetesDobleplay", paqueteList, opt);//*/

			}else if( opt == "regular" ){

				apuntador.pintarPaquetes(respuesta["TriplePlay"], "ctnPaquetesTripleplay", paqueteList,opt);
				apuntador.pintarPaquetes(respuesta["DoblePlay"], "ctnPaquetesDobleplay", paqueteList,opt);

			}else if( opt == "unbox" ){

				apuntador.pintarPaquetes(respuesta["TriplePlayAmazon"], "ctnPaquetesTripleplay", paqueteList,opt);
				apuntador.pintarPaquetes(respuesta["DoblePlayAmazon"], "ctnPaquetesDobleplay", paqueteList,opt);

			}else { //home
				var arreglo = apuntador.ordenarObjeto(respuesta["TriplePlay"]).slice(0, 1);

				var arregloUnbox = apuntador.ordenarObjeto(respuesta["TriplePlayAmazon"]).slice(0,1);

				var arregloNetflix = apuntador.ordenarObjeto(respuesta["TriplePlayNetFlix"]).slice(0,1)

				var arrelgoApintar = "["+JSON.stringify(arregloUnbox[0]).concat(",").concat(JSON.stringify(arregloNetflix[0])).concat(",").concat(JSON.stringify(arreglo[0]))+"]";

				apuntador.pintarPaquetes(arrelgoApintar, "cardsPackage", paqueteList, opt);

			}
		});
		console.groupEnd();
	}

	pintarPaquetes(arregloPaquetes, idContenedor, listaImagenesCms, opt) {
		console.log("estoy en pintarPaquetes")
		let clase = this;
		var plantillaHTML = "";

		if(opt == "home"){
			var arreglo = JSON.parse(arregloPaquetes);
		}else{
			var arreglo = clase.ordenarObjeto(arregloPaquetes);
		}
		
		var arregloRecomendacion = new Array();
		var contador = 1;

		$.each(arreglo, function (key, objPaquete) {
			
			if(opt !== "home"){
				if (contador <= 3) {
					contador++;
					arregloRecomendacion.push(objPaquete);
				}
			}
			

			var color = objPaquete.color;
			var claseTipoPaquete;
			var imagenPaquete;
			var descriptionApp;

			if(objPaquete.nombre.includes("unbox") || objPaquete.nombre.includes("UNBOX") || opt == "unbox"){
				claseTipoPaquete = "unbox";
				imagenPaquete = "/assets/img/nuevos/amazon-prime-logoMain.png";
				descriptionApp = "Envíos, música y <span>prime video.</span>";
			}else if(objPaquete.nombre.includes("match") || objPaquete.nombre.includes("MATCH")){
				claseTipoPaquete = "match";
				imagenPaquete = "/assets/img/nuevos/1200px-Netflix_2015_logo.svg.png";
				descriptionApp = "4 pantallas <span>Premium UHD</span>";
			}else{
				claseTipoPaquete = "surprisePlus";
				imagenPaquete = "/assets/img/nuevos/emptyApp.png";
				descriptionApp = objPaquete.detalle.canales;
			}

			if (listaImagenesCms.length > 0) {
				listaImagenesCms.forEach((element) => {
					if (element.id_paquete == objPaquete.id) {
						color = element.color;
						objPaquete.imagen = element.imagen.url;
					}
				});
			}

			//var regexMegas = /\s(\d{1,3})\sMbps/;
			//console.log('objPaquete.detalle.megas=>', objPaquete.detalle.megas);
			var regexMegas = /(\d{1,3})\s/;
	        var arrayMegas = regexMegas.exec(objPaquete.detalle.megas);

	        var regexPantallas = "";
	        var arrayPantallas = "";
	        var arrayCanales = "";

	        if(opt == "match"){
		        regexPantallas = /(\d)\spantalla/;
		        arrayPantallas = regexPantallas.exec(objPaquete.detalleServicio);

		        arrayCanales= objPaquete.detalle.canales.split('/');
		        console.log('arrayCanales=>',arrayCanales);
		    }

			var claseOcultar = '';
	        if(key > 2){
	            if(idContenedor == 'ctnPaquetesTripleplay'){
	                claseOcultar = 'hiddenPackageTriple';
	            }
	            if(idContenedor == 'ctnPaquetesDobleplay'){
	                claseOcultar = 'hiddenPackageDoble';
	            }
	        }
			console.log("*************"+opt+"**************++");
			var canalesDescripcion = (objPaquete.detalle.canales != undefined)? objPaquete.detalle.canales: '';
			if (opt == "home") {

				plantillaHTML += 
				'<div class="col-12 col-sm-6 mx-sm-auto col-md-6 col-lg-4 col-xl-3">'+
                	'<div class="row">'+
	                    '<div class="col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto mainContainerpackage '+claseTipoPaquete+'"'+
	                        'onclick="showBootstrapModalFirst(\'installLocation\');">'+
	                        '<div class="packageInfoContainer" id="'+objPaquete.id+'">'+
	                            '<div class="titlePackage">'+
	                                '<p>'+objPaquete.nombre+'</p>'+
	                            '</div>'+
	                            '<div class="velocityPackage">'+
	                                '<p>'+objPaquete.detalle.megas+'</p>'+
	                            '</div>'+
								'<div class="descriptionPackage">'+
									'<p><span>'+canalesDescripcion+'</p>'+
	                                '<p><span>1 línea</span> de teléfono</p>'+
	                                
	                            '</div>'+
	                            '<hr>'+
	                            '<div class="imagePackage">'+
	                                '<img src="'+imagenPaquete+'" alt="Image Paquete">'+
	                            '</div>'+
	                            '<div class="descriptionApp">'+
	                                '<p>'+descriptionApp+'</p>'+
	                            '</div>'+
	                            
	                            '<div class="packagePrice">'+
	                                '<p><a >Desde: <span>$ '+clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",")+' al mes</span></a></p>'+
	                            '</div>'+
	                        '</div>'+
	                    '</div>'+
	                '</div>'+
	            '</div>';

			} else if(opt == "match"){
				
		        plantillaHTML += ``+
		        `<div class="col-12 col-sm-6 mx-sm-auto col-md-6 col-lg-4 col-xl-4 ${claseOcultar}">
		            <div class="row">
		                <div class="col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto mainContainerpackage match">
		                    <div class="packageInfoContainer" id="${objPaquete.id}">
		                        <div class="titlePackage">
		                            <p>${objPaquete.nombre}</p>
		                        </div>
		                        <div class="velocityPackage">
		                            <p>${arrayMegas[1]} Megas</p>
		                        </div>
		                        <div class="descriptionPackage">
		                            <p>${canalesDescripcion}</p>
		                            <p><span>1 línea</span> de teléfono</p>
		                        </div>
		                        <hr>
		                        <div class="imagePackage">
		                            <img src="/assets/img/nuevos/1200px-Netflix_2015_logo.svg.png" alt="Image Paquete">
		                        </div>
		                        <div class="descriptionApp">
		                            <p>${arrayPantallas[1]} pantalla(s) <span>Premium UHD</span></p>
		                        </div>
		                        
		                        <div class="packagePrice">
		                            <p><a >Desde: <span>$ ${clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") } al mes</span></a></p>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>`;
			}else if(opt == "regular"){
				var colores = ['surprisePlus','emotionPlus','emotion', 'funPlus', 'fun', 'starter']
        
		        
		        plantillaHTML += ``+
		        `<div class="col-12 col-sm-6 mx-sm-auto col-md-6 col-lg-4 col-xl-4 ${claseOcultar}">
		            <div class="row">
		                <div class="col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto mainContainerpackage ${colores[key]} card-package-item">
		                    <div class="packageInfoContainer" id="${objPaquete.id}">
		                        <div class="titlePackage">
		                            <p>${objPaquete.nombre}</p>
		                        </div>
		                        <div class="velocityPackage">
		                            <p>${arrayMegas[1]} Megas</p>
		                        </div>
		                        <div class="descriptionPackage">
		                            <p>${canalesDescripcion}</p>
		                            <p><span>1 línea</span> de teléfono</p>
		                        </div>
		                        <hr>
		                        <div class="imagePackage">
		                            <img src="/assets/img/nuevos/emptyApp.png" alt="Image Paquete">
		                        </div>
		                        <div class="descriptionApp">
		                            <p>App description</p>
		                        </div>
		                        
		                        <div class="packagePrice" >
		                            <p><a >Desde: <span>$ ${clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") } al mes</span></a></p>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>`;
			}else if(opt == "unbox"){
				
				plantillaHTML += ``+
				`<div class="col-12 col-sm-6 mx-sm-auto col-md-6 col-lg-4 col-xl-4 ${claseOcultar}">
                    <div class="row">
                        <div class="col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto mainContainerpackage unbox">
                            <div class="packageInfoContainer" id="${objPaquete.id}">
                                <div class="titlePackage">
                                    <p>${objPaquete.nombre}</p>
                                </div>
                                <div class="velocityPackage">
                                    <p>${arrayMegas[1]} Megas</p>
                                </div>
								<div class="descriptionPackage">
									<p>${canalesDescripcion}</p>
                                    <p><span>1 línea</span> de teléfono</p>
                                    
                                </div>
                                <hr>
                                <div class="imagePackage">
                                    <img src="${imagenPaquete}" alt="Image Paquete">
                                </div>
                                <div class="descriptionApp">
                                    <p>${descriptionApp}</span></p>
                                </div>
                                
                                <div class="packagePrice">
                                    <p><a >Desde: <span>$ ${clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") } al mes</span></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
			}
		});
		
		$("#" + idContenedor).html(plantillaHTML);
		if (opt == "home") {
			/*this.props.packCards = [...document.getElementsByClassName("card-package-item")];
			this.props.packCards[1].classList.add("active");
			this.props.indicators = [...document.getElementById("detailPackageIndicatorsIndex").children];
			this.props.indicators[1].classList.add("active");
			clase.clickCards();*/
		}
		clase.setListener();
		localStorage.setItem("TP_PAQUETES_RECOMENDACION", JSON.stringify(arregloRecomendacion));
	}

	ordenarObjeto(objetoInicial) {
		try {
			var objetoOrdenado = objetoInicial.slice(0);
			objetoOrdenado.sort(function (a, b) {
				return b.precioLista - a.precioLista;
			});
			return objetoOrdenado;	
		} catch (error) {
			console.log('ERROR:', error);
		}
		
	}

	formatoMonedad(n, c, d, t) {
		var c = isNaN((c = Math.abs(c))) ? 2 : c,
			d = d == undefined ? "." : d,
			t = t == undefined ? "," : t,
			s = n < 0 ? "-" : "",
			i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
			j = (j = i.length) > 3 ? j % 3 : 0;
		return (s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$0" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ""));
	}

	cmsGetImagenPaqueteList() {
		return new Promise((done, reject) => {
			let statusReq = false;
			let urlCMS = '/assets/media/img-paquetes.json';
			fetch(urlCMS, {
				method: "GET"
			}).then((data) => {
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
				var paqueteImagenes = [];
				if (respuesta != undefined && respuesta.length > 0) {
					paqueteImagenes.length = 0;
					respuesta.forEach((element, index) => {
						if (element.imagen != null) {
							paqueteImagenes.push(element);
						}
					});
					done(paqueteImagenes);
				} else {
					done([]);
				}
			}).catch(function (error) {
				console.log("Error en la peticion - no se mostrara Paquetes desde CMS", error);
				done([]);
			});
		});
	}

	setListener() {
		let referenciaClase = this;
		

		$("body").on("click",".packageInfoContainer", function (e) {
			e.stopImmediatePropagation();
	        var idPaqueteSeleccionado = $(this).attr("id");
	        console.log('idPaqueteSeleccionado=>', idPaqueteSeleccionado);
	        var cadenaOfertaActual = localStorage.getItem("TP_INFO_PAQUETES");
	        var jsonOferta = JSON.parse(cadenaOfertaActual);
	        $.each(jsonOferta, function (familiaPaquete, arrayOferta) {
	            $.each(arrayOferta, function (key, objPaquete) {
	                if (idPaqueteSeleccionado == objPaquete.id) {
	                    var objetoInicial = {
	                        "idPaquete": objPaquete.id,
	                        "detallePaquete":objPaquete,
	                        "proceso":{
	                            "numeroPaso":1,
	                            "url":"detallePaquete.html"
	                        }
	                    };
	                    localStorage.setItem("TP_STR_PAQUETE_SELECCION", JSON.stringify(objetoInicial));
	                    //window.location = "detallePaquete1.html";
	                    //Constantes.paqueteSeleccion = objetoInicial;
	                }
	            });
	        });
	        //installLocation
	        $("#installLocation").modal('show');
	        
	    });
	}

	eventoTipoPaquete(){
		
		$("#lknTriplePlay").on("click", function () {
			$('#familiaPaquete').html('Internet + TV y Apps + Telefonía');
		});

		$("#lknDoblePlay").on("click", function () {
			$('#familiaPaquete').html('Internet + Apps + Telefonía');
		});

		$("#lknMatch3P").on("click", function () {
			$('#familiaPaquete').html('Netflix + Internet + TV y Apps + Telefonía');
		});

		$("#lknMatch2P").on("click", function () {
			$('#familiaPaquete').html('Netflix + Internet + Apps + Telefonía');
		});
	}
}