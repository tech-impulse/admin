/**
 * FUNCIÓN QUE MUESTRA POR PANTALLA LAS IMAGENES DE LA GALERIA
 * @param {Object} imagenes (Json con la información de las imagenes)
 */
function cargar_pagina(pantalla) {
    $("#barMenu li").removeClass("active");
    $("#btn_menu_" + pantalla).toggleClass("active");
    switch (pantalla) {
    case 'pantallas':
        getPaises();
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

/**
 * FUNCION QUE CARGA POR PANTALLA LAS PLANTILLAS SEGÚN EL ORIGEN
 * @param {String} origen [Desde donde estas llamando a la funcion (programacion o plantillas)]
 */
function cargar_plantillas(origen) {
    var editabe = '';
    var funcionalidad = '';
    var row = '<div class="row" style="margin-top:10px">';
    var cont = 0;
    var html = '';

    for (var i = 0; i < array_plantillas.length; i++) {

        if (origen == 'programacion') {
            //funcionalidad = 'onclick="seleccionar_plantilla('+array_plantillas[i].id_plantilla+', '+array_plantillas[i].plantilla_nombre+')"';
            editabe = '<p><a href="#" class="btn btn-success" role="button" onclick="seleccionar_plantilla(' + array_plantillas[i].id_externo + ',\'' +
                array_plantillas[i].nombre + '\')">Seleccionar</a></p>';
        } else {
            editabe = '<p><a href="#" class="btn btn-primary" role="button">Editar</a> <a href="#" onclick="abrir_popup_accion(\'Desea eliminar esta plantilla?\', '+array_plantillas[i].id_externo+')" class="btn btn-default glyphicon glyphicon-trash" role="button"></a></p>';
        }

        if (cont == 6 || cont == 0) {
            row = '</div>' + row;
            html = html + row;
            cont = 0;
        }
        html = html + '<div class="col-sm-6 col-md-4 col-lg-2" ' + funcionalidad + '>' +
            '<div class="thumbnail">' +
            '<img class="img_plantilla" src="http://testhtml5.esadecreapolis.com/ws/show_image.php?token=' + token + "&id="+ array_plantillas[i].elementos[0].id_externo + '" alt="...">' +
            '<div class="caption">' +
            '<h3>' + array_plantillas[i].nombre + '</h3>' +
            '<p>' + array_plantillas[i].descripcion + '</p>' +
            editabe +
            '</div>' +
            '</div>' +
            '</div>';

        cont++;
    }
    html = html + '</div>';
    if (origen == 'programacion') {
        $("#div_programacion_pantalla").hide();
        $("#div_programacion_calendario").hide();
        $("#div_programacion_plantilla").html(html);
        $("#div_programacion_plantilla").show();
    } else {
        $("#div_plantillas").html(html);
    }
}

/**
 * FUNCION QUE SE LLAMA TRAS SELECCIONAR UNA PLANTILLA
 * @param {Number} id     [Id de la pantalla seleccionada]
 * @param {String} nombre [Nombre de la plantilla seleccionada]
 */
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
        '<h5 id="programacion_informacion_hora_inicio"></h5>' +
        '<h5 id="programacion_informacion_hora_final"></h5>' +
        '<h5 id="programacion_informacion_anual"></h5>' +
        '<h5 id="programacion_informacion_allDay"></h5>' +
        '</div>';
    nueva_programacion.id_plantilla = id;
    $("#div_programacion_plantilla").hide();
    $("#div_programacion_menu").html(html);
    $("#div_programacion_pantalla").show();
    getPaises('programacion');
    console.log("Selecciona la pantallas");
}

/**
 * FUNCION QUE MUESTRA LA LISTA DE PANTALLAS
 * @param {Object}   datos  [Datos de origen en formato JSON]
 * @param {String} tipo   [Tipo de lista que quiero mostrar (Paises, Provincias o Pantallas)]
 */
function cargar_pantallas(datos, origen, tipo) {
    auxiliar = datos;
    switch (tipo) {
    case 'paises':
        datos = array_paises;
        var html = '<div class="list-group">' +
            '<a href ="#" class="list-group-item" onclick="seleccionar_pais(-1, this)">Todos</a>';
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].seleccionada) {
                html = html + '<a href="#" class="list-group-item active" onclick="seleccionar_pais(' + i + ', this)">' + datos[i].nombre + '</a>';
            } else {
                html = html + '<a href="#" class="list-group-item" onclick="seleccionar_pais(' + i + ', this)">' + datos[i].nombre + '</a>';
            }
        }
        html = html + '</div>';
        $("#div_programacion_paises_lista").html(html);
        break;
    case 'provincias':

        break;
    case 'pantallas':
        if (datos == null) {
            for (var i = 0; i < array_pantallas.length; i++) {
                array_pantallas[i].seleccionada = false;
            }
            array_pantallas.seleccionadas = 0;
            $("#btn_pantallas_continuar").hide();
        }
        datos = array_pantallas;
        var html = '<div class="list-group">' +
            '<a href ="#" class="list-group-item" onclick="seleccionar_pantalla(-1, this)">Todas</a>';
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].seleccionada) {
                html = html + '<a href="#" class="list-group-item active" onclick="seleccionar_pantalla(' + i + ', this)"><strong>' +
                    datos[i].nombre + ':</strong> ( ' +
                    datos[i].direccion + ', '
                datos[i].poblacion + ', '
                datos[i].codigo_postal +
                    ')</a>';
            } else {
                html = html + '<a href="#" class="list-group-item" onclick="seleccionar_pantalla(' + i + ', this)"><strong>' +
                    datos[i].nombre + ':</strong> ( ' +
                    datos[i].direccion + ', ' +
                    datos[i].poblacion + ', ' +
                    datos[i].codigo_postal +
                    ')</a>';
            }
        }
        html = html + '</div>';
        $("#div_programacion_pantallas_lista").html(html);
        break;
    }
}

/**
 * FUNCION QUE SELECCIONA UN PAIS
 * @param {Number} pos      [Posición del elemento seleccionado]
 * @param {Object} elemento [Elemento HTML seleccionado]
 */
function seleccionar_pais(pos, elemento) {
    console.log("POS " + pos);
    if (pos == -1) {
        var html = '<div class="list-group"><a href ="#" class="list-group-item active" onclick="cargar_pantallas(null,\'programacion\', \'paises\')">Todos</a></div>';
        $("#div_programacion_paises_lista").html(html);
    } else {
        if (array_paises[pos].seleccionada == undefined || array_paises[pos].seleccionada == false) {
            $(elemento).addClass('active');
            array_paises[pos].seleccionada = true;
        } else {
            $(elemento).removeClass('active');
            array_paises[pos].seleccionada = false;
        }
    }
}

/**
 * FUNCION QUE SELECCIONA UNA PANTALLA
 * @param {Number} pos      [Posición del elemento seleccionado]
 * @param {Object} elemento [Elemento HTML seleccionado]
 */
function seleccionar_pantalla(pos, elemento) {
    console.log("POS " + pos);
    if (pos == -1) {
        var html = '<div class="list-group"><a href ="#" class="list-group-item active" onclick="cargar_pantallas(null,\'programacion\', \'pantallas\')">Todas</a></div>';
        for (var i = 0; i < array_pantallas.length; i++) {
            array_pantallas[i].seleccionada = true;
        }
        array_pantallas.seleccionadas = array_pantallas.length;
        $("#div_programacion_pantallas_lista").html(html);
    } else {
        if (array_pantallas[pos].seleccionada == undefined || array_pantallas[pos].seleccionada == false) {
            $(elemento).addClass('active');
            array_pantallas[pos].seleccionada = true;
            array_pantallas.seleccionadas = array_pantallas.seleccionadas + 1;
        } else {
            $(elemento).removeClass('active');
            array_pantallas[pos].seleccionada = false;
            array_pantallas.seleccionadas = array_pantallas.seleccionadas - 1;
        }
    }
    if (array_pantallas.seleccionadas > 0) {
        $("#btn_pantallas_continuar").show();
    } else {
        $("#btn_pantallas_continuar").hide();
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
function abrir_popup_accion(dato, id) {
    swal({
        title: 'Esta seguro?',
        text: dato,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        closeOnConfirm: true
    }, function () {
            deletePlantilla(id);
        });
}

/**
 * FUNCION QUE MUESTRA EL POPUP DE GUARDAR PLANTILLA
 */
function abrir_popup_guardar_plantilla() {
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

/**
 * FUNCION QUE PERMITE FILTRAR EN UN JSON DE UN SOLO NIVEL
 * @param   {String} palabra [Palabra por la cual vas a filtrar]
 * @param   {Object} datos   [JSON de datos a filtrar]
 * @param   {String} filtro  [Tipo de filtro por el que se va a aplicar (nombre, codigo postal, etc)]
 * @returns {JSON}   [RRetorna el mismo JSON con los elementos filtrados]
 */
function filtra_datos(palabra, datos, filtro) {
    console.log("Filtrar " + palabra);
    var datos_filtrados = datos.filter(function (row) {
        if (row[filtro].match(palabra)) {
            return true
        } else {
            return false;
        }
    });
    return datos_filtrados;
}

$('#filtrar_pantallas').on('keyup', function () {
    var palabra = this.value;
    var datos;
    if (this.value.length > 1) {
        datos = filtra_datos(palabra, array_pantallas, 'codigo_postal');
        cargar_pantallas(datos, 'pantallas', 'pantallas');
    } else {
        datos = array_pantallas;
        cargar_pantallas(datos, 'pantallas', 'pantallas');
    }
});