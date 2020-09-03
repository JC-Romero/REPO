
import * as Constantes from "./utils/Constantes";
import { Rutas, RutasMatch } from "./utils/Ayuda";
import { ClaseCobertura } from "./pages/generales/ClaseCobertura";
import { Cobertura } from "./pages/generales/Cobertura";
import { CoberturaSugerencias } from "./pages/generales/CoberturaSugerencias";
import { Menu } from "./pages/generales/Menu"
import { Experiencia } from "./pages/generales/Experiencia"
import { eventosIPTV } from "./pages/generales/eventosIPTV"

/*Paginas*/
import { Indexprincipal } from './pages/indexprincipal/Indexprincipal'
import { Chat } from './pages/indexprincipal/Chat'
import { Paquetes } from './pages/paquetes/Paquetes'
import { PaquetesEventos } from './pages/paquetes/PaquetesEventos'
import { Servicios } from './pages/servicios/Servicios'
import { Faq } from './pages/faqs/Faq'
import { DetallePaquete } from './pages/detallePaquete/DetallePaquete'
import { Canales } from './pages/detallePaquete/Canales'
import { TVCarrusel } from './pages/detallePaquete/TVCarrusel'
import { Ventajas } from './pages/ventajas/Ventajas'
import { Contratacion } from './pages/contratacion/Contratacion'
import { Soporte } from './pages/soporte/Soporte'
import { PromocionesCarrusel } from './pages/paquetes/PromocionesCarrusel'
import { Hbo } from './pages/landings/Hbo'
import { Netflix } from './pages/landings/Netflix'
import { Fox } from './pages/landings/Fox'
import { ComedyCentral } from './pages/landings/ComedyCentral'
import { Mtv } from './pages/landings/Mtv'
import { Nickelodeon } from './pages/landings/Nickelodeon'
import { Blim } from './pages/landings/Blim'
import { Amazon } from './pages/landings/Amazon'
import { Starz } from './pages/landings/Starzplay'
import { Ondemand } from './pages/landings/Ondemand'
import { Youtube } from './pages/landings/Youtube'
import { DiscoveryKids } from './pages/landings/DiscoveryKids'
import { Tunein } from './pages/landings/Tunein'
import { CarritoCompras } from './pages/carrito/CarritoCompras'
import { Maquetado } from './pages/maquetado/Maquetado'


let xcov = document.getElementById("x-cover")
if (xcov != undefined) {
	xcov.parentNode.removeChild(xcov)
}

const path = window.location.pathname;
const url = Rutas(Constantes.sitioBase);

const validacobertura = new ClaseCobertura();
//const experiencia = new Experiencia(  'qualify', '.footer-menu' );

const carrito = new CarritoCompras();
new Maquetado();

if (RutasMatch(path, url.index)) {
	const home = new Indexprincipal();
	const chat = new Chat('sectionChat');
}

if (RutasMatch(path, url.paquetes)) {
	var hashlo = window.location.hash;
	var parametro = 0;
	if (hashlo != "") parametro = hashlo.replace("#", '');
	const paquetes = new Paquetes();
	paquetes.init();
	const paqueteseven = new PaquetesEventos(parametro);
	const carruselPromociones = new PromocionesCarrusel('.promotions-list-cards__content--left', '.promotions-list-cards__content--right');
}
if (RutasMatch(path, url.detallepaquete)) {
	const detallePaquete = new DetallePaquete('resumePackage', 'resumeInfo');
	const canales = new Canales('modalChannels', 'openChannels', true);
	const detailSliderTv = new TVCarrusel('tvSliderPackages');
}


if (RutasMatch(path, url.ventajas)) {
	const detailSliderTv = new TVCarrusel('tvSliderPackages');
	const ven = new Ventajas();
}
if (RutasMatch(path, url.contratacion)) {
	const contratacion = new Contratacion(carrito);
}

if (RutasMatch(path, url.servicios)) {
	const servicios = new Servicios();
	const eventosiptv = new eventosIPTV();
}

if (RutasMatch(path, url.faqs)) {
	const preguntasFaq = new Faq();
}

if (RutasMatch(path, url.soporte)) {
	const soporte = new Soporte();
}

if (RutasMatch(path, url.hbo)) {
	const hbolan = new Hbo();
}
if (RutasMatch(path, url.netflix)) {
	const netflixlan = new Netflix();
}
if (RutasMatch(path, url.fox)) {
	const foxlan = new Fox();
}
if (RutasMatch(path, url.comedycentral)) {
	const comedycentrallan = new ComedyCentral();
}
if (RutasMatch(path, url.mtv)) {
	const mtvlan = new Mtv();
}
if (RutasMatch(path, url.blim)) {
	const blimlan = new Blim();
}
if (RutasMatch(path, url.nickelodeon)) {
	const nickelodeonlan = new Nickelodeon();
}
if (RutasMatch(path, url.amazon)) {
	const amazon = new Amazon();
}
if (RutasMatch(path, url.starzplay)) {
	const starzplay = new Starz();
}
if (RutasMatch(path, url.ondemand)) {
	const ondemandlan = new Ondemand();
}

if (RutasMatch(path, url.telefonia)) {
	const eventosiptv = new eventosIPTV();
}

if (RutasMatch(path, url.youtube)) {
	const youtube = new Youtube();
}

if (RutasMatch(path, url.discoverykids)) {
	const discoverykids = new DiscoveryKids();
}

if (RutasMatch(path, url.tunein)) {
	const tunein = new Tunein();
}

const menu = new Menu();

