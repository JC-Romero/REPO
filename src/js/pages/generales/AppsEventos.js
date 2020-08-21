export class AppsEventos {

    constructor(container) {
    
        this.props = {
            container:  document.getElementById(container),
            elementBtn: document.getElementById('viewMore'),
            elementContApps: document.querySelector('.tv__channels'),
            elementsApps: [...document.querySelectorAll('.tv__channels img')],
            showItems: null,
            elementItem: null,
            window: null,
            culumns: null
        }
        this.initialize();
    }

    initialize(){
         let paddingContent = parseInt(window.getComputedStyle(this.props.elementContApps).getPropertyValue('padding-top'));
        this.props.elementItem = this.props.elementsApps[0].getBoundingClientRect().height + parseInt(window.getComputedStyle(this.props.elementsApps[0]).getPropertyValue('margin-bottom'));
        this.props.window = window.innerWidth;
       
        this.props.columns = (this.props.window < 768) ? (this.props.elementItem*3)+10 : (this.props.elementItem*2)+10;
        var cuantos=this.props.elementsApps.length;
        if(this.props.window < 768 && this.props.elementsApps.length >= 9) {
            //console.log('mayor a 9 oculta y pone boton ... ');
            this.props.showItems = true;     
            this.props.elementBtn.style.display = 'flex';

        }else if( this.props.window >= 768 && this.props.elementsApps.length > 10){
            console.log('mayor a 768 : ', this.props.columns)
            this.props.showItems = true;        
            this.props.elementBtn.style.display = 'flex';

        }else{
            this.props.elementBtn.style.display = 'none';

        }

        this.btnViewMore(cuantos);
        this.resize();
        this.listenersImgs();
    }
    listenersImgs(){
        $("#servicioAppsImg img").on("click",function(){
          
          var nombre = $(this).attr("alt");
          //var pagina=nombre.replace(/ /g, '').toLowerCase()+".html";
          //console.log("-------"+pagina);
          if(nombre!=""){window.location = nombre;}
        });
    }
    resize () {
        
        addEventListener('resize', () => {
            //console.log('this.props.columns: ', console.log('this.props.columns'));
            this.props.window = window.innerWidth;
            // let paddingContent = parseInt(window.getComputedStyle(this.props.elementContApps).getPropertyValue('padding-top'));
            this.props.elementItem = this.props.elementsApps[0].getBoundingClientRect().height + parseInt(window.getComputedStyle(this.props.elementsApps[0]).getPropertyValue('margin-bottom'));
            //this.props.columns = (this.props.window < 768) ? (this.props.elementItem*3)+10 : (this.props.elementItem*2)+10;
            this.props.columns = (this.props.window < 768) ? (this.props.elementItem*3) : (this.props.elementItem*2);
            this.props.elementContApps.style.height = `${this.props.columns}px`;  
            //console.log('height: ', this.props.columns);
            this.props.showItems = true;
            this.props.elementBtn.innerText = 'ver todas';

             
        });
    }


    btnViewMore(cuantos) {
        console.log("-----------------"+cuantos);
        this.props.elementBtn.addEventListener('click', () => {
            let lastItem = this.props.elementContApps.lastElementChild;
            if(this.props.showItems){
                lastItem.style.marginRight = "0";
                this.props.showItems = false;
                if( window.innerWidth <500){
                    var hg=Math.floor(11/3)-2;
                    var tam=hg*76;
                    this.props.elementContApps.style.height = this.props.elementContApps.clientHeight + tam+'px';
                }
                if( window.innerWidth >= 500 && window.innerWidth < 768 ){
                     var hg=Math.floor(11/3)-2;
                    console.log("hg---"+hg);
                    this.props.elementContApps.style.height = this.props.elementContApps.clientHeight + 130+'px';
                }
                if( window.innerWidth >= 768 && window.innerWidth < 1100 ){
                    this.props.elementContApps.style.height = this.props.elementContApps.clientHeight + 130+'px';
                }
                if( window.innerWidth >= 1100 && window.innerWidth < 1700 ){
                    this.props.elementContApps.style.height = this.props.elementContApps.clientHeight + 130+'px';
                }
                if( window.innerWidth >= 1700 ){
                    this.props.elementContApps.style.height = this.props.elementContApps.clientHeight + 130+'px';
                }
                this.props.elementBtn.innerText = 'mostrar menos';
            }else{
                this.props.showItems = true;
                this.props.elementContApps.removeAttribute('style');
                this.props.elementBtn.innerText = 'ver todas';
            }

        });

    }
}