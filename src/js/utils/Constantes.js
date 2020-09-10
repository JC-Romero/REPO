let _baseTP = "https://7wx6n5y7xg.execute-api.us-east-1.amazonaws.com/MI_CUENTA_TP/";
let _base = "https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/";

export const endpoints = {
	obtenerPaquetes: `https://totalplay.dev/archivos/paquetes/`, 
	obtenerAplicaciones: `/assets/media/aplicaciones.json`,
	obtenerComplementos: `/assets/media/complementos.json`,

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
}

export const sitioBase = "/";
