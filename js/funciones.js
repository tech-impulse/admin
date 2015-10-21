/**
 * FUNCIÓN QUE MUESTRA POR PANTALLA LAS IMAGENES DE LA GALERIA
 * @param {Object} imagenes (Json con la información de las imagenes)
 */

var json = [{
    "id_externo": 1,
    "url": "http://codeforces.com/userphoto/title/pedobear/photo.jpg",
    "seleccionada": 0,
    "duracion": 0
}, {
    "id_externo": 2,
    "url": "https://upload.wikimedia.org/wikipedia/en/2/28/Philip_Fry.png",
    "seleccionada": 0,
    "duracion": 0
}, {
    "id_externo": 3,
    "url": "http://sergiodelmolino.files.wordpress.com/2010/02/evasee-bender-smoking-3310.jpg",
    "seleccionada": 0,
    "duracion": 0
}, {
    "id_externo": 4,
    "url": "https://image.freepik.com/foto-gratis/hrc-tigre-siberiano-2-jpg_21253111.jpg",
    "seleccionada": 0,
    "duracion": 0
}, {
    "id_externo": 5,
    "url": "http://l3.yimg.com/bt/api/res/1.2/CutqJJgH26Mx0nvNqyGtmQ--/YXBwaWQ9eW5ld3M7Zmk9aW5zZXQ7aD00NTU7cT04NTt3PTYzMA--/http://l.yimg.com/os/259/2012/09/06/AP492232600255-jpg_203639.jpg",
    "seleccionada": 0,
    "duracion": 0
}, {
    "id_externo": 6,
    "url": "http://images.eurogamer.net/articles//a/1/0/2/4/8/8/1/AA_003.jpg.jpg",
    "seleccionada": 0,
    "duracion": 0
}];

function cargar_pagina(pantalla) {
    $("#barMenu li").removeClass("active");
    $("#btn_menu_" + pantalla).toggleClass("active");
    switch (pantalla) {
    case 'pantallas':
        getPantallas();
        $("#submenu").html('<li class="active">Pantallas</li>');
        $("#content").load("pantallas.html");
        break;
    case 'programacion':
        geProgramacion();
        $("#submenu").html('<li class="active">Programacion</li>');
        $("#content").load("programacion.html");
        break;
    case 'galeria':
        getGaleria();
        $("#submenu").html('<li class="active">Galeria</li>');
        $("#content").load("galeria.html");
        break;
    case 'plantillas':
        getPlantillas();
        $("#submenu").html('<li class="active">Plantillas</li>');
        $("#content").load("plantillas.html");
        break;
    case 'plantilla':
        //getGaleria();  
        $("#submenu").html('<li><a href="#" onclick="cargar_pagina(\'plantillas\')">Plantillas</a></li><li class="active">Detalle</li>');
        $("#content").load("plantilla.html");
        break;
    }
    console.log(pantalla);
}

/**
 * FUNCION QUE MUESTRA LA GALERIA DE IMAGENES Y VIDEOS
 * @param {Object} imagenes Json de información
 * @param {String} origen   Desde donde llamas a la funcion (galeria, plantilla)
 * @param {Number} columnas Cantidad de columnas multiplo de 12 (2, 3, 4, 6, 12)
 */
function refrescar_galeria(imagenes, origen, columnas) {
    // multimedia_disponible = json;
    if (columnas == undefined) {
        columnas = 6;
    }
    var row = '<div class="row" style="margin-top:10px">';
    var cont = 0;
    var html = '';
    for (var i = 0; i < multimedia_disponible.length; i++) {
        if (cont == 0) {
            html = row;
            html = html + '<div class="col-lg-' + parseInt(12 / columnas) + '">' + '<a href="#" class="thumbnail">' + '<form style="width: 160px; height: 140px" id="form_galeria" method="post" action="" enctype="multipart/form-data">' + '<label for="filesToUpload">' + '<img style="width: 160px; height: 140px;cursor: pointer;" src="http://www.clker.com/cliparts/e/c/e/d/1352236885442170385Add%20Symbol.svg.hi.png" alt="...">' + ' </label>' + ' <input onChange="cargar_media();" multiple name="filesToUpload[]" id="filesToUpload" style="display:none" type="file" />' + ' </form>' + '</a>' + '</div>';
            cont++;
        } else if (cont == columnas) {
            row = '</div>' + row;
            html = html + row;
        }
        html = html + '<div class="col-lg-' + parseInt(12 / columnas) + '">' + '<div><a href="#" class="thumbnail" id="a_galeria_' + multimedia_disponible[i].id_externo + '" onclick="seleccionar_multimedia(' + multimedia_disponible[i].id_externo + ',\'' + origen + '\')">' + '<img style="width: 160px; height: 150px;" src="' + multimedia_disponible[i].url + '" />';
        if (origen == 'galeria') {
            html = html + '<div class="boton_borrar_galeria">' + '<button onclick="borrar_elemento_galeria(' + multimedia_disponible[i].id_externo + ')" type="button" class="btn btn-danger glyphicon glyphicon-trash"></button>' + '</div>';
        }
        html = html + '<div class="boton_check_galeria" id="div_check_' + multimedia_disponible[i].id_externo + '"></div>' + '</a></div>' + '</div>';

        cont++;
    }
    html = html + '</div>';
    if (origen == "plantilla") {
        $("#div_galeria_plantilla").html(html);
    } else {
        $("#div_galeria").html(html);
    }
}

/**
 * FUNCION QUE CARGA EN UN ARRAY LAS IMAGENES EN BASE64 SELECCIONADAS PARA ENVIARLAS AL WS GALERIA
 */
function cargar_media() {
    var arrayImagenes = [];
    var input = document.getElementById("filesToUpload");
    var files = input.files;
    var numeroImagenes = input.files.length;
    var cont = 0;
    var FR = new FileReader();
    FR.onload = function (e) {
        arrayImagenes.push(e.target.result);
        console.log(arrayImagenes);
        cont++;
        if (cont < numeroImagenes) {
            FR.readAsDataURL(files[cont]);
        }
        if (cont == numeroImagenes) {
            postGaleria(arrayImagenes);
        }
    };
    FR.readAsDataURL(files[0]);
}

function borrar_elemento_galeria(id) {}

function abrir_popup_informacion(dato) {
    swal({
        title: 'Aviso!',
        text: dato,
        type: 'info',
        closeOnConfirm: true
    });
}

function abrir_popup_confirmacion(titulo, dato) {
    swal({
        title: titulo,
        text: dato,
        type: 'info',
        closeOnConfirm: true
    }, function () {
        localStorage.removeItem("youtter_admin_token");
        $("#page").load("index.html");
    });
}

/**
 * FUNCION QUE MUESTRA UN POPUP DE ACEPTAR/CANCELAR
 * @param {Object} dato (para personalizar el popup)
 */
function abrir_popup_accion(dato) {
    swal({
        title: 'Esta seguro?',
        text: dato,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        closeOnConfirm: true
    });
}