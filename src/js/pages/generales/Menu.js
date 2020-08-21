import { indicatorMenu } from '../generales/BarraDeProgreso'

export class Menu {
	constructor(){
		this.init();
	}

	init(){
		$('#selectorMenuListSections').css('opacity','0');
		this.setListeners();
	}

	setListeners(){
		var apuntador = this;

		/*Inicia menu negocios*/
		$('#menuListSections').on('mouseover',function(e){
			var indexHover;
			var bandera = true;
			switch($.trim(e.target.textContent)){
				case 'HOGAR':
					indexHover = 0;
					break;
				case 'NEGOCIO':
					indexHover = 1;
					break;
				case 'EMPRESA':
					indexHover = 2;
					break;
				case 'TOTALPAY':
					indexHover = 3;
					break;
				default :
					bandera = false;
					break;
			}
			
			var items = document.querySelectorAll('.items-menu-negocios');
			var selectorMenuSites = document.getElementById("selectorMenuListSections");
			if(bandera){
				indicatorMenu(indexHover, items, selectorMenuSites);
			}
			
		});

		$('#menuListSections').on('mouseleave', function(e){
			var selectorMenuSites = document.getElementById("selectorMenuListSections");
			selectorMenuSites.style.cssText = `left:0; transition: all 500ms ease;`;
	    });

	    /*Inicia menu negocios movil*/
		$('#menuListSectionsMovil').on('mouseover',function(e){
			var indexHover;
			var bandera = true;
			switch($.trim(e.target.textContent)){
				case 'HOGAR':
					indexHover = 0;
					break;
				case 'NEGOCIO':
					indexHover = 1;
					break;
				case 'EMPRESA':
					indexHover = 2;
					break;
				case 'TOTALPAY':
					indexHover = 3;
					break;
				default :
					bandera = false;
					break;
			}
			
			var items = document.querySelectorAll('.items-menu-negocios');
			var selectorMenuSites = document.getElementById("selectorMenuListSectionsMovil");
			if(bandera){
				indicatorMenu(indexHover, items, selectorMenuSites);
			}
			
		});

		$('#menuListSectionsMovil').on('mouseleave', function(e){
	      var selectorMenuSites = document.getElementById("selectorMenuListSectionsMovil");
	      selectorMenuSites.style.cssText = `left:0; transition: all 500ms ease;`;
	    });

	    /*Inicia menu principal - izquierda*/
	    $('#mainMenu').on('mouseover',function(e){
	    	var indexHover;
			var bandera = true;
			switch($.trim(e.target.textContent)){
				case 'Servicios':
					indexHover = 0;
					break;
				case 'Paquetes':
					indexHover = 1;
					break;
				case 'Soporte':
					indexHover = 2;
					break;
				case 'TOTALPAY':
					indexHover = 3;
					break;
				default :
					bandera = false;
					break;
			}

			var items = document.querySelectorAll('.items-main-menu');
			var selectorMenuSites = document.getElementById("selectorMainMenu");
			if(bandera){
				indicatorMenu(indexHover, items, selectorMenuSites);
			}

	    });

	    $('#mainMenu').on('mouseleave', function(e){
	      var selectorMenuSites = document.getElementById("selectorMainMenu");
	      selectorMenuSites.style.cssText = `left:0; transition: all 500ms ease;`;
	    });

	    /*Inicia menu principal - derecha*/
	    $('#containerMenuAccount').on('mouseover',function(e){
	    	var indexHover;
	    	var bandera = true;

	    	switch($.trim(e.target.textContent)){
	    		case 'Ver la Tv':
	    			indexHover = 0;
	    			break;
	    		case 'Mi cuenta':
	    			indexHover = 1;
	    			break;
	    		case 'Carrito':
	    			indexHover = 2;
	    			break;
	    		case 'TOTALPAY':
					indexHover = 3;
					break;
	    		default :
	    			bandera = false;
	    			break;
	    	}

	    	var items = document.querySelectorAll('.items-main-menu-right');
	    	var selectorMenuSites = document.getElementById("selectorMenuAccoundRight");
	    	if(bandera){
	    		indicatorMenu(indexHover,items,selectorMenuSites);
	    	}
	    });

	    $('#containerMenuAccount').on('mouseleave', function(e){
	      var selectorMenuSites = document.getElementById("selectorMenuAccoundRight");
	      selectorMenuSites.style.cssText = `left:0; transition: all 500ms ease;`;
	    });

	    /*Muestra segundo menu - version movil*/
	    $('#menuMobileIcon').on('click',function(){
	    	if(! $('#menuMovil').hasClass('muestraMenuMovil')){
	    		$('#menuMovil').addClass('muestraMenuMovil');
	    		$('#menuMovil').addClass('fade-in');
	    		$('#menuMovilContainer').addClass('muestraListaMenuMovil');
	    	}
	    })

	    /*Oculta segundo menu - version movil*/
	    $('#hideMenuMovil').on('click',function(){
	    	$('#menuMovil').removeClass('muestraMenuMovil');
    		$('#menuMovil').removeClass('fade-in');
    		$('#menuMovilContainer').removeClass('muestraListaMenuMovil');
	    })

	    /*Muestra lista negocios movil*/
	    $('#menuMobileIcon2').on('click',function(){
	    	$("#modalMenu2").css("display", "block");
	    	$("#menuListSectionsMovil").css("top","0");
	    })

	    /*Cierra lista negocios movil*/
	    $('#closeModal2').on('click',function(){
	    	$("#modalMenu2").css("display", "none");
	    	$("#menuListSectionsMovil").removeAttr('style');
	    })

	    $('#closeModal2').on('click',function(){
	    	$("#modalMenu2").css("display", "none");
	    })

	    this.getMobileOperatingSystem();

	    //Este ya que en otro JS borra el style y los paquetes en safari se vuelven a ver cortados
	    $('#menuPackages').on('click',function(){
	    	apuntador.getMobileOperatingSystem();
	    });
	}

	getMobileOperatingSystem() {
		var apuntador = this;

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone debe ir primero porque su UA tambien contiene "Android"
        if (/windows phone/i.test(userAgent)) {
        	console.log("Windows Phone");
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        	console.log("iOS");
        	apuntador.setAllForSafari();
        }

        if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
        	console.log("Desktop Macintosh");
        	apuntador.setAllForSafari();
        }
    }

    setAllForSafari(){
    	console.log(window.screen.width);
		var divItemsPaquetes = document.getElementsByClassName('content-align-items');
		var divVelocidadPaquetes = document.getElementsByClassName('card-package-item__speed');
		var divMegasPaquetes = document.getElementsByClassName('card-package-item__megas');
		var divContenedor3P = document.getElementById('section-paquetes-tripleplay');
		var divContenedor2P = document.getElementById('section-paquetes-dobleplay');
		var divContenedor3PM = document.getElementById('section-paquetes-tripleplaymatch');
		var divContenedor2PM = document.getElementById('section-paquetes-dobleplaymatch');

    	if(window.matchMedia("(min-width: 320)").matches){
			for (var i = 0; i < divItemsPaquetes.length; i++ ) {
			    divItemsPaquetes[i].style.display="inline-grid";
			}
    		console.log("media 320px");
    	}if(window.matchMedia("(min-width: 320)").matches){
    		for (var i = 0; i < divVelocidadPaquetes.length; i++ ) {
			    divVelocidadPaquetes[i].style.display="inline-grid";
			}
    		
    		for (var i = 0; i < divMegasPaquetes.length; i++ ) {
			    divMegasPaquetes[i].style.display="inline-grid";
			}
    		console.log("media 375px");
    	}else if(window.matchMedia("(min-width: 1024px)").matches){
    		//paquetes 3P
    		divContenedor3P.style.display="inline-grid";
    		//paquetes 3P match
    		divContenedor3PM.style.display="inline-grid";
			//paquetes 2P
			divContenedor2P.style.display="inline-grid";
			//paquetes 2P match
			divContenedor2PM.style.display="inline-grid";
		    console.log("media 1024px");
		}else if(window.matchMedia("1366").matches){
			//paquetes 3P
    		divContenedor3P.style.display="-webkit-box";
    		//paquetes 3P match
    		divContenedor3PM.style.display="-webkit-box";
			//paquetes 2P
			divContenedor2P.style.display="-webkit-box";
			//paquetes 2P match
			divContenedor2PM.style.display="-webkit-box";
			console.log("media 1366px");
		}else if(window.matchMedia("1700").matches){
			divContenedor3P.style.display="-webkit-box";
    		//paquetes 3P match
    		divContenedor3PM.style.display="-webkit-box";
			//paquetes 2P
			divContenedor2P.style.display="-webkit-box";
			//paquetes 2P match
			divContenedor2PM.style.display="-webkit-box";
			console.log("media 1700px");
		}
    }
}