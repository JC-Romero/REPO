export class Hbo{

	constructor(){
		this.init();
	}

	init(){
        this.cargarVideo();
        this.cargarCarrusel();
        this.cargarCanales();

		this.setListener();
	}

     cargarVideo(){
        $("#videoLanding").attr("src", "assets/media/landings/HBO.mp4");
        $(".main-div-Logo img").attr("src","assets/img/template/hbo/logo.png");
        $("#descripcionTemplate").html("<p>Merceses mas que solo televisión. Contrata HBO con nosotros y accede al mejor contenido Premium en 8 canales especializados, <span>HBO Go y HBO OD</span>.</p>");
       
        $("#tituloCanales").html("<p> Canales Premium en tu TV. Estrenos de acción, drama, comedia y lo mejor del cine internacional.</p>");
        $("#descripcionLandingsCanales").html("<p>La mejor selección de programas, series y películas multipremiadas.<br>Accede hasta en cinco dispositivos. </p><br>");
        
        $("#TvOnDemand_").addClass("main-div-tv");
        $("#container-BlackCards-Landings").css("background", "linear-gradient(0deg, #5D1116 0%, #16161B 100%)");
        
        $("#multiscreen").attr("src","assets/img/template/hbo/multiscreen.png");
        
        $("#idLanding").html("<p>Un catálogo Premium en tu TV  <span>#SoloConTotalplay</span><p>");
        $("#tvSubtitulo").html("<p>Encuentra los canales HBO a partir del 401, o encuentra HBO en la sección On Demand y comienza a disfrutar el mejor contenido Premium para toda la familia.</p>");
        
        $(".boton-chat").on("click",function(){
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $('#botonVideo').html('Paquetes con HBO');
        $('.boton-chat').html('Paquetes con HBO');
     }
     cargarCarrusel(){
        var htmlcarrusel="";
        for (var i =1; i <11; i++) {
            htmlcarrusel=htmlcarrusel+`<div class="slide">
                <div class="content-image">
                    <img src="assets/img/template/hbo/portada${i}.png" alt="">
                    <div class="mask-image"></div>
                </div>
            </div>`;
        }
        $("#carruselLanding").html(htmlcarrusel);

    }
	
    cargarCanales(){


		var arraycanales=[
		{imgcanal: "assets/img/template/hbo/Channel1.png", descripcionCanal:"HBO", canal: "The Outsider"},
		{imgcanal: "assets/img/template/hbo/Channel2.png", descripcionCanal:"HBO 2", canal: "Detective Pikachu"},
		{imgcanal: "assets/img/template/hbo/Channel3.png", descripcionCanal:"HBO Plus", canal: "Swamp Thing"},
		
		{imgcanal: "assets/img/template/hbo/Channel4.png", descripcionCanal:"HBO Signature", canal: "Chernobyl"},
		{imgcanal: "assets/img/template/hbo/Channel5.png", descripcionCanal:"HBO Family", canal: "Como entrenar  a tu Dragon 3"},
		{imgcanal: "assets/img/template/hbo/Channel6.png", descripcionCanal:"HBO MUNDI", canal: "Capernaum"},
		{imgcanal: "assets/img/template/hbo/Channel7.png", descripcionCanal:"HBO POP", canal: "Como novio de pueblo"},
		{imgcanal: "assets/img/template/hbo/Channel8.png", descripcionCanal:"HBO Plus", canal: "Stricke Back"}
        ]

		var plantilla=`<div>
            <img src=" alt="" id="img_logo_channels">
            <img src="" alt="" id="img_back_channels">
            <p></p>
        </div>`;
       
        var htmlcanales="";
        arraycanales.forEach(function(item){
			htmlcanales=htmlcanales+`<div>
	            <img src="${item.imgcanal}" alt="" id="img_back_channels">
	            <p>${item.canal}</p>
                <p style="font-family: Montserrat-Bold;">${item.descripcionCanal}</p>
	        </div>`;
        });

        $("#canalesLanding").html(htmlcanales);
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