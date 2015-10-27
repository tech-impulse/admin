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
        getPlantillas('', 'programacion');
        $("#submenu").html('<li class="active">Programacion</li>');
        break;
    case 'galeria':
        getGaleria('galeria');
        $("#submenu").html('<li class="active">Galeria</li>');

        break;
    case 'plantillas':
        getPlantillas('', 'plantillas');
        $("#submenu").html('<li class="active">Plantillas</li>');
        $("#content").load("plantillas.html");
        break;
    case 'plantilla':
        getGaleria('galeria_plantilla');
        $("#submenu").html('<li><a href="#" onclick="cargar_pagina(\'plantillas\')">Plantillas</a></li><li class="active">Detalle</li>');
        break;
    }
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
        if (cont == 0 && origen != 'plantilla') {
            html = row;
            html = html + '<div class="col-lg-' + parseInt(12 / columnas) + '">' + '<a href="#" class="thumbnail">' + '<form style="width: 160px; height: 140px" id="form_galeria" method="post" action="" enctype="multipart/form-data">' + '<label for="filesToUpload">' + '<img style="width: 160px; height: 140px;cursor: pointer;" src="http://www.clker.com/cliparts/e/c/e/d/1352236885442170385Add%20Symbol.svg.hi.png" alt="...">' + ' </label>' + ' <input onChange="cargar_media();" multiple name="filesToUpload[]" id="filesToUpload" style="display:none" type="file" />' + ' </form>' + '</a>' + '</div>';
            cont++;
        } else if (cont == columnas) {
            row = '</div>' + row;
            html = html + row;
        }
        html = html + '<div class="col-lg-' + parseInt(12 / columnas) + '">' + '<div><a href="#" class="thumbnail" id="a_galeria_' + multimedia_disponible[i].id_externo + '" onclick="seleccionar_multimedia(' + multimedia_disponible[i].id_externo + ',\'' + origen + '\')">' +
            '<img style="width: 160px; height: 150px;" src="' + multimedia_disponible[i].url + '" />';
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

function cargar_plantillas(tipo) {
    var editabe = '';
    var funcionalidad = '';
    var row = '<div class="row" style="margin-top:10px">';
    var cont = 0;
    var html = '';

    for (var i = 0; i < array_plantillas.length; i++) {

        if (tipo == 'programacion') {
            //funcionalidad = 'onclick="seleccionar_plantilla('+array_plantillas[i].id_plantilla+', '+array_plantillas[i].plantilla_nombre+')"';
            editabe = '<p><a href="#" class="btn btn-success" role="button" onclick="seleccionar_plantilla(' + array_plantillas[i].id_plantilla + ',\'' +
                array_plantillas[i].plantilla_nombre + '\')">Seleccionar</a></p>';
        } else {
            editabe = '<p><a href="#" class="btn btn-primary" role="button">Editar</a> <a href="#" onclick="abrir_popup_accion(\'Desea eliminar esta plantilla?\')" class="btn btn-default glyphicon glyphicon-trash" role="button"></a></p>';
        }

        if (cont == 6 || cont == 0) {
            row = '</div>' + row;
            html = html + row;
            cont = 0;
        }
        html = html + '<div class="col-sm-6 col-md-4 col-lg-2" ' + funcionalidad + '>' +
            '<div class="thumbnail">' +
            '<img src="' + array_plantillas[i].url + '" alt="...">' +
            '<div class="caption">' +
            '<h3>' + array_plantillas[i].plantilla_nombre + '</h3>' +
            '<p>' + array_plantillas[i].plantilla_descripcion + '</p>' +
            editabe +
            '</div>' +
            '</div>' +
            '</div>';

        cont++;
    }
    html = html + '</div>';
    if (tipo == 'programacion') {
        $("#div_programacion_pantalla").hide();
        $("#div_programacion_calendario").hide();
        $("#div_programacion_plantilla").html(html);
        $("#div_programacion_plantilla").show();
    } else {
        $("#div_plantillas").html(html);
    }
}

function seleccionar_plantilla(id, nombre) {
    var html = '<div class="list-group"><a href="#" class="list-group-item" onclick="cargar_plantillas(\'programacion\')">Plantilla Seleccionada: ' + nombre + '</a>' +
        '<a href="#" class="list-group-item active"> Configuración</a>' +
        '</div>' +
        '<div>' +
        '<i class="glyphicon glyphicon-info-sign"></i>' +
        '<h4 style="display:inline; margin-left:5px">Información el evento</h4><hr>' +
        '<h5 id="programacion_informacion_evento"></h5>' +
        '<h5 id="programacion_informacion_start"></h5>' +
        '<h5 id="programacion_informacion_end"></h5>' +
        '<h5 id="programacion_informacion_minTime"></h5>' +
        '<h5 id="programacion_informacion_maxTime"></h5>' +
        '<h5 id="programacion_informacion_anual"></h5>' +
        '<h5 id="programacion_informacion_allDay"></h5>' +
        '</div>';
    nueva_programacion.id_plantilla = id;
    $("#div_programacion_plantilla").hide();
    $("#div_programacion_menu").html(html);

    $("#div_programacion_pantalla").show();
    cargar_pantallas(null, 'programacion', 'paises');
    /*
    $("#div_programacion_calendario").show();
    cargar_calendario();
    */
}

function cargar_pantallas(datos, origen, tipo) {
    if (datos == null) {
        datos = array_pantallas[0].resultado;
    } else {
        datos = datos.resultado;
    }
    switch (tipo) {
    case 'paises':
        var html = '<h3>Seleccione un país</h3><div class="list-group">' +
            '<a href ="#" class="list-group-item" onclick="seleccionar_pantalla(-1, this)">Todas</a>';

        for (var i = 0; i < datos.length; i++) {
            if (datos[i].seleccionada) {
                html = html + '<a href="#" class="list-group-item active" onclick="seleccionar_pantalla(' + i + ', this)">' + datos[i].nombre + '</a>';
            } else {
                html = html + '<a href="#" class="list-group-item" onclick="seleccionar_pantalla(' + i + ', this)">' + datos[i].nombre + '</a>';
            }
        }
        html = html + '</div>' +
            '<center><button type="button" class="btn btn-success">Aplicar Filtro</button></center>';

        if (origen == 'programacion' || origen == 'pantallas') {
            $("#div_programacion_paises_lista").html(html);
        }
        break;
    case 'provincias':

        break;
    case 'pantallas':

        break;
    }
}

function seleccionar_pantalla(pos, elemento) {
    console.log("POS " + pos);
    if (pos == -1) {
        var html = '<div class="list-group"><a href ="#" class="list-group-item active" onclick="cargar_pantallas(null,\'programacion\', \'paises\')">Todas</a></div>';
        $("#div_programacion_paises_lista").html(html);
    } else {
        if (array_pantallas[0].resultado[pos].seleccionada == undefined || array_pantallas[0].resultado[pos].seleccionada == false) {
            $(elemento).addClass('active');
            array_pantallas[0].resultado[pos].seleccionada = true;
        } else {
            $(elemento).removeClass('active');
            array_pantallas[0].resultado[pos].seleccionada = false;
        }
    }
}

function filtrar_pantallas(origen) {

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

function abrir_popup_guardar_plantilla(dato) {
    var check = true;
    var mensaje;
    for (var i = 0; i < multimedia_seleccionada.length; i++) {
        if (multimedia_seleccionada[i].duracion == "") {
            check = false;
            mensaje = 'Rellene la duración de las imagenes!';
        }
    }
    if (multimedia_seleccionada.length == 0) {
        check = false;
        mensaje = 'La plantilla está vacía!';
    }

    var html = '<div class="input-group" style="margin:5px">' +
        '<span class="input-group-addon" style="padding-right:35px" id="basic-addon1">Nombre  </span>' +
        '<input type="text" id="in_popup_guardar" class="form-control" placeholder="" aria-describedby="basic-addon1">' +
        '</div>' +
        '<div class="input-group" style="margin:5px">' +
        '<span class="input-group-addon" id="basic-addon1">Descripción</span>' +
        '<textarea id="txt_popup_guardar" type="text" class="form-control" placeholder="" aria-describedby="basic-addon1"></textarea>' +
        '</div>';
    if (check) {
        swal({
            title: 'Guardar archivo',
            confirmButtonText: 'Guardar',
            type: 'warning',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            html: html,
            closeOnConfirm: true,
        }, function () {
            if ($("#in_popup_guardar").val() != "" && $("#txt_popup_guardar").val() != "") {
                postPlantillas($("#in_popup_guardar").val(), $("#txt_popup_guardar").val(), multimedia_seleccionada);
            } else {
                html = html + "Rellene todos los campos";
            }
        });
    } else {
        abrir_popup_informacion(mensaje);
    }
}

function filtra_datos(palabra, datos, filtro){
        var datos_filtrados = datos.filter(function (row) {
                if (row[filtro].match(palabra)) {                    
                    return true
                } else {
                    return false;
                }
            });
        return datos_filtrados;
    }