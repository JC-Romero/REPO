import{Eventos} from '../landings/Eventos'
export class Netflix{

	constructor(){
		this.init();
	}

	init(){
        this.cargarVideo();
        this.cargarCanales();
        this.cargarCarrusel();
		//this.setListener();
	}

    cargarVideo(){
        $("#videoLanding").attr("src", "assets/media/landings/Netflix.mp4");
        $(".main-div-Logo img").attr("src","assets/img/template/netflix/logo.png");
        $("#descripcionTemplate").html("<p>La mejor experiencia para disfrutar tus series, películas y programas de Netflix la vives con Totalplay. Disfruta sin interrupciones con la mejor velocidad.</p>");
        
        $("#descripcionLandingsCanales").html("<p>Si ya tienes cuenta de Netflix, solo ingresa desde tu TV Totalplay. Si aún no la tienes, contrata en tu TV y recibirás el cargo a partir de tu próximo estado de cuenta.</p>");
        $("#TvOnDemand_").addClass("main-div-tv");
        
        $("#container-BlackCards-Landings").css("background", "linear-gradient(0deg, #602B26 0%, #16161B 100%)");
        $("#multiscreen").attr("src","assets/img/template/netflix/multiscreen.png");

        $("#idLanding").html("Netflix");
        $("#tvSubtitulo").html("<p>Ingresa ya desde el menú de Apps de tu TV Totalplay, o desde los canales 22 y 333 y comienza a maratonear con el increíble contenido de Netflix.</p>");
        
        $(".boton-chat").on("click",function(){
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $('#botonVideo').html('Paquetes con Netflix');
        $('.boton-chat').html('Paquetes con Netflix');
        $('.div-container-text-title').html("<p>Los mejores estrenos con Netflix <span>#SoloConTotalplay</span></p>");
    }


    cargarCanales(){
        var arraycanales=[
            {
                titulo:"Calidad 4 veces superiror.",
                imgcanal: "assets/img/template/netflix/Tarjeta1.png",
                descripcionCanal:"Mereces disfrutar tus series favoritas de Netflix con la calidad y nitidez Ultra HD. Con Totalplay es posible."
            },  {
                titulo:"¡3 años en primer lugar!",
                imgcanal: "assets/img/template/netflix/Tarjeta2.png",
                descripcionCanal:"Tenemos el internet más rápido en México para ver Netflix. Olvídate de las pausas innecesarias."
            },  {
                titulo:"Sin tarjetas ni complicaciones.",
                imgcanal: "assets/img/template/netflix/Tarjeta3.png",
                descripcionCanal:"Agrega tu membresía de Netflix a tu estado de cuenta de Totalplay y disfruta desde cualquier dispositivo."
            }
        ]

    
        var htmlcanales="";
        arraycanales.forEach(function(item,index){
            var cual=index+1;
            htmlcanales=htmlcanales+`
           <div class="white_cards_Landings" id="cardNumer${cual}" style=" background-color: rgba(34,36,48,0.4); border: unset;">
            <div>
                <p style="color: white;">${item.titulo}</p>
                <p><span style="color: white;">${item.descripcionCanal}</span></p>
                <img src="${item.imgcanal}" alt="">
            </div>
            
        </div>`;
        });

        $("#tarjetasCanales").html(htmlcanales);

        //const even= new Eventos();
    }
     cargarCarrusel(){
        var htmlcarrusel="";
        for (var i =1; i <11; i++) {
            htmlcarrusel=htmlcarrusel+`<div class="slide">
                <div class="content-image">
                    <img src="assets/img/template/netflix/portada${i}.png" alt="">
                    <div class="mask-image"></div>
                </div>
            </div>`;
        }
        $("#carruselLanding").html(htmlcarrusel);

    }
	
	setListener(){
		let apuntador=this;
		window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            var boton_ = document.getElementById("botonVideo"),
            //miniLogo_ = document.getElementById("logoNetflix_"),
            logoNetflix__ = document.getElementById('logo__'),
            _container_icons_ = document.getElementById("container_icons_"),
            card1 = document.getElementById('cardNumer1'),
            card2 = document.getElementById('cardNumer2'),
            card3 = document.getElementById('cardNumer3'),
            zoom_ = document.getElementById('TvOnDemand_');
            if(scroll > 227){
                //miniLogo_.style.opacity= 0;
                _container_icons_.style.opacity = 0;
                logoNetflix__.style.opacity = 1;
            }
            if(scroll< 226){
                //miniLogo_.style.opacity= 1;
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