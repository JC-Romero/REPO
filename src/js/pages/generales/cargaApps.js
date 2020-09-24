import { AppsEventos } from "../generales/AppsEventos";
import * as Constantes from "../../utils/Constantes";

export function cargaapps(opt) {
  var apunta = this;
  var url = Constantes.endpoints.obtenerAplicaciones;
  //fetch(url, { method: "POST" })
  fetch(url, { method: "GET" })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then((respuesta) => {
      try {
        if (respuesta.status == 0) {
          if (respuesta.bean != undefined && respuesta.bean.listaimagenes.length > 0) {
            var arrayimgs = respuesta.bean.listaimagenes;
            var htmlimg = "";
            var contador = 0;
            var contadorGeneral = 0;
            
            arrayimgs.forEach(function (elem) {
              contador++;
              contadorGeneral++;

              /*if (opt == 1) {*/
                if(contador == 1 && contadorGeneral < 11){
                  htmlimg += "<div class='row'>";
                }

                if (elem.pagina != "") {
                  if(contador == 1 && contadorGeneral < 11){
                    htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 offset-xl-1 offset-lg-1"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '" onclick="window.open(\'' + elem.pagina + '\',\'_blank\')"></div>';
                  }else{
                    if(contadorGeneral < 11){
                      if(contadorGeneral == 4){
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-none d-sm-none d-md-block"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '" onclick="window.open(\'' + elem.pagina + '\',\'_blank\')"></div>';
                      }else if(contadorGeneral == 10 || contadorGeneral == 5){
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-none d-sm-none d-md-none d-lg-block"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '" onclick="window.open(\'' + elem.pagina + '\',\'_blank\')"></div>';
                      }else{
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '" onclick="window.open(\'' + elem.pagina + '\',\'_blank\')"></div>';
                      }
                    }
                  }
                }else{
                  if(contador == 1 && contadorGeneral < 11){
                    htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 offset-xl-1 offset-lg-1"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></div>';
                  }else{
                    if(contadorGeneral < 11){
                      if(contadorGeneral == 4){
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-none d-sm-none d-md-block"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></div>';
                      }else if(contadorGeneral == 10 || contadorGeneral == 5){
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-none d-sm-none d-md-none d-lg-block"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></div>';
                      }else{
                        htmlimg = htmlimg + '<div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></div>';
                      }
                    }
                  }
                }

                if (contador == 5 && contadorGeneral < 11) {
                  htmlimg += "</div>";
                  contador = 0;
                }

              /*} else if (opt == 2) {
                var estilo = "";
                htmlimg = htmlimg + '<img src="' + elem.urlimg + '"' + estilo + ' alt="" onclick="window.open(\'' + elem.pagina + '\',\'_blank\');">';
              }*/

            });

            if (opt == 1) {
              //$("#appHome").prepend(htmlimg);
              $("#servicioAppsImg").prepend(htmlimg);
            } else if (opt == 2) {
              $("#servicioAppsImg").html(htmlimg);
              //const eventosmas = new AppsEventos("tv");
            }
          }
        }
      } catch (e) {
        console.error(e);
        throw "Ocurrio algo inesperado en la carga de apps";
      }
    }).catch((err) => {
      console.error("err=>" + err);
    });
}
