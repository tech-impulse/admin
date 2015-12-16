/**
 * FUNCION QUE RETORNA LA GALERIA MULTIMEDIA
 * @param {int} tipo Imagenes:0 ; Video:1
 */

function getGaleria(tipo, formato) {
    $("#image-gallery-button").removeClass("active");
    $("#video-gallery-button").removeClass("active");
    $("#todo-gallery-button").addClass("active");
    $("#submenu").html('<li><a href="#" onclick="getGaleria(\'' + tipo + '\');">Galería</a></li>');
    GALERIA_FOTOS = 1;
    GALERIA_VIDEOS = 1;
    if (formato == 'fotos') {
        GALERIA_VIDEOS = 0;
    }
    if (formato == 'videos') {
        GALERIA_FOTOS = 0;
    }
    var datos = {
        token: token,
        fotos: GALERIA_FOTOS,
        videos: GALERIA_VIDEOS
    };
    console.log(datos);
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

function deleteGaleria(id) {
    var datos = {
        token: token,
        id_externo: id,
    };
    peticion_actual = $.ajax({
        url: url + 'galeria/' + '?token=' + token + '&id_externo=' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "delete_galeria");
        },
        error: function (response) {
            rest_error(response, "delete_galeria");
        },
    })
}

/**
 * FUNCION QUE RETORNA LA LISTA DE PLANTILLAS
 * @param {int} id Id de la plantilla, si no está definido devuelve todas
 */
function getPlantilla(id, tipo) {
    var datos = {
        token: token,
        id_externo: id
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'plantilla/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (tipo == 'editar') {
                rest_ok(response, 'editar_plantilla');
            } else {
                rest_ok(response, tipo);
            }
        },
        error: function (response) {
            rest_error(response, tipo);
        },
    });
}

function postPlantilla() {
    for (var i = 0; i < nueva_plantilla.media.length; i++) {
        nueva_plantilla.media[i].orden = i;
    }
    if (nueva_plantilla.id_externo == undefined) {
        nueva_plantilla.id_externo = '';
    }
    var datos = {
        token: token,
        datos: nueva_plantilla
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

function deletePlantilla(id) {
    var datos = {
        token: token,
        id_externo: id,
    };
    peticion_actual = $.ajax({
        url: url + 'plantilla/' + '?token=' + token + '&id_externo=' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "delete_plantilla");
        },
        error: function (response) {
            rest_error(response, "delete_plantilla");
        },
    })
}

function getProgramacion(id) {
    var datos = {
        token: token,
        id_externo: id
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'programacion/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.error != "Programacion inexistente. ") {
                calendarData = response;
                $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', calendarData);
            }

            rest_ok(response, 'get_programacion');
        },
        error: function (response) {
            rest_error(response, 'get_programacion');
        },
    });
}

function postProgramacion(id) {

    var datos = {
        token: token,
        datos: nueva_programacion,
        id_externo: id
    };
    test = datos;

    console.log(datos);

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'programacion/',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, 'post_programacion');
            getProgramacion();

        },
        error: function (response) {
            rest_error(response, "post_programacion");
        },
    })
}

function deleteProgramacion(id) {
    var datos = {
        token: token,
        id_externo: id,
    };
    peticion_actual = $.ajax({
        url: url + 'programacion/' + '?token=' + token + '&id_externo=' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            rest_ok(response, "delete_programacion");
            getProgramacion();
            var alert = document.querySelector(".sweet-alert"),
                okButton = alert.getElementsByTagName("button")[1];
            $(okButton).trigger("click");
        },
        error: function (response) {
            rest_error(response, "delete_programacion");
        },
    })
}

function getPaises(origen) {
    var datos = {
        token: token
    };
    peticionActual = $.ajax({
        data: datos,
        url: url + 'paises/',
        dataType: 'json',
        success: function (response) {
            if (origen == 'programacion') {
                rest_ok(response, "programacion_paises");
            } else if (origen == 'ver_programacion') {
                console.log("ver");
                array_paises = response;
                getPantallas('ver_programacion');
            } else {
                rest_ok(response, "pantallas_paises");
            }
        },
        error: function (response) {
            rest_error(response, "pantallas_paises");
        },
    })
};

/**
 * FUNCION QUE RETORNA LA LISTA DE PANTALLAS DISPONIBLES
 * @param {int} id Id de la pantalla en cuestión, si es 0 devuelve todas
 */
function getPantallas(origen, id) {
    var datos = {
        token: token,
    };

    peticion_actual = $.ajax({
        data: datos,
        url: url + 'pantalla/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if(origen == 'ver_programacion'){
                console.log('carga')
                array_pantallas = response.resultado;
                array_pantallas.seleccionadas = 0;
                cargar_pantallas(array_pantallas, 'pantallas', 'ver_programacion');
            }else{
                rest_ok(response, "pantallas");
            }
            
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
                console.log("Login ok");
                $("#page").load("menu.html", function () {
                    getPaises();
                    $("#submenu").html('<li class="active">Pantallas</li>');
                    $("#content").load("pantallas.html");
                });

                break;
            };
        case "galeria":
            {
                multimedia_disponible = respuesta.galeria;
                if (multimedia_disponible != null) {
                    for (var i = 0; i < multimedia_disponible.length; i++) {
                        multimedia_disponible[i].url = url + 'show_image.php?token=' + token + '&id=' + multimedia_disponible[i].id_externo;
                    }
                    $("#content").load("galeria.html", function () {
                        refrescar_galeria(multimedia_disponible, 'galeria', 6);
                    });
                } else {
                    abrir_popup_informacion('No hay multimedia disponible');
                }
                break;
            };
        case "delete_galeria":
            {
                if (respuesta.warning == undefined) {
                    getGaleria('galeria');
                } else {
                    console.log("Ya existe");
                }

                break;
            };
        case "galeria_plantilla":
            {
                multimedia_disponible = respuesta.galeria;
                if (multimedia_disponible != null) {
                    for (var i = 0; i < multimedia_disponible.length; i++) {
                        multimedia_disponible[i].url = url + 'show_image.php?token=' + token + '&id=' + multimedia_disponible[i].id_externo;
                    }
                    $("#content").load("plantilla.html", function () {
                        refrescar_galeria(multimedia_disponible, 'plantilla', 6);
                        refrescar_player();

                    });
                } else {
                    abrir_popup_informacion('No hay multimedia disponible');
                }

                break;
            };
        case "post_media":
            {
                getGaleria('galeria');
                break;
            };
        case "plantillas":
            {
                nueva_plantilla.media = [];
                array_plantillas = respuesta.resultado;
                cargar_plantillas('plantillas');
                break;
            };
        case "editar_plantilla":
            {
                nueva_plantilla = {};
                nueva_plantilla.id_externo = respuesta.resultado[0].id_externo;
                nueva_plantilla.nombre = respuesta.resultado[0].nombre;
                nueva_plantilla.descripcion = respuesta.resultado[0].descripcion;
                nueva_plantilla.media = respuesta.resultado[0].elementos;
                for (var i = 0; i < nueva_plantilla.media.length; i++) {
                    nueva_plantilla.media[i].url = url + 'show_image.php?token=' + token + '&id=' + nueva_plantilla.media[i].id_externo;
                }
                cargar_pagina('plantilla');
                break;
            };
        case "programacion":
            {
                $("#content").load("programacion.html", function () {
                    array_plantillas = respuesta.resultado;
                    cargar_plantillas('programacion');
                });

                break;
            };

        case "programacion_paises":
            {
                $("#div_programacion_plantilla").hide();
                $("#div_programacion_pantalla").show();
                $("#div_programacion_calendario").hide();
                array_paises = respuesta;
                cargar_pantallas(respuesta, 'pantallas', 'paises');
                getPantallas();
                break;
            };
        case "post_plantilla":
            {
                swal("Guardado!",
                    "Se ha creado la nueva plantilla.",
                    "success");
                console.log("plantilla guardada");
                break;
            };
        case "delete_plantilla":
            {
                getPlantilla('', 'plantillas');
                console.log("plantilla borrada");
                break;
            };
        case "pantallas":
            {
                array_pantallas = respuesta.resultado;
                array_pantallas.seleccionadas = 0;
                cargar_pantallas(array_pantallas, 'pantallas', 'pantallas');
                break;
            };
        case "pantallas_paises":
            {
                $("#content").load("pantallas.html", function () {
                    array_paises = respuesta;
                    cargar_pantallas(respuesta, 'pantallas', 'paises');
                    getPantallas();
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
    case "pantallas_paises":
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