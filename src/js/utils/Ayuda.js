
export function Rutas(_base){
  
  let arrayrutas={
    index :                  `${_base}`,
    servicios :              `${_base}servicios`,
    paquetes:                `${_base}paquetes`,
    detallepaquete:          `${_base}detallePaquete`,
    detalle_1:          `${_base}detallePaquete1`,
    faqs :                   `${_base}faq`,
    contratacion: `${_base}contratacion`,
    ventajas: `${_base}ventajas`,
    soporte: `${_base}asistencia`,
    hbo:  `${_base}hbo`,
    netflix:  `${_base}netflix`,
    fox:  `${_base}fox`,
    comedycentral:  `${_base}comedycentral`,
    mtv:  `${_base}mtv`,
    blim:  `${_base}blim`,
    nickelodeon:  `${_base}nickelodeon`,
    amazon:  `${_base}amazon`,
    starzplay:  `${_base}starz`,
    ondemand:  `${_base}ondemand`,
    telefonia:  `${_base}telefonia`,
    youtube:  `${_base}youtube`,
    discoverykids:  `${_base}discoverykids`,
    tunein:  `${_base}tunein`,
    match:  `${_base}match`,
    regular:  `${_base}regular`,
    unbox:  `${_base}unbox`
  }
  return arrayrutas;
}
export function RutasMatch(_base, ruta) {
    if (_base == ruta) return true
    if (_base == ruta + "/") return true
    if (_base == ruta + "index.html") return true
    if (_base == ruta + ".html") return true
    return false
} 