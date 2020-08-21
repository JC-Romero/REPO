export class Faq {
	constructor(){
		this.init();
	}

	init(){
		console.log("Estoy en faqs js");
		$('#titleSection').html('Internet');
		$('#Internet').css('display','block');
		this.setListeners();
	}

	setListeners(){
		var apuntador = this;
		$('.faq-tipo').on('click',function(e){
			if(! $(this).hasClass('active-link')){
				$('.faq-tipo').removeClass('active-link');
				$(this).addClass('active-link');
			}
			var itemApp = $(this).text();
			$('#titleSection').html(itemApp);

			switch(itemApp){
				case 'Televisi\u00F3n':
					apuntador.ocultaTodasLasPreguntas();
					$('#Tv').css('display','block');
					break;
				case 'Tel\u00E9fono':
					apuntador.ocultaTodasLasPreguntas();
					$('#Telefono').css('display','block');
					break;
				case 'Atenci\u00F3n a Clientes':
					apuntador.ocultaTodasLasPreguntas();
					$('#Atencion').css('display','block');
					break;
				default:
					apuntador.ocultaTodasLasPreguntas();
					$('#Internet').css('display','block');
					break;
			}
		});

		$('.articulo-seccion-movil').on('click',function(e){
			if(! $(this).hasClass('active')){
				$('.articulo-seccion-movil').removeClass('active');
				$(this).addClass('active');
			}
			var itemApp = $(this).find('.articulo-texto-seccion-principal-movil').text().trim();
			/*$('#titleSection').html(itemApp);*/

			switch(itemApp){
				case 'TV':
					apuntador.ocultaTodasLasPreguntasMovil();
					$('#faqTvMovil').css('display','block');
					break;
				case 'Tel\u00E9fono':
					apuntador.ocultaTodasLasPreguntasMovil();
					$('#faqTelefonoMovil').css('display','block');
					break;
				case 'Atenci\u00F3n a clientes':
					apuntador.ocultaTodasLasPreguntasMovil();
					$('#faqAtencionMovil').css('display','block');
					break;
				default:
					apuntador.ocultaTodasLasPreguntasMovil();
					$('#faqInternetMovil').css('display','block');
					break;
			}
		});

		$('.articulo-pregunta-respuesta').on('click',function(e){
			if($(this).find('.content-accordion__item--content__icon').hasClass('flechitaActiva')){
				$(this).find('.content-accordion__item--content__icon').removeClass('flechitaActiva');
				$(this).find('.content-accordion__item--answer').removeClass('muestraRespuesta');
			}else{
				$('.content-accordion__item--content__icon').removeClass('flechitaActiva');
				$('.content-accordion__item--answer').removeClass('muestraRespuesta');
				$(this).find('.content-accordion__item--content__icon').addClass('flechitaActiva');
				$(this).find('.content-accordion__item--answer').addClass('muestraRespuesta');
			}
		})

		$('.articulo-pregunta-respuesta-movil').on('click',function(e){
			if($(this).find('.div-icon-flecha-movil').hasClass('flechitaActivaMovil')){
				$(this).find('.div-icon-flecha-movil').removeClass('flechitaActivaMovil');
				$(this).find('.div-respuesta-movil').css('display','none');
			}else{
				$('.div-icon-flecha-movil').removeClass('flechitaActivaMovil');
				$('.div-respuesta-movil').css('display','none');
				$(this).find('.div-icon-flecha-movil').addClass('flechitaActivaMovil');
				$(this).find('.div-respuesta-movil').css('display','block');
			}
		})
	}

	ocultaTodasLasPreguntas(){
		$('#Internet').css('display','none');
		$('#Tv').css('display','none');
		$('#Telefono').css('display','none');
		$('#Atencion').css('display','none');
	}

	ocultaTodasLasPreguntasMovil(){
		$('#faqInternetMovil').css('display','none');
		$('#faqTvMovil').css('display','none');
		$('#faqTelefonoMovil').css('display','none');
		$('#faqAtencionMovil').css('display','none');
	}

}