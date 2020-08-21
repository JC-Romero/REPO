import * as Constantes from "../../utils/Constantes";
import {Chat} from './Chat';
import {cargaapps} from '../generales/cargaApps';
import {Paquetes} from '../paquetes/Paquetes';

var cms;
export class Indexprincipal {

    constructor() {
        this.props = {
            windowW: window.innerWidth,
            cont: 0,
            cont2: 10,
            container: document.getElementById('cardsPackage')
        }
        cms=Constantes.cms;
        this.init();
        this.resize();
        this.setKeyupInput();
       this.obtenerDireccion();
    }
    
    init(){
        localStorage.setItem('SUGERENCIA_SELECCIONADA', 0);
        if(localStorage.getItem('TP_ESTIMULO_CIUDAD') == undefined || localStorage.getItem('TP_ESTIMULO_CIUDAD') == null || localStorage.getItem('TP_ESTIMULO_CIUDAD') == ''  ){
            localStorage.setItem('TP_ESTIMULO_CIUDAD','false');
        }
        
        this.setListeners();
        this.validaciones();
        cargaapps(1);
        const chat = new Chat('sectionChat');
        this.props.packCards = [...document.getElementsByClassName('card-package-item')];
        this.props.indicators = [...document.getElementById('detailPackageIndicatorsIndex').children];
        //this.validarPermisosUbicacion();
        
    }

    resize() {
        addEventListener('resize', () => {
            this.props.windowW = window.innerWidth;
            this.props.cont = 0;
            this.props.cont2 = 10;
            this.props.container.style.left = '0px';
            if (this.props.windowW < 1100) this.clickCards();
        });
    }

    clickCards() {
        this.props.windowW = window.innerWidth;
        if (this.props.windowW < 1100) {
            for (let _card of this.props.packCards) {
                _card.addEventListener('click', (e) => {
                    console.log("click card");
                    let item = e.target,
                        moveX = this.getSizeItem(item);
                    if (item == this.props.packCards[0]) {
                        this.props.container.style.left = `${moveX}px`;
                        this.props.packCards[0].classList.add('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.indicators[0].classList.add('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                    } else if (item == this.props.packCards[2]) {
                        this.props.container.style.left = `-${moveX}px`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.add('active');
                    } else {
                        this.props.container.style.left = '0px';
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.packCards[1].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                        this.props.indicators[1].classList.add('active');
                    }
                });
            }
            for (let _indicator of this.props.indicators) {
                _indicator.addEventListener('click', (e) => {
                    let item = e.target,
                        moveX;
                    if (item == this.props.indicators[0]) {
                        moveX = this.getSizeItem(this.props.packCards[0]);
                        this.props.container.style.left = `${moveX}px`;
                        this.props.packCards[0].classList.add('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.indicators[0].classList.add('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                    } else if (item == this.props.indicators[2]) {
                        moveX = this.getSizeItem(this.props.packCards[2]);
                        this.props.container.style.left = `-${moveX}px`;
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[1].classList.remove('active');
                        this.props.packCards[2].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[1].classList.remove('active');
                        this.props.indicators[2].classList.add('active');
                    } else {
                        this.props.container.style.left = '0px';
                        this.props.packCards[0].classList.remove('active');
                        this.props.packCards[2].classList.remove('active');
                        this.props.packCards[1].classList.add('active');
                        this.props.indicators[0].classList.remove('active');
                        this.props.indicators[2].classList.remove('active');
                        this.props.indicators[1].classList.add('active');
                    }
                });
            }
        }
    }

    getSizeItem(_element) {
        let style = _element.currentStyle || window.getComputedStyle(_element),
            widthItem = _element.clientWidth,
            marginLeft = parseInt(style.marginLeft),
            marginRight = parseInt(style.marginRight);
        return widthItem + marginLeft + marginRight;
    }

    cmsGetSplashInicio(){
        return new Promise((done,reject)=>{
            let statusReq=false;
            let urlCMS=cms.host+cms.getSplash;
            fetch(urlCMS, {method: 'GET'}).then(data=>{
                if (data.ok) { statusReq=true; return data.json();
                } else { reject("error en la peticion"); throw "Error en la llamada Ajax"; }  
            }).then(function(respuesta) {
                if(!statusReq){ reject("error en la peticion"); return false; }
                if(respuesta!=undefined && respuesta.length > 0){
                    let splash="";
                    let numSplash=0;
                    respuesta.forEach((element,index) => {
                        let titulo=element.titulo;
                        if(element.imagensplash != null){
                            numSplash++;
                            splash = element.imagensplash.url;
                        }
                    });
                    if(numSplash == 1){
                        $("#id_imagenSlash").attr('src', splash);
                        setTimeout(() => {
                            $("#id_boton_Splash").click();
                        }, 500);
                    }
                }else{
                    setTimeout(() => {
                        $("#id_boton_Splash").click();
                    }, 500);
                    reject("no se encontro ningun banner");
                }
            });
        });
    }

    setListeners(){
        let apuntador = this;
        $("#barBanner").on("click",function(){
            $("#headerCobertura").css("display", "flex");
            $(".main-index").css({"overflow-y":"hidden"});
            $('#headerNombre').focus();
        });

        $("#closeCoberturaLead").on("click",function(){
            $("#headerCobertura").css("display", "none");         
            $(".main-index").removeAttr("style");   
        });

        $("#btnConfirmCobertura").on("click",function(){
            $("#headerCobertura").css("display", "none");
            $(".main-index").removeAttr("style");  
            apuntador.regresarContenedorLead();
        });

        $("#portalEmpresarial").on("click",function(){
            window.open("https://totalplayempresarial.com.mx/");
        });

        $("#portalNegocio").on("click",function(){
             window.open("https://www.negociostotalplay.com.mx/");            
        });

        $("#btnCoberturaSeccionPaquete").on("click",function(){
            $("#modalMenu").css("display", "block");
            $("#modalContentForm").css("top","0");
            $("#step0").css("display","flex");            
        });

        $("#segu-Jus").on("click", function(){
            var oculto = document.getElementById('divJusticia').style.display;
            console.log(oculto);
            if(oculto == 'none'){
                $("#divJusticia").css('display','block');
            }else{
                $("#divJusticia").css('display','none');
            }
        });
    }

    validaciones(){
        var apuntador = this;

        $('.letras').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú";
            var especiales = [8, 37, 39]; //RETROCESO, <-, ->
            var especialesNO = [39]; //'
      
            var tecla_especial = false
            for(var i in especiales) {
                if(key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if(key == especialesNO[i]){
                    tecla_especial = false;
                    break;
                }
            }
      
            if(letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        } );

        $('.direccion').keypress(function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = " abcdefghijklmnñopqrstuvwxyzáéíóú1234567890";
            var especiales = [8, 37, 39]; //RETROCESO, <-, ->
            var especialesNO = [39]; //'
      
            var tecla_especial = false
            for(var i in especiales) {
                if(key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
                if(key == especialesNO[i]){
                    tecla_especial = false;
                    break;
                }
            }
      
            if(letras.indexOf(tecla) == -1 && !tecla_especial)
                return false;
        } );

        $('.solo-numeros').keydown(function(e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $('#btnCoberturaHeader').on('click',function(){
            var procesa = true;
            var nombre =  $.trim($('#headerNombre').val());
            var correo =  $.trim($('#headerCorreo').val());
            var telefono =  $.trim($('#headerTel').val());
            var codigoPostal =  $.trim($('#headerCP').val());

            console.log(nombre);
            console.log(correo);
            console.log(telefono);
            console.log(codigoPostal);


            if(apuntador.esVacio(nombre)){
                $("#errorNombre").css("display","block");
                $("#errorNombre").html("*Campo obligatorio");
                procesa = false;
            }
            
            if(apuntador.esVacio(correo)){
                $("#errorCorreo").css("display","block");
                $("#errorCorreo").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaEmail(correo)){
                    $("#errorCorreo").css("display","block");
                    $("#errorCorreo").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }
            
            if(apuntador.esVacio(telefono)){
                $("#errorTel").css("display","block");
                $("#errorTel").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validaTelefono(telefono)){
                    $("#errorTel").css("display","block");
                    $("#errorTel").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(apuntador.esVacio(codigoPostal)){
                $("#errorCP").css("display","block");
                $("#errorCP").html("*Campo obligatorio");
               procesa = false; 
            }else{
                if(!apuntador.validacp(codigoPostal)){
                    $("#errorCP").css("display","block");
                    $("#errorCP").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if(procesa){
                $("#btnCoberturaHeader").html('Enviando datos...');
                $("#formPersonalDataHeader").css("display", "none");
                $("#cargadorLead").css("display", "block");
               
                var dataUser = {"correo":correo, "nombre":nombre, "telefono":telefono, 
                                "codioPostal": codigoPostal,"formulario": "FormularioHome"};
                apuntador.enviarLead(dataUser);                
            }
   
        });
    }

    esVacio(valor){
        try{
            if(valor!='undefined' && valor!=null){
                var value = $.trim(valor);            
                if(value=== null || value.length===0){
                    return true;
                }else{
                    return false;
                }
            }else{
                return true;
            }            
        }catch(e){
            return true;
        }
    }

    validaTelefono(telefono){
        var response = false;
        var reTelefono = /^\d{10}$/;
        if(telefono.length>0){
            if(telefono.match(reTelefono)){
                response = true;
            }
        }
        return response;
    }

    validaEmail(email) {
        var response = false;
        var reEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email.length > 0) {
            if (email.match(reEmail)) {
                console.log("Valido por Email");
                response = true;
            }
        }
        return response;
    }

    validacp(cp) {
        var response = false;
        var reCP = /^\d{5}$/;
        if (cp.length > 0 ) {
            if (cp.match(reCP)) {
                response = true;
            }
        }
        return response;
    }

    limpiarDatos(){
        $("#headerNombre").val("");
        $("#headerCorreo").val("");
        $("#headerTel").val("");
        $("#headerCP").val("");
        $('#errorNombre').val("");
        $('#errorCorreo').val("");
        $('#errorTel').val("");
        $('#errorCP').val("");
    }

    setKeyupInput(){
        $('#headerNombre').on("keyup", function() {
            $("#errorNombre").css("display","none");
        });

        $('#headerCorreo').on("keyup", function() {
            $("#errorCorreo").css("display","none");
        });
        
        $('#headerTel').on("keyup", function() {
            $("#errorTel").css("display","none");
        });

        $('#headerCP').on("keyup", function() {
            $("#errorCP").css("display","none");
        });

        $('#calleSection').on("keyup", function() {
            $("#errorCalle").css("display","none");
        });

        $('#numeroSection').on("keyup", function() {
            $("#errorNum").css("display","none");
        });

        $('#cpSection').on("keyup", function() {
            $("#errorcp").css("display","none");
        });
    }

    enviarLead(dataUser) {
        let apuntador = this;
        var endpoint = Constantes.endpoints.guardaLead;
        var cabeceraMC = new Headers();
        cabeceraMC.append("Content-type", "application/json;charset=utf-8");

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(dataUser),
            headers: cabeceraMC
        }).then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                throw "Error en la llamada Ajax Fetch " + url
            }
        }).then((respuesta) => {
            if(respuesta.status == 0){
                apuntador.confirmacionLead();
                $("#iconoMsg").addClass("ok-symbol");
                $("#mensaje").html("En breve recibirás una llamada de nuestros asesores,  <i class='text-bold'>gracias por elegir Totalplay.</i>");  
                $("#btnConfirmCobertura").addClass("btn__outline__green");              
                $("#btnConfirmCobertura").html("Ok, gracias");              
            }else{
                apuntador.confirmacionLead();
                $("#iconoMsg").addClass("err-symbol");
                $("#btnConfirmCobertura").addClass("btn__outline__blue");
                $("#btnConfirmCobertura").html("Ok, gracias");   
                $("#mensaje").html("Ocurrió un error al mandar tus datos,  <i class='text-bold'> por favor, intenta más tarde.</i>");
            }            
            apuntador.limpiarDatos();            
        }).catch((err) => {
            console.log("err");
            console.log(err);
        });
    }

    confirmacionLead(){
        var height = 0;
        if ( window.innerWidth < 768 ) height = 159;
        if ( window.innerWidth >= 768 ) height = 92;
        $("#btnCoberturaHeader").css("display", "none");
        $("#titleFormMessage1").css("display", "none");
        $("#closeCoberturaLead").css("display", "none");
        $(".separator-container").css("display", "none");
        $("#formPersonalDataHeader").css("display", "none");
        $("#cargadorLead").css("display", "none");
        $("#confirmCobertura").addClass("active");
        $("#coberturaContainer").css("height", height);
    }

    regresarContenedorLead(){
        $("#btnCoberturaHeader").removeAttr("style");
        $("#titleFormMessage1").removeAttr("style");
        $("#closeCoberturaLead").removeAttr("style");
        $(".separator-container").removeAttr("style");
        $("#formPersonalDataHeader").removeAttr("style");
         $("#cargadorLead").css("display", "none");
        $("#confirmCobertura").removeClass("active");
        $("#coberturaContainer").removeAttr("style");
        $("#btnCoberturaHeader").html('Quiero que me llamen');
    }

    ordenarObjeto(objetoInicial){
        var objetoOrdenado = objetoInicial.slice(0);
        objetoOrdenado.sort(function(a,b) {
            return b.precioLista - a.precioLista;
        });
        return objetoOrdenado;
    }

    formatoMonedad(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$0" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    linkDetallePaquete(){
        $(".card-package-item").on('click', function () {
            localStorage.setItem('TP_ID_PAQUETE_SELECCION', $(this).attr('id'));
            setTimeout(function(){
                window.location = 'detallePaquete.html';
            },5000)
        });
    }

    obtenerDireccion(){
        let apuntador = this;
        var direccioncorta="";
        var strDireccion_LS_TMP = '';
        try{
            strDireccion_LS_TMP = localStorage.getItem('TP_STR_DIRECCION');
            if(strDireccion_LS_TMP !== '' || strDireccion_LS_TMP !== null){
                strDireccion_LS_TMP = JSON.parse(strDireccion_LS_TMP);
                var strDireccion_LS = strDireccion_LS_TMP.direccionFormulario.direccion;
                if (strDireccion_LS_TMP.direccionFormulario.codigoPostal == null || 
                    strDireccion_LS_TMP.direccionFormulario.codigoPostal == 'undefined') {     
                    $("#ciudadHome").html('Ciudad de México');
                }else {
                    
                    if(strDireccion_LS_TMP.direccionFormulario.ciudad !=null &&
                       strDireccion_LS_TMP.direccionFormulario.ciudad !='undefined'){
                       direccioncorta= strDireccion_LS_TMP.direccionFormulario.ciudad +", "+strDireccion_LS_TMP.direccionFormulario.codigoPostal;
                       $("#ciudadHome").html(direccioncorta);
                    }
                    if(strDireccion_LS_TMP.direccionFormulario.direccion !=null && 
                        strDireccion_LS_TMP.direccionFormulario.direccion != 'undefined'){
                        //direccioncorta = localStorage.getItem("TP_OF_STR_CALLE") + " #" + localStorage.getItem("TP_OF_STR_NUMERO_DIR");
                        let calleNumeroTmp = strDireccion_LS_TMP.direccionFormulario.direccion.split(',');
                        direccioncorta = calleNumeroTmp[0];
                       
                       
                    }
                }

                if(direccioncorta !== null && direccioncorta !== undefined && direccioncorta !=="" ){
                    $("#ciudadHome").html(direccioncorta);
                }else{
                    $("#ciudadHome").html('Ciudad de México');
                }
                const paq = new Paquetes();
                paq.cargarPaquetes("home");
            }
        }catch(error){
            $("#ciudadHome").html('Ciudad de México');
            console.log("NO PUDE TRAER LOCALSTORAGE")
        }
    }

}