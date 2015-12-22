/**
 *FUNCION QUE ES LLAMADA CUANDO SELECCIONAS UNA IMAGEN DESDE NUEVA PLANTILLA
 * @param {Number} id     [Id de la imagen seleccionada]
 * @param {String} origen [Desde donde estamos seleccionado]
 */
function seleccionar_multimedia(id, origen) {
    if (origen == "plantilla") {
        for (var i = 0; i < multimedia_disponible.length; i++) { // Recorremos el array
            if (multimedia_disponible[i].id_externo == id) { // Si coincide el id
                if ($('#div_check_' + id).html() == '') { // Si no esta seleccionado
                    anadir_multimedia(multimedia_disponible[i]);
                } else { // Si ya estaba seleccionado
                    eliminar_multimedia(id);
                }
            }
        }
    }
}

/**
 *FUNCION QUE AÑADE AL ARRAY DE NUEVA PLANTILLA, LA IMAGEN SELECCIONADA
 * @param {Array} media [Información de la imagen]
 */
function anadir_multimedia(media) {
    if (nueva_plantilla.media == undefined) {
        nueva_plantilla.media = [];
        nueva_plantilla.media.push(media);
    } else {
        nueva_plantilla.media.push(media);
    }
    refrescar_player();
}

/**
 * ELIMINA LA IMAGEN DEL ARRAY DE NUEVA PLANTILLA QUE SE ESTÁ GENERANDO/MODIFICANDO
 * @param {Number} id [Id de la imagen a eliminar]
 */
function eliminar_multimedia(id) {
    for (var i = 0; i < nueva_plantilla.media.length; i++) {
        if (nueva_plantilla.media[i].id_externo == id) {
            nueva_plantilla.media = removeElement(nueva_plantilla.media, i);
        }
    }
    setTimeout(function () {
        $('#div_check_' + id).html('');
    }, 10);
    refrescar_player();
}

/**
 * REFRESCA EL PLAYER Y LO ACTUALIZA TODO CON LOS NUEVOS DATOS
 */
function refrescar_player() {

    var html = '<li class="list-group-item">' +
        '<div class="row">' +
        '<div class="col-lg-3">Imagen</div>' +
        '<div class="col-lg-4"><center>Duración</center></div>' +
        '<div class="col-lg-2">Mover</div>' +
        '<div class="col-lg-3">Acción</div>' +
        '</div>' +
        '</li>';
    if (nueva_plantilla.media != undefined) {
        for (var i = 0; i < nueva_plantilla.media.length; i++) {
            if (nueva_plantilla.media[i] != undefined) {
                var duracion = parseInt(nueva_plantilla.media[i].duracion);
                var img = '<img class="thumb" src="'+url+'show_image.php?token=' + token + "&id=" + nueva_plantilla.media[i].id_externo + '"/>';
                html = html + '<li class="list-group-item" id="line' + i + '"><div class="row"><div class="col-lg-3">' + img + '</div>' +
                    '<div class="col-lg-4"><center>' +
                    '<input onchange="nueva_plantilla.media[' + i + '].duracion=this.value" value="' + duracion + '" type="number" style="font-size:20px; margin:20px; width:80px; text-align:center; border-radius:5px" min="0" max="999"></center></div>' +
                    '<div class="col-lg-2"><button class="btn btn-sm glyphicon glyphicon-arrow-up" style="margin:1px" onclick="mover_elemento(' + i + ', -1)"></button>' +
                    '<button class="btn btn-sm glyphicon glyphicon-arrow-down" onclick="mover_elemento(' + i + ', 1)"></button></div>' +
                    '<div class="col-lg-3"><h4><button class="btn btn-lg btn-danger" onclick="eliminar_multimedia(' + nueva_plantilla.media[i].id_externo + ')"> <i class="glyphicon glyphicon-trash"></i><span></span></button></h4></div></li>';
            }
        }

        for (var i = 0; i < multimedia_disponible.length; i++) {
            for (var j = 0; j < nueva_plantilla.media.length; j++) {
                if (multimedia_disponible[i].id_externo == nueva_plantilla.media[j].id_externo) {
                    console.log("Pon tick al " + multimedia_disponible[i].id_externo);
                    $('#div_check_' + parseInt(multimedia_disponible[i].id_externo)).html('<img src="css/img/check-icon.png">');
                    setTimeout(function () {

                    }, 10);
                }
            }
        }
    }

    $("#ul_galeria_plantilla").html(html);
}

/**
 * MUEVE LA POSICION DEL ELEMENTO DE LA LISTA DE NUEVA PROGRAMACION
 * @param {Number}   desde [Posicion en la array del elemento]
 * @param {Number} tipo  [Controla que no esté ni al principio ni al final de la lista, para que no lo mueva a una posicion imposible]
 */
function mover_elemento(desde, tipo) {
    if (desde == 0 && tipo == -1) {} else {
        var hasta = desde + tipo;
        var elemento = nueva_plantilla.media[desde];
        nueva_plantilla.media.splice(desde, 1);
        nueva_plantilla.media.splice(hasta, 0, elemento);
        refrescar_player();
    }
}

var playSecuence = '';
var secuencePosition = 0;

/**
 * ACTIVA EL PLAYER PARA QUE VAYA MOSTRANDO LAS IMAGENES POR PANTALLA PROGRESIVAMENTE
 */
function playDisplay() {
    if (nueva_plantilla.media.length != undefined) {
        if ($("#btnPlay").hasClass("glyphicon-play") && nueva_plantilla.media.length > 0) {
            $("#btnPlay").toggleClass('glyphicon-play glyphicon-pause');
            document.getElementById("img2").src = nueva_plantilla.media[secuencePosition].url;
            playSecuence = setInterval(function () {
                document.getElementById("img2").src = nueva_plantilla.media[secuencePosition].url;
                if ((secuencePosition) == (nueva_plantilla.media.length - 1)) {
                    secuencePosition = 0;
                } else {
                    secuencePosition++;
                }
            }, 3000);
        } else {
            $("#btnPlay").removeClass('glyphicon-pause');
            $("#btnPlay").addClass('glyphicon-play');
            clearInterval(playSecuence);
        }
    } else {
        $("#img2").attr("src", "css/img/maqueta.png");
    }

}

/**
 *INTERACTUAR CON EL PLAYER PARA QUE AVANCE, RETROCEDA, VAYA AL PRINCIPIO O AL FINAL
 * @param {Number} type [Tipo de movimiento, +-1 mueve una posicion alante o atras, +-2 va a la primera o ultima posicion]
 */
function changeDisplay(type) {
    if (type == -2) {
        secuencePosition = 0;
    } else if (type == 2) {
        secuencePosition = (nueva_plantilla.media.length - 1);
    } else {
        secuencePosition = secuencePosition + type;
        if ((secuencePosition) == (nueva_plantilla.media.length)) {
            secuencePosition = 0;
        }
        if (secuencePosition < 0) {
            secuencePosition = (nueva_plantilla.media.length - 1);
        }
    }

    if ($("#btnPlay").hasClass("glyphicon-play") && nueva_plantilla.media.length > 0) {
        document.getElementById("img2").src = nueva_plantilla.media[secuencePosition].url;

    } else {
        document.getElementById("img2").src = nueva_plantilla.media[secuencePosition].url;
        $("#btnPlay").removeClass('glyphicon-pause');
        $("#btnPlay").addClass('glyphicon-play');
        clearInterval(playSecuence);
    }
}

/**
 * FUNCION GENERICA QUE BORRA UN ELEMENTO DE UNA ARRAY
 * @param   {Array}    arr   [array a modificar]
 * @param   {Number}   index [posicion]
 * @returns {Array} [Devuelve el array tras modificarla]
 */
function removeElement(arr, index) {
    newArr = [];
    for (var i = 0, l = arr.length; i < l; i++) {
        if (i != index) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * CAMBIA LA ORIENTACION DEL PLAYER
 * @param {Object} element [Es el elemento seleccionado, para controlar si hemos escogido vertical u horizontal]
 */
function cambiar_orientacion(element) {
    console.log("cambiar");
    $("#ul_orientacion").text(element.text);
    if (element.text == 'Vertical') {
        console.log("vert");
        $("#player").removeClass("player-horizontal");
        $("#player").addClass("player-vertical");
        $("#img2").removeClass("img2");
        $("#img2").addClass("img2-vertical");
    } else {
        console.log("or");
        $("#player").removeClass("player-vertical");
        $("#player").addClass("player-horizontal");
        $("#img2").removeClass("img2-vertical");
        $("#img2").addClass("img2");
    }
}