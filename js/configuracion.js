var timeOut;
$(document).ready(function () {
    $(document).ajaxStart(function () {
        timeOut = setTimeout(function () {
            $("#popup_cargando").show()
        }, 400);;
    });
    $(document).ajaxStop(function () {
        clearTimeout(timeOut);
        $("#popup_cargando").hide();
    });
});

var url = "http://testhtml5.esadecreapolis.com/ws/";
var token;
var peticion_actual;
var columnasGaleria = 6;
var nueva_plantilla = {};
var nueva_programacion = {};
var pantallas_seleccionadas = [];
var auxiliar;
var calendarData = [];
var GALERIA_FOTOS = 1;
var GALERIA_VIDEOS = 1;
var calendarData2 = [];
var array_plantillas = [];
var array_paises;
var array_pantallas = [];