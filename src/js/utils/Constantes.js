let _baseTP = "https://7wx6n5y7xg.execute-api.us-east-1.amazonaws.com/MI_CUENTA_TP/";
let _base = "https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/";

export const endpoints = {
	obtenerPaquetes: `https://totalplay.dev/archivos/paquetes/`, 
	obtenerAplicaciones: `${_base}obtener-aplicaciones`,
	//obtenerAplicaciones: `/assets/media/aplicaciones.json`,
	obtenerComplementos: `${_base}obtener-complementos`,

	guardaLead:`${_baseTP}tp-guardar-lead`,
	consultarCoordenadas: `${_base}obtener-direccion-coordenadas`,
	validarFactibilidad: `${_base}consultar-factibilidad`,
	generarCodigoC: `${_base}generar-codigo-contratacion`,
	validarCodigoC: `${_base}validar-codigo-contratacion`,
	generarVenta:`${_base}generar-venta`,
	obtenerDisponibilidad: `${_base}obtener-disponibilidad`,
	generarAgendamiento:`${_base}generar-agendamiento`,
	guardarTarjeta:`${_base}guardar-tarjeta`,
	noCompra:`${_base}enviar-compra-noexitosa`,
	guardaArchivosEcommerce: `${_base}guarda-archivos`,
	obtenerCiudades : `https://totalplay.dev/archivos/coberturatotalplay.json`,
	buscarCiudad:`${_base}buscar-ciudad-cp`,
	getserviciobin: `${_base}get-servicio-bin`,
	obtenerCanales:`${_base}obtener-canales`,
	enviaBuzon: `${_base}insertar-sugerencia`,
}

export const sitioBase = "/";

export const cms = {
	host: "https://cms.totalplay.dev",
	getBanner: "/banners",
	getSplash: "/splash-page-promociones",
	getPromociones: "/promociones",
	getImagenPaquete: "/imagenes-paquetes",
	getTextoLegal: "/textos-legales",
	getTextoPromocion: "/textos-promociones",
	getTextoHome: "/homes",
	getLanding: "/landings"
};