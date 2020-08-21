import { AppsEventos } from "../generales/AppsEventos";
import * as Constantes from "../../utils/Constantes";

export function cargaapps(opt) {
  var apunta = this;
  var url = Constantes.endpoints.obtenerAplicaciones;
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

            arrayimgs.forEach(function (elem) {
              contador++;

              if (opt == 1) {
                var estilo = "";

                if (contador == 1) {
                  htmlimg += "<li class='section-apps__container--apps--list'>";
                }

                if (elem.pagina != "") {
                  htmlimg = htmlimg + '<a href="' + elem.pagina + '" target="_blank"><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></a>';
                } else {
                  htmlimg = htmlimg + '<div><img src="' + elem.urlimg + '" alt="' + elem.nombre + '"></div>';
                }

                if (contador == 5) {
                  htmlimg += "</li>";
                  contador = 0;
                }
              } else if (opt == 2) {
                var estilo = "";
                htmlimg = htmlimg + '<img src="' + elem.urlimg + '"' + estilo + ' alt="" onclick="window.open(\''+elem.pagina+'\',\'_blank\');">';
              }
            });

            if (opt == 1) {
              $("#appHome").html(htmlimg);
            } else if (opt == 2) {
              $("#servicioAppsImg").html(htmlimg);
              const eventosmas = new AppsEventos("tv");
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
