var url = "http://testhtml5.esadecreapolis.com/ws/";
var token;
var peticion_actual;
var columnasGaleria = 6;
var multimedia_disponible = [];
var multimedia_seleccionada = [];
var nueva_programacion = {};
var pantallas_seleccionadas = [];
var auxiliar;
var calendarData = [
    {
        "id": 0,
        "id_plantilla": 0,
        "title": "All Day Event",
        "start": "2015-10-24",
        "end": "2015-10-26",
        "hora_inicio": "10:00:15",
        "hora_final": "14:20:15",
        "anual": true,
        "allDay": false,
        "descripcion": "Campaña de navidad enfocada a que los usuarios compren productos fuera de stock"
     }];

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
var array_pantallas = 
        [{
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