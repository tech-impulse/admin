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
            rest_ok(response, tipo);
        },
        error: function (response) {
            rest_error(response, tipo);
        },
    });
}

function postGaleria(arrayImagenes) {
    var datos = {
        token: token,
        media: arrayImagenes
    };
    $.ajax({
        data: datos,
        url: url + 'galeria/',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "post_media");
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
function getPlantillas(id, tipo) {
    var datos = {
        token: token,
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'plantilla/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, tipo);
        },
        error: function (response) {
            rest_error(response, tipo);
        },
    });
}

function postPlantillas(nombre, descripcion, arrayImagenes) {

    for (var i = 0; i < arrayImagenes.length; i++) {
        arrayImagenes[i].orden = i;
    }
    var datos = {
        token: token,
        nombre: nombre,
        descipcion: descripcion,
        media: arrayImagenes
    };
    test = datos;

    console.log(datos);

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'plantilla/',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "post_plantilla");
        },
        error: function (response) {
            rest_error(response, "post_plantilla");
        },
    })
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
    console.log("WS OK -> Desde ->" + tipo);
    console.log("Respuesta: ");
    console.log(respuesta);


    if (respuesta != '{"error":"invalid token"}') {
        switch (tipo) {
        case "login":
            {
                $("#page").load("menu.html", function () {
                    getPantallas();
                    $("#submenu").html('<li class="active">Pantallas</li>');
                    $("#content").load("pantallas.html");
                });

                break;
            };
        case "galeria":
            {
                multimedia_disponible = respuesta.galeria;
                for (var i = 0; i < multimedia_disponible.length; i++) {
                    multimedia_disponible[i].url = url + 'show_image.php?token=' + token + '&id=' + multimedia_disponible[i].id_externo;
                }
                $("#content").load("galeria.html", function () {
                    refrescar_galeria(multimedia_disponible, 'galeria', 6);
                });

                break;
            };
        case "galeria_plantilla":
            {
                multimedia_seleccionada = [];
                multimedia_disponible = respuesta.galeria;
                for (var i = 0; i < multimedia_disponible.length; i++) {
                    multimedia_disponible[i].url = url + 'show_image.php?token=' + token + '&id=' + multimedia_disponible[i].id_externo;
                }
                $("#content").load("plantilla.html", function () {
                    refrescar_galeria(multimedia_disponible, 'plantilla', 6);
                });

                break;
            };
        case "post_media":
            {
                getGaleria('galeria');
                break;
            };
        case "plantillas":
            {
                cargar_plantillas('plantillas');
                break;
            };
        case "programacion":
            {
                $("#content").load("programacion.html", function () {
                    cargar_plantillas('programacion');
                });

                break;
            };
        case "post_plantilla":
            {

                break;
            };
        case "pantallas":
            {
                $("#content").load("pantallas.html", function () {
                    cargar_pantallas(respuesta, 'pantallas', 'paises');;
                });
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
    console.log("WS ERROR -> Desde -> " + tipo);
    console.log("Respuesta: ");
    console.log(respuesta);
    switch (tipo) {
    case "login":
        {
            //
            break;
        };
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
    case "post_plantilla":
        {

            break;
        };
    case "pantallas":
        {
            // 
            break;
        };
    }
    abrir_popup_informacion('Ha habido un error en la consulta!');
}

function logout() {
    token = '';
    localStorage.removeItem("youtter_admin_token");
    $("#page").load("index.html");
}