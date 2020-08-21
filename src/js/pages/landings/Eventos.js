export class Eventos{
    constructor(){
        this.props = {
            mainBody: document.getElementsByTagName('body'),
            scrolling: 0,
            lastScroll: 0,
            //positionTvInit: document.getElementById('imagenFondo').getBoundingClientRect().top,
            //positionSpaceOne: document.getElementById('spaceOne').getBoundingClientRect().top,
            //positionCtb: document.getElementById('CtbImg').getBoundingClientRect().top,
            modalContentForm: document.getElementById('modalContentForm'),
            menuCobertura: document.getElementById('menuCoberturaNuevo')
        }
        this.init();
    }
    init(){
        console.log('... init section Netflix');
        var _flagTags = -1;
        window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            var _width = window.innerWidth;
            //console.log(scroll);
            var boton_ = document.getElementById("botonVideo"),
            logoNetflix__ = document.getElementById('logo__'),
            _container_icons_ = document.getElementById("container_icons_"),
            card1 = document.getElementById('cardNumer1'),
            card2 = document.getElementById('cardNumer2'),
            card3 = document.getElementById('cardNumer3');
            //esconde el boton del video
            if( scroll == 0 && scroll < 11){
                boton_.style.opacity= 1;
                boton_.style.transition="all 100ms";
            }
            //muestra el boton de video
            if( scroll > 1 ){
                boton_.style.opacity= 0;
                boton_.style.transition="all 100ms";
            }
            // oculta la imagen
            if( _width <= 767 ){
                console.log(scroll);
                if(scroll > 280){
                    console.log('oculta 375 logo');
                    _container_icons_.style.opacity = 0;
                    logoNetflix__.style.opacity = 1;
                }
                if(scroll< 279){
                    _container_icons_.style.opacity = 1;
                    logoNetflix__.style.opacity = 0;
                }
            }
            else if( _width >= 768 && _width <= 1023){
                //console.log(scroll);
                if(scroll > 347){
                    //console.log('oculta logo 768');
                    _container_icons_.style.opacity = 0;
                    logoNetflix__.style.opacity = 1;
                }
                if(scroll< 346){
                    _container_icons_.style.opacity = 1;
                    logoNetflix__.style.opacity = 0;
                }
            }
            else if( _width >= 1024 && _width <= 1365){
                //console.log(scroll);
                if(scroll > 435){
                    //console.log('oculta logo 1024');
                    _container_icons_.style.opacity = 0;
                    logoNetflix__.style.opacity = 1;
                }
                if(scroll< 434){
                    _container_icons_.style.opacity = 1;
                    logoNetflix__.style.opacity = 0;
                }
            }
            else if( _width >= 1366 && _width <= 1699){
                //console.log(scroll);
                if(scroll > 370){
                    //console.log('oculta logo 1366');
                    _container_icons_.style.opacity = 0;
                    logoNetflix__.style.opacity = 1;
                }
                if(scroll< 369){
                    _container_icons_.style.opacity = 1;
                    logoNetflix__.style.opacity = 0;
                }
            }
            else if( _width >= 1700 ){
                if(scroll > 360){
                    //console.log('oculta logo 1366');
                    _container_icons_.style.opacity = 0;
                    logoNetflix__.style.opacity = 1;
                }
                if(scroll< 359){
                    _container_icons_.style.opacity = 1;
                    logoNetflix__.style.opacity = 0;
                }
            }
            //termina ocultar imagen
            if( _width >= 1024 ){
                _flagTags = -1;
                if( scroll < 820 ){
                    card1.style.transition="all 1s";
                    card1.style.opacity= 0;
                    card1.style.marginTop='200px';
                    card2.style.transition="all 1s";
                    card2.style.opacity= 0;
                    card2.style.marginTop='200px';
                    card3.style.transition="all 1s";
                    card3.style.opacity= 0;
                    card3.style.marginTop='200px';
                }
                if(scroll > 820 && scroll < 989){
                    card1.style.opacity= 0.3;
                    card1.style.marginTop='150px';
                    card1.style.transition="all 1s";
                }
                if(scroll > 990 && scroll < 1020){
                    card1.style.opacity= 0.7;
                    card1.style.marginTop='20px';
                    card1.style.transition="all 1s";
                    card2.style.opacity= 0;
                    card2.style.marginTop='200px';
                }
                if(scroll > 1021 && scroll < 1149){
                    card1.style.opacity= 0.9;
                    card1.style.marginTop='20px';
                    card1.style.transition="all 1s";
                    card2.style.opacity= 0.2;
                    card2.style.marginTop='180px';
                    card2.style.transition="all 1s";
                    card3.style.opacity= 0;
                    card3.style.marginTop='200px';
                    card3.style.transition="all 1s";
                }
                if(scroll > 1150 && scroll < 1249 ){
                    card1.style.transition="all 1s";
                    card1.style.opacity= 1;
                    card1.style.marginTop='0px';
                    card2.style.transition="all 1.5s";
                    card2.style.opacity= 0.7;
                    card2.style.marginTop='90px';
                    card3.style.transition="all 1.5s";
                    card3.style.opacity= 0.2;
                    card3.style.marginTop='200px';
                }
                if(scroll > 1250 && scroll < 1349 ){
                    card2.style.transition="all 1s";
                    card2.style.opacity= 1;
                    card2.style.marginTop='0px';
                    card3.style.opacity= 0.6;
                    card3.style.marginTop='110px';
                    card3.style.transition="all 1.5s";
                }
                if(scroll > 1350 && scroll < 1369 ){
                    card3.style.opacity= 0.8;
                    card3.style.marginTop='10px';
                    card3.style.transition="all 1s";
                }
                if(scroll > 1370 ){
                    card3.style.opacity= 1;
                    card3.style.marginTop='0px';
                    card3.style.transition="all 1s";
                    card2.style.opacity= 1;
                    card2.style.marginTop='0px';
                    card2.style.transition="all 1s";
                    card1.style.opacity= 1;
                    card1.style.marginTop='0px';
                    card1.style.transition="all 1s";
                }
            }else{
                if(_flagTags === -1){
                    card1.style.opacity= 1;
                    card2.style.opacity= 1;
                    card3.style.opacity= 1;
                    _flagTags = 1;
                }
            }
        });
    }
}
