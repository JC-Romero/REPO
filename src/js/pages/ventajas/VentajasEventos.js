//cambiar a paso por referencia todo
export  class VentajasEventos{
    constructor(_id, _data, _position) {
        this.props = {
            window: window.innerWidth,
            container: document.getElementById(_id),
            data: _data,
            focus: 0,
            cont: 0,
            restItems: 0,
            activeItems: 0,
            position: _position,
            movil: true,
            desktop: true
        }

        if (this.props.position == 'none'){
          this.initPackage();  
        }else if(this.props.position == 'left' || this.props.position == 'right'){
            this.props.window >= 1100 ? this.initDesk() : this.initMovil();
        }
        this.resize();
    }

    initPackage(){
        this.movePromotions();
        this.initPromotions();
        this.nextBlock();
        this.prevBlock();
        this.props.movil = false;
        this.props.desktop = false;
    }

    initMovil() {
        if (this.props.movil) {
            this.create();
            this.touch();
            this.clickWeb();
            this.props.movil = false;
            this.props.desktop = true;
        }
        this.center();
        this.props.cards[1].classList.add('active');
    }

    initDesk() {
        if (this.props.desktop && this.props.position !== 'none') {
            this.createDesk();
            this.props.desktop = false;
            this.props.movil = true;
        }
    }

    create() {
        let slider = '',
            data = this.props.data;
        data.map((_res, _key) => {
            let title = `<div class="list-cards__item--title"><p>${_res.title}</p></div>`,
                body = `<div class="list-cards__item--description"><p>${_res.body}</p></div>`,
                header = `<div class="list-cards__item--image" style="background: url('${_res.img}') no-repeat; background-size: cover; background-position: center; "></div>`;
            slider += `<li class="promotions-list-cards__item" s=${_key}>${header}<div class="list-cards__item--content">${title}${body}</div></li>`;
        });
        this.props.container.innerHTML = slider;
        this.props.cards = this.props.container.children;
        this.props.container.classList.remove('time', this.props.position);
    }

    
    createDesk() {
        let data = this.props.data;
        let titles = '';
        let imgs = '';
        let h1 = '';
        let aux = 0;
        // if (this.props.position !== 'left') {
        //     h1 = this.props.container.previousElementSibling.cloneNode(true);
        //     this.props.container.previousElementSibling.classList.add('left');
        // }
        data.map((_res, _key) => {
            titles += `<li s="${_key}"><h1>${_res.title}</h1><div><p>${_res.body}</p></div><span></span></li>`;
            imgs += `<li s="${_key}"><div style="height: auto"><img src="${_res.img}"></div></li>`;
        });
        let content = `<ul class="titles">${titles}</ul><ul class="imgs">${imgs}</ul>`;
        this.props.container.innerHTML = content;
        this.props.container.classList.add('time', this.props.position);
        this.props.imgs = this.props.container.children[1].children;
        this.props.titles = this.props.container.children[0].children;
        this.props.container.children[0].prepend(h1);
        if (this.props.position !== 'left') aux += 1;
        this.props.imgs[this.props.focus].classList.add('active');
        this.props.titles[this.props.focus + aux].classList.add('active');
        this.progress();
        this.click();
        if (this.props.position !== 'left') this.moveImg();
    }

    center() {
        let container = this.props.container,
            windows = this.props.window,
            card = this.props.cards[0],
            cardStyle = card.currentStyle || window.getComputedStyle(card),
            left = (((card.offsetWidth * 3) + (parseInt(cardStyle.marginRight) * 2)) / 2) - (windows / 2);
        container.style.left = `-${left}px`;
        this.props.leftContainer = parseInt(container.style.left);
    }

    activeItems(){
        this.props.window = window.innerWidth;
        let windows = this.props.window,
            card = this.props.cards[0], 
            cardStyle = card.currentStyle || window.getComputedStyle(card),
            cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight),
            activeItems = Math.round((windows-this.props.paddingLeft)/cardWidth);
        return(activeItems);
    }

    movePromotions() {
        this.props.window = window.innerWidth;
        let container = this.props.container,
            windows = this.props.window,
            card = this.props.cards[0],
            cardStyle = card.currentStyle || window.getComputedStyle(card),
            left = 0;
            if (this.props.window >= 500 && this.props.window < 768) left = (((card.offsetWidth * 3) + (parseInt(cardStyle.marginRight) * 2)) / 2) - (windows / 2);
            //else if(this.props.window >= 768 && windows < 1100) left = (((card.offsetWidth * 4) + (parseInt(cardStyle.marginRight) * 3)) / 2) - (windows / 2);   
            else left = (((card.offsetWidth * 5) + (parseInt(cardStyle.marginRight) * 4)) / 2) - (windows / 2);
            //container.style.left = `-${left/2}px`;
        this.props.leftContainer = parseInt(container.style.left);
        //console.log('leftContainer: ', this.props.leftContainer);
    }

    initPromotions(){
        this.props.window = window.innerWidth;
        this.props.activeItems = this.activeItems();
        let container = this.props.container, 
            windows = this.props.window,
            paddingLeft = 0,
            card = this.props.cards[0],
            cardStyle = card.currentStyle || window.getComputedStyle(card);
        // if(this.props.window >= 500 && this.props.window < 768) paddingLeft = (windows - (card.offsetWidth + parseInt(cardStyle.marginRight)))/2 + 12;
        // if(this.props.window >= 768 && this.props.window < 1100) paddingLeft = (windows - ((card.offsetWidth + parseInt(cardStyle.marginRight))*2))/2 + 12;
        if(this.props.window >= 1100 && this.props.window < 1400) paddingLeft = (windows - ((card.offsetWidth + parseInt(cardStyle.marginRight))*3))/2 + 12;
        if(this.props.window >= 1400 && this.props.window < 1700) paddingLeft = (windows - ((card.offsetWidth + parseInt(cardStyle.marginRight))*3))/2 + 23;
        if(this.props.window >= 1700 && this.props.window < 2500) paddingLeft = (windows - ((card.offsetWidth + parseInt(cardStyle.marginRight))*4))/2 + 26;
        if(this.props.window >= 2500) paddingLeft = (windows - ((card.offsetWidth + parseInt(cardStyle.marginRight))*6))/2 + 26;
  
        this.props.paddingLeft = paddingLeft;
        let widthArrow = (windows - (this.activeItems() * (card.offsetWidth + parseInt(cardStyle.marginRight))))/2;
        container.style.paddingLeft = `${paddingLeft}px`;
        this.props.prevItem.style.width = `${widthArrow}px`;
        this.props.nextItem.style.width = `${widthArrow}px`;
        this.props.restItems = this.props.cards.length;
        //console.log('widthArrow: ', widthArrow);
    }

    nextBlock(){
        this.props.window = window.innerWidth;
        let card = this.props.cards[0], 
            cardStyle = card.currentStyle || window.getComputedStyle(card),
            cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight),
            active = this.activeItems(),
            totalParts = Math.round((this.props.cards.length-1) / active);
            // console.log('totalPlarts: ', totalParts);
            // console.log('active: ', active);
            // console.log('restItems: ', this.props.restItems);
        if(this.props.window >= 500){
            this.props.nextItem.classList.add('active');

            this.props.nextItem.addEventListener('click', ()=>{

            this.props.restItems < 0 
                ? this.props.restItems = 0 : this.props.restItems - active < 0 
                    ? this.props.restItems = 0 : this.props.restItems = this.props.restItems - active;
            

                // console.log('this.props.restItems', this.props.restItems);
                // console.log('next', this.props.cont);
                if(this.props.cont < totalParts){

                    //console.log('---restItems: ', this.props.restItems);

                    this.props.cont < totalParts ? this.props.cont = this.props.cont+1 : this.props.cont = totalParts;

                    this.props.cont > 0 ? this.props.prevItem.classList.add('active') : this.props.prevItem.classList.remove('active');

                    this.props.container.style.left = `-${(active * cardWidth) * this.props.cont}px` 
                //Menor a active items
                    this.props.restItems == active
                        ? this.props.container.style.left = `-${(this.props.restItems * cardWidth) * this.props.cont}px`
                        : this.props.container.style.left = `-${(active * cardWidth) * this.props.cont}px`;

                    // this.props.indicators[this.props.cont].classList.add('active');
                    // this.props.indicators[this.props.cont-1].classList.remove('active');

                }
                 if(this.props.cont == totalParts) this.props.nextItem.classList.remove('active');
            });
        }
    }

    prevBlock(){
        this.props.window = window.innerWidth;
        let card = this.props.cards[0], 
            cardStyle = card.currentStyle || window.getComputedStyle(card),
            cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight),
            active = this.activeItems(),
            totalParts = Math.round((this.props.cards.length-1) / active);
            //console.log('totalPlarts: ', totalParts);
        if(this.props.window >= 500){

            this.props.nextItem.classList.add('active');
            this.props.prevItem.addEventListener('click', ()=>{

                if(this.props.cont > 0){
                    this.props.cont < 0 ? this.props.cont = 0 : this.props.cont = this.props.cont -1;

                    this.props.container.style.left = `-${(active * cardWidth) * this.props.cont}px`;

                    this.props.indicators[this.props.cont].classList.add('active');
                    this.props.indicators[this.props.cont+1].classList.remove('active');
                }
                
                this.props.cont <= 0 ? this.props.prevItem.classList.remove('active') : this.props.nextItem.classList.add('active');

            });
        }
    }

    resize() {
        addEventListener('resize', () => {
            this.props.window = window.innerWidth;
            if(this.props.position == 'none'){
                this.initPackage();
            }else if(this.props.position == 'left' || this.props.position == 'right'){
                if (this.props.window >= 1100){
                    this.initDesk();
                }else {
                    if (this.props.timer) clearInterval(this.props.timer);
                    this.initMovil();
                }
            }
        });
    }

    touch() {
        let container = this.props.container,
            cards = this.props.cards;

        var elementos = document.getElementsByClassName('promotions-list-cards__item');
        for(var i = 0; i < elementos.length; i++){
            elementos[i].style.opacity = "0.5";
        }

        if (this.props.window < 1100) {
            let start = 0;
            container.addEventListener('touchstart', _event => start = _event.changedTouches[0].clientX);
            container.addEventListener('touchmove', _event => {
                let dif = _event.changedTouches[0].clientX - start;
                Object.keys(cards).map(_key => {
                    cards[_key].style.left = `${dif}px`;
                });
            });
            container.addEventListener('touchend', _event => {
                let dif = start - _event.changedTouches[0].clientX;
                if (dif > (this.props.window / 3)) this.after();
                else if (Math.abs(dif) > (this.props.window / 3)) this.before();
                Object.keys(cards).map(_key => {
                    cards[_key].removeAttribute('style');
                });
            });
        }
    }

    click() {
        Object.keys(this.props.titles).map(_res => {
            let focus = parseInt(this.props.titles[_res].getAttribute('s'));
            if (!isNaN(focus)) {
                this.props.titles[_res].addEventListener('click', () => {
                    if (this.props.focus !== focus) this.moveClick(this.props.titles[_res]);
                });
            }
        });
    }

    clickWeb() {
        for (let _card of this.props.cards) {
            _card.addEventListener('click', () => {
                if (!_card.classList.contains('active')) {
                    let position = _card.getBoundingClientRect().left;
                    if (position > 0) this.after();
                    else this.before();
                }

            });
        }
    }

    moveClick(_title) {
        clearInterval(this.props.timer);
        let aux = 0;
        //if (this.props.position !== 'left') aux++;
        let activeTitle = this.props.titles[this.props.focus + aux];
        let activeImg = this.props.imgs[this.props.focus];
        activeTitle.children[2].children[0].remove();
        activeTitle.classList.remove('active');
        activeImg.classList.remove('active');
        this.props.focus = parseInt(_title.getAttribute('s'));
        _title.classList.add('active');
        this.props.imgs[this.props.focus].classList.add('active');
        if (this.props.position !== 'left') this.moveImg();
        this.progress();
    }

    after() {
        let item = this.props.cards[0],
            container = this.props.container;
            item.style.opacity
        item.classList.add('close');
        
        for(var i = 0; i < this.props.cards.length; i++){
            this.props.cards[i].style.opacity="0.5";
        }

        this.props.cards[1].classList.remove('active');
        setTimeout(() => {
            item.remove();
            item.classList.remove('close');
            container.append(item);
            this.props.cards[1].classList.add('active');
            this.props.cards[1].style.opacity = "1";
        }, 250);
    }

    afterDesk() {
        let aux = 0;
        //if (this.props.position !== 'left') aux += 1;
        this.props.imgs[this.props.focus].classList.remove('active');
        this.props.titles[this.props.focus + aux].classList.remove('active');
        this.ctrlFocus();
        this.props.titles[this.props.focus + aux].classList.add('active');
        this.props.imgs[this.props.focus].classList.add('active');
        if (this.props.position !== 'left') this.moveImg();
        this.progress();
    }

    moveImg() {
        let img = this.props.imgs[0];
        Object.keys(this.props.imgs).map(_res => {
            this.props.imgs[_res].style.transform = `translateY(-${this.props.focus * 100}%)`;
        });
    }

    before() {
        let end = this.props.data.length - 1,
            item = this.props.cards[end],
            container = this.props.container;
        item.remove();
        item.classList.add('open');
        container.prepend(item);
        this.props.cards[2].classList.remove('active');

        for(var i = 0; i < this.props.cards.length; i++){
            this.props.cards[i].style.opacity="0.5";
        }

        setTimeout(() => {
            item.classList.remove('open');
            this.props.cards[1].classList.add('active');
            this.props.cards[1].style.opacity = "1";
        }, 250);
    }

    ctrlFocus() {
        if (this.props.focus >= this.props.data.length - 1) this.props.focus = 0;
        else if (this.props.focus < 0) this.props.focus = this.props.data.length - 1;
        else this.props.focus += 1;
    }

    progress() {
        let aux = 0;
        let time = 70;
        // if (this.props.position !== 'left') {
        //     aux++;
        //     time = 90;
        // }
        let bar = this.props.titles[this.props.focus + aux].children[2];
        let progress = 0;
        bar.innerHTML = '<div></div>';
        this.props.timer = setInterval(() => {
            progress += 1;
            bar.children[0].style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(this.props.timer);
                bar.children[0].remove();
                this.afterDesk();
            }
        }, time);

    }
}

