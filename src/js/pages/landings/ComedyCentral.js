import{Eventos} from '../landings/Eventos'
export class ComedyCentral{

	constructor(){
		this.init();
	}

	init(){
        this.cargarVideo();
        this.cargarCarrusel();
        this.cargarCanales();

		//this.setListener();
	}

     cargarVideo(){
        //seccion video
        $("#videoLanding").attr("src", "assets/media/landings/ComedyCentral.mp4");
        $(".main-div-Logo img").attr("src","assets/img/template/comedycentral/logo.png");
        $("#descripcionTemplate").html("<p>Incluido al contratar el paquete de canales TV Avanzada ingresa desde el Menú Apps de tu TV.</p>");
        
        //seccion canales
        $("#TvOnDemand_").addClass("main-div-tv");
        $("#multiscreen").attr("src","assets/img/template/comedycentral/multiscreen.png");
        $("#container-BlackCards-Landings").css("background", "linear-gradient(0deg, #A9295B 0%, rgba(225,62,126,0) 100%)");
        $("#descripcionLandingsCanales").html("<p>¡Disfruta de todos tus programas favoritos de Comedy Central, además de contenido On Demand sin costo adicional!</p>");
        
        //seccion tv
        $("#idLanding").html("Comedy Central Play");
        $("#tvSubtitulo").html("<p>También puedes descargar la app y registrarte con tu usuario y contraseña de Mi Totalplay para que puedas disfrutar de todo el contenido de Comedy Central en cualquier momento.</p>");
        
        $(".boton-chat").on("click",function(){
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $('#botonVideo').html('Paquetes con Comedy');
        $('.boton-chat').html('Paquetes con Comedy');
     }
     cargarCarrusel(){
        var htmlcarrusel="";
        for (var i =1; i <11; i++) {
            htmlcarrusel=htmlcarrusel+`<div class="slide">
                <div class="content-image">
                    <img src="assets/img/template/comedycentral/portada${i}.png" alt="">
                    <div class="mask-image"></div>
                </div>
            </div>`;
        }
        $("#carruselLanding").html(htmlcarrusel);

    }
	
    cargarCanales(){
		var arraycanales=[
            {
                titulo:"Disfruta de todos tus programas favoritos",
                imgcanal: "assets/img/template/comedycentral/Tarjeta1.png",
                descripcionCanal:"De Comedy Central. Además, contenido On Demand ¡sin costo adicional!"
            },  {
                titulo:"Ingresa desde el menú Apps desde tu TV",
                imgcanal: "assets/img/template/comedycentral/Tarjeta2.png",
                descripcionCanal:"Disfruta de toda la diversión de Comedy Central. Revive episodios completos de tus programas favoritos."
            },  {
                titulo:"Descarga la App de Comedy Central",
                imgcanal: "assets/img/template/comedycentral/Tarjeta3.png",
                descripcionCanal:"Ingresa con tu cuenta Totalplay. Disfruta en cualquier momento y desde cualquier dispositivo."
            }
		]

	
        var htmlcanales="";
        arraycanales.forEach(function(item,index){
            var cual=index+1;
			htmlcanales=htmlcanales+`
            <div class="white_cards_Landings" id="cardNumer${cual}" style="opacity: 0;">
            <div>
                <p>${item.titulo}</p>
                <p><span>${item.descripcionCanal}</span></p>
                <img src="${item.imgcanal}" alt="">
            </div>
            
        </div>`;
        });

        $("#tarjetasCanales").html(htmlcanales);

        //const even= new Eventos();
	}

	setListener(){
		let apuntador=this;
		window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            var boton_ = document.getElementById("botonVideo");
            var miniLogo_ = document.getElementById("logo_");
            var logoNetflix__ = document.getElementById('logo__');
            var _container_icons_ = document.getElementById("container_icons_");
            //card1 = document.getElementById('cardNumer1'),
            //card2 = document.getElementById('cardNumer2'),
            //card3 = document.getElementById('cardNumer3'),
            //zoom_ = document.getElementById('TvOnDemand_');
            /*if( scroll == 0 && scroll < 19){
                boton_.style.opacity= 1;
                boton_.style.transition="all 0.7s";
                //miniLogo_.style.opacity= 1;
            }
            if( (scroll > 19 ) && (scroll<= 55 ) ){
                boton_.style.opacity= 0.7;
                boton_.style.transition="all 0.7s";
            }
            if(scroll > 56 ){
                boton_.style.opacity= 0;
                boton_.style.transition="all 0.7s";
            }*/
            //console.log(scroll);
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