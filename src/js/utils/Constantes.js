let _baseTP = "https://7wx6n5y7xg.execute-api.us-east-1.amazonaws.com/MI_CUENTA_TP/";
let _base = "https://5ui1bow6gf.execute-api.us-east-1.amazonaws.com/Desarrollo/";

export const endpoints = {
	obtenerPaquetes: `/assets/media/`,
	obtenerAplicaciones: `/assets/media/aplicaciones.json`,
	obtenerComplementos: `/assets/media/complementos.json`,
	guardaLead:`${_baseTP}tp-guardar-lead`,
	consultarCoordenadas: `${_base}obtener-direccion-coordenadas`,
	validarFactibilidad: `${_base}consultar-factibilidad`,
	obtenerCiudades : `https://totalplay.dev/archivos/coberturatotalplay.json`,
}

export const sitioBase = "/";
