 /**
  * Copyright © Total Play Telecomunicaciones, S.A. de C.V. 2018.
  */
/*
* funcion encargada de encriptar los datos que se envian a los servicios
* @author FRR
* @param {Object} _data
* @return {String} retorna cadena
*/
 function encrypt(_data) {
     var key = "dDB0YTFhazZoZDhoamY2MQ==",
         date = new Date(),
         encryptData = null;
     _data.timestamp = date.getTime();
     _data = JSON.stringify(_data);
     key = CryptoJS.enc.Base64.parse(key);
     encryptData = CryptoJS.AES.encrypt(jsonData.toString(), key, {
         mode: CryptoJS.mode.ECB,
         padding: CryptoJS.pad.Pkcs7
     });
     return encryptData;
 }

/*
* funcion de desencriptar, aun no definida
*/
 function decrypt() {
     
 }
