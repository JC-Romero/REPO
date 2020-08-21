import { indicatorMenuBarraCorta } from '../generales/BarraDeProgreso'

export class eventosIPTV {

    constructor() {

        this.props = {

            menuTop: document.querySelector('.nav-services'),
            mainNav: document.getElementById('mainNavPrincipal'),
            sectionInternet: document.getElementById('internet'),
            sectionTv: document.getElementById('tv'),
            sectionMovil: document.getElementById('movil'),
            sectionPhone: document.getElementById('phone'),
            indexx: document.getElementById('sectionApps'), 
            navContent: document.querySelector('.nav-services--nav'),
            navLinks: [...document.querySelectorAll('.nav-services--nav__item')],
            navSelector: document.querySelector('.nav-services--nav__separator'),
            lastScrollTop: 0,
            indexSelected: 0,
            clickItemMenu: false,
            userAgent:  window.navigator.vendor,
            btnAnchor: document.getElementById('btnInternet')
            
        }

        this.init();
    }

    init() {
        console.log('estoy en eventos iptv')
        this.scroll();
    }

    scroll() {
        var flag =false; 
        
        
        document.addEventListener('scroll', () => {
    
            let scroll = window.pageYOffset || document.documentElement.scrollTop;
            let position = (this.props.userAgent ==='Apple Computer, Inc.') ? '-webkit-sticky' : 'sticky'; 
            if( scroll > this.props.mainNav.offsetHeight){
                this.props.menuTop.style.cssText = `
                    position: ${position};
                    top: 0;
                    transition: all .3s ease-in-out`;
                 
            }else{ this.props.menuTop.removeAttribute('style'); 
            }

            this.detectSection(scroll);
        });
    
    }

    detectSection(_scroll){


        let st = _scroll,
        direction = (st > this.props.lastScrollTop) ? true : false;
        this.props.lastScrollTop = st;
        var time = 1000 * this.props.indexSelected;
        
        if( direction ){
            if(!this.props.clickItemMenu) {
                if((this.props.sectionInternet.getBoundingClientRect().bottom - this.props.mainNav.offsetHeight) > 0){
                    this.props.indexSelected = 0;
                }else if((this.props.sectionTv.getBoundingClientRect().bottom - this.props.mainNav.offsetHeight) > 0){
                    this.props.indexSelected = 1;
                }else if((this.props.sectionMovil.getBoundingClientRect().bottom - this.props.mainNav.offsetHeight) > 0){
                    this.props.indexSelected = 2;
                }else if((this.props.sectionPhone.getBoundingClientRect().bottom - this.props.mainNav.offsetHeight) > 0){
                    this.props.indexSelected = 3;
                }

            }else{ // no scroll 
                
                setTimeout(() => {this.props.clickItemMenu = false;}, 1200);
            }
             var itemsServicios = document.querySelectorAll('.selectServicios');
             var selectorMenuServicios = document.getElementById("selectorMenuServicios");
             $('#selectorMenuServicios').css('background-color','rgb(7, 114, 201)');
             indicatorMenuBarraCorta(this.props.indexSelected,itemsServicios,selectorMenuServicios);
        }else{

            // console.log(' pasa por aqui => arriba');
            if(!this.props.clickItemMenu) {
                if((this.props.sectionInternet.getBoundingClientRect().bottom - this.props.menuTop.offsetHeight ) > 0){
                    this.props.indexSelected = 0;
                } else if((this.props.sectionTv.getBoundingClientRect().bottom - this.props.menuTop.offsetHeight ) > 0){
                    this.props.indexSelected = 1;
                }else if((this.props.sectionMovil.getBoundingClientRect().bottom - this.props.menuTop.offsetHeight ) > 0){
                    this.props.indexSelected = 2;
                }else if((this.props.sectionPhone.getBoundingClientRect().bottom - this.props.menuTop.offsetHeight ) > 0){
                    this.props.indexSelected = 3;
                }
            }else{
                setTimeout(() => {this.props.clickItemMenu = false;}, 1200);
            }
            
            var itemsServicios = document.querySelectorAll('.selectServicios');
            var selectorMenuServicios = document.getElementById("selectorMenuServicios");
            $('#selectorMenuServicios').css('background-color','rgb(7, 114, 201)');
            indicatorMenuBarraCorta(this.props.indexSelected,itemsServicios,selectorMenuServicios);
        }
    }


    anchorSection(){
        this.props.btnAnchor.addEventListener('click', ()=>{
            window.open('ventajas.html', '_self', getTopSection('test'));
        }, );
    }



}

