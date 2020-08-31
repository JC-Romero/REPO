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
		this.cargarPaquetes("Todos");
		this.eventoTipoPaquete();
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
		var tipopaquetes = "totalplay_paquetes.json";
		
		var url = Constantes.endpoints.obtenerPaquetes + tipopaquetes;
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
				apuntador.pintarPaquetes(respuesta["TripleNetFlix"], "paquetes_match3P", paqueteList);
				apuntador.pintarPaquetes(respuesta["DoblePlay"], "paquetes_dobleplay", paqueteList);
				apuntador.pintarPaquetes(respuesta["DoblePlayNetFlix"], "paquetes_match2P", paqueteList);//*/
			} else {
				var arreglo = apuntador.ordenarObjeto(respuesta["TriplePlay"]).slice(0, 3);
				apuntador.pintarPaquetes(arreglo, "cardsPackage", paqueteList, opt);
			}
		});
		console.groupEnd();
	}

	pintarPaquetes(arregloPaquetes, idContenedor, listaImagenesCms, opt) {
		let clase = this;
		var plantillaHTML = "";
		var arreglo = clase.ordenarObjeto(arregloPaquetes);
		var arregloRecomendacion = new Array();
		var contador = 1;
		$.each(arreglo, function (key, objPaquete) {
			if (contador <= 3) {
				contador++;
				arregloRecomendacion.push(objPaquete);
			}
			var regex = /\s(\d{1,3})\sMbps/;
			var result = regex.exec(objPaquete.detalleServicio);
			var color = objPaquete.color;

			if (listaImagenesCms.length > 0) {
				listaImagenesCms.forEach((element) => {
					if (element.id_paquete == objPaquete.id) {
						color = element.color;
						objPaquete.imagen = element.imagen.url;
					}
				});
			}
			if (opt == "home") {
				plantillaHTML += '<div class="card-package-item ' + color + '-item" id="' + objPaquete.id + '" style="margin-bottom:15px !important;">' + '<div class="card-package-item__banner szCrd">' + '<div class="gradient-image ' + color + '-package-gradient-img"></div>' + '<img src="' + objPaquete.imagen + '" alt="">' + "</div>" + '<div class="card-package-item__title ' + color + '-package szCrdTitle" >' + objPaquete.nombre + "</div>" + '<div class="card-package-item__speed ' + color + '-package-gradient szNumMb">' + '<span>' + result[1] + "</span>" + "</div>" + '<div class="card-package-item__megas ' + color + '-package szMoreMb">Megas↓</div>' + '<div class="card-package-item__include ' + color + '-package szPromoTxt">' + objPaquete.incluye + "</div>" + '<div class="card-package-item__promotion szBtnProm">INCLUYE 1 PROMOCIÓN</div>' + '<div class="card-package-item__price">' + '<span class="colorTxt1">' + 'Desde: <span class="colorTxt2">$ ' + clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") + " al mes</span></span>" + "</div>" + '<a class="card-package-item__button szBtnTrns">Descubrir</a>' + "</div>";
			} else {
				plantillaHTML += '<div class="card-package-item ' + color + '-item" id="' + objPaquete.id + '">' + '<div class="card-package-item__banner">' + '<div class="gradient-image ' + color + '-package-gradient-img"></div>' + '<img src="' + objPaquete.imagen + '" alt="">' + "</div>" + '<div class="card-package-item__title ' + color + '-package">' + objPaquete.nombre + "</div>" + '<div class="card-package-item__speed ' + color + '-package-gradient">' + '<span>' + result[1] + "</span>" + "</div>" + '<div class="card-package-item__megas ' + color + '-package">Megas↓</div>' + '<div class="card-package-item__include ' + color + '-package">' + objPaquete.incluye + "</div>" + '<div class="card-package-item__promotion">INCLUYE 1 PROMOCIÓN</div>' + '<div class="card-package-item__price">' + '<span>Desde: <span>$ ' + clase.formatoMonedad(objPaquete.precioLista, 0, ".", ",") + " al mes</span></span>" + "</div>" + '<a class="card-package-item__button">Descubrir</a>' + "</div>";
			}
		});

		$("#" + idContenedor).html(plantillaHTML);
		if (opt == "home") {
			this.props.packCards = [...document.getElementsByClassName("card-package-item")];
			this.props.packCards[1].classList.add("active");
			this.props.indicators = [...document.getElementById("detailPackageIndicatorsIndex").children];
			this.props.indicators[1].classList.add("active");
			clase.clickCards();
		}
		clase.setListener();
		localStorage.setItem("TP_PAQUETES_RECOMENDACION", JSON.stringify(arregloRecomendacion));
	}

	ordenarObjeto(objetoInicial) {
		var objetoOrdenado = objetoInicial.slice(0);
		objetoOrdenado.sort(function (a, b) {
			return b.precioLista - a.precioLista;
		});
		return objetoOrdenado;
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
		$(".card-package-item").on("click", function () {
			var idPaqueteSeleccionado = $(this).attr("id");
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
						Constantes.paqueteSeleccion = objetoInicial;
					}
				});
			});
			window.location = "detallePaquete.html";
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