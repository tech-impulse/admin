/**
 * FUNCION QUE RETORNA LA GALERIA MULTIMEDIA
 * @param {int} tipo Imagenes:0 ; Video:1
 */
function get_galerias(tipo) {
    var datos = {
        token: token,
        tipo: 0
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'galeria.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "galeria_imagenes");
        },
        error: function (response) {
            rest_error(response, "galeria_imagenes");
        },
    });
}

/**
 * FUNCION PARA CONTROLAR LA RESPUESTA CORRECTA DE LOS WS
 * @param {String} respuesta json
 * @param {String} tipo      Quien ha hecho la petición
 */

function rest_ok(respuesta, tipo) {
    console.log("Todo correcto desde " + tipo);
    console.log("La respuesta es: ");
    console.log(respuesta);
    switch (tipo) {
    case "galeria_imagenes":
        {
            mostrar_galeria_imagenes(respuesta);
            break;
        };
    }
}

/**
 * FUNCIONES PARA CONTROLAR LA RESPUESTA ERRONEA DE LOS WS
 * @param {String} respuesta json que nos devuelve el ws con las imagenes y la informacion
 * @param {String} tipo      Quien ha hecho la petición
 */
function rest_error(respuesta, tipo) {
    console.log("Algo ha ido mal desde " + tipo);
    console.log("La respuesta es: ");
    console.log(respuesta);
    switch (tipo) {
    case "galeria_imagenes":
        {
            // 
            break;
        };
    }
    abrir_popup_informacion('Ha habido un error en la consulta!');
}