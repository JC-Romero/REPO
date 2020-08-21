export class Experiencia {

	constructor(_elementQualify, _containerFooter) {
		this.props = {
			container: document.getElementById(_elementQualify),
			elements: document.querySelectorAll('.qualifyItems'),
			text: document.querySelector('#footer > .qualify > span'),
			list: document.querySelector('#footer > .qualify > ul'),
			message: document.querySelector('#footer > .qualify > .message'),
			containerFooter: document.querySelector(_containerFooter),
			window: window.innerWidth,
			indexSelect: document.getElementById('mnupaq').children.length,
			bandera: 0,
			strStorage: window.localStorage
		}
		this.init();
	}

	init() {
		this.muestraFooterMovil();
		this.validaSeccion();
		this.resizeWindow();
		this.setListeners();
		this.eventoLinkResponsivo();
		this.props.indexFooterLength = document.querySelectorAll(".menu-footer-items2").length
	}

	setListeners() {
		let Cx = window.cX;

		$("#MuySatisfecho").one("click", function () {
			Cx.callQueue.push(['sendEvent', 'MuySatisfecho']);
			console.log("MuySatisfecho");
		});

		$("#Satisfecho").one("click", function () {
			Cx.callQueue.push(['sendEvent', 'Satisfecho']);
			console.log("Satisfecho");
		});

		$("#Neutral").one("click", function () {
			Cx.callQueue.push(['sendEvent', 'Neutral']);
			console.log("Neutral");
		});

		$("#Insatisfecho").one("click", function () {
			Cx.callQueue.push(['sendEvent', 'Insatisfecho']);
			console.log("Insatisfecho");
		});

		$("#MuyInsatisfecho").one("click", function () {
			Cx.callQueue.push(['sendEvent', 'MuyInsatisfecho']);
			console.log("MuyInsatisfecho");
		});
	}

	muestraFooterMovil() {
		var apunta = this;
		if (window.matchMedia("(max-width:1023px)").matches) {
			$('#mnuservicios').css("height", 'auto');
		}
	}

	eventoLinkResponsivo() {
		var apunta = this;
		$('.liImgServicios').on('click', function () {
			apunta.colapsaLista(this);
		});

		$('.liImgProductos').on('click', function () {
			apunta.colapsaLista(this);
		});

		$('.liImgSoporte').on('click', function () {
			apunta.colapsaLista(this);
		});

		$('.liImgContactanos').on('click', function () {
			apunta.colapsaLista(this);
		});
	}

	colapsaLista(objeto) {
		if (!$(objeto).parent().hasClass('select')) {
			$(objeto).closest('li').addClass("select");
		} else {
			$(objeto).closest('li').removeClass("select");
		}
	}

	contraeLista() {
		var items = document.getElementsByClassName('menu-footer-productos');
		for (var i = 0; i < items.length; i++) {
			console.log("item[i]" + items[i]);
			if (items[i].classList.contains('select')) {
				console.log("si tiene");
			} else {
				console.log("no")
			}
		}
	}

	showItemFooter() {
		this.props.window = window.innerWidth;
		console.log('this.props.window =>' + this.props.window);
		if (this.props.window < 1024) {
			this.props.containerFooter.addEventListener('click', (e) => {
				if (e.target.localName === 'li') {
					let activeItem = e.target;
					if (e.target.classList.contains('active-item')) {
						if (activeItem.classList.contains('select')) {
							activeItem.classList.remove('select');
							this.props.bandera = 0;
						} else {
							activeItem.classList.add('select');
							this.props.bandera = this.props.bandera + 1;
						}
					}
				}
				if (e.target.localName === 'img') {
					if (e.target.parentNode.classList.contains('active-item')) {
						if (e.target.parentNode.classList.contains('select')) {
							e.target.parentNode.classList.remove('select');
							this.props.bandera = 0;
						} else {
							e.target.parentNode.classList.add('select');
							this.props.bandera = this.props.bandera + 1;
						}
					}
				}

				let idSeleccionado = 0;
				let numMenu = document.getElementById('mnupaq').children.length
				if (this.props.bandera > 1) {
					idSeleccionado = e.target.id.substr(9, 1);
					for (let i = 0; i < numMenu; i++) {
						if (i != idSeleccionado) {
							document.getElementById('mnupaq').children[i].children[0].classList.remove('select');
						}
					}
					this.props.bandera = 1;
				}

				if (this.props.bandera > 0) {
					console.log("target " + e.target);
					$("#mnuservicios").css({ "-webkit-transition": "1s", "height": "300px" });
				} else {
					$("#mnuservicios").css({ "-webkit-transition": "1s", "height": "238px" });
				}

			});
		} else return false;
	}

	validaSeccion() {
		let section = this.props.strStorage.getItem('section');
		if (section == 'false') {
			this.props.container.style.display = 'none';
		} else {
			this.selectItem();
		}
	}

	resizeWindow() {
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1024) {
				this.muestraFooterMovil();
			}
		});
	}

	selectItem() {
		this.props.container.addEventListener('click', (e) => {
			let selectItem = (e.target.localName === 'img') ? e.target.parentNode : e.target.classList.contains('qualifyItems') ? e.target : e.target.children[0];

			if (selectItem.classList.contains('qualifyItems')) {
				for (let x = 0; x < this.props.elements.length; x++) {
					if (selectItem != this.props.elements[x]) {
						this.props.elements[x].classList.add('disable');
					}
				}
				selectItem.classList.add('enable');
				this.props.strStorage.setItem('section', 'false');
				this.hideElement();
			}
		});
	}

	hideElement() {
		setTimeout(() => {
			if (!this.props.text.classList.contains('hidden') && !this.props.list.classList.contains('hidden')) {
				this.props.text.classList.add('hidden');
				this.props.list.classList.add('hidden');
			}
			this.showElement();
		}, 1000);
	}

	showElement() {
		this.props.message.classList.add('show');
		this.hideContainer();
	}

	hideContainer() {
		setTimeout(() => {
			if (this.props.message.classList.contains('show'))
				this.props.message.classList.remove('show');
			this.props.message.classList.add('hidden');
			this.props.container.classList.add('hidden');
		}, 1000);
	}
}