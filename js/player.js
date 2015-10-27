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

function anadir_multimedia(media) {

    setTimeout(function () {
        $('#div_check_' + parseInt(media.id_externo)).html('<img src="css/img/check-icon.png">');
    }, 10);
    multimedia_seleccionada.push(media);
    refrescar_player();
}

function eliminar_multimedia(id) {
    setTimeout(function () {
        $('#div_check_' + id).html('');
    }, 100);
    for (var i = 0; i < multimedia_seleccionada.length; i++) {
        if (multimedia_seleccionada[i].id_externo == id) {
            multimedia_seleccionada = removeElement(multimedia_seleccionada, i);
        }
    }

    refrescar_player();
}

function refrescar_player() {
    //$("#display").html('');
    var html = '<li class="list-group-item">' +
        '<div class="row">' +
        '<div class="col-lg-3">Imagen</div>' +
        '<div class="col-lg-4"><center>Duración</center></div>' +
        '<div class="col-lg-2">Mover</div>' +
        '<div class="col-lg-3">Acción</div>' +
        '</div>' +
        '</li>';
    for (var i = 0; i < multimedia_seleccionada.length; i++) {
        if (multimedia_seleccionada[i] != undefined) {
            var duracion = parseInt(multimedia_seleccionada[i].duracion);
            var img = '<img class="thumb" src="' + multimedia_seleccionada[i].url + '"/>';
            html = html + '<li class="list-group-item" id="line' + i + '"><div class="row"><div class="col-lg-3">' + img + '</div>' +
                '<div class="col-lg-4"><center>' +
                '<input onchange="multimedia_seleccionada[' + i + '].duracion=this.value" value="' + duracion + '" type="number" style="font-size:20px; margin:20px; width:80px; text-align:center; border-radius:5px" min="0" max="999"></center></div>' +
                '<div class="col-lg-2"><button class="btn btn-sm glyphicon glyphicon-arrow-up" style="margin:1px" onclick="mover_elemento(' + i + ', -1)"></button>' +
                '<button class="btn btn-sm glyphicon glyphicon-arrow-down" onclick="mover_elemento(' + i + ', 1)"></button></div>' +
                '<div class="col-lg-3"><h4><button class="btn btn-lg btn-danger" onclick="eliminar_multimedia(' + multimedia_seleccionada[i].id_externo + ')"> <i class="glyphicon glyphicon-trash"></i><span></span></button></h4></div></li>';
        }
    }

    $("#ul_galeria_plantilla").html(html);
}

function mover_elemento(desde, tipo) {
    if (desde == 0 && tipo == -1) {} else {
        var hasta = desde + tipo;
        var elemento = multimedia_seleccionada[desde];
        multimedia_seleccionada.splice(desde, 1);
        multimedia_seleccionada.splice(hasta, 0, elemento);
        refrescar_player();
    }
}

var playSecuence = '';
var secuencePosition = 0;


function playDisplay() {
    if (multimedia_seleccionada.length != undefined) {
        if ($("#btnPlay").hasClass("glyphicon-play") && multimedia_seleccionada.length > 0) {
            $("#btnPlay").toggleClass('glyphicon-play glyphicon-pause');
            document.getElementById("img2").src = multimedia_seleccionada[secuencePosition].url;
            playSecuence = setInterval(function () {
                document.getElementById("img2").src = multimedia_seleccionada[secuencePosition].url;
                if ((secuencePosition) == (multimedia_seleccionada.length - 1)) {
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
    } else{
        $("#img2").attr("src","css/img/maqueta.png");
    }

}

function changeDisplay(type) {
    if (type == -2) {
        secuencePosition = 0;
    } else if (type == 2) {
        secuencePosition = (multimedia_seleccionada.length - 1);
    } else {
        secuencePosition = secuencePosition + type;
        if ((secuencePosition) == (multimedia_seleccionada.length)) {
            secuencePosition = 0;
        }
        if (secuencePosition < 0) {
            secuencePosition = (multimedia_seleccionada.length - 1);
        }
    }

    if ($("#btnPlay").hasClass("glyphicon-play") && multimedia_seleccionada.length > 0) {
        document.getElementById("img2").src = multimedia_seleccionada[secuencePosition].url;

    } else {
        document.getElementById("img2").src = multimedia_seleccionada[secuencePosition].url;
        $("#btnPlay").removeClass('glyphicon-pause');
        $("#btnPlay").addClass('glyphicon-play');
        clearInterval(playSecuence);
    }
}


function removeElement(arr, index) {
    newArr = [];
    for (var i = 0, l = arr.length; i < l; i++) {
        if (i != index) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}