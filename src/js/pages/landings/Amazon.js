import{Eventos} from '../landings/Eventos'
export class Amazon{
	constructor(){
		this.init();
	}

	init(){
		console.log("Estoy en landing Amazon js");
		this.cargarVideo();
		this.cargarCarrusel();
		this.cargarCanales();
		this.setListener();
	}

	cargarVideo(){
        $("#videoLanding").attr("src", "assets/media/landings/PrimeVideo.mp4");
        $(".main-div-Logo img").attr("src","assets/img/template/amazon/logo.png");
        $("#descripcionTemplate").html("<p>Lo hicimos posible. Somos los únicos en México en llevar hasta tu pantalla el multipremiado contenido de Amazon Prime Video, con la velocidad y calidad que nos caracteriza.</p>");
        $("#TvOnDemand_").addClass("main-div-tv");
        $("#multisreen").attr("src","assets/img/template/amazon/multiscreen.png");
        var multi = document.getElementById("multiscreen");
        multi.src = "assets/img/template/amazon/multiscreen.png";
        $('#descripcionLandingsCanales').html("<p>Si ya tienes cuenta de Amazon Prime, sincroniza tu TV y comienza a disfrutar Prime Video. Si aún no tienes cuenta, solo sigue estos sencillos pasos y comienza tu prueba de 30 días SIN COSTO.</p>")
        $(".boton-chat").html('Suscríbete ahora');
        $(".boton-chat").on("click",function(){
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });
        $('.div-container-text-title').html("<p>Los mejores estrenos con Prime Video <span>#SoloConTotalplay</span></p>");
        $('.div-container-text-subTitle').html("<p>Encuentra la App de Prime Video en la sección de Apps de tu TV Totalplay o ingresa desde el canal 126 ¡y que el entretenimiento no pare!</p>");
        $('#botonVideo').html('Paquetes con Prime');
    }

    cargarCarrusel(){
        var htmlcarrusel="";
        for (var i =1; i <11; i++) {
            htmlcarrusel=htmlcarrusel+`<div class="slide">
                <div class="content-image">
                    <img src="assets/img/template/amazon/portada${i}.png" alt="">
                    <div class="mask-image"></div>
                </div>
            </div>`;
        }
        $("#carruselLanding").html(htmlcarrusel);

    }

    cargarCanales(){
		var arraycanales=[
            {
                titulo:"Máxima definición",
                imgcanal: "assets/img/template/amazon/Tarjeta1.png",
                descripcionCanal:"Accede a cientos de series y programas en definición 4K (Ultra HD) ¡sin costo adicional!"
            },  {
                titulo:"Envíos incluidos",
                imgcanal: "assets/img/template/amazon/Tarjeta2.png",
                descripcionCanal:"Compra miles de productos en Amazon México y recibe envíos sin consto con tu misma membresía Amazon Prime."
            },  {
                titulo:"Que la música no pare",
                imgcanal: "assets/img/template/amazon/Tarjeta3.png",
                descripcionCanal:"Tu suscripción también incluye miles de canciones que también podrás llevar contigo en tus dispositivos móviles. ¡Que comience la fiesta!."
            }
		]

	
        var htmlcanales="";
        arraycanales.forEach(function(item,index){
            var cual=index+1;
            var mb = "50px";
            
            if(index == 2){
                mb = "70px";
            }
			/*htmlcanales=htmlcanales+`
                <div class="white_cards_Landings" id="cardNumer${cual}" style="opacity: 0; background-color: rgba(34,36,48,0.4); border: unset;">
                <div><p style="color: white;">${item.titulo}</p></div>
                <div class="div-container-text-subTitle-card" style="margin-bottom:${mb};">
                    <p><span style="color: white;">${item.descripcionCanal}</span></p>
                </div>
                <div>
                    <img src="${item.imgcanal}" alt="">
                </div>
                
            </div>`;*/
            htmlcanales=htmlcanales+`
            <div class="white_cards_Landings" id="cardNumer${cual}" style="opacity: 0; background-color: rgba(34,36,48,0.4); border: unset;">
            <div>
                    <p style="color: white;">${item.titulo}</p>
                    <p><span style="color: white;">${item.descripcionCanal}</span></p>
                    <img src="${item.imgcanal}" alt="">
            </div>
            
        </div>`;
        });

        $("#tarjetasCanales").html(htmlcanales);

        const even= new Eventos();
	}

	setListener(){
		let apuntador=this;
		window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            var boton_ = document.getElementById("botonVideo");
            var miniLogo_ = document.getElementById("logo_");
            var logoNetflix__ = document.getElementById('logo__');
            var _container_icons_ = document.getElementById("container_icons_");

            if(scroll > 240){
                miniLogo_.style.opacity= 0;
                _container_icons_.style.opacity = 0;
                logoNetflix__.style.opacity = 1;
            }
            if(scroll< 239){
                miniLogo_.style.opacity= 1;
                _container_icons_.style.opacity = 1;
                logoNetflix__.style.opacity = 0;
            }
        });

        $("#DisableMuted").on("click",function(){
         	apuntador.disableMute();
        });

        $("#EnableMuted").on("click",function(){
        	apuntador.enableMute();

        });

        $("#maxVideo").on("click",function(){
        	apuntador.maxVideo();

        });

        
        var accordion = $('body').find('[data-behavior="accordion"]');
    	var expandedClass = 'is-expanded';
	    $.each(accordion, function () { // loop through all accordions on the page
	        var accordionItems = $(this).find('[data-binding="expand-accordion-item"]');
	        $.each(accordionItems, function () { // loop through all accordion items of each accordion
	            var $this = $(this);
	            var triggerBtn = $this.find('[data-binding="expand-accordion-trigger"]');
	            var setHeight = function (nV) {
	                // set height of inner content for smooth animation
	                var innerContent = nV.find('.accordion__content-inner')[0],
	                    maxHeight = $(innerContent).outerHeight(),
	                    content = nV.find('.accordion__content')[0]; 
	                if (!content.style.height || content.style.height === '0px') {
	                    $(content).css('height', maxHeight);
	                } else {
	                    $(content).css('height', '0px');
	                }
	            };
	            var toggleClasses = function (event) {
	                var clickedItem = event.currentTarget;
	                var currentItem = $(clickedItem).parent();
	                var clickedContent = $(currentItem).find('.accordion__content');
	                $(currentItem).toggleClass(expandedClass);
	                setHeight(currentItem);
	                if ($(currentItem).hasClass('is-expanded')) {
	                    $(clickedItem).attr('aria-selected', 'true');
	                    $(clickedItem).css('border-bottom-right-radius', '0px');
	                    $(clickedItem).css('border-bottom-left-radius', '0px');
	                    $(clickedItem).css('transition', 'all 0s ease-in-out');
	                    $(clickedItem).attr('aria-expanded', 'true');
	                    $(clickedContent).attr('aria-hidden', 'false');

	                } else {
	                    $(clickedItem).css('border-bottom-right-radius', '4px');
	                    $(clickedItem).css('border-bottom-left-radius', '4px');
	                    $(clickedItem).css('transition', 'all .5s ease-in-out');
	                    $(clickedItem).attr('aria-selected', 'false');
	                    $(clickedItem).attr('aria-expanded', 'false');
	                    $(clickedContent).attr('aria-hidden', 'true');
	                }
	            }
	            triggerBtn.on('click', event, function (e) {
	                e.preventDefault();
	                toggleClasses(event);
	            });
	            // open tabs if the spacebar or enter button is clicked whilst they are in focus
	            $(triggerBtn).on('keydown', event, function (e) {
	                if (e.keyCode === 13 || e.keyCode === 32) {
	                    e.preventDefault();
	                    toggleClasses(event);
	                    }
	            });
	        });
	    });

	}
	enableMute() { 
	 	var vid_ = document.getElementById("VideoOnDemand");
        vid_.muted = true;
        document.getElementById('DisableMuted').style.display = "unset";
        document.getElementById('EnableMuted').style.display = "none";
    }

    disableMute() { 
    	var vid_ = document.getElementById("VideoOnDemand");
        vid_.muted = false;
        document.getElementById('EnableMuted').style.display = "unset";
        document.getElementById('DisableMuted').style.display = "none";
    }

    maxVideo(){
    	var vid_ = document.getElementById("VideoOnDemand");
        vid_.requestFullscreen();
    }
}