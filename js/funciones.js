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
    case 'ver_programacion':
        $("#content").load("ver_programacion.html", function () {
            calendarData = {};
            getPaises('ver_programacion');
            cargar_calendario('ver');
        });
        $("#submenu").html('<li class="active">Programaciones</li>');
        break;
    case 'programacion':
        getProgramacion();
        getPlantilla('', 'programacion');
        $("#submenu").html('<li class="active">Nueva programacion</li>');
        break;
    case 'galeria':
        getGaleria('galeria');
        $("#submenu").html('<li class="active">Galeria</li>');
        break;
    case 'plantillas':
        getPlantilla('', 'plantillas');
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
    if (GALERIA_FOTOS == 1 && GALERIA_VIDEOS == 0) {
        $("#image-gallery-button").addClass("active");
        $("#video-gallery-button").removeClass("active");
        $("#todo-gallery-button").removeClass("active");
    }
    if (GALERIA_FOTOS == 0 && GALERIA_VIDEOS == 1) {
        $("#image-gallery-button").removeClass("active");
        $("#video-gallery-button").addClass("active");
        $("#todo-gallery-button").removeClass("active");
    }
    if (GALERIA_FOTOS == 1 && GALERIA_VIDEOS == 1) {
        $("#image-gallery-button").removeClass("active");
        $("#video-gallery-button").removeClass("active");
        $("#todo-gallery-button").addClass("active");
    }
    if (columnas == undefined) {
        columnas = 6;
    }
    var row = '<div class="row" style="margin-top:10px">';
    var cont = 0;
    var html = '';
    if (multimedia_disponible == null) {
        html = html + '<div class="col-lg-2 col-md-3 col-sm-4">' + '<a  class="thumbnail img-galeria">' + '<form style="width: 160px; height: 140px" id="form_galeria" method="post" action="" enctype="multipart/form-data">' + '<label for="filesToUpload">' + '<img style="width: 160px; height: 140px;cursor: pointer;" src="http://www.clker.com/cliparts/e/c/e/d/1352236885442170385Add%20Symbol.svg.hi.png" alt="...">' + ' </label>' + ' <input onChange="cargar_media();" multiple name="filesToUpload[]" id="filesToUpload" style="display:none" type="file" />' + ' </form>' + '</a>' + '</div>';
    } else {
        for (var i = 0; i < multimedia_disponible.length; i++) {
            if (cont == 0 && origen != 'plantilla') {
                html = row;
                html = html + '<div class="col-lg-2 col-md-3 col-sm-4">' + '<a  class="thumbnail img-galeria">' + '<form style="width: 160px; height: 140px" id="form_galeria" method="post" action="" enctype="multipart/form-data">' + '<label for="filesToUpload">' + '<img style="width: 160px; height: 140px;cursor: pointer;" src="http://www.clker.com/cliparts/e/c/e/d/1352236885442170385Add%20Symbol.svg.hi.png" alt="...">' + ' </label>' + ' <input onChange="cargar_media();" multiple name="filesToUpload[]" id="filesToUpload" style="display:none" type="file" />' + ' </form>' + '</a>' + '</div>';
                cont++;
            } else if (cont == 6) {
                row = '</div>' + row;
                html = html + row;
            }
            setOrientacion(multimedia_disponible[i].url, 'img_galeria_' + multimedia_disponible[i].id_externo);

            html = html + '<div class="col-lg-2 col-md-3 col-sm-4">' + '<div><a class="thumbnail img-galeria" id="a_galeria_' + multimedia_disponible[i].id_externo + '" onclick="seleccionar_multimedia(' + multimedia_disponible[i].id_externo + ',\'' + origen + '\')">' +
                '<img id="img_galeria_' + multimedia_disponible[i].id_externo + '" src="' + multimedia_disponible[i].url + '" />';
            if (origen == 'galeria') {
                html = html + '<div class="boton_borrar_galeria">' + '<button onclick="borrar_elemento_galeria(' + multimedia_disponible[i].id_externo + ')" type="button" class="btn btn-danger glyphicon glyphicon-trash"></button>' + '</div>';
            }
            html = html + '<div class="boton_check_galeria" id="div_check_' + multimedia_disponible[i].id_externo + '"></div>' + '</a></div>' + '</div>';

            cont++;
        }
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

    if (array_plantillas != null) {
        for (var i = 0; i < array_plantillas.length; i++) {

            if (origen == 'programacion') {
                //funcionalidad = 'onclick="seleccionar_plantilla('+array_plantillas[i].id_plantilla+', '+array_plantillas[i].plantilla_nombre+')"';
                editabe = '<p><a href="#" class="btn btn-success" role="button" onclick="seleccionar_plantilla(' + array_plantillas[i].id_externo + ',\'' +
                    array_plantillas[i].nombre + '\')">Seleccionar</a></p>';
            } else {
                editabe = '<p><a href="#" class="btn btn-primary" role="button" onclick="getPlantilla(' + array_plantillas[i].id_externo + ', \'editar\')">Editar</a> <a href="#" onclick="abrir_popup_accion(\'Desea eliminar esta plantilla?\', ' + array_plantillas[i].id_externo + ')" class="btn btn-default glyphicon glyphicon-trash" role="button"></a></p>';
            }

            if (cont == 6 || cont == 0) {
                row = '</div>' + row;
                html = html + row;
                cont = 0;
            }
            html = html + '<div class="col-sm-6 col-md-4 col-lg-2" ' + funcionalidad + '>' +
                '<div class="thumbnail">' +
                '<img class="img_plantilla" src="'+url+'/show_image.php?token=' + token + "&id=" + array_plantillas[i].elementos[0].id_externo + '" alt="...">' +
                '<div class="caption">' +
                '<h3>' + array_plantillas[i].nombre + '</h3>' +
                '<p>' + array_plantillas[i].descripcion + '</p>' +
                editabe +
                '</div>' +
                '</div>' +
                '</div>';

            cont++;
        }
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
 * FUNCION QUE MUESTRA LA LISTA DE PANTALLAS SEGUN EL ORIGEN
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
    case 'ver_programacion':
        if (datos == null) {
            for (var i = 0; i < array_pantallas.length; i++) {
                array_pantallas[i].seleccionada = false;
            }
            array_pantallas.seleccionadas = 0;
        }
        datos = array_pantallas;
        var html = '<div class="list-group">';
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].seleccionada) {
                html = html + '<a href="#" class="list-group-item active" onclick="seleccionar_pantalla_programacion(' + i + ', this)"><strong>' +
                    datos[i].nombre + '</a>';
            } else {
                html = html + '<a href="#" class="list-group-item" onclick="seleccionar_pantalla_programacion(' + i + ', this)"><strong>' +
                    datos[i].nombre + '</a>';
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
 * FUNCION QUE SELECCIONA UNA PANTALLA
 * @param {Number} pos      [Posición del elemento seleccionado]
 * @param {Object} elemento [Elemento HTML seleccionado]
 */
function seleccionar_pantalla_programacion(pos, elemento) {

    if (array_pantallas[pos].seleccionada == undefined || array_pantallas[pos].seleccionada == false) {
        $(elemento).addClass('active');
        array_pantallas[pos].seleccionada = true;
        array_pantallas.seleccionadas = array_pantallas.seleccionadas + 1;
    } else {
        $(elemento).removeClass('active');
        array_pantallas[pos].seleccionada = false;
        array_pantallas.seleccionadas = array_pantallas.seleccionadas - 1;
    }

    if (array_pantallas.seleccionadas > 0) {
        getProgramacion(array_pantallas[pos].id_externo);
    } else {
        calendarData = {};
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', calendarData);
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

function borrar_elemento_galeria(id) {
    abrir_popup_accion('deleteGaleria', id);
}

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
        if (dato == 'deleteGaleria') {
            deleteGaleria(id);
        } else {
            deletePlantilla(id);
        }
    });
}

/**
 * FUNCION QUE MUESTRA EL POPUP DE GUARDAR PLANTILLA
 */
function abrir_popup_guardar_plantilla() {
    var nombre = '';
    var descripcion = '';
    if (nueva_plantilla.nombre != undefined) {
        nombre = nueva_plantilla.nombre;
        descripcion = nueva_plantilla.descripcion;
    }
    var check = true;
    var mensaje;

    if (nueva_plantilla.media == undefined || nueva_plantilla.media.length == 0) {
        check = false;
        mensaje = 'La plantilla está vacía!';
    } else {
        for (var i = 0; i < nueva_plantilla.media.length; i++) {
            if (nueva_plantilla.media[i].duracion == "") {
                check = false;
                mensaje = 'Rellene la duración de las imagenes!';
            }
        }
    }

    var html = '<div class="input-group" style="margin:5px">' +
        '<span class="input-group-addon" style="padding-right:35px" id="basic-addon1">Nombre  </span>' +
        '<input type="text" id="in_popup_guardar" class="form-control" placeholder="' + nombre + '" aria-describedby="basic-addon1">' +
        '</div>' +
        '<div class="input-group" style="margin:5px">' +
        '<span class="input-group-addon" id="basic-addon1">Descripción</span>' +
        '<textarea id="txt_popup_guardar" type="text" class="form-control" placeholder="' + descripcion + '" aria-describedby="basic-addon1"></textarea>' +
        '</div>';
    if (check) {
        swal({
            title: 'Guardar archivo',
            confirmButtonText: 'Guardar',
            type: 'warning',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            html: html,
            closeOnConfirm: false,
        }, function () {
            if ($("#in_popup_guardar").val() != "" && $("#txt_popup_guardar").val() != "") {
                nueva_plantilla.nombre = $("#in_popup_guardar").val();
                nueva_plantilla.descripcion = $("#txt_popup_guardar").val();
                nueva_plantilla.media = nueva_plantilla.media;
                postPlantilla();
            } else {
                console.log("No esta");
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

/**
 * FUNCION QUE CAMBIA LA ORIENTACIÓN DE LA IMAGEN Y LA ESCALA
 * @param {String} url [Imagen que se va a visualizar]
 * @param {Number} id  [Id del elemento a cambiar la clase (Vertical o Horizontal)]
 */
function setOrientacion(url, id) {
    var img = new Image();
    img.onload = function () {
        if (this.height >= this.width) {
            console.log("tipo vertical");
            $("#" + id).addClass('img-galeria-vertical');
        } else {
            $("#" + id).addClass('img-galeria-horizontal');
            console.log("tipo horizontal");
        }
        console.log(this.width + ' ' + this.height);
    };
    img.src = url;
}