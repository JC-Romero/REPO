import * as Constantes from "../../utils/Constantes";
var cms;

//cambiar a paso por referencia todo
export class PromocionesCarrusel {
    constructor(_left, _right) {
        cms=Constantes.cms;
        this.props = {
            window: window.innerWidth,
            list: document.querySelector('.promotions-list-cards'),
            left: document.querySelector(_left),
            right: document.querySelector(_right),
            data: [],
            cont: 0
        }
        this.init();
    }
    init() {
        console.log('INICIANDO PROMOCIONES CARRUSEL.JS');
        let referenciaClase = this;

        //primer intento de bajar las promociones del cms 
        referenciaClase.cmsGetImagenPromocioneList().then((res)=>{
            referenciaClase.pintarPromociones(res);
        }, err=>{
            // si no se obtienen, entonces solicitarla al json por default
            referenciaClase.getJsonDefault().then((jsonPromocion)=>{
                referenciaClase.pintarPromociones(jsonPromocion);
            },err=>{
                console.log(err);
                alert('Error al obtener Promociones por default');
            });
        })

        $("body").on('click', '.list-cards__item--more-info', function () {
            var titulo = $(this).attr('data-title');
            var descripcion = $(this).attr('data-description');
            $('.modal-detail-promotion__content__title').html(titulo);
            $('.modal-detail-promotion__content__text').html(descripcion);
            //referenciaClase.openModal( true )
        });

            
    }
    pintarPromociones(listaPromociones){
        var items = '', dots = '';
        let referenciaClase=this;
        this.props.data =listaPromociones;

        var altura = "494px;";
            if(window.matchMedia("(min-width: 1024px) and (max-width:1700px)").matches){
                altura = "494px;";
            }


        this.props.data.forEach((item) => {
            var titulo = "";
            var body = "";
            if(item.title){
                titulo = item.title.toLocaleLowerCase();
                titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1);
                //console.log("titulo "+titulo);
            }
            if(item.body){
                body = item.body.toLocaleLowerCase();
                body = body.charAt(0).toUpperCase() + body.slice(1);
                //console.log("body "+body);
            }
            items += ` 
            <li class="promotions-list-cards__item" style="height:${altura}">
                <div class="list-cards__item--image" style="background: url('${item.img}') no-repeat; background-size: 100% 100%; background-position: center; "></div>
                    <div class="list-cards__item--content">
                        <div class="list-cards__item--title">${titulo}</div>
                        <div class="list-cards__item--description">${body}</div>
                        <div class="list-cards__item--more-info" data-title="${item.title}" data-description="${item.descripcion}">Más información</div>
                    </div>
            </li>`;
            dots += `<li></li>`
        });

        this.props.list.innerHTML = items;
        this.props.listItems = [...document.querySelectorAll('.promotions-list-cards__item')];
        this.props.listPoints = document.querySelector('.circle_indicators');
        this.props.listPoints.innerHTML = dots;
        this.props.points = [...document.querySelectorAll('.circle_indicators li')];
        this.props.points[0].classList.add('active');
        this.onkeypress();
        this.resize();
        this.getPositions();
    }

    getJsonDefault(){
        let referenciaClase=this;
        return new Promise((done,reject)=>{
            $.ajax({
                url: "/assets/media/promocionesGlobales.json",
                dataType: "text"
            }).done(function(strPromocionesGlobales) {
                
                try{
                    
                    referenciaClase.props.data = JSON.parse(strPromocionesGlobales);
                    done(referenciaClase.props.data);
                    
                }catch(e){
                    console.log('OCURRIO ALGO INESPERADO AL TRANSFORMAR LA INFORMACION DE LAS PROMOCIONES GLOBALES, ERROR['+e+']');
                    reject();
                }
            }).fail(function(jqXHR, textStatus) {
                console.log('OCURRIO UN ERROR EN EL ARCHIVO DE PROMOCIONES GLOBALES', jqXHR);
                reject();
            });
        });
    }

    cmsGetImagenPromocioneList(){
        let apuntador = this;
        return new Promise((done,reject)=>{
            let statusReq=false;
            let urlCMS='/assets/media/promociones.json';
            
			fetch(urlCMS, {method: 'GET'}).then(data=>{
				if (data.ok) { statusReq=true; return data.json();
				} else { reject(); }  
			}).then(function(respuesta) {
                if(!statusReq){ reject(); return false; }
                var paquetePromocion=[];
                
				if(respuesta!=undefined && respuesta.length > 0){
                    paquetePromocion.length=0;
					respuesta.forEach((element,index) => {
                        if(element.img != null){//si trae imagen paquete, entonces
                            element.img=element.img.url;
                            paquetePromocion.push(element);
						}
					});
					done(paquetePromocion);
				}else{reject();}
			}).catch(function(error) {
                console.error("Error en la peticion - no se mostraran Promociones desde CMS");
                reject();
            });
        });//fin de la promesa
    }

    resize() {
        window.addEventListener('resize', () => {
            let widthScreen = window.innerWidth;
            this.props.cont = 0;
            this.getPositions();
            this.props.points.map(item => {
                item.classList.remove('active')
            });
            this.props.points[0].classList.add('active');
            if (widthScreen <= 500) {
                let mov = (this.props.container.offsetWidth - this.props.widthCard) / 2;
                this.props.list.style.cssText = `left: ${mov}px; transition: all .3s ease-out;`;
            } else {
                this.props.list.removeAttribute('style');
            }
            this.resizeIndicators(0);
            this.props.left.style.display = 'none';
            this.props.right.style.display = 'flex';

            var altura  = "100%";

            if(window.matchMedia("(min-width: 1024px) and (max-width: 1699px)").matches){
                altura = "494px";
            }else if(window.matchMedia("(min-width:1700px)").matches){
                altura = "530px";
            }

            $(".promotions-list-cards__item").each(function(){
                // Test if the div element is empty
                $(this).css("height", altura);
            });
        })
    }
    getPositions() {
        this.props.container = document.querySelector('.promotions-list-cards__content');
        this.props.mr = parseInt(window.getComputedStyle(this.props.listItems[0], null).getPropertyValue('margin-right'));
        this.props.x = this.props.list.getBoundingClientRect().left;
        this.props.widthCard = this.props.listItems[0].offsetWidth + this.props.mr;
        let totalTemp = this.props.container.offsetWidth - this.props.x;
        this.props.cardsincontainer = Math.trunc(totalTemp / this.props.widthCard);
        this.props.tempX = this.props.container.offsetWidth / this.props.widthCard;
        this.props.cardsinitshow = this.props.cardsincontainer;
        // indicadores
        let w = (this.props.widthCard * this.props.cardsinitshow) + this.props.x;
        w = this.props.container.offsetWidth - w;
        this.props.right.style.width = `${(w)}px`;
        this.props.numclick = Math.round(this.props.listItems.length / this.props.cardsincontainer);
        this.props.approxMove = (this.props.widthCard * this.props.cardsincontainer);
    }
    onkeypress() {
        this.props.left.addEventListener('click', (e) => {
            if (this.props.cont <= 0) return;
            this.props.cont--;
            this.calculateMov(this.props.cont);
        });
        this.props.right.addEventListener('click', (e) => {
            if (this.props.cont >= this.props.numclick - 1) return;
            this.props.cont++;
            this.calculateMov(this.props.cont);
        });
        this.props.listPoints.addEventListener('click', (e) => {
            if (e.target.nodeName === 'LI') {
                this.props.cont = this.props.points.indexOf(e.target);
                this.calculateMov(this.props.cont);
            }
        });
        this.props.list.addEventListener('click', (e) => {
            if (e.target.classList.contains('list-cards__item--more-info')) {
                this.openModal(true);
                document.documentElement.style.overflowY = 'hidden';
            }
        })
        document.querySelector('.modal-detail-promotion__content--close').addEventListener('click', () => {
            this.openModal(false);
            document.documentElement.removeAttribute('style');
        });
    }
    calculateMov(_index) {
        this.props.points.map(item => {
            item.classList.remove('active')
        });
        this.props.points[_index].classList.add('active');
        if (this.props.window >= 500) {
            this.props.left.style.display = (_index > 0) ? 'flex' : 'none';
            this.props.right.style.display = (_index + 1 <= (Math.trunc(this.props.numclick)) - 1) ? 'block' : 'none';
        }
        let calc = (this.props.widthCard * this.props.cardsinitshow);
        let dif = (this.props.cardsincontainer === 1) ? (this.props.container.offsetWidth - this.props.widthCard) / 2 : (this.props.container.offsetWidth - calc) / 2;
        let mov = (this.props.approxMove * _index) - dif;
        this.props.list.style.cssText = `left: -${mov}px; transition: all .3s ease-out;`;
        this.resizeIndicators(_index);
    }
    // optimizar esta funcion en el futuro
    resizeIndicators(_index) {
        let calc = (this.props.widthCard * this.props.cardsinitshow);
        let dif = (this.props.cardsincontainer === 1) ? (this.props.container.offsetWidth - this.props.widthCard) / 2 : (this.props.container.offsetWidth - calc) / 2;
        this.props.right.style.width = `${(dif)}px`;
        this.props.left.style.width = `${(dif)}px`;
        if (_index === 0) {
            let w = (this.props.widthCard * this.props.cardsinitshow) + this.props.x;
            w = this.props.container.offsetWidth - w;
            this.props.right.style.width = `${(w)}px`;
        }
    }
    openModal(isOpen) {
        const modal = document.querySelector('.modal-detail-promotion');
        modal.style.display = (isOpen) ? 'flex' : 'none';
    }
}