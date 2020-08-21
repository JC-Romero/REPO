export class Chat {

    constructor(_element) {

        this.props = {
            element: document.getElementById(_element),
            scroll: window.scrollY + window.innerHeight,
            footer: document.getElementById('footer'),
            slider: document.getElementById('videoBanner')
        }

        this.init()
    }

    init() {    
        
        this.props.sliderBottom = this.props.slider.getBoundingClientRect().bottom;
        setTimeout( () => {
            this.props.sliderBottom = this.props.slider.getBoundingClientRect().bottom;
            this.setPosition();
            this.getAttributes();
        }, 30 );
        this.scroll();

        $("#chatVentas").on("click", function() {
            window.open(
                "https://www.totalplay.online/totalplaytelemarketing/chatbeacon/content/windows/chat.html?accountid=3&siteid=3&queueid=3&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $("#chatAC").on("click", function() {
            window.open(
                "https://www.totalplay.online/totalplayatencion/chatbeacon/content/windows/chat.html?accountid=1&siteid=1&queueid=1&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

        $("#chatST").on("click", function() {
            window.open(
                "https://www.totalplay.online/totalplaysoporte/chatbeacon/content/windows/chat.html?accountid=2&siteid=2&queueid=2&theme=blue&popout=true",
                "cbchat",
                "left=20,top=20,width=315,height=570,resizable=0"
            );
        });

               
    }

    scroll() {
        let aux = false, stop;    
        addEventListener('scroll', () => {
            this.props.scroll = window.scrollY + window.innerHeight;
            this.props.footerTop = this.props.footer.getBoundingClientRect().top - window.innerHeight;
            if(this.props.scroll >= this.props.elementBottom) {
                this.props.element.setAttribute('style', 'position: fixed; top:auto');
            } else this.setPosition();
            if(this.props.footerTop <= 0){
                this.props.element.style.position = 'absolute';  
                if(aux === false){
                    stop = this.props.scroll - this.props.element.offsetHeight;
                    aux = true;
                }
                this.props.element.style.top = stop+'px';
            }else aux = false;    
        });
    }

    setPosition() {
        this.props.element.removeAttribute('style');
        if(window.innerHeight < (this.props.sliderBottom + 100)) this.props.element.style.position = 'absolute';
        else this.props.element.setAttribute('style', 'position: fixed; top:auto');
    }

    getAttributes() {
        this.props.elementBottom = this.props.element.getBoundingClientRect().bottom + 100;
        this.props.footerTop = this.props.footer.getBoundingClientRect().top - window.innerHeight;
        this.props.scroll = window.scrollY + window.innerHeight;
    }
}
