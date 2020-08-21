export class Comparativa {

    constructor(){

        this.props = {
            touchContainer: document.querySelector('.comparator-description2'),
            itemsContainer: document.querySelector('.comparator-description__cards2'),
            item: document.querySelector('.card-item2'),
            totalItems: [...document.querySelectorAll('.card-item2')].length,
            itemSize: document.querySelector('.card-item2').clientWidth,
            btnBack: document.querySelector('.comparator-indicator__back'),
            btnNext: document.querySelector('.comparator-indicator__next'),
            cont: 0,
            parts: 0,
            initPosition: 0,
            moveX: 0
        }
        this.init();
    }//Termina constructor

    //Función que inicia variables para la página de ventajas
   init(){
       //establece la clase activa
        this.props.btnNext.classList.add( 'active' );
        //Obtiene la posicion incial del contenedor de tarjetas
        this.props.initPosition = Math.round( window.innerWidth - this.props.touchContainer.getBoundingClientRect().left );
        //Obtiene el numero de tarjetas activas en la pantalla
        this.props.parts =  Math.round( this.props.initPosition / this.props.itemSize );
        //Obtiene el tamaño de la lista no visble en pantalla
        this.props.moveX = Math.round( this.props.itemsContainer.clientWidth - ( window.innerWidth - this.props.itemsContainer.getBoundingClientRect().left ) ) + 24;
        this.resizeScreen();
        this.touchEvents();
        this.moveNext();
        this.moveBack();
   }//Termina función

   //Obtiene el tamaño real de un elemento, recibe el elemento html que necesitemos saber su tamaño
   getSizeItem( _element ) {
        let style = _element.currentStyle || window.getComputedStyle( _element ),
            widthItem = _element.offsetWidth,
            marginLeft = parseInt( style.marginLeft ),
            marginRight = parseInt( style.marginRight );
        return widthItem + marginLeft + marginRight;
    }//Termina función

    //Mueve el contenedor de la lista de elementos hacia adelante
    moveNext(){
        //Evento ejecutado al click del boton 
        this.props.btnNext.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.next();
        });
    }//Termina función

    //Mueve el contenedor de la lista de elementos hacia atras
    moveBack(){
        //Evento ejecutado al click del boton
        this.props.btnBack.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.back();
        });
    }//Termina función

    //Mueve la lista hacia atras
    back(){
        let sizeItem = this.getSizeItem( this.props.item );
        ( this.props.cont > 0 ) ? this.props.cont-- : this.props.cont;
        if( this.props.cont === 0 ) this.props.btnBack.classList.remove( 'active' );
        if( this.props.cont >= 0 ) this.props.btnNext.classList.add( 'active' );
        this.props.itemsContainer.style.cssText = `transform: translateX( -${ sizeItem * ( this.props.cont ) }px );`;
    }//Termina función

    //Mueve la lista hacia adelantee
    next(){
        let sizeItem = this.getSizeItem( this.props.item );
        console.log("cont "+this.props.cont);
        ( this.props.cont < (this.props.totalItems - this.props.parts )) ? this.props.cont++ : this.props.cont;
        console.log("cont after "+this.props.cont);
        if( this.props.cont > 0 ){
            this.props.btnBack.classList.add( 'active' );
        } 
        if( this.props.cont >= (this.props.totalItems - this.props.parts ) ) {
            this.props.btnNext.classList.remove( 'active' );
        }
        this.props.itemsContainer.style.cssText = `transform: translateX( -${ sizeItem * ( this.props.cont ) }px );`;
    }//Termina función

    touchEvents(){
        let initPosition = this.props.touchContainer.getBoundingClientRect().left;
        let initTouches = 0;
        let changeTouches = 0;
        let difTouches = 0;
        let moveInString = false;
        this.props.touchContainer.addEventListener( 'touchstart', (e) => {
            e.preventDefault();
            initTouches = e.changedTouches[0].clientX - initPosition;
        }, false);
        this.props.touchContainer.addEventListener( 'touchmove', (e) => {
            e.preventDefault();
            changeTouches = e.changedTouches[ 0 ].clientX - initPosition;
            difTouches = Math.round( initTouches - changeTouches );
            moveInString = ( initTouches > changeTouches ) ? true : false;//derecha - izquierda 
            if( moveInString ){ 
                console.log('next');
            }else{
                console.log('back');
            }
        }, false);
        this.props.touchContainer.addEventListener( 'touchend', (e) => {
            e.preventDefault();
            if( moveInString ){ //derecha
                this.next();
            }else { //izquierda
                this.back();
            }
        }, false);
    }//Termina función

    //Función para el resize de la ventana
    resizeScreen(){
        let resizeId = 0;
        window.addEventListener( 'resize', () => {
            clearTimeout( resizeId );
            resizeId = setTimeout( () => this.doneResize(), 250 );
        } );
    }//Termina función

    doneResize(){
        this.props.itemsContainer.removeAttribute('style');
        this.props.btnBack.classList.remove( 'active' );
        this.props.btnNext.classList.add( 'active' );
        this.props.cont = 0;
        this.props.initPosition = Math.round( window.innerWidth - this.props.touchContainer.getBoundingClientRect().left );
        this.props.parts =  Math.round( this.props.initPosition / this.props.itemSize );
        //Obtiene el tamaño de la lista no visble en pantalla
        this.props.moveX = Math.round( this.props.itemsContainer.clientWidth - ( window.innerWidth - this.props.itemsContainer.getBoundingClientRect().left ) ) + 24;
    }//Termina función

}//Termina clase