export class TVCarrusel {
    constructor(_id,) {
        this.props = {
            window:     window.outerWidth,
            container:  document.getElementById(_id),
            data:       [
                            {img: 'assets/img/tv/OnDemand-FULL.jpg'},
                            {img: 'assets/img/tv/HBO-FULL.jpg'},
                            {img: 'assets/img/tv/YouTube-FULL.jpg'}
                        ],
            focus:      0
        }
        this.initTV();
    }

    initTV(){
        this.createTV();
    }

    //Creacion de objetos de slider en el DOM
    createTV(){
        let data = this.props.data,
            imgs = '',
            indicators = '';
        data.map((_res, _key) => {
            imgs += `<li s="${_key}"><img src=${_res.img}></li>`;
            indicators += `<li s="${_key}"><div></div></li>`;
        });
        let content = `<ul class="tv"><div></div><div><ul>${imgs}</ul></div><div></div></ul><ul class="bookmarks_tv">${indicators}</ul>`;
        this.props.container.innerHTML = content;//contenedor de slider
        this.props.imgs = this.props.container.children[0].children[1].children[0].children;//li con imagen
        this.props.indicators =  this.props.container.children[1].children;//indicadores
        this.props.imgs[this.props.focus].classList.add('active');
        this.focusItem();
    }
    
    //Imagen siguiente a la del focus
    focusItem(){
        let item = this.props.imgs[0],
            next = item.nextElementSibling,
            container = this.props.container.children[0].children[1].children[0],
            bar = this.props.indicators[this.props.focus];
            bar.style.cssText ='justify-content: flex-start;';
            bar.children[0].classList.remove('fromLeft');
            bar.children[0].classList.add('toRight');
            item.classList.add('active');
        if(item.classList.contains('active')){
            item.classList.add('close');
            next.classList.add('open');
            setTimeout(()=>{
                bar.style.cssText ='justify-content: flex-end;';
                //bar.classList.add('close');
                bar.children[0].classList.add('fromLeft');
                bar.children[0].classList.remove('toRight');
                item.removeAttribute('class');
                item.remove();
                container.appendChild(item);
                this.ctrlFocus();
            }, 3400);
        }
    }

    //Elemento principal 'focus'
    ctrlFocus() {
        if(this.props.focus >= this.props.data.length - 1) this.props.focus = 0;
        else if(this.props.focus < 0) this.props.focus = this.props.data.length - 1;
        else this.props.focus += 1;
        this.focusItem();
    }
}


