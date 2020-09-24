//import { callbackify } from "util";
import * as Constantes from "../../utils/Constantes";
import {Rutas, RutasMatch } from "../../utils/Ayuda";

export class Canales{

    constructor(_container, _btnOpen, _promotions){
        this.props = {
            container: document.getElementById(_container),
            mainBody: document.getElementsByTagName('body'),
            openModal: document.getElementById(_btnOpen),
            promotionSection: _promotions,
            indexHover: 0,
            positions: [],
            menu: null,
            item: null, 
            tab: null,
            selector: null,
            modalSelectTv: null,
            modalSelectFilter: null,
            selected: false,
            currentClick: 0,
            channelContainer: null,
            channelTarget: null,
            channelDescription: null,
            itemToRemove: null,
            lastElement: null,
            listContainer: null,
            lastTarget: -1,
            selectType: 0,
            selectCity: 0,
            moveLeft: 0,
            window: window.innerWidth,
            openDescription: false,
            lastScrollTop: 0,
            fracc: 0,
            menuBottom: 0
        }
    
        this.openModal();
        obtenerCanalesParrilla();
        this.listenerlinksPremium();
        
    }
    
    openModal() {
        let referenciaClase = this;
        $("body").on('click', '#openChannels', function() {
            referenciaClase.createChannelsDOM();
        });
    }

    listenerlinksPremium(){
        $("body").on('click', '#canalPremium1', function() {
            window.location.href = window.location.origin + Rutas(Constantes.sitioBase).hbo+".html";   
            console.log("hbo")     
        });

        $("body").on('click', '#canalPremium2', function() {
            window.location.href = window.location.origin + Rutas(Constantes.sitioBase).fox+".html";    
            console.log("fox")  
        });
    }

    createChannelsDOM(){

        this.props.window = window.innerWidth;
        this.props.agent = window.navigator.vendor;
        let mainClass = 'modal-channels-content';

        const btnCloseChannels = this.createCustomElement('div', {
            class: `${mainClass}__close`,
            id: 'closeModalChannels'
        });
        
        const titleChannels = this.createCustomElement('h1', {
            class: `${mainClass}__title`
        }, ['Paquetes de canales']);


        const filterChannels = this.createCustomElement('div', {
            id: 'containerSelectFilter',
            class: `${mainClass}__container-filter`
            },[`<div class="filter"> 
                    <div class="filter-tab">
                        <span>Filtros</span>
                    </div>
                    <span style="display:none;">Grabado en la nube</span>
                    <ul id="filterType" class="type" style="display:none;">
                        <li>
                            <div class="btn-check-square"></div>
                            <span>Todos</span>
                        </li>
                        <li>
                            <div class="btn-check-square"></div>
                            <img src="assets/img/pages/canales/icn-grabados-charlie.svg">
                            <span>Automático</span>
                        </li>
                        <li>
                            <div class="btn-check-square"></div>
                            <img src="assets/img/pages/canales/icn-grabados-charlie.svg">
                            <span>Manual</span>
                        </li>
                    </ul> 
                    <span>Categoría</span>
                    <ul id="filterCat" class="city">
                        <li>
                            <div class="btn-check-square"></div>
                            <span>Todos</span>
                        </li>
                        
                    </ul>
                    <span style="display:none;">Ciudad</span>
                    <ul id="filterCity" class="city" style="display:none;">
                        <li>
                            <div class="btn-check-square"></div>
                            <span>CDMX</span>
                        </li>
                        
                    </ul>
                </div>`]);

        let strParrilla = localStorage.getItem('TP_PARRILLAS');
        let arregloParrilla = new Array();
        try {
            arregloParrilla = JSON.parse(strParrilla);
        } catch (error) {
            arregloParrilla = ["11235", "11220", "11259"];
        }

        const menuTVContainer = this.createCustomElement('div',{
            class: `${mainClass}__select-options`
            },[`<ul id="menuTvCategory" class="menu-channels">
                    <li class="btn__blue__bold botonParrilla parrillaSeleccionada" data-code="10658" data-tipo="0" >TV Inicial</li>
                    <li class="btn__blue__bold botonParrilla" data-code="${arregloParrilla[0]}" data-tipo="1">TV Básica</li>
                    <li class="btn__blue__bold botonParrilla" data-code="${arregloParrilla[1]}" data-tipo="2">TV Avanzada</li>
                    <li class="btn__blue__bold botonParrilla" data-code="${arregloParrilla[2]}" data-tipo="3">TV Premium</li>
                </ul>
                <span><i id="textoTipoParrilla">Disfruta de 80 canales, 35 en HD.</i></span>
            `]);

        const channelsList = this.createCustomElement('div',{
            class: 'channels-container',
            id: 'channelsContentList1'
            },[`<ul class="channels-list">
                    <li>
                        <div class="content-channel">
                            <div class="logo-channel">
                                <img src="assets/img/pages/canales/logos/aztecauno.png" style="display:none;">
                            </div>
                            <img class="type-channel" src="assets/img/pages/canales/icn-grabados-charlie.svg" style="display:none;">
                            <span></span>
                        </div>
                        
                    </li> 
                </ul>`]);

        const contentTabs = this.createCustomElement('div', {
            class: `${mainClass}__content-tabs`,
            id: 'contentTabsChannels'
        },[channelsList]);


        const contentChannels = this.createCustomElement('div',{
            class: 'container-content-channels'
        },[contentTabs]);

        const contentFilterChannels = this.createCustomElement('div',{
            class: `${mainClass}__content-filter-channels`,
        },[filterChannels, contentChannels]);

        //contenedor de slider
        const contentSliderChannels = this.createCustomElement('div',{ class: `content-slider-channels`, id: 'containerSliderChannels' },
        [`<ul class="slider-channels-list">
            <li><img src="assets/img/pages/canales/card.png" alt""></li>
            <li><img src="assets/img/pages/canales/card.png" alt""></li>
            <li><img src="assets/img/pages/canales/card.png" alt""></li>
        </ul>`]);

        //contenedor de tarjetas premium
        const contentPremiumChannels = this.createCustomElement('div',{ class: `content-premium-channels`, id: 'containerPremiumChannels' }, 
        [`<span class="title">Disfruta aún mas entretenimiento agregando Canales Premium a tu paquete.</span>
            <ul class="premium-channels-list">
                <li class="premium-channel-card">
                    <div class="description-channel-card">
                        <div class="logo-channel-card">
                            <img src="assets/img/pages/canales/HBO@4x.png">
                        </div>
                        <span class="content-channel-card">Incluido con TV Premium</span>
                        <span class="description-channel-text">Incluye 8 canales HD + HBO OnDemand + HBO Go</span>
                        
                        <span class="price-channel-card mrg-top1"></span>
                        <a class="btn__transparent_premium zd_1" id="canalPremium1" href="#">Más información</a>
                    </div>
                    <div class="banner-channel-card">
                        <img src="assets/img/pages/canales/HisDarkMaterials.jpg">
                        <span class="banner-channel-text">Noviembre <i> | Nueva serie original HBO</i></span>
                    </div>
                </li>
                <li class="premium-channel-card">
                    <div class="description-channel-card">
                        <div class="logo-channel-card">
                            <img src="assets/img/template/fox/logo.png">
                        </div>
                        <span class="content-channel-card">Incluido con TV Premium</span>
                        <span class="description-channel-text">Incluye 10 canales HD + Fox Premium en todas tus pantallas.</span>
                        <span class="price-channel-card"></span>
                        <a class="btn__transparent_premium zd_2" id="canalPremium2" href="#">Más información</a>
                    </div>
                    <div class="banner-channel-card">
                        <img src="assets/img/pages/canales/HisDarkMaterials.jpg">
                        <span class="banner-channel-text">Noviembre <i> | Nueva temporada</i></span>
                    </div>
                </li>
            </ul>
        `]);

        const contentNewSection = this.createCustomElement('div',{ class: `${mainClass}__content-new-section`, },[contentSliderChannels, contentPremiumChannels]);

        
        const modalChannelContent = ( this.props.promotionSection === true ) ? 
            this.createCustomElement('div', {class: 'modal-channels-content show-modal',id: 'modalChannelsContent'}, [btnCloseChannels, titleChannels, menuTVContainer, contentFilterChannels,contentNewSection]) 
            :
            this.createCustomElement('div', {class: 'modal-channels-content show-modal',id: 'modalChannelsContent'}, [btnCloseChannels, titleChannels, menuTVContainer, contentFilterChannels])
        ;


        this.props.container.appendChild(modalChannelContent);
        this.props.mainBody[0].style.cssText = 'overflow-Y: hidden;';
        this.props.mainContent = document.getElementById('modalChannelsContent');
        this.props.menu = document.getElementById('menuTvCategory');
        this.props.item = [...document.querySelectorAll('.menu-channels__item')];
        this.props.selector = document.getElementById('selectorCategoryChannel');
        this.props.closeModal = document.getElementById('closeModalChannels');
        this.props.tab = [...document.getElementsByClassName('channels-container')];
        this.props.contentTabs = document.getElementById('contentTabsChannels');
        this.props.containerSelectTv = document.getElementById('filterType');
        this.props.containerBtnFilter = document.getElementById('containerBtnFilter');
        this.props.containerSelectFilterCat = document.getElementById('filterCat');
        this.props.containerSelectFilterCity = document.getElementById('filterCity');
        this.props.channelsContainer =  document.querySelector('.list li');
        this.props.channelsListItems =  [...document.querySelectorAll('.content')];
        this.props.channelsList =  null;
        this.props.channelContainer = document.getElementById(`channelsContentList${this.props.indexHover+1}`);
        
        this.scrollPage(); 
        this.createChannelsDescription(this.props.channelContainer);
        this.closeModal(this.props.container, this.props.closeModal, this.props.mainContent);
        this.resize();
        this.props.modalSelectFilter = document.querySelector('.modal-channels-content__container-filter');
        this.selectFilterItems(this.props.mainContent, this.props.containerSelectFilter, this.props.modalSelectFilter);

        obtenerCanales('10658');
    }

    scrollPage(){
        let menuOptions =  document.querySelector('.modal-channels-content__select-options');
        this.props.mainContent.addEventListener( 'scroll', () => {
            this.props.menuBottom = document.querySelector('.modal-channels-content__title').getBoundingClientRect().bottom;
                
            if(this.props.menuBottom <= 0) menuOptions.classList.add('toWhite');
            if(this.props.menuBottom  > 0) menuOptions.classList.remove('toWhite');
            
        } );
    }

    getSizeItem(_element) {
        let style = _element.currentStyle || window.getComputedStyle(_element),
            widthItem = _element.offsetWidth,
            marginLeft = parseInt(style.marginLeft),
            marginRight = parseInt(style.marginRight);
        return widthItem + marginLeft + marginRight;
    }

    createChannelsDescription(_container){
        this.props.window  = window.innerWidth;
        const newItem = this.createCustomElement('div',{
            id: `descriptionChannel${this.props.indexHover+1}`,
            class: 'description-channel'
        },[`
            <div class="selector-channel"></div>
            <div class="header-channel">
                <img src="assets/img/pages/canales/icn-grabados-charlie.svg" style="display:none;">
                <span id="cntNumeroCanal">101</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span id="cntNombreCanal"></span>
            </div>
            <div class="content-channel-description">
                <span class="principal" id="cntDescripcionCanal">
                    Vive la diversión, el entretenimiento, el mundo del espectáculo, los hechos de la noticia, la libertad del análisis político y la pasión del deporte.
                </span>
                <div class="aditional">
                    <span id="cntDescripcionPrograma" style="font-family: Montserrat-Regular;font-size: 12px;color: #fafafa;font-weight: 100;">
                        
                    </span>
                </div>
            </div>
            <div class="media-channel">
                <img src="assets/img/canal_first.png" id="imgDescripcion_1" class="imgDescripcion" style="">
                <img src="assets/img/canal_second.png" id="imgDescripcion_2" class="imgDescripcion" style="">
                <img src="assets/img/canal_second.png" id="imgDescripcion_3" class="imgDescripcion" style="">
                
            </div>`
        ]);
        
        this.props.channelsList = [...document.getElementById(`channelsContentList${this.props.indexHover+1}`).children[0].children[0].children];
        this.props.listContainer = document.getElementById(`channelsContentList${this.props.indexHover+1}`).children[0].children[0];
        this.props.target = null;
        this.props.lastElement

        let channelItem = document.querySelector('.content-channel'),
            sizeChannelItem = channelItem.offsetWidth,
            columnsContainer = Math.round(this.props.listContainer.offsetWidth / sizeChannelItem),
            rowsContainer = _container.children[0].children[0].children.length / columnsContainer;

        _container.addEventListener( 'click', ( e ) => {

            this.props.target = ( e.target.classList.contains('content-channel') ) ? 
                e.target : (e.target.parentNode.classList.contains('content-channel') ? 
                    e.target.parentNode : e.target.parentNode.parentElement )
            ;
        
            if( this.props.target.classList.contains( 'content-channel' ) ){
                let index = this.props.channelsList.indexOf(this.props.target),
                    indicatorPosition = (this.props.window < 1400) ? (this.props.target.offsetLeft + (this.props.target.clientWidth/2)) : (this.props.target.offsetLeft + (this.props.target.clientWidth/2)),
                    containerTop = document.querySelector('.modal-channels-content__content-tabs').getBoundingClientRect().top,
                    itemBottom = this.props.target.children[0].getBoundingClientRect().bottom,
                    newItemTop = itemBottom - containerTop,
                    newItemHeight = 0;

                if( document.getElementById( `descriptionChannel${this.props.indexHover+1}` ) ){
                    $('#descriptionChannel1').remove();
                    $('.content-channel').css('margin-bottom','0');

                    if( this.props.channelTarget != null ) {
                        this.props.channelTarget.children[0].classList.remove('active');
                    }

                    if( this.props.lastTarget == index ){
                        
                    }else{
                        let marginBtn = '';
                        if(this.props.window <= 320) 'margin-bottom: 8px;';
                        else if(this.props.window > 320) 'margin-bottom: 25px;';
                        this.props.channelTarget.style.cssText = `${marginBtn}`;
                    }

                } else {
                    $('#cntCanales').append(newItem);
                    var canalSeleccionado = this.props.target.getAttribute('data-canal');
                    obtenerTopProgramas(canalSeleccionado);

                    var strCanales = localStorage.getItem('TP_OF_OBJ_CANALES');
                    try{
                        var strNumeroCanal = '';
                        var strNombreCanal = '';
                        var strDescripcionCanal = '';
                        var urlImagenDescripcion_1 = '';
                        var urlImagenDescripcion_2 = '';
                        var urlImagenDescripcion_3 = '';

                        var informacion = JSON.parse(strCanales);

                        $.each( informacion, function( categoria, objListaCanales ) {
                            $.each( objListaCanales, function( key, objCanal ) {
                                if( parseInt(canalSeleccionado) == parseInt(objCanal.lchId) ){
                                    strNumeroCanal = objCanal.number;
                                    strNombreCanal = objCanal.name;
                                    strDescripcionCanal = objCanal.description;

                                    urlImagenDescripcion_1 = 'https://imgn.cdn.iutpcdn.com/IMGS/CHANNEL/SUPER/'+objCanal.images['SUPER']['misId']+'-8c.'+objCanal.images['SUPER']['ext'];
                                    urlImagenDescripcion_2 = 'https://imgn.cdn.iutpcdn.com/IMGS/CHANNEL/SUPER/'+objCanal.images['SUPER']['misId']+'-8c.'+objCanal.images['SUPER']['ext'];
                                    urlImagenDescripcion_3 = 'https://imgn.cdn.iutpcdn.com/IMGS/CHANNEL/SUPER/'+objCanal.images['SUPER']['misId']+'-8c.'+objCanal.images['SUPER']['ext'];

                                }
                            });
                        });

                        $('#cntNumeroCanal').html(strNumeroCanal);
                        $('#cntNombreCanal').html(strNombreCanal);
                        $('#cntDescripcionCanal').html(strDescripcionCanal);

                        $('#imgDescripcion_1').attr('src', urlImagenDescripcion_1);
                        $('#imgDescripcion_2').attr('src', urlImagenDescripcion_2);
                        $('#imgDescripcion_3').attr('src', urlImagenDescripcion_3);
                    }catch(e){
                        console.log('CATCH INFO CANAL SELECCIONADO=>', e);
                    }

                    newItemHeight = newItem.clientHeight;
                    newItem.style.cssText = `top: ${newItemTop + 8}px`;
                    this.props.indicatorItem  = document.querySelector('.selector-channel');
                    let indicatorSize = this.props.indicatorItem.getBoundingClientRect().width/2;
                    this.props.indicatorItem.style.cssText = `left: ${indicatorPosition-indicatorSize}px`;
                    this.props.target.children[0].classList.add('active');

                    setTimeout( () => {
                        newItem.classList.add('open-info');
                        this.props.target.style.marginBottom = `${newItemHeight}px`;
                    }, 100);
                    newItem.classList.remove('open-info');
                }

                this.props.lastTarget = index;
                this.props.channelTarget = this.props.target;
            }
        });
    }

    createCustomElement(tagName, objAttr, children) {
        const element = document.createElement(tagName);
        if (children) {
            children.forEach(child => {
                (child instanceof HTMLElement) ? element.appendChild(child): element.innerHTML += child;
            });
        }
        this.addAttributes(element, objAttr);
        return element;
    }

    mouseoverTab() {
        this.props.menu.addEventListener('mouseover', (e) => {
            if (e.target.localName === 'li') {
                let indexHover = this.props.item.indexOf(e.target);
                this.setPosition(indexHover);
            }
        });
        this.props.menu.addEventListener('mouseout', () => {
            this.props.selector.style.cssText = `left:${this.props.positions[this.props.indexHover]}px; transition: all 600ms ease;`;
        });
    }

    clickTab() {
        this.props.window = window.innerWidth;
        let menuList = [...document.querySelectorAll('.menu-channels__item')];
        let sizeListContainer =  this.getSizeItem(this.props.menu);
        this.props.menu.addEventListener('click', (e) => {
            if (e.target.localName === 'li') {
                this.props.indexHover = this.props.item.indexOf(e.target);
                this.props.channelContainer = document.getElementById(`channelsContentList${this.props.indexHover+1}`);
                this.props.currentClick = 0;
                let target = e.target;
                let index  = menuList.indexOf(target);

                if (index >= 0){
                    let style = target.currentStyle || window.getComputedStyle(target),
                        marginRight = parseInt(style.marginRight),
                        leftTarget = target.getBoundingClientRect().left,
                        sizeTarget = this.getSizeItem(target),
                        positionTarget = leftTarget + sizeTarget + marginRight;
                    if(this.props.window < 1100){
                        if(positionTarget > this.props.window){
                            this.props.moveLeft = (this.props.moveLeft + sizeTarget > sizeListContainer - this.props.window) 
                                ? this.props.moveLeft = sizeListContainer - this.props.window
                                : this.props.moveLeft = this.props.moveLeft + sizeTarget;
                        }else{
                            this.props.moveLeft = (this.props.moveLeft - sizeTarget > 0) 
                                ? this.props.moveLeft = this.props.moveLeft - sizeTarget
                                : this.props.moveLeft = 0;
                        }
                        this.props.menu.style.cssText = `left: -${this.props.moveLeft}px; transition: all .5s;`;
                    }
                }

                let movTabX = this.props.indexHover * this.props.tab[0].offsetWidth;
                
                this.props.contentTabs.style.cssText = `left:-${movTabX}px; transition: all .5s;`;

                this.props.tab.map(item => item.classList.remove('active-tab'));
               
                this.props.tab[this.props.indexHover].classList.add('active-tab');
                
                this.props.item.map(item => item.removeAttribute('style'));
                this.props.item[this.props.indexHover].style.color = '#1a76d2';
                
                this.props.selected = true;

                this.setPosition(this.props.indexHover);
                this.createChannelsDescription(this.props.channelContainer);
            }
        });
    }

    closeModal(_container, _itemClose, _itemToRemove) {
        _itemClose.addEventListener('click', () => {
            _itemToRemove.classList.remove('show-modal');
            _itemToRemove.classList.add('hide-modal');
            this.props.mainBody[0].style.cssText = 'overflow-Y: auto;';
            setTimeout(() => {
                _container.removeChild(_itemToRemove);
            }, 500);
        });
    }

    closeSelect(_container, _modalContent, _selectItem) {
        _selectItem.addEventListener('click', () => {
            _modalContent.classList.remove('show-modal');
            _modalContent.classList.add('hide-modal');
            setTimeout(() => {
                _container.removeChild(_modalContent);
            }, 500);
        });
    }

    closeAuto(_container, _itemToRemove) {
        _itemToRemove.classList.remove('show-modal');
        _itemToRemove.classList.add('hide-modal');
        
        setTimeout(() => {_container.removeChild(_itemToRemove);}, 500);
    }

    selectTvItems(_mainContainer, _container, _item){
        this.props.window = window.innerWidth;
        let textContainer1 = null,
            textContainer2 = null;
        _item.addEventListener('click', (e)=>{
            let target = (e.target.localName === 'li') ? e.target: e.target.parentNode;
            if(target.localName === 'li'){
                if (this.props.window < 768){
                    textContainer1 = _container.children[0];
                    textContainer1.innerText = target.children[0].innerText;
                    this.closeAuto(_mainContainer, _item);
                }else{
                    textContainer1 = _container.children[0].children[0];
                    textContainer1.innerText = target.children[0].innerText;
                    textContainer2 = _container.children[0].children[1];
                    textContainer2.innerText = target.children[1].innerText;
                    _item.style.display = 'none';
                    this.closeAuto(_container, _item);
                }
            }
        });
    }
        
    selectFilterItems(_mainContainer, _container, _item){
        this.props.window = window.innerWidth;

        let type = _item.firstChild.children[2];
        let cat = _item.firstChild.children[4];
        let city = _item.firstChild.children[6];
        
        type.children[this.props.selectType].children[0].classList.add('active');
        cat.children[this.props.selectCity].children[0].classList.add('active');
        city.children[this.props.selectCity].children[0].classList.add('active');
        
        type.addEventListener('click', (e) =>{
            let listItems = [...type.children],
                target = (e.target.localName === 'div') ? e.target : e.target.previousElementSibling;
            if(target.classList.contains('btn-check-square')){
                listItems.forEach( item => {
                    if( target != item.children[0] ){
                        item.children[0].classList.remove('active');
                        target.classList.add('active');
                    }
                });
                this.props.selectType = listItems.indexOf(target.parentNode);
            }
        });
        cat.addEventListener('click', (e) => {
            let listItems = [...cat.children],
                target = (e.target.localName === 'div') ? e.target : e.target.previousElementSibling;
            if(target.classList.contains('btn-check-square')){
                listItems.forEach( item => {
                    if( target != item.children[0] ){
                        item.children[0].classList.remove('active');
                        target.classList.add('active');
                    }
                });
                this.props.selectCat = listItems.indexOf(target.parentNode);
            }
        });
        city.addEventListener('click', (e) => {
            let listItems = [...city.children],
                target = (e.target.localName === 'div') ? e.target : e.target.previousElementSibling;
            if(target.classList.contains('btn-check-square')){
                listItems.forEach( item => {
                    if( target != item.children[0] ){
                        item.children[0].classList.remove('active');
                        target.classList.add('active');
                    }
                });
                this.props.selectCity = listItems.indexOf(target.parentNode);
            }
        });
    }
    
    addAttributes(element, objAttr) {
        for (let attr in objAttr) {
            if (objAttr.hasOwnProperty(attr)) {
                element.setAttribute(attr, objAttr[attr]);
            }
        }
    }
    
    setPosition(index) {
        let widthElement = Math.round(this.props.item[index].getBoundingClientRect().width);
        let positionItemMenu = this.props.item[index].offsetLeft;
        let offsetX = ((widthElement - 32) / 2) + positionItemMenu;
        this.props.positions[index] = offsetX;
        this.props.selector.style.cssText = `left: ${offsetX}px; transition: all 600ms ease;`;
        if (this.props.selected) this.props.positions[index] = offsetX;
    }

    resize(){
        window.addEventListener('resize', ()=>{
            this.props.window = window.innerWidth;
            let sizeListContainer =  this.getSizeItem(this.props.menu);
        });
    }
}

$(document).ready(function() {
    $("body").on('click', '.filtroCanal', function () {
        var filtroSeleccionado = $(this).attr('data-filtro');

        if(filtroSeleccionado == 'todos'){
            $('.content-channel').show();
        }else{
            $.each( $('.content-channel'), function( key, html ) {
                var categoriaCanal = $(this).attr('data-categoria');

                if(filtroSeleccionado == categoriaCanal){
                    $(this).show();
                }
                if(filtroSeleccionado != categoriaCanal){
                    $(this).hide();
                }
            });
        }
    });

    $("body").on('click', '.imgDescripcion', function () {
        var descripcion = $(this).attr('data-descripcion');
        $('#cntDescripcionPrograma').html(descripcion);
    });
    
});

function obtenerCanales(tmcode) {
    $.ajax({
        url: Constantes.endpoints.obtenerCanales,
        data: JSON.stringify({'tmCode':tmcode}),
        dataType: "json",
        type: 'POST'
    }).done(function (respuesta) {
        try{
            var informacion = respuesta.body;
            localStorage.setItem('TP_OF_OBJ_CANALES', JSON.stringify (respuesta.body) );

            var arrayCategoria = new Array();

            var htmlInterno = '';
            var totalCanales = 0;
            $.each( informacion, function( categoria, objListaCanales ) {
                /*[C=Canales][M=Mosaico][I=Apps]*/
                $.each( objListaCanales, function( key, objCanal ) {
                    if(objCanal.type == 'C'){
                        arrayCategoria.push(categoria);
                        return false;
                    }
                });
                /*[C=Canales][M=Mosaico][I=Apps]*/
                $.each( objListaCanales, function( key, objCanal ) {
                    if(objCanal.type == 'C'){
                        totalCanales++;
                        var srcImage = '';
                        if(objCanal.images['SUPER'] != undefined){
                            srcImage = 'https://imgn.cdn.iutpcdn.com/IMGS/CHANNEL/SUPER/'+objCanal.images['SUPER']['misId']+'-8c.'+objCanal.images['SUPER']['ext'];
                        }
                        htmlInterno +=  '<div class="content-channel" data-categoria="'+categoria+'" data-canal="'+objCanal.lchId+'">'+
                                            '<div class="logo-channel" style="">'+
                                                '<img src="'+srcImage+'" width="50" width="100">'+ 
                                            '</div>'+
                                            '<span>'+objCanal.number+'</span>'+
                                        '</div>';
                    }
                        
                });
            });

            var htmlCategoria = '<li class="filtroCanal" data-filtro="todos"><div class="btn-check-square active"></div><span style="cursor:pointer;">Todos ('+totalCanales+')</span></li>';
            $.each( arrayCategoria, function( index, categoria ) {
                htmlCategoria += '<li class="filtroCanal" data-filtro="'+categoria+'"><div class="btn-check-square"></div><span style="cursor:pointer;">'+categoria+'</span></li>';
            });

            $('#channelsContentList1').html('<ul class="channels-list"><li id="cntCanales">'+htmlInterno+'</li></ul>');
            $('#filterCat').html(htmlCategoria);

        }catch(e){
            

            console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [obtenerCanales] ERROR[' + e+ ']');
        }
    }).fail(function (jqXHR, textStatus) {

        printConsole('ER', 'OCURRIO UN ERROR EN EL API [obtener-canales]', jqXHR);
    });
}

function obtenerTopProgramas(idCanal) {

    //printConsole('', 'INICIANDO EL SERVICIO [obtener-top-canales]');

    $.ajax({
        url: '/assets/media/infoCanales.json',
        dataType: "json",
    }).done(function (respuesta) {
        //printConsole('', 'SERVICIO [obtener-top-canales] RESPONDE', respuesta);

        try{
            var informacion = JSON.parse(respuesta.datos.informacion);
            //printConsole('', 'INFORMACION PROGRAMAS');
            console.table(informacion)

            $('#cntDescripcionPrograma').html(informacion[0]['description']);

            validarContenidoImagen(informacion[0], 'imgDescripcion_1', 'txtDescripcion_1', 'assets/img/canal_first.png');
            validarContenidoImagen(informacion[1], 'imgDescripcion_2', 'txtDescripcion_2', 'assets/img/canal_second.png');
            validarContenidoImagen(informacion[2], 'imgDescripcion_3', 'txtDescripcion_3', 'assets/img/canal_second.png');
        }catch(e){
            
            console.log('OCURRIO ALGO INESPERADO EN LA FUNCION [obtenerTopProgramas] con el ID CANAL ['+idCanal+']ERROR['+e+']');
        }
    }).fail(function (jqXHR, textStatus) {
        console.log('OCURRIO UN ERROR EN EL API [obtener-top-canales] con el ID CANAL ['+idCanal+']', jqXHR);
        
    });
}

function validarContenidoImagen(informacion, idImg, idTxt, imgDefault){

    var srcImageProg_1 = '';
    var objImagen = informacion;

    try{
        var descriptionPrograma = objImagen['description'];
        $('#'+idImg).attr('data-descripcion', descriptionPrograma);

        if(informacion['images']['COVER'] != undefined){
            
            srcImageProg_1 = 'https://imgn.cdn.iutpcdn.com/IMGS/'+objImagen['images']['COVER']['category']+'/COVER/'+objImagen['images']['COVER']['misId']+'-8c.'+objImagen['images']['COVER']['ext'];
            $('#'+idImg).attr('src', srcImageProg_1);
        }
    }catch(e){
        try{
            var descriptionPrograma = objImagen['name'];
            $('#'+idImg).attr('src', imgDefault);
            $('#'+idImg).attr('data-descripcion', descriptionPrograma);
        }catch(e){
            $('#'+idImg).attr('src', imgDefault);
            $('#'+idImg).attr('data-descripcion', 'Programacion Totalplay');
        }
            
    }
}

function obtenerCanalesParrilla(){
    $("body").on('click', '.botonParrilla', function() {

        
        var arregloTexto = ['80 canales, 35 en HD','120 canales, 80 en HD.','255 canales, 130 en HD.','275 canales, 160 en HD.']
        var tipo = $(this).attr('data-tipo');
        var tmCode = $(this).attr('data-code');

        $('#textoTipoParrilla').html('Disfruta de '+ arregloTexto[tipo]);
        $('#cntCanales').remove();
        $('.botonParrilla').removeClass('parrillaSeleccionada');
        $(this).addClass('parrillaSeleccionada');

        obtenerCanales(tmCode);
    });
}
