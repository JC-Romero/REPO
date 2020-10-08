import { FinalizaContratacion } from './FinalizaContratacion';
import * as Constantes from "../../utils/Constantes";
import { TimelineMax } from "gsap";
export class ModalContrata {
    constructor() {
        
        this.props = {
            maincontainer: document.querySelector('.section-contratacion'),
            containerSteps: document.querySelector('.container-steps--contratacion'),
            stepItem: [...document.querySelectorAll('.container-steps--contratacion__step')],
            modalContract: document.querySelector('.modal--contract'),
            layerModal: document.querySelector('.modal--contract__layer'),
            contentForm: document.querySelector('.modal--contract__content-form'),
            title: document.querySelector('.contract__content-form__title'),
            des: document.querySelector('.contract__content-form__description'),
            close: document.querySelector('.contract__content-form__close'),
            btnContinue: document.querySelector('.contract__content-form__btn-continue'),
            step_1: document.querySelector('.contract__content-form__step-1'),
            step_2: document.querySelector('.contract__content-form__step-2'),
            listInputs: [...document.querySelectorAll('.contract--form_input')],
            itemsNamesSteps: [...document.querySelectorAll('.contratacion--top-bar__steps__list-names__item')],
            listPointsStepItems: document.querySelectorAll('.contratacion--top-bar__steps--content-items__item'),
            containerName: document.querySelector('.contratacion--top-bar__steps__name'),
            containerListNames: document.querySelector('.contratacion--top-bar__steps__list-names'),
            tl: new TimelineMax(),
            cont: 0,
            contStep: 1,
            nip: '',
            dataUser: null,
            lsgStorage: window.localStorage,
            objFinaliza : null,
            emailContact: '',
            celContact: ''
        }

        //this.listenerInputs();
        //this.onkeypress();
    }

    continuar(){
        this.listenerInputs();
        this.onkeypress();
        this.nextStep();
    }

    mostrarVentana() {
        this.setText('Comienza tu contratación', '');

        try{
            var objeto = JSON.parse(localStorage.getItem('TP_STR_CLIENTE_MODAL'));
            var numeroTmp = objeto.titular.celular;
            if(numeroTmp != '' || numeroTmp != undefined || numeroTmp.length == 10){
                var numero = numeroTmp.substring(7);
                $('#numeroCodigoVerif').html("*******"+numero);
            }
        }catch(error){
            console.log("error al traer el numero de celular");
        }


        this.props.modalContract.style.display = 'flex';
        this.props.step_1.style.display = 'flex';
        this.props.tl.to(this.props.layerModal, 0.5, {
            opacity: 1,
            ease: "power4.out"
        }).to(this.props.contentForm, 0.5, {
            opacity: 1,
            ease: "power4.out"
        })
        //this.nextStep();
        
    }

    mostrarVentanaContratacion() {
        this.setText('Comienza tu contratación', 'Hemos enviado un código de seguridad, ingr\u00E9salo para continuar.');
        this.props.step_1.style.display = 'none';
        this.props.step_2.style.display = 'flex';
        document.getElementById('nip_1').focus();
    }

    onkeypress() {
        $('#email').on('change', function (e) {
            $("#errorEmailContratacion").css("display", "none");
        });

        $('#mobile').on('change', function (e) {
            $("#errorMovilContratacion").css("display", "none");
        });

        var referenciaClase = this;

        this.props.close.addEventListener('click', (e) => {
            this.props.tl.to(this.props.contentForm, 0.5, {
                opacity: 0,
                ease: "power4.out"
            }).to(this.props.layerModal, 0.5, {
                opacity: 0,
                ease: "power4.out",
                onComplete: this.closeModal.bind(this)
            });
        });

        this.props.btnContinue.addEventListener('click', (e) => {
            var objeto = JSON.parse(localStorage.getItem('TP_STR_CLIENTE_MODAL'));
            var celular;
            var correo;
            if(objeto.titular.celular != '' || objeto.titular.celular != undefined || objeto.titular.celular.length == 10){
                celular = objeto.titular.celular;
            }

            if(objeto.titular.email != '' || objeto.titular.email != undefined){
                correo = objeto.titular.email;
            }

            if((celular !== '' || celular !== undefined) &&
                (correo !== '' || correo !== undefined)){
                referenciaClase.iniciarObjetoPersona(correo, celular);
                referenciaClase.generarCodigo(correo, celular);
            }
            /*let emailUser = document.getElementById('email');
            let mobileUser = document.getElementById('mobile');
            var procesa = true;

            if (referenciaClase.esVacio(emailUser.value)) {
                $("#errorEmailContratacion").css("display", "block");
                $("#errorEmailContratacion").html("*Campo obligatorio");
                procesa = false;
            } else {
                if (!referenciaClase.validaEmail(emailUser.value)) {
                    $("#errorEmailContratacion").css("display", "block");
                    $("#errorEmailContratacion").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if (referenciaClase.esVacio(mobileUser.value)) {
                $("#errorMovilContratacion").css("display", "block");
                $("#errorMovilContratacion").html("*Campo obligatorio");
                procesa = false;
            } else {
                if (!referenciaClase.validaTelefono(mobileUser.value)) {
                    $("#errorMovilContratacion").css("display", "block");
                    $("#errorMovilContratacion").html("*Campo no v&aacute;lido");
                    procesa = false;
                }
            }

            if (procesa) {
                referenciaClase.iniciarObjetoPersona($('#email').val().trim(), $('#mobile').val().trim())
                $('#titularCelular').val($('#mobile').val().trim());
                $('#botonContinuar').attr('disabled', 'disabled');
                $('.iconoContinuar').show();

                referenciaClase.generarCodigo($('#email').val().trim(), $('#mobile').val().trim());

                /*referenciaClase.mostrarVentanaContratacion();
                $('#botonContinuar').removeAttr('disabled');
                $('.iconoContinuar').hide();//*/
            /*}*/
        });
    }

    listenerInputs() {
        var referenciaClase = this;

        $("body").on('keyup', '.campoCodigo', function () {
            var campoNumero = parseInt($(this).attr('data-num'));
            if (campoNumero == 6) {
                
                let codigoContratacion = $('#nip_1').val()+$('#nip_2').val()+$('#nip_3').val()+$('#nip_4').val()+$('#nip_5').val()+$('#nip_6').val();
                $('.contract__content-form__text').html('<i class="fas fa-circle-notch fa-spin"></i>');
                referenciaClase.validarCodigo(codigoContratacion);//*/

                /*referenciaClase.props.tl.to(referenciaClase.props.contentForm, 0.2, {opacity: 0,ease: "power4.out"
                }).to(referenciaClase.props.layerModal, 0.2, {opacity: 0,ease: "power4.out",onComplete: referenciaClase.resetElements.bind(referenciaClase)});
                console.log('referenciaClase.props.objFinaliza=>', referenciaClase.props.objFinaliza);
                referenciaClase.props.objFinaliza = new FinalizaContratacion(false);
                referenciaClase.props.objFinaliza.ejecutarEnvioLead();//*/

            } else {
                campoNumero++;
                $('#nip_' + campoNumero).focus();
            }
        });

        $("body").on('click', '#botonReenviarCodigo', function () {
            $('#nip_1').val('');
            $('#nip_2').val('');
            $('#nip_3').val('');
            $('#nip_4').val('');
            $('#nip_5').val('');
            $('#nip_6').val('');

            $('.contract__content-form__text').html('<i class="fas fa-circle-notch fa-spin"></i>');
            referenciaClase.mostrarVentanaContratacion();
            $('#botonContinuar').removeAttr('disabled');
            $('.iconoContinuar').hide();
        });
    }

    closeModal() {
        this.props.modalContract.style.display = 'none';
        this.props.step_1.style.display = 'none';
        this.props.step_2.style.display = 'none';
    }

    endAnimation() {
        this.props.tl.to(this.props.contentForm, 0.2, {
            opacity: 0,
            ease: "power4.out"
        }).to(this.props.layerModal, 0.2, {
            opacity: 0,
            ease: "power4.out",
            onComplete: this.resetElements.bind(this)
        });
        window.scrollTo(0, 0);
    }

    resetElements() {
        this.props.step_1.removeAttribute('style');
        this.props.step_2.removeAttribute('style');
        this.props.listInputs.map(item => item.value = '');
        this.props.modalContract.style.display = 'none';
        //setTimeout(() => {this.nextStep();}, 500)
        console.log('RESET ELEMENT TERMINADO');
    }

    setText(_title, _description) {
        this.props.title.textContent = _title;
        this.props.des.textContent = _description;
    }

    nextStep() {
        this.props.contStep++;
        let totalLI = $('ul.contratacion--top-bar__steps__list-names li').length;
        if (totalLI == 4) {
            this.props.contStep++;
        }

        this.props.movList = (100 * this.props.contStep) + (1.95 * this.props.contStep);
        this.props.containerSteps.style.cssText = `transform: translateX(-${(this.props.movList)}%); transition: all .3s ease-in;`;
        this.props.direction = 'right';
        this.changeStep(this.props.contStep);
    }

    changeStep(_index) {
        let totalLI = $('ul.contratacion--top-bar__steps__list-names li').length;
        console.log('totalLI=>', totalLI);

        this.props.contStep++;

        this.props.listPointsStepItems[2].children[1].children[0].style.cssText = `left:0; transition: all .4s`;
        setTimeout(() => {
            if (totalLI == 4) {
                this.props.listPointsStepItems[2].children[0].style.cssText = `background-color: #1a76d2;`;
                this.props.listPointsStepItems[3].children[0].style.cssText = `background-color: #1a76d2; transition: all .1s; height:7px; width:7px;`;
            }
            if (totalLI == 3) {
                this.props.listPointsStepItems[1].children[0].style.cssText = `background-color: #1a76d2;`;
                this.props.listPointsStepItems[2].children[0].style.cssText = `background-color: #1a76d2; transition: all .1s; height:7px; width:7px;`;
            }
        }, 300);

        if (totalLI == 4) {
            this.props.itemsNamesSteps[3].style.color = '#1a76d2';
            this.props.itemsNamesSteps[3].style.color = '#1a76d2';
            this.props.stepItem[3].removeAttribute('style');
        }

        if (totalLI == 3) {
            this.props.itemsNamesSteps[2].style.color = '#1a76d2';
            this.props.itemsNamesSteps[2].style.color = '#1a76d2';
            this.props.stepItem[2].removeAttribute('style');
        }

        const finalizaContratacion = new FinalizaContratacion(true);
    }

    esVacio(valor) {
        try {
            if (valor != 'undefined' && valor != null) {
                var value = $.trim(valor);
                if (value === null || value.length === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } catch (e) {
            return true;
        }
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

    validaTelefono(telefono) {
        var response = false;
        var reTelefono = /^\d{10}$/;
        if (telefono.length > 0) {
            if (telefono.match(reTelefono)) {
                response = true;
            }
        }
        return response;
    }

    iniciarObjetoPersona(correoElectronico, numeroTelefonico) {
        /*let objetoCliente = {
            "correoElectronico": correoElectronico,
            "numeroTelefonico": numeroTelefonico,
        }
        localStorage.setItem('TP_STR_CLIENTE', JSON.stringify(objetoCliente));*/

        let cadenaCliente= localStorage.getItem('TP_STR_CLIENTE');
        
        try {
            let objetoCliente = JSON.parse(cadenaCliente);
            let memoria = {
                "correoElectronico": correoElectronico,
                "numeroTelefonico": numeroTelefonico,
                "titular": objetoCliente.titular,
                "pago": objetoCliente.pago
            }

            localStorage.setItem('TP_STR_CLIENTE', JSON.stringify(memoria));
            console.log('OBJETO CLIENTE ACTUALIZADO');
        } catch (error) {
            console.log('ERROR AL ACTUALIAR EL OBJETO CLIENTE CON TITULAR POR:', error);
        }

    }

    generarCodigo(correoElectronico, numeroTelefonico){
        var referenciaClase = this;
        var parametros = {
            "correoElectronico": correoElectronico,
            "numeroTelefonico": numeroTelefonico,
        };

        $.ajax({
            url: Constantes.endpoints.generarCodigoC,
            data: JSON.stringify(parametros),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            console.log('RESPUESTA DE COMPLEMENTOS');
            console.log(respuesta);
            $('.contract__content-form__text').html('Enviar de nuevo');

            $('#botonContinuar').removeAttr('disabled');
            $('.iconoContinuar').hide();

            if(respuesta.codigo == 0){
                //localStorage.setItem('TP_EMAIL_CONTRATO', correoElectronico);
                referenciaClase.mostrarVentanaContratacion();
            }
        }).fail(function(jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE GENERAR CODIGO');
            console.log(jqXHR);
            $('#botonContinuar').removeAttr('disabled');
            $('.iconoContinuar').hide();
            $('.contract__content-form__text').html('Enviar de nuevo');
        });
    }

    validarCodigo(codigoContratacion){
        var referenciaClase = this;
        
        var parametros = {
            "codigoContratacion": codigoContratacion
        };

        $.ajax({
            url: Constantes.endpoints.validarCodigoC,
            data: JSON.stringify(parametros),
            dataType: "json",
            type: 'POST'
        }).done(function(respuesta) {
            console.log('RESPUESTA DE COMPLEMENTOS');
            console.log(respuesta);

            if(respuesta.codigo == 0){

                //referenciaClase.endAnimation();
                referenciaClase.props.tl.to(referenciaClase.props.contentForm, 0.2, {
                    opacity: 0,
                    ease: "power4.out"
                }).to(referenciaClase.props.layerModal, 0.2, {
                    opacity: 0,
                    ease: "power4.out",
                    onComplete: referenciaClase.resetElements.bind(referenciaClase)
                });
                //window.scrollTo(0, 0);
                referenciaClase.props.objFinaliza = new FinalizaContratacion(false);
                referenciaClase.props.objFinaliza.ejecutarEnvioLead();
            }else{
                $('.contract__content-form__text').html('Enviar de nuevo');
                
                referenciaClase.props.cont = 0;
                $('#nip_1').val('');
                $('#nip_2').val('');
                $('#nip_3').val('');
                $('#nip_4').val('');
                $('#nip_5').val('');
                $('#nip_6').val('');
                $('#nip_1').focus();
            }
        }).fail(function(jqXHR, textStatus) {
            console.log('OCURRIO ALGO INESPERADO EN EL SERVICIO DE COMPLEMENTOS');
            console.log(jqXHR);
            $('.contract__content-form__text').html('Enviar de nuevo');
            referenciaClase.props.cont = 0;
            $('#nip_1').val('');
            $('#nip_2').val('');
            $('#nip_3').val('');
            $('#nip_4').val('');
            $('#nip_5').val('');
            $('#nip_6').val('');
            $('#nip_1').focus();
        });
    }
}