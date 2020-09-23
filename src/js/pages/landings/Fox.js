export class Fox{

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
        $("#videoLanding").attr("src", "assets/media/landings/Fox.mp4");
        $(".main-div-Logo img").attr("src","assets/img/template/fox/logo.png");
        
        $("#descripcionTemplate").html("<p>En FOX Premium encontrarás programas, películas, deportes en vivo y series originales, todo sin interrupciones,<br>¡No esperes más y comienza a disfrutar de <span>FOX Premium!</span></p>");
        $("#tituloCanales").html("<p>Disfruta de los 10 Canales Premium de FOX, además obtén acceso a la app FOX sin costo adicional a tu plan contratado.</p>");
        $("#descripcionLandingsCanales").html("<p>En FOX Premium puedes disfrutar del mejor contenido: el cine más taquillero, temporadas enteras de tus series favoritas, eventos deportivos exclusivos y una gran variedad de programas para todos los gustos.</p><br>");
        
        $("#TvOnDemand_").addClass("main-div-tv");
        $("#container-BlackCards-Landings").css("background", "linear-gradient(0deg, #692E0B 0%, #16161B 100%");
        $("#multiscreen").attr("src","assets/img/template/fox/multiscreen.png");
        
        $("#idLanding").html("La mejor experiencia en FOX <span>#SoloConTotalplay</span>");
        $("#tvSubtitulo").html("<p>Comienza a disfrutar el contenido desde tu TV a partir del canal 415 o en el menú de APPS y no te pierdas de todo lo que FOX Premium tiene para ti.</p>");
        
        $(".boton-chat").on("click",function(){
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $('#botonVideo').html('Paquetes con Fox');
        $('.boton-chat').html('Paquetes con Fox');
     }
     cargarCarrusel(){
        var htmlcarrusel="";
        for (var i =1; i <11; i++) {
            htmlcarrusel=htmlcarrusel+`<div class="slide">
                <div class="content-image">
                    <img src="assets/img/template/fox/portada${i}.png" alt="">
                    <div class="mask-image"></div>
                </div>
            </div>`;
        }
        $("#carruselLanding").html(htmlcarrusel);

    }
	
    cargarCanales(){

		var arraycanales=[
		{imgcanal: "assets/img/template/fox/Channel1.png", descripcionCanal:"FOX Premium Series Oeste",canal:"Outlander en"},
		{imgcanal: "assets/img/template/fox/Channel2.png", descripcionCanal:"FOX Premium Cinema",canal:"Viviendo con el enemigo en"},
		{imgcanal: "assets/img/template/fox/Channel3.png", descripcionCanal:"FOX Premium Action Oeste",canal: "UFC 247 en"},
        {imgcanal: "assets/img/template/fox/Channel4.png", descripcionCanal:"FOX Premium Family Oeste",canal: "Turbo en"},
		{imgcanal: "assets/img/template/fox/Channel5.png", descripcionCanal:"FOX Premium Classics",canal:"El club de la pelea en"},
		{imgcanal: "assets/img/template/fox/Channel6.png", descripcionCanal:"FOX Premium Series HD",canal:"Outlander en "},
		{imgcanal: "assets/img/template/fox/Channel7.png", descripcionCanal:"FOX Premium Action HD",canal:"UFC 247 en"},
		{imgcanal: "assets/img/template/fox/Channel8.png", descripcionCanal:"FOX Premium Movies HD",canal:"Cementerio Maldito en"},
		{imgcanal: "assets/img/template/fox/Channel9.png", descripcionCanal:"FOX Premium Family HD",canal:"Turbo en"},
        {imgcanal: "assets/img/template/fox/Channel10.png", descripcionCanal:"FOX Premium Comedy HD",canal:"Especial Simplemente amor en"}
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