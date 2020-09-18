import { indicatorMenuBarraCorta,indicadorMenuServicios } from '../generales/BarraDeProgreso'
import { indicatorMenu } from '../generales/BarraDeProgreso'
import * as Constantes from "../../utils/Constantes";
import {cargaapps} from '../generales/cargaApps';


var cms;
export class Servicios {
	constructor(){	
		this.props = {
			indexHover : '',
			itemsServicios : '',
			selectorMenuServicios : ''
		}
		cms=Constantes.cms;
		this.init();
	}

	init(){
		console.log("Estoy en servicios js");
		cargaapps(2);
		this.setListeners();
	}

	cmsGetBannerList(){
		return new Promise((done,reject)=>{
			let statusReq=false;
			let urlCMS=cms.host+cms.getBanner;
			fetch(urlCMS, {method: 'GET'}).then(data=>{
				if (data.ok) { statusReq=true; return data.json();
				} else { reject("error en la peticion"); throw "Error en la llamada Ajax"; }  
			}).then(function(respuesta) {
				if(!statusReq){ reject("error en la peticion"); return false; }
				if(respuesta!=undefined && respuesta.length > 0){
					let htmlBanner="";
					let numBanner=0;
					respuesta.forEach((element,index) => {
						let titulo=element.titulo;
						if(element.imagen != null){//si trae imagen, entonces
							numBanner++;
							let imagen = element.imagen.url;
							let logoStyle = "";
							
							if(element.logo != null){
								let logo = element.logo.url;
								logoStyle = "style=\"background: url('"+logo+"') no-repeat\" ";
							}

							htmlBanner+= 
							"<div class='slide'>"+
							"	<div class='content-image'>"+
							"		<img src='"+imagen+"' alt=''>"+
							"		 <div class='mask-image'></div>"+
							"	</div>"+
							"	<div class='slide-details'>"+
							"		<div class='slide-details-content'>"+
							"			<div class='slide-details__logo' "+logoStyle+"></div>"+
							"			<div class='slide-details__title'>"+titulo+"</div>"+
							"		</div>"+
							"	</div>"+
							"</div>"
							;
						}
					});
					if(numBanner > 0){
						$("#listaBanner").html(htmlBanner);
					}

				}else{reject("no se encontro ningun banner");}
			});
		});
	}

	setListeners(){
		//let banner = this.cmsGetBannerList();
		var apuntador = this;

		$('.selectapp').on('click',function(e){
			$('.selectapp').removeClass('active');
			$(this).addClass('active');

			var itemApp = $(this).text();
			switch(itemApp){
				case 'Control remoto':
					console.log('Control Remoto');
					apuntador.estilosRepetidos();
					$('#elementSmartCont').css('background-image','url("assets/img/movil/controlRemoto@3x.iphone.png")');
					$('#elementIpadCont2').css('background-image','url("assets/img/movil/controlRemoto02@3xIpad.png")');
					$('#elementIpad').css('right','28.4');					
					break;
				case 'Tel\u00E9fono':
					console.log('telefono');
					apuntador.estilosRepetidos();
					$('#elementSmartCont').css('background-image','url("assets/img/movil/phone@3x.png")');
					$('#elementIpad').css('right','8.7%');
					$('#elementIpadCont2').css('background-image','url("assets/img/movil/telefonoNew@3x.png")');
					break;
				case 'Red WiFi':
					console.log('red wifi');
					apuntador.estilosRepetidos2();				
					$('#elementSmartCont').css('background-image','url("assets/img/movil/group-2@3x.png")');
					$('#elementLapTopCont').css('background-image','url("assets/img/movil/mi-red-wi-fi@3x.png")');
					$('#elementIpadCont').css('background-image','url("assets/img/movil/group@3x.png")');
					$('#elementIpadCont2').css('background-image','url("assets/img/movil/telefonoNew@3x.png")');
					break;
				case 'Estado de Cuenta':
					console.log('edo cta');
					apuntador.estilosRepetidos2();
					$('#elementSmartCont').css('background-image','url("assets/img/movil/movil-edo-cuenta@3x.png")');
					$('#elementLapTopCont').css('background-image','url("assets/img/movil/edoCuenta@3x.png")');
					$('#elementIpadCont').css('background-image','url("assets/img/movil/estado-cta-tablet@3x.png")');
					$('#elementIpadCont2').css('background-image','url("assets/img/movil/telefonoNew@3x.png")');
					break;
				default:
					apuntador.estilosRepetidos2();
					$('#elementSmartCont').css('background-image','url("assets/img/movil/screen@3xiphone.jpg")');
					$('#elementLapTopCont').css('background-image','url("assets/img/movil/screen@3xlap.png")');
					$('#elementIpadCont').css('background-image','url("assets/img/movil/screen@3xipad.png")');
					console.log("ondemand");
			}
		})

		$('#menuSlider').on('mouseover',function(e){
			var indexHover;
			var bandera = true;
			switch($.trim(e.target.textContent)){
				case 'Tv y OnDemand':
					indexHover = 0;
					break;
				case 'Control remoto':
					indexHover = 1;
					break;
				case 'Tel\u00E9fono':
					indexHover = 2;
					break;
				case 'Red WiFi':
					indexHover = 3;
					break;
				case 'Estado de Cuenta':
					indexHover = 4;
					break;
				default :
					bandera = false;
					break;
			}

			var items = document.querySelectorAll('.selectapp');
			var selectorMenuSites = document.getElementById("selectorMenuSlider");
			if(bandera){
				indicatorMenuBarraCorta(indexHover, items, selectorMenuSites);
			}
		});

		$('#menuSlider').on('mouseleave',function(){
			var selectorMenuSites = document.getElementById("selectorMenuSlider");
	      	selectorMenuSites.style.cssText = `left:66px; transition: all 600ms ease;`;
		});

		$('#menuListServicios').on('mouseover',function(e){
			//var indexHover;
			var bandera = true;

			switch($.trim(e.target.textContent)){
				case 'Internet':
					apuntador.props.indexHover = 0;
					break;
				case 'TV':
					apuntador.props.indexHover = 1;
					break;
				case 'App m\u00F3vil':
					apuntador.props.indexHover = 2;
					break;
				case 'Tel\u00E9fon\u00EDa':
					apuntador.props.indexHover = 3;
					break;
				default :
					bandera = false;
					break;
			}

			apuntador.props.itemsServicios = document.querySelectorAll('.selectServicios');
			apuntador.props.selectorMenuServicios = document.getElementById("selectorMenuServicios");
			if(bandera){
				indicadorMenuServicios(apuntador.props.indexHover, apuntador.props.itemsServicios, apuntador.props.selectorMenuServicios);
			}
		});

		$('#menuListServicios').on('mouseleave',function(e){
			console.log('indexHover '+apuntador.props.indexHover)
			indicadorMenuServicios(0, apuntador.props.itemsServicios, apuntador.props.selectorMenuServicios);
		});

		/*$(document).on('scroll', function() {
			var clase = document.getElementsByClassName('selectServicios');
			if($(this).scrollTop()>=$('#internet').position().top){
				clase[0].style.fontFamily = 'Montserrat-Bold';
		        clase[1].style.fontFamily = 'Montserrat-Regular';
		        clase[2].style.fontFamily = 'Montserrat-Regular';
		        clase[3].style.fontFamily = 'Montserrat-Regular';
			}

		    if($(this).scrollTop()>=$('#tv').position().top){
		        clase[0].style.fontFamily = 'Montserrat-Regular';
		        clase[1].style.fontFamily = 'Montserrat-Bold';
		        clase[2].style.fontFamily = 'Montserrat-Regular';
		        clase[3].style.fontFamily = 'Montserrat-Regular';
		    }
		    if($(this).scrollTop()>=$('#movil').position().top){
		    	clase[0].style.fontFamily = 'Montserrat-Regular';
		    	clase[1].style.fontFamily = 'Montserrat-Regular';
		    	clase[2].style.fontFamily = 'Montserrat-Bold';
		    	clase[3].style.fontFamily = 'Montserrat-Regular';
		    }
		    if($(this).scrollTop()>=$('#phone').position().top){
		    	clase[0].style.fontFamily = 'Montserrat-Regular';
		    	clase[1].style.fontFamily = 'Montserrat-Regular';
		    	clase[2].style.fontFamily = 'Montserrat-Regular';
		    	clase[3].style.fontFamily = 'Montserrat-Bold';
		    }
		})*/
	}


	estilosRepetidos(){
		$('#elementSmartPhone').css("width","14.7%");
		$('#elementSmartPhone').css("left","34%");
		$('#elementSmartPhone').css("top","26%");
		$('#elementSmartPhone').css("z-index","4");
		$('#elementLapTop').css('opacity','0');
		$('#elementIpad').css('width','56.6%');
		$('#elementIpad').css('top','0px');
		$('#elementIpad').css('display','none');
		$('#elementIpadCont').removeAttr('style');
		$('#elementIpad2').css('display','block');
	}

	estilosRepetidos2(){
		$('#elementSmartPhone').removeAttr("style");
		$('#elementLapTop').css('opacity','1');
		$('#elementIpad').removeAttr("style");
		$('#elementIpad2').css('display','none');
	}
}