var timeOut;
$(document).ready(function () {
    $(document).ajaxStart(function () {
        timeOut = setTimeout(function(){$("#popup_cargando").show()}, 1500);
        ;
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
var calendarData2 = [
    {
        "id_externo": "13",
        "id_plantilla": "36",
        "title": "dfg",
        "descripcion": "sdfg",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:46:38",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "14",
        "id_plantilla": "37",
        "title": "dvzx",
        "descripcion": "xzcvzxcv",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:48:15",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "15",
        "id_plantilla": "37",
        "title": "xzcv",
        "descripcion": "zxvcv",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:48:35",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "16",
        "id_plantilla": "37",
        "title": "aaaa",
        "descripcion": "aaa",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:49:55",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "17",
        "id_plantilla": "37",
        "title": "sdfs",
        "descripcion": "sfdf",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:54:34",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "18",
        "id_plantilla": "37",
        "title": "asd",
        "descripcion": "asd",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:55:06",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "19",
        "id_plantilla": "37",
        "title": "aaa",
        "descripcion": "aaa",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 18:55:59",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    },
    {
        "id_externo": "20",
        "id_plantilla": "37",
        "title": "test",
        "descripcion": "test",
        "propia": false,
        "lunes": "0",
        "martes": "0",
        "miercoles": "0",
        "jueves": "0",
        "viernes": "0",
        "sabado": "0",
        "domingo": "0",
        "start": "0000-00-00",
        "end": "0000-00-00",
        "hora_inicio": "00:00:00",
        "hora_final": "00:00:00",
        "creada": "2015-11-11 19:06:16",
        "allDay": true,
        "pantallas": [
            {
                "id_externo": "1",
                "nombre": "Despacho Youtter",
                "MAC": "b827ebc6bd8e",
                "tipo_pantalla": null,
                "numero_pantalla": null,
                "horario_desde": "8",
                "horario_hasta": "22",
                "lunes": "1",
                "martes": "1",
                "miercoles": "1",
                "jueves": "1",
                "viernes": "1",
                "sabado": "1",
                "domingo": "1",
                "festivos": null,
                "direccion": "Avda. Torreblanca 57 ",
                "poblacion": "SANT CUGAT DEL VALLES",
                "codigo_postal": "08173",
                "pais": "Espana",
                "latitudGPS": null,
                "longitudGPS": null
            }
        ]
    }
];

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

var array_plantillas = [{
    "id_plantilla": 1,
    "url": "http://codeforces.com/userphoto/title/pedobear/photo.jpg",
    "plantilla_nombre": "Plantilla 1",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 2,
    "url": "https://upload.wikimedia.org/wikipedia/en/2/28/Philip_Fry.png",
    "plantilla_nombre": "Plantilla 2",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 3,
    "url": "http://sergiodelmolino.files.wordpress.com/2010/02/evasee-bender-smoking-3310.jpg",
    "plantilla_nombre": "Plantilla 3",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 4,
    "url": "https://image.freepik.com/foto-gratis/hrc-tigre-siberiano-2-jpg_21253111.jpg",
    "plantilla_nombre": "Plantilla 4",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 5,
    "url": "http://l3.yimg.com/bt/api/res/1.2/CutqJJgH26Mx0nvNqyGtmQ--/YXBwaWQ9eW5ld3M7Zmk9aW5zZXQ7aD00NTU7cT04NTt3PTYzMA--/http://l.yimg.com/os/259/2012/09/06/AP492232600255-jpg_203639.jpg",
    "plantilla_nombre": "Plantilla 5",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 6,
    "url": "http://images.eurogamer.net/articles//a/1/0/2/4/8/8/1/AA_003.jpg.jpg",
    "plantilla_nombre": "Plantilla 6",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}, {
    "id_plantilla": 7,
    "url": "http://images.eurogamer.net/articles//a/1/0/2/4/8/8/1/AA_003.jpg.jpg",
    "plantilla_nombre": "Plantilla 6",
    "plantilla_descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock",
    "plantilla_duracion": 1345
}];

var array_paises;
var array_pantallas = [{
    "id_externo": "1",
    "nombre": "Despacho Youtter",
    "MAC": "b827ebc6bd8e",
    "tipo_pantalla": null,
    "numero_pantalla": null,
    "horario_desde": "8",
    "horario_hasta": "22",
    "lunes": "1",
    "martes": "1",
    "miercoles": "1",
    "jueves": "1",
    "viernes": "1",
    "sabado": "1",
    "domingo": "1",
    "festivos": null,
    "direccion": "Avda. Torreblanca 57 ",
    "poblacion": "SANT CUGAT DEL VALLES",
    "codigo_postal": "08173",
    "pais": "Espa",
    "latitudGPS": null,
    "longitudGPS": null
        }, {
    "id_externo": "2",
    "nombre": "Salita de youtter",
    "MAC": "b827ebc6bd8e",
    "tipo_pantalla": null,
    "numero_pantalla": null,
    "horario_desde": "8",
    "horario_hasta": "22",
    "lunes": "1",
    "martes": "1",
    "miercoles": "1",
    "jueves": "1",
    "viernes": "1",
    "sabado": "1",
    "domingo": "1",
    "festivos": null,
    "direccion": "Avda. Torreblanca 58 ",
    "poblacion": "SANT CUGAT DEL VALLES",
    "codigo_postal": "08173",
    "pais": "Espa",
    "latitudGPS": null,
    "longitudGPS": null
        }];