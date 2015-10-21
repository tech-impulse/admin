/**
 * FUNCION QUE RETORNA LA GALERIA MULTIMEDIA
 * @param {int} tipo Imagenes:0 ; Video:1
 */
function getGaleria(tipo) {
    var datos = {
        token: token,
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'galeria/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "get_media");
        },
        error: function (response) {
            rest_error(response, "get_media");
        },
    });
}

function postGaleria(arrayImagenes) {
    var datos = {
        token: token,
        media: arrayImagenes
    };
    console.log(datos);
    $.ajax({
        data: datos,
        url: url + 'galeria/',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "post_media");
            console.log(response);

        },
        error: function (response) {
            rest_error(response, "post_media");
        },
    });
}

/**
 * FUNCION QUE RETORNA LA LISTA DE PLANTILLAS
 * @param {int} id Id de la plantilla, si no está definido devuelve todas
 */
function getPlantillas(id) {
    var datos = {
        token: token,
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'plantilla/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "plantillas");
        },
        error: function (response) {
            rest_error(response, "plantillas");
        },
    });
}

/**
 * FUNCION QUE RETORNA LA LISTA DE PANTALLAS DISPONIBLES
 * @param {int} id Id de la pantalla en cuestión, si es 0 devuelve todas
 */
function getPantallas(id) {
    var datos = {
        token: token,
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'pantalla/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "pantallas");
        },
        error: function (response) {
            rest_error(response, "pantallas");
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

    if (respuesta != '{"error":"invalid token"}') {
        switch (tipo) {
        case "get_media":
            {
                console.log(respuesta.galeria)
                multimedia_disponible = respuesta.galeria;
                console.log(multimedia_disponible);
                refrescar_galeria(respuesta.galeria, 'galeria', 6);
                break;
            };
        case "post_media":
            {
                console.log(respuesta)
                break;
            };
        case "plantillas":
            {
                console.log(respuesta);
                break;
            };
        case "pantallas":
            {
                console.log(respuesta);
                break;
            };
        }
    } else {
        abrir_popup_confirmacion("Sesión Caducada!", "Debe volver a iniciar sesión");
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
    case "get_media":
        {
            // 
            break;
        };
    case "post_media":
        {

            break;
        };
    case "plantillas":
        {
            // 
            break;
        };
    case "pantallas":
        {
            // 
            break;
        };
    }
    console.log(respuesta);
    abrir_popup_informacion('Ha habido un error en la consulta!');
}