export class PaquetesEventos {
    constructor(index) {
        console.log('SCRIPT DE PAQUETES CARGADO');
        this.props = {
            //containerBanner: document.getElementById(banner),
            contentPackagesLayer: document.getElementById('packageBannerLayerOne'),
            header: document.getElementById('mainHeader').getBoundingClientRect().height,
            menu: document.getElementById('menuPackages'),
            contentMenuTabs: document.getElementById('contentMenuTabs'),
            item: [...document.querySelectorAll('.menu-packages__item')],
            tab: [...document.getElementsByClassName("item_tab")],
            contentTabs: document.getElementById('contentPackagesHome'),
            selector: document.getElementById('selectorPackages'),
            btnMorePackages: document.querySelector('.view-more-packages'),
            containerPackages: [...document.querySelectorAll('.item_tab')],
            btnCity: document.querySelector('.btn__select__image'),
            coberturaText: document.querySelector('.main-title-paquetes'),
            coberturaDir: document.querySelector('.main-title-paquetes-add'),
            positions: [],
            indexHover: 0,
            selected: false,
            lastScrollTop: 0,
            cont: 0,
            cont2: 10,
            fracc: 0,
            cardStorage: null,
            showPackages: false,
            showCity: false,
            lsgStorage: window.localStorage,
            dir: null,
            windowW: window.innerWidth
        }
        this.initialize(index);
        this.clickTab();
        this.mouseoverTab();
        this.resize();
    }


    initialize(index) {

        this.props.container = document.querySelector(`.tab-${this.props.indexHover+1}`);
        this.props.itemscardsPackage = [...document.querySelectorAll('.card-package-item')];
        this.props.fracc = (this.props.contentMenuTabs.getBoundingClientRect().top / 10);

        this.props.item[index].style.color = '#1a76d2';
        this.props.item[index].style.fontFamily = 'Montserrat-Medium';
        this.setPosition(index);
        
        this.props.indexHover=index;
         let movX = this.props.indexHover * 1366;
         this.props.contentTabs.style.cssText = `transform: translateX(-${movX}px); transition:all .7s;`;
         this.props.tab.map(item => item.classList.remove('active-tab'));
         this.props.tab[index].classList.add('active-tab');
                

        this.clickCard();
        this.onkeyPress();
       /* if (this.props.lsgStorage.getItem('lsgDir') != null) {
            this.props.dir = this.props.lsgStorage.getItem('lsgDir');
            this.props.coberturaDir.innerHTML = `${this.props.dir}`;
            this.props.coberturaText.innerHTML = `Paquetes disponibles en`;
        }*/
    }
    setHeightContainer() {
        
        this.props.windowW = window.innerWidth;
    }
    onkeyPress() {
        this.props.btnMorePackages.addEventListener('click', () => {
            this.hideShowPackages();
        });
        /*this.props.btnCity.addEventListener('click', () => {
            if (!this.props.showCity) {
                this.props.showCity = true;
                this.props.btnCity.children[1].style.cssText = 'display: flex; opacity: 1; top: 47px';
            } else {
                this.props.showCity = false;
                this.props.btnCity.children[1].style.cssText = 'display: none; opacity: 0; top: 0px';
            }
        })*/
    }
    resetValuesPackages(_index) {
        //let i = (_index === 1) ? 0 : 1;
        this.props.btnMorePackages.textContent = 'Mostrar más paquetes';
        var cuantos=this.props.containerPackages.length;
        for (var i = cuantos - 1; i >= 0; i--) {
            this.props.containerPackages[i].removeAttribute('style');
        }
        this.props.showPackages = false;
    }
    hideShowPackages() {
        var idn=this.props.indexHover+1;
        var cuantos=[...document.querySelectorAll('.tab-'+idn+' .card-package-item')].length;
        var paqueteSeleccion3PM=document.getElementById('lknMatch3P');
        var paqueteSeleccion2PM=document.getElementById('lknMatch2P');
        console.log(cuantos);
        if (!this.props.showPackages) {
            this.props.showPackages = true;
            this.props.windowW = window.innerWidth; 

            if (this.props.windowW < 767) {
                this.props.containerPackages[this.props.indexHover].style.cssText = 'height: 3586px; transition: height .5s ease-out;';
                console.log('375');
            } else if (this.props.windowW >= 768 && this.props.windowW <= 1023) {
                //this.props.containerPackages[this.props.indexHover].style.cssText = 'height: 2072px; transition: height .5s ease-out;';
                this.props.containerPackages[this.props.indexHover].style.cssText = 'height: 1650px; transition: height .5s ease-out;';
                console.log('768');
            } else if (this.props.windowW >= 1024 && this.props.windowW <= 1365) {
                var hg = 0;
                if(paqueteSeleccion2PM.hasAttribute('style') || paqueteSeleccion3PM.hasAttribute('style')){
                    hg=Math.floor(cuantos/2)*544;
                }else{
                    hg=Math.floor(cuantos/3)*544;
                }
                this.props.containerPackages[this.props.indexHover].style.cssText ='height:'+hg+'px; transition: height .5s ease-out;';
                //console.log('1024');
            } else if (this.props.windowW >= 1366 && this.props.windowW <= 1699) {
                var hg = 0;
                if(paqueteSeleccion2PM.hasAttribute('style') || paqueteSeleccion3PM.hasAttribute('style')){
                    hg=Math.floor(cuantos/2)*544;
                }else{
                    hg=Math.floor(cuantos/3)*544;
                }
                this.props.containerPackages[this.props.indexHover].style.cssText = 'height:'+hg+'px; transition: height .5s ease-out;';
                //console.log('1366');
            } else if (this.props.windowW >= 1700) {
                this.props.containerPackages[this.props.indexHover].style.cssText = 'height: 1172px; transition: height .5s ease-out;';
                //console.log('1700');
            }
            this.props.btnMorePackages.textContent = 'Ocultar paquetes';
        } else {
            this.props.btnMorePackages.textContent = 'Mostrar más paquetes';
            this.props.containerPackages[this.props.indexHover].removeAttribute('style');
            this.props.showPackages = false;
        }
    }
    resize() {
        addEventListener('resize', () => {
            this.props.window = window.innerWidth;
            this.props.cont = 0;
            this.props.cont2 = 10;
            this.props.fracc = (this.props.contentTabs.getBoundingClientRect().top / 10);
            let positionItemMenu = this.props.item[this.props.indexHover].offsetLeft;
            let offsetLeft = ((this.props.item[this.props.indexHover].offsetWidth - 32) / 2) + positionItemMenu;
            this.props.selector.style.cssText = `left: ${offsetLeft}px; transition: all 600ms ease;`;
            if (this.props.indexHover === 1) this.props.contentTabs.style.cssText = `transform: translateX(-100%);`;
        });
    }
    clickTab() {
        this.props.menu.addEventListener('click', (e) => {
            if (e.target.localName === 'li') {
                this.props.indexHover = this.props.item.indexOf(e.target);
                let movX = this.props.indexHover * this.props.tab[0].offsetWidth;
                this.props.contentTabs.style.cssText = `transform: translateX(-${movX}px); transition:all .7s;`;
                this.props.tab.map(item => item.classList.remove('active-tab'));
                let foco = (this.props.indexHover === 1) ? 0 : 1;
                this.props.tab[foco].classList.add('active-tab');
                this.props.item.map(item => item.removeAttribute('style'));
                this.props.item[this.props.indexHover].style.color = '#1a76d2';
                this.props.item[this.props.indexHover].style.fontFamily = 'Montserrat-Medium';
                this.props.selected = true;
                this.setPosition(this.props.indexHover);
                this.props.container = document.querySelector(`.tab-${this.props.indexHover+1}`);
                this.clickCard();
                this.resetValuesPackages(this.props.indexHover);
            }
        });
    }
    mouseoverTab() {
        this.props.menu.addEventListener('mouseover', (e) => {
            if (e.target.localName === 'li') {
                let indexHover = this.props.item.indexOf(e.target);
                this.setPosition(indexHover);
            }
        });
        this.props.menu.addEventListener('mouseleave', () => {
            this.props.selector.style.cssText = `left:${this.props.positions[this.props.indexHover]}px; transition: all 600ms ease;`;
        });
    }
    setPosition(index) {
        let widthElement = Math.round(this.props.item[index].getBoundingClientRect().width);
        let positionItemMenu = this.props.item[index].offsetLeft;
        let offsetX = ((widthElement - 32) / 2) + positionItemMenu;
        this.props.positions[index] = offsetX;
        this.props.selector.style.cssText = `left: ${offsetX}px; transition: all 600ms ease;`;
        if (this.props.selected) this.props.positions[index] = offsetX;
    }
    clickCard() {
        this.props.cardStorage = window.localStorage;
        this.props.container.addEventListener('click', (e) => {
            let classParent = 'card-package-item';
            let target = (e.target.parentElement.localName === 'li') ? e.target.parentNode : e.target;
            if (e.target.classList.contains(classParent) || e.target.offsetParent.classList.contains(classParent)) {
                let index = this.props.itemscardsPackage.indexOf(target);
                this.props.cardStorage.setItem('cardIndex', index);
                this.props.cardStorage.setItem('tabIndex', this.props.indexHover);
                if (this.props.indexHover === 1) {
                    let numElement = index - 8;
                    this.props.cardStorage.setItem('cardIndex', numElement);
                    this.props.cardStorage.setItem('tabIndex', this.props.indexHover);
                }
            }
        });
    }
}